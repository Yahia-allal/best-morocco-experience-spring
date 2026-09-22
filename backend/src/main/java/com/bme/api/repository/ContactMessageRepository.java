package com.bme.api.repository;

import com.bme.api.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}