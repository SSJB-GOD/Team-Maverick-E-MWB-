package com.infosys.ChatLog.repository;

import com.infosys.ChatLog.model.MongoChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MongoChatRepository extends MongoRepository<MongoChatLog, String> {
    List<MongoChatLog> findByQuery(String query);

//    MongoChatLog findFirstByQuery(String query);
}
