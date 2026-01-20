package com.boutique.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WhatsAppNotificationRequest {
    private Long mobileNo;
    private String message;

}
