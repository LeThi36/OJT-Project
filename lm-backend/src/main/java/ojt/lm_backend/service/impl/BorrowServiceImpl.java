package ojt.lm_backend.service.impl;


import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.dto.request.BorrowRequest;
import ojt.lm_backend.dto.response.BorrowResponse;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.repository.BorrowRecordRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BorrowServiceImpl implements BorrowService {

    @Autowired
    private BorrowRecordRepository borrowRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public BorrowResponse createBorrowRecord(BorrowRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        LocalDate borrowDate = request.getBorrowDate();
        LocalDate dueDate = borrowDate.plusDays(request.getBorrowDurationDays());

        BorrowRecord record = BorrowRecord.builder()
                .user(user)
                .book(book)
                .borrowDate(borrowDate)
                .dueDate(dueDate)
                .status(BorrowStatus.PENDING_APPROVAL)
                .fine(BigDecimal.valueOf(0))
                .build();

        BorrowRecord savedRecord = borrowRecordRepository.save(record);
        return convertToResponse(savedRecord);
    }

    @Override
    public List<BorrowResponse> getAllBorrowRecords() {
        return borrowRecordRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BorrowResponse> getBorrowHistory(User user) {
        return borrowRecordRepository.findByUser(user).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BorrowResponse getBorrowRecordById(Integer borrowId) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));
        return convertToResponse(record);
    }

    @Override
    public BorrowResponse updateBorrowRecord(Integer borrowId, LocalDate returnDate) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        record.setStatus(BorrowStatus.RETURNED);
        record.setReturnDate(returnDate);
        record.setFine(calculateFine(record.getDueDate()));

        BorrowRecord updatedRecord = borrowRecordRepository.save(record);
        return convertToResponse(updatedRecord);
    }

    @Override
    public BorrowResponse adminUpdateBorrowRecord(Integer borrowId, BorrowRequest request) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        record.setBorrowDate(request.getBorrowDate());
        record.setDueDate(request.getBorrowDate().plusDays(request.getBorrowDurationDays()));
        record.setStatus(request.getBorrowDurationDays() > 0 ? BorrowStatus.BORROWED : BorrowStatus.OVERDUE);

        BorrowRecord updatedRecord = borrowRecordRepository.save(record);
        return convertToResponse(updatedRecord);
    }





    @Override
    public void deleteBorrowRecord(Integer borrowId) {
        borrowRecordRepository.deleteById(borrowId);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Override
    public void updateFines() {
        List<BorrowRecord> borrowedRecords = borrowRecordRepository.findByStatus(BorrowStatus.BORROWED);
        for (BorrowRecord record : borrowedRecords) {
            record.setFine(calculateFine(record.getDueDate()));
            borrowRecordRepository.save(record);
        }
    }
    private BigDecimal calculateFine(LocalDate dueDate) {
        long daysLate = ChronoUnit.DAYS.between(dueDate, LocalDate.now());

        if (daysLate <= 0) {
            return BigDecimal.ZERO;
        } else if (daysLate <= 7) {
            return BigDecimal.valueOf(10000);
        } else if (daysLate <= 30) {
            return BigDecimal.valueOf(30000);
        } else if (daysLate <= 90) {
            return BigDecimal.valueOf(50000);
        } else {
            long periodsOfThreeMonths = daysLate / 90;
            return BigDecimal.valueOf(50000 + periodsOfThreeMonths * 150000);
        }
    }
    private BorrowResponse convertToResponse(BorrowRecord record) {
        return BorrowResponse.builder()
                .borrowId(record.getBorrowId())
                .userId(Math.toIntExact(record.getUser().getUserId()))
                .bookId(record.getBook().getBookId())
                .borrowDate(record.getBorrowDate())
                .dueDate(record.getDueDate())
                .returnDate(record.getReturnDate())
                .status(record.getStatus())
                .fine(record.getFine())
                .build();
    }
}
