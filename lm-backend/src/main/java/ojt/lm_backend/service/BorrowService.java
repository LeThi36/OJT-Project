package ojt.lm_backend.service;

import ojt.lm_backend.dto.request.BorrowRequest;
import ojt.lm_backend.dto.response.BorrowResponse;
import ojt.lm_backend.entity.BorrowRecord;

import java.util.List;

public interface BorrowService {
    BorrowResponse createBorrowRecord(BorrowRequest request);
    List<BorrowResponse> getAllBorrowRecords();
    BorrowResponse getBorrowRecordById(Integer borrowId);
    BorrowResponse updateBorrowRecord(Integer borrowId, BorrowRequest request);
    void deleteBorrowRecord(Integer borrowId);
}
