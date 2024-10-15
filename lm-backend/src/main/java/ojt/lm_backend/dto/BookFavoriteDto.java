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
public class BookFavoriteDto {
    private int favoriteId;
    private int userId;
    private int bookId;
    private Timestamp addedAt;
}
