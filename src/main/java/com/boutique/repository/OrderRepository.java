package com.boutique.repository;
import com.boutique.entity.OrderStatus;
import com.boutique.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    long countByStatus(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.amount), 0) FROM Orders o WHERE o.status = 'PAID'")
    BigDecimal sumPaidOrders();
}
