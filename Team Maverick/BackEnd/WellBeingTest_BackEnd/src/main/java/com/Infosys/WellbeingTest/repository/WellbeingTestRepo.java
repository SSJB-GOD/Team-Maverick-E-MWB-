package com.Infosys.WellbeingTest.repository;

import com.Infosys.WellbeingTest.model.WellbeingTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WellbeingTestRepo extends JpaRepository<WellbeingTest, Integer> {
     Optional<WellbeingTest> findById(int id);
     List<WellbeingTest> findByUserId(int user_id);
}
