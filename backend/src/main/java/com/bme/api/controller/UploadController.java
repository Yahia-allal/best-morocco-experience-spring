package com.bme.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class UploadController {

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {

        String folder = System.getProperty("user.dir") + "/uploads/tours/";

        File directory = new File(folder);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        File destination = new File(folder + filename);

        file.transferTo(destination);

        return "/uploads/tours/" + filename;
    }
}