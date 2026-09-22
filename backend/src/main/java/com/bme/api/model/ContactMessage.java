package com.bme.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;
    public String email;
    public String phone;
    public String subject;

    @Column(length = 3000)
    public String message;

    public LocalDateTime createdAt = LocalDateTime.now();

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public String getSubject() {
        return subject;
    }
}