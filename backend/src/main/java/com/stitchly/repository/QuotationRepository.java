package com.stitchly.repository;

import com.stitchly.entity.CustomRequirement;
import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    List<Quotation> findByRequirement(CustomRequirement requirement);
    List<Quotation> findByRequirementIdOrderByCreatedAtDesc(Long requirementId);
    List<Quotation> findByDesignerOrderByCreatedAtDesc(DesignerProfile designer);
    List<Quotation> findByDesignerIdOrderByCreatedAtDesc(Long designerId);
    Optional<Quotation> findByRequirementAndDesigner(CustomRequirement requirement, DesignerProfile designer);
    boolean existsByRequirementIdAndDesignerId(Long requirementId, Long designerId);
    long countByStatus(String status);
}
