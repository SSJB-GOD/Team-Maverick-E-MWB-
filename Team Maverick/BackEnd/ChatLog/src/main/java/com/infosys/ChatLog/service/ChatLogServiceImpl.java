package com.infosys.ChatLog.service;

import com.infosys.ChatLog.model.ChatLog;
import com.infosys.ChatLog.model.MongoChatLog;
import com.infosys.ChatLog.repository.ChatLogRepository;
import com.infosys.ChatLog.repository.MongoChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ChatLogServiceImpl implements ChatLogService {

    private static final Logger logger = Logger.getLogger(ChatLogServiceImpl.class.getName());


    @Autowired
    private ChatLogRepository chatLogRepository;

    @Autowired
    private MongoChatRepository mongoChatRepository;

    @Override
    public String sendMessage(String query, int userId) {
        String response = null;
        List<MongoChatLog> mongoChatLogs = null; // Declared outside the try block

        try {
            // Retrieve the response from MongoDB
            mongoChatLogs = mongoChatRepository.findByQuery(query);

            if (mongoChatLogs != null && !mongoChatLogs.isEmpty()) {
                MongoChatLog mongoChatLog = mongoChatLogs.get(0);  // Handle multiple results if necessary
                response = mongoChatLog.getResponse();
                logger.info("Response found in MongoDB for query: " + query);
            } else {
                response = "This is a mocked AI response for: " + query;  // Mock response if not found
                logger.info("No response found in MongoDB, using mock response.");
            }

            // Save the chat log to MySQL
            ChatLog chatLog = new ChatLog();
            chatLog.setUserId(userId);
            chatLog.setQuery(query);
            chatLog.setResponse(response);
            chatLog.setTimestamp(LocalDateTime.now());

            chatLogRepository.save(chatLog);
            logger.info("ChatLog saved successfully to MySQL.");
        } catch (Exception e) {
            logger.severe("Error while processing sendMessage for query: " + query + ". Error: " + e.getMessage());
        }

        try {
            // Store the query and response in MongoDB if it wasn't found in the initial query
            if (response != null && (mongoChatLogs == null || mongoChatLogs.isEmpty())) {
                MongoChatLog newMongoChatLog = new MongoChatLog();
                newMongoChatLog.setQuery(query);
                newMongoChatLog.setResponse(response);
                newMongoChatLog.setTimestamp(LocalDateTime.now());
                mongoChatRepository.save(newMongoChatLog);
                logger.info("Query and response successfully saved to MongoDB for query: " + query);
            }
        } catch (Exception e) {
            logger.severe("Error saving query and response to MongoDB for query: " + query + ". Error: " + e.getMessage());
        }

        return response;
    }

    @Override
    public List<ChatLog> getChatHistory(int userId) {
        try {
            return chatLogRepository.findByUserId(userId);
        } catch (Exception e) {
            logger.severe("Error retrieving chat history for userId " + userId + ": " + e.getMessage());
            return null;
        }
    }
}
