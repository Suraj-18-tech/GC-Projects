package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import com.example.demo.service.StudentProducerService;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;
    private final StudentProducerService producerService;

    public StudentController(StudentService service,
                             StudentProducerService producerService) {
        this.service = service;
        this.producerService = producerService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student savedStudent = service.save(student);

        producerService.sendMessage(
                "STUDENT_CREATED: " + savedStudent.toString()
        );

        return ResponseEntity.ok(savedStudent);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.findAll());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable String id) {
        Student student = service.findById(id);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable String id,
            @RequestBody Student student) {

        student.setId(id);
        Student updatedStudent = service.save(student);

        producerService.sendMessage(
                "STUDENT_UPDATED: " + updatedStudent.toString()
        );

        return ResponseEntity.ok(updatedStudent);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        service.delete(id);

        producerService.sendMessage(
                "STUDENT_DELETED: id=" + id
        );

        return ResponseEntity.ok("Student deleted successfully");
    }
}
