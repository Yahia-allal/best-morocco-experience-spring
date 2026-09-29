package com.bme.api.initializer;

import com.bme.api.model.Admin;
import com.bme.api.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            BCryptPasswordEncoder passwordEncoder,
            @Value("${app.admin.email}") String adminEmail,
            @Value("${app.admin.password}") String adminPassword) {

        return args -> {

            Admin admin = adminRepository
                    .findByEmail(adminEmail)
                    .orElse(null);

            if (admin == null) {
                admin = new Admin(
                        adminEmail,
                        passwordEncoder.encode(adminPassword));

                adminRepository.save(admin);
                System.out.println("Admin account created.");
                return;
            }

            // Keep the database password synchronized with ADMIN_PASSWORD
            if (!passwordEncoder.matches(adminPassword, admin.getPassword())) {
                admin.setPassword(passwordEncoder.encode(adminPassword));
                adminRepository.save(admin);

                System.out.println("Admin password updated.");
            }
        };
    }
}