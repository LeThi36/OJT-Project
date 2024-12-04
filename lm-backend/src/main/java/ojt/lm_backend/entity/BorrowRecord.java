package ojt.lm_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import ojt.lm_backend.LMenum.BorrowStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "borrow_records")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BorrowRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrow_id")
    private Integer borrowId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "borrow_date")
    private LocalDate borrowDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "status", nullable = false, columnDefinition = "ENUM('BORROWED', 'RETURNED', 'PENDING_APPROVAL', 'OVERDUE') DEFAULT 'BORROWED'")
    @Enumerated(EnumType.STRING)
    private BorrowStatus status;


    @Column(name = "fine", nullable = false, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal fine;

    @Column(name = "quantity")
    private Integer quantity;
}
