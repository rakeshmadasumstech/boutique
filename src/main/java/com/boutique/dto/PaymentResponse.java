package com.boutique.dto;

import com.boutique.entity.Orders;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponse {
    private String message;

    private Orders order;

    public PaymentResponse(String message, Orders order) {
        this.message = message;
        this.order = order;
    }
}
