package pro.olimpus.cookBook.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.olimpus.cookBook.domain.Receipt;

public interface ReceiptRepo extends JpaRepository<Receipt, Long> {
}
