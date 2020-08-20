package pro.olimpus.cookBook.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.olimpus.cookBook.domain.User;

public interface UserDetailsRepo extends JpaRepository<User, String> {
}
