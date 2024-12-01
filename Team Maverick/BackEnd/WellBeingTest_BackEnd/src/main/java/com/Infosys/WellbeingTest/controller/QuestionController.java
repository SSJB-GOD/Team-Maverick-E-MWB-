package com.Infosys.WellbeingTest.controller;
import com.Infosys.WellbeingTest.model.Question;
import com.Infosys.WellbeingTest.repository.QuestionRepository;
import com.Infosys.WellbeingTest.service.QuestionService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;




@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/questions")

public class QuestionController {

    @Autowired
    private QuestionService questionService;


    private QuestionRepository questionRepository;
    @GetMapping("/getQuestions")
    public HashMap<Integer , Object> questions(){
        HashMap<Integer, Object> responseObject = new HashMap<>();
        List<Question> Questions = questionService.getAllQuestions();
        for(int i = 0;i < Questions.size();i++) responseObject.put(i , Questions.get(i));
      return responseObject;
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }
    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionService.saveQuestion(question);
    }

}
