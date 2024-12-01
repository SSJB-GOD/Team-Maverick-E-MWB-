package com.infosys.ChatLog.repository;

import com.infosys.ChatLog.model.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Integer> {
        List<ChatLog> findByUserId(int userId);
}
