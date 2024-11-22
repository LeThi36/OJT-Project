package ojt.lm_backend.repository;

import ojt.lm_backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query("SELECT b FROM Book b " +
            "WHERE (:categoryId IS NULL OR b.category.categoryId = :categoryId) " +
            "AND (:authorId IS NULL OR b.author.authorId = :authorId) " +
            "AND (:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Book> searchBooks(
            @Param("categoryId") Integer categoryId,
            @Param("authorId") Integer authorId,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("SELECT b FROM Book b WHERE b.category.categoryId = :categoryId")
    List<Book> findBookByCategoryId(@Param("categoryId") int id);

    @Query("SELECT b From Book b WHERE b.author.authorId = :authorId")
    List<Book> findBookByAuthorId(@Param("authorId") int id);
}
