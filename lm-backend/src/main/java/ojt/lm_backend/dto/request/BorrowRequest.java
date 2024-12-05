package ojt.lm_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.User;

import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BorrowRequest {
    private Long userId;
    private Integer bookId;
    private LocalDate borrowDate;
    private Integer borrowDurationDays;
}
