package com.stitchly.repository;

import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.Order;
import com.stitchly.entity.Review;
import com.stitchly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByDesignerOrderByCreatedAtDesc(DesignerProfile designer);
    List<Review> findByDesignerIdOrderByCreatedAtDesc(Long designerId);
    List<Review> findByCustomerOrderByCreatedAtDesc(User customer);
    Optional<Review> findByOrder(Order order);
    Optional<Review> findByOrderId(Long orderId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.designer.id = :designerId")
    Double calculateAverageRating(@Param("designerId") Long designerId);

    long countByDesignerId(Long designerId);
}
