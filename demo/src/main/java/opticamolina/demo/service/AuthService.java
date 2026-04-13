// Archivo: src/main/java/opticamolina/demo/services/AuthService.java
package opticamolina.demo.service;

import opticamolina.demo.model.Role;
import opticamolina.demo.model.User;
import opticamolina.demo.model.PasswordResetToken;
import opticamolina.demo.repository.RoleRepository;
import opticamolina.demo.repository.UserRepository;
import opticamolina.demo.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    public String registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            return "Error: El email ya está registrado.";
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        Role userRole = roleRepository.findByName("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Error: El rol no existe."));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        return "Usuario registrado con éxito.";
    }

    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        tokenRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        tokenRepository.save(myToken);

        sendResetEmail(user.getEmail(), token);
    }

    private void sendResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Restablecer Contraseña - Óptica Molina");
        message.setText("Hola,\n\nPara restablecer tu contraseña en Óptica Molina, hacé clic en el siguiente enlace:\n" +
                "https://opticamolina.vercel.app/reset-password?token=" + token + "\n\n" +
                "Este enlace expirará en 15 minutos.");
        mailSender.send(message);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken passToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (passToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("El token ha expirado");
        }

        User user = passToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(passToken);
    }
}