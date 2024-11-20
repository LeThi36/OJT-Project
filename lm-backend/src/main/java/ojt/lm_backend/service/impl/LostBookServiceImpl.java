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

import java.time.LocalDate;
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


    @Override
    public List<BorrowRecordDetailDto> getLostBooks() {
        List<BorrowRecord> borrowRecordList = borrowRecordRepository.findByStatus(BorrowStatus.LOST);
        return borrowRecordList.stream()
                .map(borrowRecord -> modelMapper
                .map(borrowRecord,BorrowRecordDetailDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    public List<BorrowRecordDetailDto> updateOverDueToLost() {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
        List<BorrowRecord> overDueRecord = borrowRecordRepository.findOverdueRecordsExceedingThreeDays(threeDaysAgo);

        for(BorrowRecord record : overDueRecord) {
            record.setStatus(BorrowStatus.LOST);

            borrowRecordRepository.save(record);
        }
        return null;
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

            if(currentBorrowRecordOpt.isPresent()) {
                BorrowRecord currentBorrowRecord = currentBorrowRecordOpt.get();
                currentBorrowRecord.setStatus(BorrowStatus.LOST);

                // Tính tiền phạt nếu sách quá hạn
                /*LocalDate today = LocalDate.now();
                if (currentBorrowRecord.getDueDate().isBefore(today)) {
                    long overdueDays = currentBorrowRecord.getDueDate().until(today).getDays();
                    BigDecimal fine = new BigDecimal(overdueDays).multiply(new BigDecimal("5.00")); // Ví dụ: 5 đơn vị/ngày
                    currentBorrowRecord.setFine(fine);
                }*/

                borrowRecordRepository.save(currentBorrowRecord);
                return Optional.of(currentBorrowRecord);
            }
        }
        return Optional.empty();
    }

    @Override
    public boolean canUserBorrow(Long userId) {

        return false;
    }
}
