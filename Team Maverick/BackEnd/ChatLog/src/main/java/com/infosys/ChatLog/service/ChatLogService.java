package com.infosys.ChatLog.service;


import com.infosys.ChatLog.model.ChatLog;
import com.infosys.ChatLog.model.MongoChatLog;

import java.util.List;

public interface ChatLogService {
    String sendMessage(String query, int userId);
    List<ChatLog> getChatHistory(int userId);

//    MongoChatLog getResponseFromMongoDB(String query);
}