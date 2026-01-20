package com.boutique.repository;

import com.boutique.entity.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Tasks, Long> {
    @Query("""
SELECT t FROM Tasks t
JOIN FETCH t.order
WHERE t.order.Id = :orderId
""")
    List<Tasks> findByOrderId(Long orderId);
}
