package ojt.lm_backend.repository;

import ojt.lm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsernameOrEmail(String username,String email);
    Boolean existsByUsername(String userName);
    Boolean existsByEmail(String email);
}
