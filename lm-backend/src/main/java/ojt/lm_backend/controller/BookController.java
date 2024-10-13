package ojt.lm_backend.controller;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.service.BookService;
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

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<BookDto>> getAllBook() {
        List<BookDto> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> findBookById(@PathVariable int id) {
        BookDto book = bookService.getBookById(id);
        if (book == null) {
            return new ResponseEntity<>("book not found", HttpStatus.OK);
        } else {
            return new ResponseEntity<BookDto>(book, HttpStatus.OK);
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
}
