package com.boutique.controller;

import com.boutique.dto.TaskResponse;
import com.boutique.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class TaskController {
    @Autowired
    private   TaskService taskService;


    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<TaskResponse>> getOrderTasks(@PathVariable Long id) {
           return ResponseEntity.ok(taskService.getTasksByOrderId(id));
    }
}
