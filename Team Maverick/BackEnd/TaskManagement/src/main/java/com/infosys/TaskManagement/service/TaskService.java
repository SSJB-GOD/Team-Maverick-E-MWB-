package com.infosys.TaskManagement.service;

import com.infosys.TaskManagement.dto.TaskDto;
import com.infosys.TaskManagement.model.Task;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface TaskService {

    Task createTask(TaskDto taskDto);

    Task updateTask(TaskDto taskDto);

    void deleteTask(int id);

    List<Task> getTask(int userId);

    Task markTaskCompleted(int id);


}
