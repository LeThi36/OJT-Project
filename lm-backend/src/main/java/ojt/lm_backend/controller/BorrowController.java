package ojt.lm_backend.controller;


import lombok.RequiredArgsConstructor;
import ojt.lm_backend.dto.request.BorrowRequest;
import ojt.lm_backend.dto.response.BorrowResponse;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
public class BorrowController {
    @Autowired
    private final BorrowService borrowService;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    // tạo bản ghi borrow
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/create")
    public BorrowResponse createBorrowRecord(@RequestBody BorrowRequest request) {
        return borrowService.createBorrowRecord(request);
    }

    //xem lịch sử order borrow của người đó
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/history/{userId}")
    public List<BorrowResponse> getBorrowHistory(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return borrowService.getBorrowHistory(user);
    }


//    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
//    @PutMapping("/update/{borrowId}")
//    public BorrowResponse updateBorrowRecord(@PathVariable Integer borrowId, @RequestBody LocalDate returnDate) {
//        return borrowService.updateBorrowRecord(borrowId, returnDate);
//    }
    //admin update thông tin record borrow
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/admin/update/{borrowId}")
    public ResponseEntity<BorrowResponse> adminUpdateBorrowRecord(
            @PathVariable Integer borrowId,
            @RequestBody BorrowRequest request) {
        try {
            BorrowResponse updatedBorrowRecord = borrowService.adminUpdateBorrowRecord(borrowId, request);
            return ResponseEntity.ok(updatedBorrowRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    // update status borrow vd:/update-status/1?newStatus=RETURNED
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/update-status/{borrowId}")
    public ResponseEntity<BorrowResponse> updateBorrowStatus(
            @PathVariable Integer borrowId,
            @RequestParam String newStatus) {
        try {
            BorrowResponse updatedBorrowRecord = borrowService.updateBorrowStatus(borrowId, newStatus);
            return ResponseEntity.ok(updatedBorrowRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/delete/{borrowId}")
    public void deleteBorrowRecord(@PathVariable Integer borrowId) {
        borrowService.deleteBorrowRecord(borrowId);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/approve/{borrowId}")
    public BorrowResponse approveBorrowRequest(@PathVariable Integer borrowId) {
        return borrowService.approveBorrowRequest(borrowId);
    }

    // gọi khi ng dùng đã trả sách
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/return/{borrowId}")
    public ResponseEntity<BorrowResponse> reverseBorrowRequest(@PathVariable Integer borrowId) {
        try {
            BorrowResponse updatedBorrowRecord = borrowService.ReturnedBorrow(borrowId);
            return ResponseEntity.ok(updatedBorrowRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
    //test update tiền phạt
    @PostMapping("/update1")
    public ResponseEntity<String> updateFines() {
        try {
            borrowService.updateFines(); // Gọi hàm updateFines từ Service
            return ResponseEntity.ok("Fines updated successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update fines: " + e.getMessage());
        }
    }

}
