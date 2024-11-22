package ojt.lm_backend.service;

import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.entity.BorrowRecord;

import java.util.List;
import java.util.Optional;

public interface LostBookService {
    List<BorrowRecordDetailDto> getLostBooks();
    List<BorrowRecordDetailDto> updateOverDueToLost();
    Optional<BorrowRecord> markBookAsLost(int bookId);
    boolean canUserBorrow(Long userId);
}
