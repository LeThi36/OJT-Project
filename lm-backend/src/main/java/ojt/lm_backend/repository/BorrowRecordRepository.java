package ojt.lm_backend.repository;

import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord,Integer> {
    @Query("SELECT br FROM BorrowRecord br WHERE br.book.bookId = :bookId")
    List<BorrowRecord> findByBookId(@Param("bookId") Integer bookId);

    @Query("SELECT br FROM BorrowRecord br WHERE br.status = :status")
    List<BorrowRecord> findByStatus(BorrowStatus status);

    @Query("SELECT br FROM BorrowRecord br WHERE br.status = 'OVERDUE' AND br.dueDate <= :threeDaysAgo")
    List<BorrowRecord> findOverdueRecordsExceedingThreeDays(LocalDate threeDaysAgo);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.user.userId = :userId AND br.status = :status AND br.fine > 0")
    int countLostBooksWithUnpaidFine(@Param("userId") Long userId, @Param("status") BorrowStatus status);
}
