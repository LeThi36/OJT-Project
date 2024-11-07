package ojt.lm_backend.service.impl;

import lombok.AllArgsConstructor;
import ojt.lm_backend.dto.BookReviewDto;
import ojt.lm_backend.entity.BookReview;
import ojt.lm_backend.repository.BookReviewRepository;
import ojt.lm_backend.service.BookReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {

    private BookReviewRepository bookReviewRepository;

    private ModelMapper modelMapper;

    @Override
    public List<BookReviewDto> bookReviewDtoList() {
        List<BookReview> bookReviewList = bookReviewRepository.findAll();
        return bookReviewList.stream().map(bookReview -> modelMapper.map(bookReview, BookReviewDto.class)).toList();
    }

    @Override
    public List<BookReviewDto> getBookReviewByBookId(int id) {
        List<BookReview> bookReviewList = bookReviewRepository.findByBookId(id);
        return bookReviewList.stream().map(bookReview -> modelMapper.map(bookReview,BookReviewDto.class)).toList();
    }
}
