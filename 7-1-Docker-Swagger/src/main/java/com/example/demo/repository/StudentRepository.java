package com.example.crud.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.crud.model.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
}
