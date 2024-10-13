package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<BookDto> getAllBooks();

    BookDto getBookById(int id);

    BookDto addNewBook(BookDto bookDto);

    String deleteBook(int id);

    Long countBook();
}
