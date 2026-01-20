package com.boutique.service;

import com.boutique.dto.PaymentResponse;
import com.boutique.entity.OrderStatus;
import com.boutique.entity.Orders;
import com.boutique.entity.Tasks;
import com.boutique.exception.BadRequestException;
import com.boutique.exception.ResourceNotFoundException;
import com.boutique.repository.OrderRepository;
import com.boutique.repository.TaskRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderrepository;
    @Autowired
    private TaskRepository taskRepository;

    public Orders saveorder(Orders order){
        order.setStatus(OrderStatus.PENDING);
        return orderrepository.save(order);
    }
    public Orders getOrderById(Long orderId) {

        return orderrepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Order with id " + orderId + " not found"
                ));

}
    public  List<Orders> getAllorders(){

        return orderrepository.findAll();
    }

    @Transactional(readOnly = true)
    public PaymentResponse checkstatus(Long orderId) {

        Orders order = orderrepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getStatus() == OrderStatus.PENDING) {
            return new PaymentResponse("Payment not done", order);
        }

        if (order.getStatus() == OrderStatus.PAID) {
            return new PaymentResponse("Payment already done", order);
        }

        return new PaymentResponse("Invalid payment state", order);
    }

    @Transactional
    public PaymentResponse confirmpayment(Long orderId) {

        Orders order = orderrepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // 🔁 Idempotent check
        if (order.getStatus() == OrderStatus.PAID) {
            return new PaymentResponse("Payment already done", order);
        }

        //  Update order
        order.setStatus(OrderStatus.PAID);
        orderrepository.save(order);


        Tasks task = new Tasks();
        task.setName("PAYMENT_CONFIRMED");
        task.setStatus("COMPLETED");
        task.setCreatedAt(LocalDateTime.now());
        task.setOrder(order);

        taskRepository.save(task);

        return new PaymentResponse("Payment confirmed successfully", order);
    }
}
