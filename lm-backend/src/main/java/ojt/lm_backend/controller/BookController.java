package ojt.lm_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/book")
@CrossOrigin("*")
public class BookController {

    private BookService bookService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<BookDetailDto>> getAllBook(@RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                                                          @RequestParam(value = "pageSize",defaultValue = "10",required = false) int pageSize) {
        List<BookDetailDto> books = bookService.getAllBooks(pageNo,pageSize);
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
    public ResponseEntity<BookDto> addNewBook(@RequestParam("bookDto") String bookDtoJson,
                                              @RequestParam("image") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Parse bookDtoJson thành đối tượng BookDto
        ObjectMapper objectMapper = new ObjectMapper();
        BookDto bookDto = objectMapper.readValue(bookDtoJson, BookDto.class);

        // Xử lý file upload
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        BookDto savedBookDto = bookService.addNewBook(bookDto, tempFile);
        return new ResponseEntity<>(savedBookDto, HttpStatus.OK);
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
                                              @PathVariable int id){
        BookDto bookDto1 = bookService.updateBook(id, bookDto);
        return new ResponseEntity<>(bookDto1,HttpStatus.OK);
    }
}
