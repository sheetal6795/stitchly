package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    private final StorageService storageService;

    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = storageService.storeFile(file);
        return ResponseEntity.ok(ApiResponse.ok("File uploaded successfully", Map.of("url", fileUrl)));
    }
}
