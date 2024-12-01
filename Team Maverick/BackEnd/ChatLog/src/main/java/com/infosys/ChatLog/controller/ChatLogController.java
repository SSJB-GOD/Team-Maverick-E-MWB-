package com.infosys.ChatLog.controller;

import com.infosys.ChatLog.dto.MessageRequestDto;
import com.infosys.ChatLog.service.ChatLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.logging.Logger;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ChatLogController {

    private static final Logger logger = Logger.getLogger(ChatLogController.class.getName());

    @Autowired
    private ChatLogService chatLogService;

    // Endpoint to send a message and get a response
    @PostMapping("/send")
    public HashMap<String , Object> sendMessage(@RequestBody MessageRequestDto messageRequestDto) {
        HashMap<String , Object> response = new HashMap<>();
        try {
            response.put("response" , chatLogService.sendMessage(messageRequestDto.getQuery(), messageRequestDto.getUserId()));
        } catch (Exception e) {
            logger.severe("Error in /send endpoint: " + e.getMessage());
            response.put("response","InValid question ");
        }
        System.out.print(response);
        return response;
    }
    @GetMapping("/history/{userId}")
    public HashMap<String, Object> getChatHistory(@PathVariable int userId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            response.put("History", chatLogService.getChatHistory(userId));
        } catch (Exception e) {
            logger.severe("Error in /history endpoint: " + e.getMessage());
            response.put("History",null);
        }
        return response;
    }
}
