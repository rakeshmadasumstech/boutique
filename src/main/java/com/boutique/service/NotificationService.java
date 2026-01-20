package com.boutique.service;

import org.springframework.stereotype.Service;
@Service
public class NotificationService {


    public void sendWhatsApp(Long mobileNo, String message) {

        // Mock WhatsApp send
        System.out.println("📱 WhatsApp sent to " + mobileNo);
        System.out.println("💬 Message: " + message);

     }
}
