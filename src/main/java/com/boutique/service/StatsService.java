package com.boutique.service;

import com.boutique.dto.StatsResponse;
import com.boutique.entity.OrderStatus;
import com.boutique.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
@Service
public class StatsService {
    @Autowired
    private OrderRepository orderRepository;

    public StatsService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public StatsResponse getStats() {

        long totalOrders = orderRepository.count();
        long paidOrders = orderRepository.countByStatus(OrderStatus.PAID);
        long unpaidOrders = totalOrders - paidOrders;
        BigDecimal totalRevenue = orderRepository.sumPaidOrders();

        return new StatsResponse(
                totalOrders,
                paidOrders,
                unpaidOrders,
                totalRevenue
        );
    }
}
