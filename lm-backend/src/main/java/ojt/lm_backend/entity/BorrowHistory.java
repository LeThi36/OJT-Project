package ojt.lm_backend.entity;

import jakarta.persistence.*;
import ojt.lm_backend.LMenum.BorrowStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BorrowHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    @Enumerated(EnumType.STRING)
    private BorrowStatus status;

    private BigDecimal fine;
}
