package ojt.lm_backend.repository;

import ojt.lm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String userName);

    Boolean existsByEmail(String email);

    List<User> findByUsernameContaining(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.username LIKE %:username% OR u.email LIKE %:email%")
    List<User> findByContent(@Param("username") String username, @Param("email") String email);

}
