package com.infosys.VideoRecommendation.service;

import com.infosys.VideoRecommendation.model.VideoRec;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VideoService {

public List<VideoRec> getAllScores();

public List<VideoRec> getScoreById(int id);

public VideoRec saveScore(VideoRec userScore);

public VideoRec updateScore(int id, VideoRec updatedScore);

public void deleteScore(int id);

public String determineGenre(int score);
}
