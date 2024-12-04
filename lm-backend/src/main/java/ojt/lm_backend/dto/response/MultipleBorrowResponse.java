package ojt.lm_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ojt.lm_backend.LMenum.BorrowStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MultipleBorrowResponse {
    private Long userId;
    private List<BorrowResponse> borrows;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Data
    public static class BorrowResponse {
        private Integer borrowId;
        private Integer bookId;
        private LocalDate borrowDate;     // Trả về ngày mượn
        private LocalDate dueDate;        // Trả về ngày hết hạn
        private BorrowStatus status;
        private BigDecimal fine;
    }
}