package com.example.crud.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.crud.model.Student;
import com.example.crud.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Student> add(@RequestBody Student student) {
        return ResponseEntity.ok(service.save(student));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> get(@PathVariable String id) {
        Student student = service.findById(id);
        return student == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(
            @PathVariable String id,
            @RequestBody Student student) {

        student.setId(id);
        return ResponseEntity.ok(service.save(student));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
