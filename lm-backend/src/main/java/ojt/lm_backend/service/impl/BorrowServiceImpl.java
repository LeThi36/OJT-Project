package ojt.lm_backend.service.impl;


import ojt.lm_backend.LMenum.BookStatus;
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
import java.time.LocalDateTime;
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
        // Tìm User theo userId
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Tìm Book theo bookId
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Kiểm tra trạng thái của cuốn sách
        if (book.getStatus() != BookStatus.NEW) {
            // Log trạng thái sách nếu không phải NEW
            System.out.println("Book '" + book.getTitle() + "' Not available for loan. Current status: " + book.getStatus());
            throw new RuntimeException("This book is not available for loan.");
        }

        // Nếu trạng thái là NEW, tạo bản ghi mượn
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

        // Lưu bản ghi vào database
        BorrowRecord savedRecord = borrowRecordRepository.save(record);

        // Trả về response
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

        if (request.getBookId() != null) {
            Book book = bookRepository.findById(request.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));
            record.setBook(book);
        }
        if (request.getBorrowDate() != null) {
            record.setBorrowDate(request.getBorrowDate());
        }
        if (request.getBorrowDate() != null && request.getBorrowDurationDays() > 0) {
            record.setDueDate(request.getBorrowDate().plusDays(request.getBorrowDurationDays()));
        }
        if (request.getBorrowDurationDays() > 0) {
            LocalDate dueDate = record.getBorrowDate().plusDays(request.getBorrowDurationDays());
            record.setFine(calculateFine(dueDate));
        }

        BorrowRecord updatedRecord = borrowRecordRepository.save(record);
        return convertToResponse(updatedRecord);
    }

    // admin acp request borrow
    @Override
    public BorrowResponse approveBorrowRequest(Integer borrowId) {

        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        if (record.getStatus() != BorrowStatus.PENDING_APPROVAL) {
            throw new RuntimeException("Only requests with status PENDING_APPROVAL can be approved.");
        }

        record.setStatus(BorrowStatus.BORROWED);
        BorrowRecord updatedRecord = borrowRecordRepository.save(record);

        Book book = record.getBook();

        if (book.getStatus() == BookStatus.NEW) {
            book.setStatus(BookStatus.USED);
            bookRepository.save(book);
        }
        return convertToResponse(updatedRecord);
    }

    @Override
    public BorrowResponse updateBorrowStatus(Integer borrowId, String newStatus) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        BorrowStatus status;
        try {
            status = BorrowStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + newStatus);
        }

        record.setStatus(status);
        BorrowRecord updatedRecord = borrowRecordRepository.save(record);
        return convertToResponse(updatedRecord);
    }

    @Override
    public BorrowResponse ReturnedBorrow(Integer borrowId) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        if (record.getStatus() == BorrowStatus.PENDING_APPROVAL) {
            throw new RuntimeException("Cannot reverse a request with status PENDING_APPROVAL.");
        }
        record.setStatus(BorrowStatus.RETURNED);
        BorrowRecord updatedRecord = borrowRecordRepository.save(record);

        Book book = record.getBook();
        if (book.getStatus() == BookStatus.USED) {
            book.setStatus(BookStatus.NEW);
            bookRepository.save(book);
        }
        return convertToResponse(updatedRecord);
    }


    @Override
    public void deleteBorrowRecord(Integer borrowId) {
        borrowRecordRepository.deleteById(borrowId);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Override
    public void updateFines() {
        System.out.println("Running updateFines at " + LocalDateTime.now());

        List<BorrowRecord> borrowedRecords = borrowRecordRepository.findByStatus(BorrowStatus.BORROWED);
        System.out.println("Found " + borrowedRecords.size() + " borrowed records.");

        for (BorrowRecord record : borrowedRecords) {
            BigDecimal fine = calculateFine(record.getDueDate());
            System.out.println("Borrow record ID: " + record.getBorrowId() + ", dueDate: " + record.getDueDate() + ", calculated fine: " + fine);

            record.setFine(fine);
            borrowRecordRepository.save(record);
            System.out.println("Updated record ID: " + record.getBorrowId() + " with fine: " + fine);
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
