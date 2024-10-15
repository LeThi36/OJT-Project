package ojt.lm_backend.repository;

import ojt.lm_backend.entity.Book;
import ojt.lm_backend.entity.BookReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookReservationRepository extends JpaRepository<BookReservation,Integer> {
    @Query("SELECT br FROM BookReservation br WHERE br.book.bookId = :bookId")
    List<BookReservation> findByBookId(@Param("bookId") int bookId);
}
