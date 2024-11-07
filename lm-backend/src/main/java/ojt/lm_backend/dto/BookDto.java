package ojt.lm_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ojt.lm_backend.LMenum.BookStatus;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private String title;
    private int categoryId;
    private int authorId;
    private int publisherId;
    private int publicationYear;
    private int copies;
    private String description;
    private BookStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imageUrl;
}
