package com.colleges.platform.repositories;

import com.colleges.platform.models.College;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface CollegeRepository extends JpaRepository<College, Integer> {

    Optional<College> findByUserIdAndCollegeId(int userId, int collegeId);


    List<College> findByUserId(Integer userId);
}












