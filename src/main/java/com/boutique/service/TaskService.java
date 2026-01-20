package com.boutique.service;

import com.boutique.dto.TaskResponse;
import com.boutique.entity.Tasks;
import com.boutique.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskResponse> getTasksByOrderId(Long orderId) {
        List<Tasks> tasks = taskRepository.findByOrderId(orderId);

        if (tasks.isEmpty()) {
            TaskResponse response = new TaskResponse();
            response.setPaymentStatus("PAYMENT_PENDING");
            return List.of(response);
        }

        return tasks.stream().map(task -> {

            TaskResponse response = new TaskResponse();
            response.setTaskId(task.getId());
            response.setTaskName(task.getName());
            response.setTaskStatus(task.getStatus());
            response.setCreatedAt(task.getCreatedAt());

            response.setPaymentStatus(
                    task.getOrder() != null && task.getOrder().getStatus() != null
                            ? task.getOrder().getStatus().name()
                            : "PAYMENT_PENDING"
            );

            return response;

        }).toList();
    }}