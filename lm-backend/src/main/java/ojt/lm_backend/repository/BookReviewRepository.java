package ojt.lm_backend.repository;

import ojt.lm_backend.entity.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview,Integer> {
    @Query("SELECT br FROM BookReview br WHERE br.book.bookId = :bookId")
    List<BookReview> findByBookId(@Param("bookId") Integer bookId);
}
