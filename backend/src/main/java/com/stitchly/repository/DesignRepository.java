package com.stitchly.repository;

import com.stitchly.entity.Design;
import com.stitchly.entity.DesignerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {
    List<Design> findByDesigner(DesignerProfile designer);
    List<Design> findByDesignerId(Long designerId);
    List<Design> findByFeaturedTrue();
    List<Design> findByReportedTrue();

    @Query("SELECT d FROM Design d WHERE " +
           "(:category IS NULL OR LOWER(d.category) = LOWER(:category)) AND " +
           "(:minPrice IS NULL OR d.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR d.price <= :maxPrice) AND " +
           "(:search IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.tags) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Design> searchDesigns(
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("search") String search
    );
}
