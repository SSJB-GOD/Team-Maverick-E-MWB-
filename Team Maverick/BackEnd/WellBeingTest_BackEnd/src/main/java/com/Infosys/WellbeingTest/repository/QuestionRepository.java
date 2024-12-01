package com.Infosys.WellbeingTest.repository;

import com.Infosys.WellbeingTest.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
