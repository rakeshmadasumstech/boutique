package com.boutique.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class StatsResponse {
    private long totalOrders;
    private long paidOrders;
    private long unpaidOrders;
    private BigDecimal totalRevenue;

    public StatsResponse(long totalOrders, long paidOrders, long unpaidOrders, BigDecimal totalRevenue) {
        this.totalOrders = totalOrders;
        this.paidOrders = paidOrders;
        this.unpaidOrders = unpaidOrders;
        this.totalRevenue = totalRevenue;
    }

}
