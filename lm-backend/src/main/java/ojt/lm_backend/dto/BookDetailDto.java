package ojt.lm_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ojt.lm_backend.LMenum.BookStatus;

import java.sql.Timestamp;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class BookDetailDto {

    private int bookId;
    private String title;
    private String category;
    private String author;
    private String publisher;
    private int publicationYear;
    private int copies;
    private String description;
    private BookStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imageUrl;
}
