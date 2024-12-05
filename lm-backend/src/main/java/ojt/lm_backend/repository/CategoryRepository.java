package ojt.lm_backend.repository;

import ojt.lm_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    @Query("SELECT c.categoryName FROM Category c order by c.categoryId asc")
    List<String> findAllCategoryNames();
}
