package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.exception.LMAPIException;
import ojt.lm_backend.repository.AuthorRepository;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.CategoryRepository;
import ojt.lm_backend.repository.PublisherRepository;
import ojt.lm_backend.service.BookService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    private AuthorRepository authorRepository;
    private CategoryRepository categoryRepository;
    private PublisherRepository publisherRepository;

    private ModelMapper modelMapper;

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream().map(b -> modelMapper.map(b, BookDto.class)).collect(Collectors.toList());
    }

    @Override
    public BookDto getBookById(int id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return null;
        }
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public BookDto addNewBook(BookDto bookDto) {
        Book book = new Book();
        book.setTitle(bookDto.getTitle());
        book.setCategory(categoryRepository
                .findById(bookDto
                        .getCategoryId())
                .orElseThrow(() -> new LMAPIException(HttpStatus.BAD_REQUEST, "can not find this category")));
        book.setAuthor(authorRepository
                .findById(bookDto
                        .getAuthorId())
                .orElseThrow(() -> new LMAPIException(HttpStatus.BAD_REQUEST, "can not find this category")));
        book.setPublisher(publisherRepository
                .findById(bookDto
                        .getPublisherId())
                .orElseThrow(() -> new LMAPIException(HttpStatus.BAD_REQUEST, "can not find this category")));
        book.setPublicationYear(bookDto.getPublicationYear());
        book.setCopies(bookDto.getCopies());
        book.setAvailableCopies(bookDto.getAvailableCopies());
        book.setStatus(bookDto.getStatus());
        book.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        book.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Book savedBook = bookRepository.save(book);
        return modelMapper.map(savedBook, BookDto.class);
    }

    @Override
    public String deleteBook(int id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return "can not find this book to delete";
        } else {
            bookRepository.deleteById(id);
            return "deleted successfully";
        }
    }

    @Override
    public Long countBook() {
        return bookRepository.count();
    }

}
