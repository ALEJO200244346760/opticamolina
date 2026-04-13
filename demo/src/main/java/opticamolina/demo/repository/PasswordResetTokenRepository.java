package opticamolina.demo.repository;

import opticamolina.demo.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(opticamolina.demo.model.User user); // Para limpiar tokens viejos
}