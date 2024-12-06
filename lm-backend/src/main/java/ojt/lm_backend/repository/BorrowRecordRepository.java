package ojt.lm_backend.repository;

import ojt.lm_backend.LMenum.BorrowStatus;
import ojt.lm_backend.entity.BorrowRecord;
import ojt.lm_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord,Integer> {
    @Query("SELECT br FROM BorrowRecord br WHERE br.book.bookId = :bookId")
    List<BorrowRecord> findByBookId(@Param("bookId") Integer bookId);
    List<BorrowRecord> findByUser(User user);

    @Query("SELECT br FROM BorrowRecord br WHERE br.status = :status")
    List<BorrowRecord> findByStatus(BorrowStatus status);

    @Query("SELECT br FROM BorrowRecord br WHERE br.status = 'OVERDUE' AND br.dueDate <= :threeDaysAgo")
    List<BorrowRecord> findOverdueRecordsExceedingThreeDays(LocalDate threeDaysAgo);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.user.userId = :userId AND br.status = :status AND br.fine > 0")
    int countLostBooksWithUnpaidFine(@Param("userId") Long userId, @Param("status") BorrowStatus status);

    @Query("SELECT b FROM BorrowRecord b WHERE b.status = :status")
    List<BorrowRecord> findByStatusA(@Param("status") BorrowStatus status);

    @Query("SELECT b FROM BorrowRecord b WHERE b.dueDate = :threeDaysLater AND b.status = 'BORROWED'")
    List<BorrowRecord> findDueSoon(@Param("threeDaysLater") LocalDate threeDaysLater);

    @Query("SELECT b FROM BorrowRecord b WHERE b.dueDate < :today AND b.status = 'BORROWED'")
    List<BorrowRecord> findOverdue(@Param("today") LocalDate today);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.status = :status")
    Long countByStatus(@Param("status") BorrowStatus borrowStatus);

    @Query("SELECT COUNT(c.id) " +
            "FROM BorrowRecord br " +
            "JOIN br.book b " +
            "JOIN b.category c " +
            "GROUP BY c.id " +
            "ORDER BY c.id ASC")
    List<Long> findCategoryBorrowCount();

    Page<BorrowRecord> findAllByOrderByBorrowIdDesc(Pageable pageable);
}
