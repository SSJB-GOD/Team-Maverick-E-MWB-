package com.infosys.TaskManagement.controller;

import com.infosys.TaskManagement.dto.TaskDto;
import com.infosys.TaskManagement.model.Task;
import com.infosys.TaskManagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create Task
    @PostMapping("/addTask")
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto) {
        try {
            Task createdTask = taskService.createTask(taskDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Task creation failed");
        }
    }

    // Update Task
    @PutMapping("/updateTask")
    public ResponseEntity<?> updateTask(@RequestBody TaskDto taskDto) {
        try {
            Task updatedTask = taskService.updateTask(taskDto);
            return ResponseEntity.ok(updatedTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Task update failed");
        }
    }

    // Delete Task
    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") int id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Task deletion failed");
        }
    }

    // Get Tasks by User ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getTasksByUserId(@PathVariable int userId) {
        try {
            List<Task> tasks = taskService.getTask(userId);
            if (tasks.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tasks found for the given user ID");
            }
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch tasks");
        }
    }

    // Mark Task as Completed
    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> markTaskCompleted(@PathVariable int id) {
        try {
            Task completedTask = taskService.markTaskCompleted(id);
            return ResponseEntity.ok(completedTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to mark task as completed");
        }
    }
}