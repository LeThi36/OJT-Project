package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookReviewDto;
import ojt.lm_backend.dto.BookReviewRequestDto;

import java.util.List;

public interface BookReviewService {
    List<BookReviewDto> bookReviewDtoList();
    List<BookReviewDto> getBookReviewByBookId(int id,int pageNo,int pageSize);
    BookReviewRequestDto postBookReview(BookReviewRequestDto bookReviewRequestDto);
    Long countReview(int id);
    String deleteReview(int id);
}
