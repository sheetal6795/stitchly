package com.stitchly.service;

import com.stitchly.dto.CreateDesignRequest;
import com.stitchly.dto.DesignDto;
import com.stitchly.entity.*;
import com.stitchly.exception.BadRequestException;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.DesignLikeRepository;
import com.stitchly.repository.DesignRepository;
import com.stitchly.repository.DesignerProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DesignService {

    private final DesignRepository designRepository;
    private final DesignLikeRepository designLikeRepository;
    private final DesignerProfileRepository designerProfileRepository;

    public DesignService(DesignRepository designRepository,
                         DesignLikeRepository designLikeRepository,
                         DesignerProfileRepository designerProfileRepository) {
        this.designRepository = designRepository;
        this.designLikeRepository = designLikeRepository;
        this.designerProfileRepository = designerProfileRepository;
    }

    public List<DesignDto> searchDesigns(String category, BigDecimal minPrice, BigDecimal maxPrice, String search, User currentUser) {
        List<Design> designs = designRepository.searchDesigns(
                (category != null && !category.trim().isEmpty()) ? category.trim() : null,
                minPrice,
                maxPrice,
                (search != null && !search.trim().isEmpty()) ? search.trim() : null
        );

        return designs.stream().map(design -> {
            boolean liked = currentUser != null && designLikeRepository.existsByUserAndDesign(currentUser, design);
            return DesignDto.fromEntity(design, liked);
        }).collect(Collectors.toList());
    }

    public List<DesignDto> getFeaturedDesigns(User currentUser) {
        return designRepository.findByFeaturedTrue().stream().map(design -> {
            boolean liked = currentUser != null && designLikeRepository.existsByUserAndDesign(currentUser, design);
            return DesignDto.fromEntity(design, liked);
        }).collect(Collectors.toList());
    }

    public List<DesignDto> getDesignsByDesignerId(Long designerId, User currentUser) {
        return designRepository.findByDesignerId(designerId).stream().map(design -> {
            boolean liked = currentUser != null && designLikeRepository.existsByUserAndDesign(currentUser, design);
            return DesignDto.fromEntity(design, liked);
        }).collect(Collectors.toList());
    }

    public DesignDto getDesignById(Long id, User currentUser) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + id));
        boolean liked = currentUser != null && designLikeRepository.existsByUserAndDesign(currentUser, design);
        return DesignDto.fromEntity(design, liked);
    }

    @Transactional
    public DesignDto createDesign(User user, CreateDesignRequest req) {
        DesignerProfile designer = designerProfileRepository.findByUser(user)
                .orElseThrow(() -> new UnauthorizedException("User does not have an active designer profile"));

        Design design = new Design();
        design.setDesigner(designer);
        design.setTitle(req.getTitle().trim());
        design.setDescription(req.getDescription() != null ? req.getDescription().trim() : "");
        design.setCategory(req.getCategory().trim());
        design.setImageUrl(req.getImageUrl().trim());
        design.setAdditionalImages(req.getAdditionalImages());
        design.setPrice(req.getPrice());
        design.setTags(req.getTags());
        design.setEstimatedDays(req.getEstimatedDays() != null ? req.getEstimatedDays() : 14);
        design.setFeatured(req.isFeatured());
        design.setLikesCount(0);
        design.setReported(false);

        Design saved = designRepository.save(design);
        return DesignDto.fromEntity(saved, false);
    }

    @Transactional
    public DesignDto updateDesign(User user, Long id, CreateDesignRequest req) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + id));

        if (!design.getDesigner().getUser().getId().equals(user.getId()) && user.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("You are not authorized to update this design");
        }

        design.setTitle(req.getTitle().trim());
        design.setDescription(req.getDescription() != null ? req.getDescription().trim() : "");
        design.setCategory(req.getCategory().trim());
        design.setImageUrl(req.getImageUrl().trim());
        design.setAdditionalImages(req.getAdditionalImages());
        design.setPrice(req.getPrice());
        design.setTags(req.getTags());
        if (req.getEstimatedDays() != null) {
            design.setEstimatedDays(req.getEstimatedDays());
        }
        design.setFeatured(req.isFeatured());

        Design updated = designRepository.save(design);
        boolean liked = designLikeRepository.existsByUserAndDesign(user, updated);
        return DesignDto.fromEntity(updated, liked);
    }

    @Transactional
    public void deleteDesign(User user, Long id) {
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + id));

        if (!design.getDesigner().getUser().getId().equals(user.getId()) && user.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("You are not authorized to delete this design");
        }

        designRepository.delete(design);
    }

    @Transactional
    public boolean toggleLikeDesign(User user, Long designId) {
        Design design = designRepository.findById(designId)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + designId));

        if (designLikeRepository.existsByUserAndDesign(user, design)) {
            designLikeRepository.deleteByUserAndDesign(user, design);
            design.setLikesCount(Math.max(0, design.getLikesCount() - 1));
            designRepository.save(design);
            return false; // Unliked
        } else {
            DesignLike like = new DesignLike(user, design);
            designLikeRepository.save(like);
            design.setLikesCount(design.getLikesCount() + 1);
            designRepository.save(design);
            return true; // Liked
        }
    }

    public List<DesignDto> getUserLikedDesigns(User user) {
        List<DesignLike> likes = designLikeRepository.findByUser(user);
        return likes.stream()
                .map(like -> DesignDto.fromEntity(like.getDesign(), true))
                .collect(Collectors.toList());
    }

    @Transactional
    public void reportDesign(Long designId, boolean reported) {
        Design design = designRepository.findById(designId)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + designId));
        design.setReported(reported);
        designRepository.save(design);
    }

    public List<DesignDto> getReportedDesigns() {
        return designRepository.findByReportedTrue().stream()
                .map(d -> DesignDto.fromEntity(d, false))
                .collect(Collectors.toList());
    }
}
