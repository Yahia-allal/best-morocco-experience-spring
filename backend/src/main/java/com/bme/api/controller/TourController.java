package com.bme.api.controller;

import com.bme.api.model.Tour;
import com.bme.api.repository.TourRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TourController {
    private final TourRepository r;

    public TourController(TourRepository r) {
        this.r = r;
    }

    @GetMapping("/tours")
    public List<Tour> all() {
        return r.findAll();
    }

    @GetMapping("/tours/{slug}")
    public Tour one(@PathVariable String slug) {
        return r.findBySlug(slug).orElseThrow();
    }

    @PostMapping("/admin/tours")
    public Tour create(@RequestBody Tour t) {
        t.id = null;
        return r.save(t);
    }

    @PutMapping("/admin/tours/{id}")
    public Tour update(@PathVariable Long id, @RequestBody Tour t) {
        t.id = id;
        return r.save(t);
    }

    @DeleteMapping("/admin/tours/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        System.out.println("DELETE TOUR ID = " + id);

        if (!r.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        r.deleteById(id);

        return ResponseEntity.ok().build();
    }
}