package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.AuthorDto;
import ojt.lm_backend.entity.Author;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BookReview;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.AuthorRepository;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.BookReviewRepository;
import ojt.lm_backend.repository.BorrowRecordRepository;
import ojt.lm_backend.service.AuthorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;
    private BookRepository bookRepository;
    private BookReviewRepository bookReviewRepository;
    private BorrowRecordRepository borrowRecordRepository;
    private ModelMapper modelMapper;

    @Override
    public List<AuthorDto> getAllAuthor(int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Author> authors =  authorRepository.findAll(pageable);
        List<Author> authors1 = authors.getContent();
        return authors1.stream().map(a -> modelMapper.map(a,AuthorDto.class)).collect(Collectors.toList());
    }

    @Override
    public Long countAuthor() {
        return authorRepository.count();
    }

    @Override
    public AuthorDto addAuthor(AuthorDto authorDto) {
        Author author = new Author();
        author.setAuthorName(authorDto.getAuthorName());
        authorRepository.save(author);
        return modelMapper.map(author,AuthorDto.class);
    }

    @Override
    public String deleteAuthor(int id) {
        Author author = authorRepository.findById(id).orElseThrow(() -> {throw new ResourceNotFoundException("author not found");
        });
        List<Book> books = bookRepository.findBookByAuthorId(id);
        if(!books.isEmpty()){
            for (Book b : books){
                List<BookReview> bookReview = bookReviewRepository.findByBookId(b.getBookId());
                if(!bookReview.isEmpty()){
                    bookReviewRepository.deleteAll(bookReview);
                }
                List<BorrowRecord> borrowRecords = borrowRecordRepository.findByBookId(b.getBookId());
                if(!borrowRecords.isEmpty()){
                    borrowRecordRepository.deleteAll(borrowRecords);
                }
            }
            bookRepository.deleteAll(books);
        }
        authorRepository.delete(author);
        return "author deleted successfully";
    }

    @Override
    public AuthorDto updateAuthor(AuthorDto authorDto,int id) {
        Author author = authorRepository.findById(id).orElse(null);
        if(author == null){
            return null;
        }
        author.setAuthorName(authorDto.getAuthorName());
        return modelMapper.map(author,AuthorDto.class);
    }

    @Override
    public AuthorDto getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElse(null);
        return modelMapper.map(author,AuthorDto.class);
    }
}
