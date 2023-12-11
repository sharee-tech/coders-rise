package com.colleges.platform.repositories;

import com.colleges.platform.models.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Integer> {
//    List<College> findByPublished(boolean published);
//    List<College> findByTitleContaining(String title);
}











