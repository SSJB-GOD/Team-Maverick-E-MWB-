package com.Infosys.WellbeingTest.service;

import com.Infosys.WellbeingTest.dto.WellbeingTestDTO;
import com.Infosys.WellbeingTest.model.WellbeingTest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WellbeingService {

    // Method to take a test and return the WellbeingTestRepo object
    WellbeingTest takeTest(WellbeingTestDTO wellbeingTestDTO);

    List<WellbeingTest> getTestResults(int userId);

    List<String> getRecommendations(int id);

    // Method to delete a test by its ID
    boolean deleteTestById(int id);
}
