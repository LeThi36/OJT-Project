package ojt.lm_backend.repository;

import ojt.lm_backend.entity.BookFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookFavoriteRepository extends JpaRepository<BookFavorite,Integer> {
    @Query("SELECT bf FROM BookFavorite bf WHERE bf.book.bookId = :bookId")
    List<BookFavorite> findByBookId(@Param("bookId") int bookId);
}
