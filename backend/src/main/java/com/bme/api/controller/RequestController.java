package com.bme.api.controller;

import com.bme.api.model.*;
import com.bme.api.repository.*;
import com.bme.api.service.EmailService;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RequestController {
    private final BookingRepository b;
    private final ContactMessageRepository m;
    private final EmailService emailService;

    public RequestController(
            BookingRepository b,
            ContactMessageRepository m,
            EmailService emailService) {
        this.b = b;
        this.m = m;
        this.emailService = emailService;
    }

    @PostMapping("/bookings")
    public Booking booking(@RequestBody Booking x) {
        return b.save(x);
    }

    @PostMapping("/contact")
    public ContactMessage contact(@RequestBody ContactMessage x) {

        emailService.sendContactEmail(
                x.getName(),
                x.getEmail(),
                x.getSubject(),
                x.getMessage());

        return m.save(x);
    }

    @GetMapping("/admin/bookings")
    public List<Booking> bookings() {
        return b.findAll();
    }

    @GetMapping("/admin/messages")
    public List<ContactMessage> messages() {
        return m.findAll();
    }
}