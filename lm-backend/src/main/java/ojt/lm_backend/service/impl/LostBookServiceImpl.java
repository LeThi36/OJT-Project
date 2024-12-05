package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.BorrowRecordRepository;
import ojt.lm_backend.service.LostBookService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LostBookServiceImpl implements LostBookService {

    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    private final BorrowRecordRepository borrowRecordRepository;

    private final ModelMapper modelMapper;

    private static final BigDecimal BOOK_COST = new BigDecimal("100000"); // Giá sách cố định 100,000đ

    @Override
    public List<BorrowRecordDetailDto> getLostBooks() {
        List<BorrowRecord> borrowRecordList = borrowRecordRepository.findByStatus(BorrowStatus.LOST);
        return borrowRecordList.stream()
                .map(borrowRecord -> modelMapper.map(borrowRecord, BorrowRecordDetailDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    public List<BorrowRecordDetailDto> updateOverDueToLost() {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
        List<BorrowRecord> overDueRecord = borrowRecordRepository.findOverdueRecordsExceedingThreeDays(threeDaysAgo);

        List<BorrowRecordDetailDto> lostBooks = new ArrayList<>();

        for (BorrowRecord record : overDueRecord) {
            record.setStatus(BorrowStatus.LOST);
            borrowRecordRepository.save(record);

            // Tính tiền phạt
            BigDecimal fine = calculateFine(record);

            // Cập nhật phạt
            record.setFine(fine);
            borrowRecordRepository.save(record);

            // Chuyển thông tin sang DTO
            BorrowRecordDetailDto dto = modelMapper.map(record, BorrowRecordDetailDto.class);
            lostBooks.add(dto);
        }
        return lostBooks;
    }

    @Override
    public Optional<BorrowRecord> markBookAsLost(int bookId) {
        List<BorrowRecord> borrowRecords = borrowRecordRepository.findByBookId(bookId);

        if (!borrowRecords.isEmpty()) {
            Book book = borrowRecords.get(0).getBook();
            book.setCopies(book.getCopies() - 1);
            bookRepository.save(book);

            Optional<BorrowRecord> currentBorrowRecordOpt = borrowRecords
                    .stream()
                    .filter(br -> br.getReturnDate() == null)
                    .findFirst();

            if (currentBorrowRecordOpt.isPresent()) {
                BorrowRecord currentBorrowRecord = currentBorrowRecordOpt.get();
                currentBorrowRecord.setStatus(BorrowStatus.LOST);

                // Tính tiền phạt nếu sách quá hạn
                BigDecimal fine = calculateFine(currentBorrowRecord);

                currentBorrowRecord.setFine(fine);

                borrowRecordRepository.save(currentBorrowRecord);
                return Optional.of(currentBorrowRecord);
            }
        }
        return Optional.empty();
    }

    private BigDecimal calculateFine(BorrowRecord record) {
        BigDecimal fine = new BigDecimal("0");

        if (record.getDueDate().isBefore(LocalDate.now())) {
            long overdueDays = record.getDueDate().until(LocalDate.now()).getDays();
            fine = new BigDecimal(overdueDays).multiply(new BigDecimal("5000")); // Ví dụ: 5 đơn vị/ngày
        }

        if (record.getStatus() == BorrowStatus.LOST) {
            fine = fine.add(BOOK_COST); // Nếu sách bị mất, cộng giá sách vào phạt
        }

        return fine;
    }

    @Override
    public boolean canUserBorrow(Long userId) {
        return !borrowRecordRepository.existsProblematicBorrowRecords(userId);
    }
}
