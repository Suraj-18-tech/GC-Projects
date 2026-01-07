package com.example.crud.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.crud.model.Student;
import com.example.crud.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student save(Student student) {
        return repo.save(student);
    }

    public List<Student> findAll() {
        return repo.findAll();
    }

    public Student findById(String id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
