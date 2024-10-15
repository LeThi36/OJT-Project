package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<BookDetailDto> getAllBooks();

    BookDetailDto getBookById(int id);

    BookDto addNewBook(BookDto bookDto);

    String deleteBook(int id);

    Long countBook();
}
