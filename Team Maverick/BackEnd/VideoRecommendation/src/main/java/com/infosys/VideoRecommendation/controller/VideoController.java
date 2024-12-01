package com.infosys.VideoRecommendation.controller;

import com.infosys.VideoRecommendation.model.VideoRec;
import com.infosys.VideoRecommendation.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class VideoController {

    @Autowired
    private VideoService videoService;


    // Get all VideoRec scores
    @GetMapping
    public List<VideoRec> getAllScores() {
        return videoService.getAllScores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<VideoRec>> getScoreById(@PathVariable int id) {
        List<VideoRec> VideoRec = videoService.getScoreById(id);
        if(VideoRec == null) return null;
        else return ResponseEntity.ok(VideoRec);
    }

    // Create a new VideoRec score
    @PostMapping("/setScore")
    public void  createScore(@RequestBody VideoRec VideoRecScore) {
        VideoRec savedScore = videoService.saveScore(VideoRecScore);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
    }

    // Update an existing VideoRec score
    @PutMapping("/{id}")
    public ResponseEntity<VideoRec> updateScore(@PathVariable int  id, @RequestBody VideoRec VideoRecScore) {
        try {
            VideoRec updatedScore = videoService.updateScore(id, VideoRecScore);
            return ResponseEntity.ok(updatedScore);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a VideoRec score by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable int id) {
        videoService.deleteScore(id);
        return ResponseEntity.noContent().build();
    }
}
