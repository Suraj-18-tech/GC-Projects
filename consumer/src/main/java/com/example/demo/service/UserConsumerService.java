package com.example.demo.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class UserConsumerService {

    @KafkaListener(topics = "students-events", groupId = "user-group")
    public void consume(String message) {
        System.out.println("Consumer received: " + message);
    }
}
