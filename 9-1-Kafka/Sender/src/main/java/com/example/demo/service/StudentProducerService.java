package com.example.demo.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class StudentProducerService {

    // ✅ Correct topic name (must match Kafka exactly)
    private static final String TOPIC = "students-events";

    private final KafkaTemplate<String, String> kafkaTemplate;

    public StudentProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String message) {
        kafkaTemplate.send(TOPIC, message);
        System.out.println("Kafka Producer sent: " + message);
    }
}
