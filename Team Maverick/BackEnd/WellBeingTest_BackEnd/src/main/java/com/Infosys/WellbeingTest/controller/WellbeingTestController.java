package com.Infosys.WellbeingTest.controller;
import com.Infosys.WellbeingTest.dto.WellbeingTestDTO;
import com.Infosys.WellbeingTest.model.WellbeingTest;
import com.Infosys.WellbeingTest.service.WellbeingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class WellbeingTestController {
    @Autowired
    private WellbeingService wellbeingService;
    @PostMapping("/takeTest")
    public ResponseEntity<WellbeingTest> takeTest(@RequestBody HashMap<String , Object> response) {
        int userid = (int)response.get("id");
        Map<String , String > QuestionAndAnswer = (Map<String , String>) response.get("QuestionAndAnswer");
        WellbeingTestDTO wellbeingTestDTO = new WellbeingTestDTO();
        wellbeingTestDTO.setResponses(QuestionAndAnswer);
        wellbeingTestDTO.setUserId(userid);
        WellbeingTest result = wellbeingService.takeTest(wellbeingTestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    @GetMapping("/getTestResults")
    public ResponseEntity<HashMap<String, Object>> getTestResults(@RequestParam("id") int userId) {
       HashMap<String , Object> status = new HashMap<>();
       status.put("status" , wellbeingService.getTestResults(userId));
       return ResponseEntity.ok().body(status);
    }
    @GetMapping("/getRecommendations")
    public ResponseEntity<HashMap<String , Object>> getRecommendations(@RequestParam("id") int id) {

        HashMap<String , Object> recommendations = new HashMap<>();
        recommendations.put("recommendation" , wellbeingService.getRecommendations(id));
//         System.out.println("Hello");
        return ResponseEntity.ok().body(recommendations);
    }

    // Endpoint to delete a test by ID (DELETE request)
    @DeleteMapping("/deleteTest/{id}")
    public ResponseEntity<String> deleteTestById(@PathVariable("id") int id) {
        // Call the service to delete the test
        boolean isDeleted = wellbeingService.deleteTestById(id);

        // Return appropriate response based on whether the deletion was successful
        if (isDeleted) {
            return new ResponseEntity<>("Test deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Test not found.", HttpStatus.NOT_FOUND);
        }
    }
}

