package ojt.lm_backend.service;

import ojt.lm_backend.dto.BookReviewDto;

import java.util.List;

public interface BookReviewService {
    List<BookReviewDto> bookReviewDtoList();
    List<BookReviewDto> getBookReviewByBookId(int id);
}
