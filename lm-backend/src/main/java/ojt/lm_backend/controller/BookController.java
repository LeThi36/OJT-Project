package ojt.lm_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.dto.BorrowRecordDetailDto;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.service.BookService;
import ojt.lm_backend.service.ImageUploadService;
import ojt.lm_backend.service.LostBookService;
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
    private ImageUploadService imageUploadService;
    private LostBookService lostBookService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<BookDetailDto>> getAllBook(@RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                                                          @RequestParam(value = "pageSize",defaultValue = "100",required = false) int pageSize) {
        List<BookDetailDto> books = bookService.getAllBooks(pageNo,pageSize);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("{id}")
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

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<BookDetailDto>> searchBook( @RequestParam(required = false) Integer categoryId,
                                                           @RequestParam(required = false) Integer authorId,
                                                           @RequestParam(required = false) String content,
                                                           @RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                                                           @RequestParam(value = "pageSize",defaultValue = "10",required = false) int pageSize){
        return new ResponseEntity<>(bookService.searchBook(pageNo,pageSize,authorId,categoryId,content),HttpStatus.OK);
    }

    @PutMapping("/updateImage/{id}")
    public Object updateBookImage(@RequestParam("image") MultipartFile file,
                                  @PathVariable int id) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);
        String res = imageUploadService.updateBookImageUrl(tempFile,id);
        System.out.println(res);
        return res;
    }
}
