package com.bme.api;

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

            if (adminRepository.findByEmail(adminEmail).isEmpty()) {

                Admin admin = new Admin(
                        adminEmail,
                        passwordEncoder.encode(adminPassword));

                adminRepository.save(admin);

                System.out.println("Admin account created.");
            }
        };
    }
}