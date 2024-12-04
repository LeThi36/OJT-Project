package ojt.lm_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MultipleBorrowRequest {
    private Long userId;
    private List<BookBorrowRequest> books;



    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Data
    public static class BookBorrowRequest {
        private Integer bookId;
        private LocalDate borrowDate;  // Thêm ngày mượn cho từng sách
        private int borrowDurationDays;
    }
}
