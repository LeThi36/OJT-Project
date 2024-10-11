package ojt.lm_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ojt.lm_backend.LMenum.ReservationStatus;

import java.time.LocalDate;

@Entity
@Table(name = "book_reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "reservation_date")
    private LocalDate reservationDate;

    @Column(name = "status", nullable = false, columnDefinition = "ENUM('reserved', 'cancelled') DEFAULT 'reserved'")
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;
}
