package com.infosys.TaskManagement.controller;

import com.infosys.TaskManagement.dto.TaskDto;
import com.infosys.TaskManagement.model.Task;
import com.infosys.TaskManagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create Task
    @PostMapping("/AddTask")
    public HashMap<String , ResponseEntity<?>> createTask(@RequestBody TaskDto taskDto) {
        System.out.print(taskDto.getUserId());
        HashMap<String , ResponseEntity<?>> response = new HashMap<>();
        try {
            Task createdTask = taskService.createTask(taskDto);
            response.put("response" , ResponseEntity.status(HttpStatus.CREATED).body(createdTask));
        } catch (IllegalArgumentException e) {
            response.put("response",ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        } catch (Exception e) {
            response.put("response", ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the task."));
        }
        return response;
    }

    // Update Task
    @PutMapping("/updateTask")
    public HashMap<String , ResponseEntity<?>> updateTask( @RequestBody TaskDto taskDto) {
        HashMap<String  , ResponseEntity<?>> response = new HashMap<>();
        try {
            Task updatedTask = taskService.updateTask(taskDto);
            response.put("response",ResponseEntity.ok(updatedTask));
        } catch (IllegalArgumentException e) {
            response.put("response",ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        } catch (Exception e) {
            response.put("response " , ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the task."));
        }
        return response;
    }

    // Delete Task
    @DeleteMapping("/{id}")
    public void  deleteTask(@PathVariable("id") int id) {

        try {
            taskService.deleteTask(id);
        } catch (IllegalArgumentException e) {

                  throw new Error(e);
        } catch (Exception e){
              throw new Error(e);
        }
    }

    // Get Tasks by User ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getTaskByUserId(@PathVariable int userId) {
        try {
            List<Task> tasks = taskService.getTask(userId);
            if (tasks.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tasks found for the given user ID.");
            }
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching tasks.");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while marking the task as completed.");
        }
    }
}
