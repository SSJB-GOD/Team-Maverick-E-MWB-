package com.infosys.TaskManagement.service;

import com.infosys.TaskManagement.dto.TaskDto;
import com.infosys.TaskManagement.exception.TaskNotFoundException;
import com.infosys.TaskManagement.model.Task;
import com.infosys.TaskManagement.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{


    @Autowired
    private TaskRepo taskRepo;




    @Override
    public Task createTask(TaskDto taskDto) {
        System.out.print(taskDto.getUserId());
        Task task = new Task();
        task.setUserId(taskDto.getUserId());
        task.setTitle(taskDto.getTitle());
        task.setPriority(taskDto.getPriority());
        task.setCreatedAt(LocalDateTime.now());
        task.setDueDate((taskDto.getDueDate()));
        task.setCompleted(false);
        return taskRepo.save(task);
    }

    @Override
    public Task updateTask(TaskDto taskDto) {
        Task task = taskRepo.findById(taskDto.getId())
                .orElseThrow(()-> new TaskNotFoundException("Task not found with id: " + taskDto.getId()));
        task.setTitle(taskDto.getTitle());
         task.setPriority(task.getPriority());
        task.setDueDate(taskDto.getDueDate());
        task.setPriority(taskDto.getPriority());
        task.setCompleted(taskDto.isCompleted());
        return taskRepo.save(task);
    }

    @Override
    public void deleteTask(int id) {
        System.out.print("id is : "+id+"\n");
        if (!taskRepo.existsById(id)) {
            throw new TaskNotFoundException("Task not found with id: " + id);
        }
        taskRepo.deleteById(id);
    }

    @Override
    public List<Task> getTask(int userId) {
        return taskRepo.findByUserId(userId);
    }

    @Override
    public Task markTaskCompleted(int id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
        task.setCompleted(true);
        return taskRepo.save(task);
    }
}
