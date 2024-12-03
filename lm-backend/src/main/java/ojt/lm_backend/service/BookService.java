package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.dto.UserDto;

import java.io.File;
import java.util.List;
import java.util.Optional;

public interface BookService {
    List<BookDetailDto> getAllBooks(int pageNo, int pageSize);

    BookDetailDto getBookById(int id);

    BookDto addNewBook(BookDto bookDto, File file);

    String deleteBook(int id);

    Long countBook();

    BookDto updateBook(int id,BookDto bookDto);

    List<BookDetailDto> searchBook(int pageNo,int pageSize,Integer authorId,Integer categoryId,String content);
}
