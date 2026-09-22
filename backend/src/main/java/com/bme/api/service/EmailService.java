package com.bme.api.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(String name, String email, String subject, String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("yahiaallal7@gmail.com");
        mail.setSubject("New contact: " + subject);

        mail.setText(
                "Name: " + name +
                        "\nEmail: " + email +
                        "\n\nMessage:\n" + message);

        mailSender.send(mail);
    }
}