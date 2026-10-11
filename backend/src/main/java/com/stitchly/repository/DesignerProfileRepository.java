package com.stitchly.repository;

import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesignerProfileRepository extends JpaRepository<DesignerProfile, Long> {
    Optional<DesignerProfile> findByUser(User user);
    Optional<DesignerProfile> findByUserId(Long userId);
    List<DesignerProfile> findByVerifiedTrue();
    List<DesignerProfile> findByVerifiedFalse();

    @Query("SELECT d FROM DesignerProfile d WHERE " +
           "(:specialty IS NULL OR LOWER(d.specialties) LIKE LOWER(CONCAT('%', :specialty, '%'))) AND " +
           "(:search IS NULL OR LOWER(d.brandName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.location) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<DesignerProfile> searchDesigners(@Param("specialty") String specialty, @Param("search") String search);

    long countByVerifiedTrue();
    long countByVerifiedFalse();
}
