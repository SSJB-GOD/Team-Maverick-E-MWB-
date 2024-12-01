package com.Infosys.WellbeingTest.service;

import com.Infosys.WellbeingTest.dto.WellbeingTestDTO;
import com.Infosys.WellbeingTest.exception.TestNotFoundException;
import com.Infosys.WellbeingTest.model.Choice;
import com.Infosys.WellbeingTest.model.Question;
import com.Infosys.WellbeingTest.model.WellbeingTest;
import com.Infosys.WellbeingTest.repository.WellbeingTestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class WellbeingServiceImpl implements WellbeingService {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private WellbeingTestRepo wellbeingTestRepository;

    @Override
    public WellbeingTest takeTest(WellbeingTestDTO wellbeingTestDTO) {
        AtomicInteger score = new AtomicInteger();
        List<Question> questions = questionService.getAllQuestions();
        Map<String, String> responses = wellbeingTestDTO.getResponses();  // Get response

        // Check that the responses map is not empty
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be empty");
        }

        // Calculate the score based on responses
        for (Question question : questions) {
            String questionText = question.getQuestionText();
            String answer = responses.get(questionText);
            if (answer != null && !answer.isEmpty()) {
                List<Choice> choices = question.getChoices();

                if (choices != null && !choices.isEmpty()) {
                    Optional<Choice> selectedChoice = choices.stream()
                            .filter(choice -> choice.getOption().equalsIgnoreCase(answer))
                            .findFirst();

                    // Add the score for the selected choice
                    selectedChoice.ifPresent(choice -> {
                        score.addAndGet(choice.getScore());
                        System.out.println("Added score for question: " + questionText + " -> " + choice.getScore());
                    });
                } else {
                    System.out.println("No choices available for question: " + questionText);
                }
            }
        }
        System.out.println("Final calculated score: " + score);

        // Create a WellbeingTest object to save to the database
        WellbeingTest wellbeingTest = new WellbeingTest();
        wellbeingTest.setUserId(wellbeingTestDTO.getUserId());  // Set the user_id
        wellbeingTest.setScore(score.get());
        wellbeingTest.setTaken_at(LocalDateTime.now());
        wellbeingTest.setStatus(determineStatus(score.get()));

        // Save the wellbeingTest object to the repository
        return wellbeingTestRepository.save(wellbeingTest);
    }

    @Override
    public List<WellbeingTest> getTestResults(int userId) {
        // Retrieve test results by user ID
        return wellbeingTestRepository.findByUserId(userId);
    }
    @Override
    public List<String> getRecommendations(int id) {
        // Retrieve test by test ID
        WellbeingTest test = wellbeingTestRepository.findById(id).orElse(null);

        // Check if test exists
        if (test == null) {
            System.out.println("Test not found with id: " + id);
            return Collections.emptyList();  // Return an empty list if test is not found
        }

        System.out.println("Test status: " + test.getStatus());  // Log the status value

        List<String> recommendations = new ArrayList<>();
        if (test != null) {
            // Generate recommendations based on the test's status
            switch (test.getStatus().trim()) {  // Use trim to avoid leading/trailing spaces
                case "Severely Depressed - Immediate Help Needed":
                    recommendations.add("Seek immediate professional help.");
                    recommendations.add("Engage in regular therapy sessions.");
                    break;
                case "Moderately Depressed - Counseling Recommended":
                    recommendations.add("Consider counseling or group therapy.");
                    recommendations.add("Practice mindfulness and meditation.");
                    break;
                case "Mild Symptoms - Consider Lifestyle Changes":
                    recommendations.add("Consider lifestyle changes such as exercise and healthy eating.");
                    recommendations.add("Engage in regular physical activity.");
                    break;
                case "Healthy - Keep Up the Good Work!":
                    recommendations.add("Keep maintaining your healthy lifestyle.");
                    break;
                default:
                    recommendations.add("No specific recommendation.");
                    break;
            }
        }

        System.out.println("Recommendations: " + recommendations);  // Log the recommendations list

        return recommendations;
    }




    // Helper method to determine the status based on the score
    private String determineStatus(int score) {
        if (score >= 80) {
            return "Severely Depressed - Immediate Help Needed";
        } else if (score >= 50) {
            return "Moderately Depressed - Counseling Recommended";
        } else if (score >= 30) {
            return "Mild Symptoms - Consider Lifestyle Changes";
        } else {
            return "Healthy - Keep Up the Good Work!";
        }
    }

    // Delete WellbeingTest by ID
    public boolean deleteTestById(int id) {
        if (wellbeingTestRepository.existsById(id)) {
            wellbeingTestRepository.deleteById(id);
            return true;
        } else {
            throw new TestNotFoundException(id);
        }
    }
}
