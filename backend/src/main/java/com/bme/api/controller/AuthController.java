package com.bme.api.controller;

import com.bme.api.JwtService;
import com.bme.api.model.Admin;
import com.bme.api.repository.AdminRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            AdminRepository adminRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<Admin> adminOptional = adminRepository.findByEmail(email);

        if (adminOptional.isPresent()) {

            Admin admin = adminOptional.get();

            if (passwordEncoder.matches(password, admin.getPassword())) {

                String token = jwtService.generateToken(admin.getEmail());

                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "token", token,
                                "message", "Login successful"));
            }
        }

        return ResponseEntity.status(401).body(
                Map.of(
                        "success", false,
                        "message", "Invalid email or password"));
    }
}