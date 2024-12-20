package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookDetailDto;
import ojt.lm_backend.dto.BookDto;
import ojt.lm_backend.entity.*;
import ojt.lm_backend.exception.LMAPIException;
import ojt.lm_backend.repository.*;
import ojt.lm_backend.service.BookService;
import ojt.lm_backend.service.ImageUploadService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.File;
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
    private BookReservationRepository bookReservationRepository;
    private BookReviewRepository bookReviewRepository;
    private BorrowRecordRepository borrowRecordRepository;
    private ImageUploadService imageUploadService;

    private ModelMapper modelMapper;

    @Override
    public List<BookDetailDto> getAllBooks(int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> books = bookRepository.findAllByOrderByCreatedAtDesc(pageable);
        List<Book> books1 = books.getContent();
        return books1.stream().map(b -> modelMapper.map(b, BookDetailDto.class)).collect(Collectors.toList());
    }

    @Override
    public BookDetailDto getBookById(int id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return null;
        }
        return modelMapper.map(book, BookDetailDto.class);
    }

    @Override
    public BookDto addNewBook(BookDto bookDto, File file) {
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
        book.setDescription(bookDto.getDescription());
        book.setStatus(bookDto.getStatus());
        book.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        book.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        book.setImageUrl(imageUploadService.bookImageUrl(file));
        Book savedBook = bookRepository.save(book);
        return modelMapper.map(savedBook, BookDto.class);
    }

    @Override
    public String deleteBook(int id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return "can not find this book to delete";
        } else {
            List<BookReservation> bookReservations = bookReservationRepository.findByBookId(id);
            if (!bookReservations.isEmpty()) {
                bookReservationRepository.deleteAll(bookReservations);
            }
            List<BookReview> bookReview = bookReviewRepository.findByBookId(id);
            if (!bookReview.isEmpty()) {
                bookReviewRepository.deleteAll(bookReview);
            }
            List<BorrowRecord> borrowRecords = borrowRecordRepository.findByBookId(id);
            if (!borrowRecords.isEmpty()) {
                borrowRecordRepository.deleteAll(borrowRecords);
            }
            bookRepository.deleteById(id);
            return "deleted successfully";
        }
    }

    @Override
    public Long countBook() {
        return bookRepository.count();
    }

    @Override
    public BookDto updateBook(int id, BookDto bookDto) {
        Book book = bookRepository.findById(id).orElse(null);
        if(book != null) {
            book.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            book.setAuthor(authorRepository.findById(bookDto.getAuthorId()).orElse(null));
            book.setStatus(bookDto.getStatus());
            book.setTitle(bookDto.getTitle());
            book.setCopies(bookDto.getCopies());
            book.setCategory(categoryRepository.findById(bookDto.getCategoryId()).orElse(null));
            book.setPublisher(publisherRepository.findById(bookDto.getPublisherId()).orElse(null));
            book.setPublicationYear(bookDto.getPublicationYear());
            book.setDescription(bookDto.getDescription());
            bookRepository.save(book);
            return modelMapper.map(book,BookDto.class);
        }
        return null;
    }

    @Override
    public List<BookDetailDto> searchBook(int pageNo, int pageSize, Integer authorId, Integer categoryId, String content) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        List<Book> books = bookRepository.searchBooks(categoryId,authorId,content,pageable).getContent();
        return books.stream().map(b -> modelMapper.map(b,BookDetailDto.class)).toList();
    }

}
