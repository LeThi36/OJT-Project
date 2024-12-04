package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookReviewDto;
import ojt.lm_backend.dto.BookReviewRequestDto;
import ojt.lm_backend.service.BookReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/review")
@CrossOrigin("*")
public class BookReviewController {
    private BookReviewService bookReviewService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookReviewDto>> getAllBookReview() {
        return new ResponseEntity<>(bookReviewService.bookReviewDtoList(), HttpStatus.OK);
    }

    @GetMapping("/book/{id}")
    public ResponseEntity<List<BookReviewDto>> getBookReviewByBookId(@PathVariable int id,
                                                                     @RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                                                                     @RequestParam(value = "pageSize",defaultValue = "1",required = false) int pageSize) {
        return new ResponseEntity<>(bookReviewService.getBookReviewByBookId(id,pageNo,pageSize), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<BookReviewRequestDto> postBookReview(@RequestBody BookReviewRequestDto bookReviewRequestDto){
        return new ResponseEntity<>(bookReviewService.postBookReview(bookReviewRequestDto),HttpStatus.OK);
    }

    @GetMapping("/count/{id}")
    public ResponseEntity<Long> countReviewByBookId(@PathVariable int id){
        return new ResponseEntity<>(bookReviewService.countReview(id),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<String> deleteBookReview(@PathVariable int id){
        return new ResponseEntity<>(bookReviewService.deleteReview(id),HttpStatus.OK);
    }
}
