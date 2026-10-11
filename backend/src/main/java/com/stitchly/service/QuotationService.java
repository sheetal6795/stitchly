package com.stitchly.service;

import com.stitchly.dto.AcceptQuotationRequest;
import com.stitchly.dto.CreateQuotationRequest;
import com.stitchly.dto.OrderDto;
import com.stitchly.dto.QuotationDto;
import com.stitchly.entity.*;
import com.stitchly.exception.BadRequestException;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final CustomRequirementRepository customRequirementRepository;
    private final DesignerProfileRepository designerProfileRepository;
    private final OrderRepository orderRepository;

    public QuotationService(QuotationRepository quotationRepository,
                            CustomRequirementRepository customRequirementRepository,
                            DesignerProfileRepository designerProfileRepository,
                            OrderRepository orderRepository) {
        this.quotationRepository = quotationRepository;
        this.customRequirementRepository = customRequirementRepository;
        this.designerProfileRepository = designerProfileRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public QuotationDto submitQuotation(User designerUser, CreateQuotationRequest req) {
        DesignerProfile designer = designerProfileRepository.findByUser(designerUser)
                .orElseThrow(() -> new UnauthorizedException("User is not an authorized designer"));

        CustomRequirement requirement = customRequirementRepository.findById(req.getRequirementId())
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found with id: " + req.getRequirementId()));

        if (!"OPEN".equalsIgnoreCase(requirement.getStatus())) {
            throw new BadRequestException("This requirement is no longer accepting quotations (Status: " + requirement.getStatus() + ")");
        }

        if (quotationRepository.existsByRequirementIdAndDesignerId(requirement.getId(), designer.getId())) {
            throw new BadRequestException("You have already submitted a quotation for this requirement");
        }

        Quotation quotation = new Quotation();
        quotation.setRequirement(requirement);
        quotation.setDesigner(designer);
        quotation.setQuotePrice(req.getQuotePrice());
        quotation.setEstimatedDays(req.getEstimatedDays());
        quotation.setProposalNotes(req.getProposalNotes() != null ? req.getProposalNotes().trim() : "");
        quotation.setFabricSuggestions(req.getFabricSuggestions() != null ? req.getFabricSuggestions().trim() : "");
        quotation.setCostBreakdown(req.getCostBreakdown() != null ? req.getCostBreakdown().trim() : "");
        quotation.setStatus("PENDING");

        Quotation saved = quotationRepository.save(quotation);

        // Update count on requirement
        requirement.setQuotationsCount(requirement.getQuotationsCount() + 1);
        customRequirementRepository.save(requirement);

        return QuotationDto.fromEntity(saved);
    }

    public List<QuotationDto> getQuotationsForRequirement(User customer, Long requirementId) {
        CustomRequirement requirement = customRequirementRepository.findById(requirementId)
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found with id: " + requirementId));

        // Customer who owns requirement, or admin, or public compare
        return quotationRepository.findByRequirementIdOrderByCreatedAtDesc(requirementId).stream()
                .map(QuotationDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<QuotationDto> getQuotationsByDesigner(User designerUser) {
        DesignerProfile designer = designerProfileRepository.findByUser(designerUser)
                .orElseThrow(() -> new UnauthorizedException("Designer profile not found"));

        return quotationRepository.findByDesignerIdOrderByCreatedAtDesc(designer.getId()).stream()
                .map(QuotationDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto acceptQuotation(User customer, Long quotationId, AcceptQuotationRequest req) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new ResourceNotFoundException("Quotation not found with id: " + quotationId));

        CustomRequirement requirement = quotation.getRequirement();

        if (!requirement.getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedException("You are not authorized to accept quotations for this requirement");
        }

        if (!"OPEN".equalsIgnoreCase(requirement.getStatus())) {
            throw new BadRequestException("This requirement has already been awarded or closed");
        }

        // 1. Mark accepted quotation
        quotation.setStatus("ACCEPTED");
        quotationRepository.save(quotation);

        // 2. Reject other quotations for this requirement
        List<Quotation> otherQuotes = quotationRepository.findByRequirement(requirement);
        for (Quotation q : otherQuotes) {
            if (!q.getId().equals(quotation.getId()) && "PENDING".equalsIgnoreCase(q.getStatus())) {
                q.setStatus("REJECTED");
                quotationRepository.save(q);
            }
        }

        // 3. Mark requirement as awarded
        requirement.setStatus("AWARDED");
        customRequirementRepository.save(requirement);

        // 4. Create Order automatically
        Order order = new Order();
        String orderNumber = "STITCH-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setOrderNumber(orderNumber);
        order.setRequirement(requirement);
        order.setQuotation(quotation);
        order.setCustomer(customer);
        order.setDesigner(quotation.getDesigner());
        order.setTotalAmount(quotation.getQuotePrice());
        order.setStatus("PLACED");
        order.setShippingAddress(req != null && req.getShippingAddress() != null ? req.getShippingAddress().trim() : "Address to be confirmed");
        order.setDesignerNotes("Commission accepted for: " + requirement.getTitle());
        order.setDeadline(LocalDate.now().plusDays(quotation.getEstimatedDays()));
        order.setReviewed(false);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);
        return OrderDto.fromEntity(savedOrder);
    }
}
