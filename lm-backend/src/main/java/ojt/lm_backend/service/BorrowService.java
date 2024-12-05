package ojt.lm_backend.service;

import ojt.lm_backend.dto.request.BorrowRequest;
import ojt.lm_backend.dto.request.MultipleBorrowRequest;
import ojt.lm_backend.dto.response.BorrowResponse;
import ojt.lm_backend.dto.response.MultipleBorrowResponse;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface BorrowService {
    BorrowResponse createBorrowRecord(BorrowRequest request);
    List<BorrowResponse> getAllBorrowRecords();
    List<BorrowResponse> getBorrowHistory(User user);
    BorrowResponse getBorrowRecordById(Integer borrowId);
    BorrowResponse updateBorrowRecord(Integer borrowId, LocalDate returnDate);
    BorrowResponse adminUpdateBorrowRecord(Integer borrowId, BorrowRequest request);
    BorrowResponse approveBorrowRequest(Integer borrowId);
    BorrowResponse updateBorrowStatus(Integer borrowId, String newStatus);
    BorrowResponse ReturnedBorrow(Integer borrowId);
    void deleteBorrowRecord(Integer borrowId);
    void updateFines();
    MultipleBorrowResponse createMultipleBorrows(MultipleBorrowRequest multipleBorrowRequest);
    BorrowResponse returnAllBooks(Integer borrowId);
    long countBorrowRecord();
    long inCommingBorrowRecord();
    List<Long> borrowCountByCategory();
}
