package com.infosys.TaskManagement.repository;

import com.infosys.TaskManagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer> {

    Optional<Task> findById(int id);
    List<Task> findByUserId(int userId);
    void deleteById(int id);
}
