package ojt.lm_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorDto {
    private Integer authorId;
    private String authorName;
    private List<BookDetailDto> books;
}
