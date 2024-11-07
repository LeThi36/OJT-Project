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


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/create")
    public BorrowResponse createBorrowRecord(@RequestBody BorrowRequest request) {
        return borrowService.createBorrowRecord(request);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/history/{userId}")
    public List<BorrowResponse> getBorrowHistory(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return borrowService.getBorrowHistory(user);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update/{borrowId}")
    public BorrowResponse updateBorrowRecord(@PathVariable Integer borrowId, @RequestBody LocalDate returnDate) {
        return borrowService.updateBorrowRecord(borrowId, returnDate);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/admin/update/{borrowId}")
    public BorrowResponse adminUpdateBorrowRecord(@PathVariable Integer borrowId, @RequestBody BorrowRequest request) {
        return borrowService.adminUpdateBorrowRecord(borrowId, request);
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/delete/{borrowId}")
    public void deleteBorrowRecord(@PathVariable Integer borrowId) {
        borrowService.deleteBorrowRecord(borrowId);
    }


}
