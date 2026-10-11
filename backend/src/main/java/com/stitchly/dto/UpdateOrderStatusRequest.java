package com.stitchly.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateOrderStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    private String trackingNumber;
    private String designerNotes;

    public UpdateOrderStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getDesignerNotes() {
        return designerNotes;
    }

    public void setDesignerNotes(String designerNotes) {
        this.designerNotes = designerNotes;
    }
}
