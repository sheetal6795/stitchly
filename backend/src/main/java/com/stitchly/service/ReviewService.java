package com.stitchly.service;

import com.stitchly.dto.CreateReviewRequest;
import com.stitchly.dto.ReviewDto;
import com.stitchly.entity.*;
import com.stitchly.exception.BadRequestException;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.DesignerProfileRepository;
import com.stitchly.repository.OrderRepository;
import com.stitchly.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final DesignerProfileRepository designerProfileRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         OrderRepository orderRepository,
                         DesignerProfileRepository designerProfileRepository) {
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
        this.designerProfileRepository = designerProfileRepository;
    }

    @Transactional
    public ReviewDto submitReview(User customer, CreateReviewRequest req) {
        Order order = orderRepository.findById(req.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + req.getOrderId()));

        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedException("You are not authorized to review this order");
        }

        if (order.isReviewed()) {
            throw new BadRequestException("This order has already been reviewed");
        }

        Review review = new Review();
        review.setOrder(order);
        review.setCustomer(customer);
        review.setDesigner(order.getDesigner());
        review.setRating(req.getRating());
        review.setComment(req.getComment() != null ? req.getComment().trim() : "");

        Review saved = reviewRepository.save(review);

        // Mark order as reviewed
        order.setReviewed(true);
        orderRepository.save(order);

        // Recalculate designer ratingAverage and reviewCount
        DesignerProfile designer = order.getDesigner();
        Double newAvg = reviewRepository.calculateAverageRating(designer.getId());
        long totalReviews = reviewRepository.countByDesignerId(designer.getId());
        if (newAvg != null) {
            designer.setRatingAverage(Math.round(newAvg * 10.0) / 10.0);
        }
        designer.setReviewCount((int) totalReviews);
        designerProfileRepository.save(designer);

        return ReviewDto.fromEntity(saved);
    }

    public List<ReviewDto> getDesignerReviews(Long designerId) {
        return reviewRepository.findByDesignerIdOrderByCreatedAtDesc(designerId).stream()
                .map(ReviewDto::fromEntity)
                .collect(Collectors.toList());
    }
}
