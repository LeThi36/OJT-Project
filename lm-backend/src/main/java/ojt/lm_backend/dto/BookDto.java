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
public class BookDto {
    private Integer bookId;
    private String title;
    private String categoryName;
    private String authorName;
    private Integer publicationYear;
    private Integer copies;
    private Integer availableCopies;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
