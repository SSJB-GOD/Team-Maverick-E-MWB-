package com.infosys.VideoRecommendation.repository;

import com.infosys.VideoRecommendation.model.VideoRec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepo extends JpaRepository<VideoRec, Integer> {

    // Find all scores for a specific user
    List<VideoRec> findByUserId(int userId);

    // Find all records with a specific genre
    List<VideoRec> findByGenre(String genre);

    // Find all records for a user with a specific genre
    List<VideoRec> findByUserIdAndGenre(int userId, String genre);

}
