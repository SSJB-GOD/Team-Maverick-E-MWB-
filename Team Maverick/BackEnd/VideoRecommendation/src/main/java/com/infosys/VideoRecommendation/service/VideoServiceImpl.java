package com.infosys.VideoRecommendation.service;

import com.infosys.VideoRecommendation.model.VideoRec;
import com.infosys.VideoRecommendation.repository.VideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoServiceImpl implements VideoService{


    @Autowired
    private VideoRepo videoRepo;

    @Override
    public List<VideoRec> getAllScores() {
        return videoRepo.findAll();
    }

    @Override
    public List<VideoRec> getScoreById(int id) {
        System.out.print(videoRepo.existsById(id));
        return videoRepo.findByUserId(id);
    }

    @Override
    public VideoRec saveScore(VideoRec userScore) {
        userScore.setGenre(determineGenre(userScore.getScore()));
        return videoRepo.save(userScore);
    }

    @Override
    public VideoRec updateScore(int id, VideoRec updatedScore) {
        if (videoRepo.existsById(id)) {
            updatedScore.setId(id);
            updatedScore.setGenre(determineGenre(updatedScore.getScore()));
            return videoRepo.save(updatedScore);
        } else {
            throw new RuntimeException("UserScore not found.");
        }
    }

    @Override
    public void deleteScore(int id) {
        videoRepo.deleteById(id);
    }

    @Override
    public String determineGenre(int score) {
        if (score >= 80) {
            return "Excellent";
        } else if (score >= 50) {
            return "Good";
        } else if (score >= 30) {
            return "Average";
        } else {
            return "Needs Improvement";
        }
    }
}
