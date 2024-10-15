package ojt.lm_backend.repository;

import ojt.lm_backend.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord,Integer> {
    @Query("SELECT br FROM BorrowRecord br WHERE br.book.bookId = :bookId")
    List<BorrowRecord> findByBookId(@Param("bookId") Integer bookId);
}
