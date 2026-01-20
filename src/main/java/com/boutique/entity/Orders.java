package com.boutique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor

public class Orders {

    public Orders() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long Id;

    @NonNull
    private Long  mobile_no;

    @NonNull
    private String customer_name;

    @NonNull
    private String category;

    @NonNull
    private  Double amount;

    @Enumerated(EnumType.STRING)
    @Column(length = 50,name = "payment_status")
     private OrderStatus status= OrderStatus.PENDING;
}
