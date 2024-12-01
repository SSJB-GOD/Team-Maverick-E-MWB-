package com.infosys.ChatLog.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "chatQueries")
public class MongoChatLog {

    @Id
    private String id;  // Use String type for MongoDB ID
    private String query;
    private String response;
    private LocalDateTime timestamp;  // Timestamp to sort by, if needed
}
