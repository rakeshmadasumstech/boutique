package com.boutique.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskResponse {
    private Long taskId;
    private String taskName;
    private String taskStatus;
    private String paymentStatus;
    private LocalDateTime createdAt;
}
