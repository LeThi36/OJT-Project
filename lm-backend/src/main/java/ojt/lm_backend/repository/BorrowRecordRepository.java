package ojt.lm_backend.repository;

import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord,Integer> {
    @Query("SELECT br FROM BorrowRecord br WHERE br.book.bookId = :bookId")
    List<BorrowRecord> findByBookId(@Param("bookId") Integer bookId);
    List<BorrowRecord> findByStatus(BorrowStatus status);
    List<BorrowRecord> findByUser(User user);
}
