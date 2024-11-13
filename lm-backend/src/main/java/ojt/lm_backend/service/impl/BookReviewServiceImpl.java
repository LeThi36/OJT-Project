package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookReviewDto;
import ojt.lm_backend.dto.BookReviewRequestDto;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BookReview;
import ojt.lm_backend.entity.User;
import ojt.lm_backend.exception.ResourceNotFoundException;
import ojt.lm_backend.repository.BookRepository;
import ojt.lm_backend.repository.BookReviewRepository;
import ojt.lm_backend.repository.UserRepository;
import ojt.lm_backend.service.BookReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {

    private BookReviewRepository bookReviewRepository;

    private ModelMapper modelMapper;

    private BookRepository bookRepository;

    private UserRepository userRepository;

    @Override
    public List<BookReviewDto> bookReviewDtoList() {
        List<BookReview> bookReviewList = bookReviewRepository.findAll();
        return bookReviewList.stream().map(bookReview -> modelMapper.map(bookReview, BookReviewDto.class)).toList();
    }

    @Override
    public List<BookReviewDto> getBookReviewByBookId(int id,int pageNo,int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<BookReview> bookReviewList = bookReviewRepository.findByBookId(id,pageable);
        List<BookReview> bookReviews = bookReviewList.getContent();
        return bookReviews.stream().map(bookReview -> modelMapper.map(bookReview,BookReviewDto.class)).toList();
    }

    @Override
    public BookReviewRequestDto postBookReview(BookReviewRequestDto bookReviewRequestDto) {
        BookReview bookReview = new BookReview();
        Book book = bookRepository.findById(bookReviewRequestDto.getBookId()).orElseThrow(() -> {throw new ResourceNotFoundException("book not found");});
        User user = userRepository.findById(bookReviewRequestDto.getUserId()).orElseThrow(() -> {throw new ResourceNotFoundException("user not found");});
        bookReview.setBook(book);
        bookReview.setReviewText(bookReviewRequestDto.getReviewText());
        bookReview.setUser(user);
        bookReview.setRating(bookReviewRequestDto.getRating());
        bookReview.setReviewDate(new Timestamp(System.currentTimeMillis()));
        return modelMapper.map(bookReviewRepository.save(bookReview),BookReviewRequestDto.class);
    }

    @Override
    public Long countReview(int id) {
        return bookReviewRepository.countByBookId(id);
    }
}
