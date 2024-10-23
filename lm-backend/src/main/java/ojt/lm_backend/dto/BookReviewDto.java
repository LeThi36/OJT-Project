package ojt.lm_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookReviewDto {
    private Long reviewId;
    private UserDto user;
    private BookDto book;
    private int rating;
    private String reviewText;
    private Timestamp reviewDate;
}
