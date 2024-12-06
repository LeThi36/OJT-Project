package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.dto.BorrowRecordDto;
import ojt.lm_backend.service.BorrowRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/borrow")
public class BorrowRecordController {
    private BorrowRecordService borrowRecordService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<BorrowRecordDto> addNewBorrowRecord(@RequestBody BorrowRecordDto borrowRecordDto){
        return new ResponseEntity<>(borrowRecordService.addBorrowRecord(borrowRecordDto), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecordDetailDto>> getAllBorrowRecord(@RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                                                                          @RequestParam(value = "pageSize",defaultValue = "100",required = false) int pageSize){
        return new ResponseEntity<>(borrowRecordService.getAllBorrowRecord(pageNo,pageSize),HttpStatus.OK);
    }
}
