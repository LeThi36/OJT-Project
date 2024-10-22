package ojt.lm_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BorrowResponse {
    private Integer borrowId;
    private Integer userId;
    private Integer bookId;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BorrowStatus status;
    private BigDecimal fine;
}
