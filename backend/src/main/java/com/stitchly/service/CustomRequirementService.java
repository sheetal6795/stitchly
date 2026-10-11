package com.stitchly.service;

import com.stitchly.dto.CreateRequirementRequest;
import com.stitchly.dto.CustomRequirementDto;
import com.stitchly.entity.CustomRequirement;
import com.stitchly.entity.User;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.CustomRequirementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomRequirementService {

    private final CustomRequirementRepository customRequirementRepository;

    public CustomRequirementService(CustomRequirementRepository customRequirementRepository) {
        this.customRequirementRepository = customRequirementRepository;
    }

    @Transactional
    public CustomRequirementDto createRequirement(User customer, CreateRequirementRequest req) {
        CustomRequirement requirement = new CustomRequirement();
        requirement.setCustomer(customer);
        requirement.setTitle(req.getTitle().trim());
        requirement.setClothingType(req.getClothingType().trim());
        requirement.setPreferredFabric(req.getPreferredFabric() != null ? req.getPreferredFabric().trim() : null);
        requirement.setPreferredColors(req.getPreferredColors() != null ? req.getPreferredColors().trim() : null);
        requirement.setBudgetMin(req.getBudgetMin());
        requirement.setBudgetMax(req.getBudgetMax());
        requirement.setDeadline(req.getDeadline());
        requirement.setInspirationImageUrl(req.getInspirationImageUrl());
        requirement.setNotes(req.getNotes() != null ? req.getNotes().trim() : "");
        requirement.setMeasurementsNotes(req.getMeasurementsNotes() != null ? req.getMeasurementsNotes().trim() : "");
        requirement.setStatus("OPEN");
        requirement.setQuotationsCount(0);

        CustomRequirement saved = customRequirementRepository.save(requirement);
        return CustomRequirementDto.fromEntity(saved);
    }

    public List<CustomRequirementDto> getCustomerRequirements(User customer) {
        return customRequirementRepository.findByCustomerOrderByCreatedAtDesc(customer).stream()
                .map(CustomRequirementDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<CustomRequirementDto> getOpenRequirements(String clothingType) {
        return customRequirementRepository.searchRequirements(
                "OPEN",
                (clothingType != null && !clothingType.trim().isEmpty()) ? clothingType.trim() : null
        ).stream().map(CustomRequirementDto::fromEntity).collect(Collectors.toList());
    }

    public List<CustomRequirementDto> getAllRequirements() {
        return customRequirementRepository.findAll().stream()
                .map(CustomRequirementDto::fromEntity)
                .collect(Collectors.toList());
    }

    public CustomRequirementDto getRequirementById(Long id) {
        CustomRequirement requirement = customRequirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Custom requirement not found with id: " + id));
        return CustomRequirementDto.fromEntity(requirement);
    }

    @Transactional
    public CustomRequirementDto cancelRequirement(User customer, Long id) {
        CustomRequirement requirement = customRequirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Custom requirement not found with id: " + id));

        if (!requirement.getCustomer().getId().equals(customer.getId()) && !customer.getRole().name().equals("ROLE_ADMIN")) {
            throw new UnauthorizedException("You are not authorized to cancel this requirement");
        }

        requirement.setStatus("CANCELLED");
        CustomRequirement updated = customRequirementRepository.save(requirement);
        return CustomRequirementDto.fromEntity(updated);
    }
}
