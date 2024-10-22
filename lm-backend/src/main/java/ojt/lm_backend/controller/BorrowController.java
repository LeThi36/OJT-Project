package ojt.lm_backend.controller;


import ojt.lm_backend.dto.request.BorrowRequest;
import ojt.lm_backend.dto.response.BorrowResponse;
import ojt.lm_backend.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
public class BorrowController {
    @Autowired
    private BorrowService borrowService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BorrowResponse> createBorrowRecord(@RequestBody BorrowRequest request) {
        BorrowResponse response = borrowService.createBorrowRecord(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<BorrowResponse>> getAllBorrowRecords() {
        List<BorrowResponse> responses = borrowService.getAllBorrowRecords();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{borrowId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<BorrowResponse> getBorrowRecordById(@PathVariable Integer borrowId) {
        BorrowResponse response = borrowService.getBorrowRecordById(borrowId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{borrowId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BorrowResponse> updateBorrowRecord(@PathVariable Integer borrowId, @RequestBody BorrowRequest request) {
        BorrowResponse response = borrowService.updateBorrowRecord(borrowId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{borrowId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBorrowRecord(@PathVariable Integer borrowId) {
        borrowService.deleteBorrowRecord(borrowId);
        return ResponseEntity.noContent().build();
    }
}
