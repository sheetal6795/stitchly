package com.stitchly.controller;

import com.stitchly.dto.AiConsultationRequest;
import com.stitchly.dto.AiConsultationResponse;
import com.stitchly.dto.ApiResponse;
import com.stitchly.service.AiAssistantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    public AiAssistantController(AiAssistantService aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }

    @PostMapping("/consult")
    public ResponseEntity<ApiResponse<AiConsultationResponse>> consultDesign(
            @Valid @RequestBody AiConsultationRequest req) {
        AiConsultationResponse response = aiAssistantService.analyzeDesign(req);
        return ResponseEntity.ok(ApiResponse.ok("AI fashion consultation completed", response));
    }
}
