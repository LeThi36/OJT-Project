package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;

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
}
