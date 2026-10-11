package com.stitchly.repository;

import com.stitchly.entity.Design;
import com.stitchly.entity.DesignLike;
import com.stitchly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesignLikeRepository extends JpaRepository<DesignLike, Long> {
    Optional<DesignLike> findByUserAndDesign(User user, Design design);
    boolean existsByUserAndDesign(User user, Design design);
    List<DesignLike> findByUser(User user);
    List<DesignLike> findByUserId(Long userId);
    void deleteByUserAndDesign(User user, Design design);
}
