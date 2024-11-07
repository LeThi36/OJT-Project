package ojt.lm_backend.service;

import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.dto.BorrowRecordDto;

import java.util.List;

public interface BorrowRecordService {
    BorrowRecordDto addBorrowRecord(BorrowRecordDto borrowRecordDto);
    List<BorrowRecordDetailDto> getAllBorrowRecord();
}
