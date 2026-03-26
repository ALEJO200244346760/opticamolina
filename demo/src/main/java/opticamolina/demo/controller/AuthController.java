// Archivo: src/main/java/opticamolina/demo/controller/AuthController.java
package opticamolina.demo.controller;

import opticamolina.demo.dto.JwtResponse;
import opticamolina.demo.dto.LoginRequest;
import opticamolina.demo.model.Role;
import opticamolina.demo.model.User;
import opticamolina.demo.repository.RoleRepository;
import opticamolina.demo.repository.UserRepository;
import opticamolina.demo.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RoleRepository roleRepository;

    // --- REGISTRO DE USUARIOS ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El email ya está registrado.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_CLIENTE")
                .orElseThrow(() -> new RuntimeException("Error: Rol ROLE_CLIENTE no encontrado."));

        user.setRoles(new HashSet<>(Collections.singletonList(userRole)));
        userRepository.save(user);

        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }

    // --- LOGIN CORREGIDO ---
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        // 1. Autenticamos
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // 2. Establecemos el contexto
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Obtenemos los roles PRIMERO
        List<String> roles = authentication.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // 4. Generamos el Token pasándole los dos datos que ahora pide JwtUtils
        String jwt = jwtUtils.generateJwtToken(loginRequest.getEmail(), roles);

        // Devolvemos el JSON de respuesta
        return ResponseEntity.ok(new JwtResponse(jwt, loginRequest.getEmail(), roles));
    }
}