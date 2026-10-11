package com.stitchly.repository;

import com.stitchly.entity.CustomRequirement;
import com.stitchly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomRequirementRepository extends JpaRepository<CustomRequirement, Long> {
    List<CustomRequirement> findByCustomerOrderByCreatedAtDesc(User customer);
    List<CustomRequirement> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<CustomRequirement> findByStatusOrderByCreatedAtDesc(String status);

    @Query("SELECT r FROM CustomRequirement r WHERE " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:clothingType IS NULL OR LOWER(r.clothingType) LIKE LOWER(CONCAT('%', :clothingType, '%'))) " +
           "ORDER BY r.createdAt DESC")
    List<CustomRequirement> searchRequirements(
            @Param("status") String status,
            @Param("clothingType") String clothingType
    );

    long countByStatus(String status);
}
