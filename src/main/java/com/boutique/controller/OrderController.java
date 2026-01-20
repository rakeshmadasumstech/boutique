package com.boutique.controller;

import com.boutique.dto.PaymentResponse;
import com.boutique.entity.Orders;
import com.boutique.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderservice;

    @PostMapping("/orders")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderservice.saveorder(order));
    }
    @GetMapping("/orders/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Long id) {

        Orders order = orderservice.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Orders>> getallorders(){

        return ResponseEntity.ok(orderservice.getAllorders());
    }

    @GetMapping("/orders/{id}/check-status")
    public ResponseEntity<PaymentResponse> checkstatus(@PathVariable Long id) {
        PaymentResponse response = orderservice.checkstatus(id);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/orders/{id}/confirm-payment")
    public ResponseEntity<PaymentResponse> confirmpayment(@PathVariable Long id) {
        return ResponseEntity.ok(orderservice.confirmpayment(id));
    }
}
