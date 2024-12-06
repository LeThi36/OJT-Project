package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.dto.BorrowRecordDto;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.BorrowRecordRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.BorrowRecordService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class BorrowRecordImpl implements BorrowRecordService {

    private BorrowRecordRepository borrowRecordRepository;
    private ModelMapper modelMapper;
    private BookRepository bookRepository;
    private UserRepository userRepository;

    @Override
    public BorrowRecordDto addBorrowRecord(BorrowRecordDto borrowRecordDto) {
        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setBook(bookRepository.findById(borrowRecordDto.getBookId()).orElse(null));
        borrowRecord.setUser(userRepository.findById(borrowRecordDto.getUserId()).orElse(null));
        borrowRecord.setBorrowDate(borrowRecordDto.getBorrowDate());
        borrowRecord.setDueDate(borrowRecordDto.getDueDate());
        borrowRecord.setReturnDate(borrowRecordDto.getReturnDate());
        borrowRecord.setStatus(borrowRecordDto.getStatus());
        borrowRecord.setFine(borrowRecordDto.getFine());
        borrowRecordRepository.save(borrowRecord);
        return modelMapper.map(borrowRecord,BorrowRecordDto.class);
    }

    @Override
    public List<BorrowRecordDetailDto> getAllBorrowRecord(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<BorrowRecord> borrowRecords = borrowRecordRepository.findAllByOrderByBorrowIdDesc(pageable);
        List<BorrowRecord> borrowRecordList = borrowRecords.getContent();
        return borrowRecordList.
                stream().
                map(b -> modelMapper.
                        map(b,BorrowRecordDetailDto.class)).
                collect(Collectors.toList());
    }
}
