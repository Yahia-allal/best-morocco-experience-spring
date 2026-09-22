package com.bme.api.repository;

import com.bme.api.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TourRepository extends JpaRepository<Tour, Long> {
    Optional<Tour> findBySlug(String slug);
}