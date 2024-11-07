package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.service.BookService;
import ojt.lm_backend.service.LostBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/book")
@CrossOrigin("*")
public class BookController {

    private BookService bookService;
    private LostBookService lostBookService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<BookDetailDto>> getAllBook() {
        List<BookDetailDto> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> findBookById(@PathVariable int id) {
        BookDetailDto book = bookService.getBookById(id);
        if (book == null) {
            return new ResponseEntity<>("book not found", HttpStatus.OK);
        } else {
            return new ResponseEntity<BookDetailDto>(book, HttpStatus.OK);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookDto> addNewBook(@RequestBody BookDto bookDto){
        BookDto bookDto1 = bookService.addNewBook(bookDto);
        return new ResponseEntity<>(bookDto1,HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBookById(@PathVariable int id){
        String message = bookService.deleteBook(id);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @GetMapping("/count")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Long> countBook(){
        Long count = bookService.countBook();
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookDto> updateBook(@RequestBody BookDto bookDto,
                                              @PathVariable int id) {
        BookDto bookDto1 = bookService.updateBook(id, bookDto);
        return new ResponseEntity<>(bookDto1, HttpStatus.OK);
    }

    @GetMapping("/lostBook")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecordDetailDto>> getLostBooks() {
        List<BorrowRecordDetailDto> lostBooks = lostBookService.getLostBooks();
        return new ResponseEntity<>(lostBooks,HttpStatus.OK);
    }

    @GetMapping("/updateOverdueToLost")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecordDetailDto>> updateOverdueToLost() {
        List<BorrowRecordDetailDto> updateOverDueToLost = lostBookService.updateOverDueToLost();
        return new ResponseEntity<>(updateOverDueToLost,HttpStatus.OK);
    }
}
