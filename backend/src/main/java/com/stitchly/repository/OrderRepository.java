package com.stitchly.repository;

import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.Order;
import com.stitchly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerOrderByCreatedAtDesc(User customer);
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Order> findByDesignerOrderByCreatedAtDesc(DesignerProfile designer);
    List<Order> findByDesignerIdOrderByCreatedAtDesc(Long designerId);
    Optional<Order> findByOrderNumber(String orderNumber);
    long countByStatus(String status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal calculateTotalGrossMerchandiseValue();
}
