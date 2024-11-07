package ojt.lm_backend.repository;

import ojt.lm_backend.LMenum.BookStatus;
import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
}
