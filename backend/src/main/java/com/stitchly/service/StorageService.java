package com.stitchly.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${stitchly.storage.local-dir:./uploads}")
    private String uploadDir;

    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            Path targetLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!Files.exists(targetLocation)) {
                Files.createDirectories(targetLocation);
            }

            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg");
            String extension = "";
            int i = originalFilename.lastIndexOf('.');
            if (i > 0) {
                extension = originalFilename.substring(i);
            }

            String newFilename = UUID.randomUUID().toString() + extension;
            Path filePath = targetLocation.resolve(newFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Returns relative static path served by Spring MVC
            return "/uploads/" + newFilename;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file: " + ex.getMessage(), ex);
        }
    }

    /**
     * Helper to normalize image URL (whether external Unsplash/Cloudinary or local upload)
     */
    public String resolveImageUrl(String inputUrl, String defaultFallback) {
        if (inputUrl != null && !inputUrl.trim().isEmpty()) {
            return inputUrl.trim();
        }
        return defaultFallback;
    }
}
