package com.boutique.controller;

import com.boutique.dto.WhatsAppNotificationRequest;
import com.boutique.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;


    @PostMapping("/whatsapp")
    public ResponseEntity<String> sendWhatsApp(
            @RequestBody WhatsAppNotificationRequest request) {

        notificationService.sendWhatsApp(
                request.getMobileNo(),
                request.getMessage()
        );

        return ResponseEntity.ok("WhatsApp notification sent successfully");
    }
}
