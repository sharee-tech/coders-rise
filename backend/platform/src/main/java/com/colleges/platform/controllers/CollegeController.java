package com.colleges.platform.controllers;

import com.colleges.platform.models.College;
import com.colleges.platform.repositories.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
//import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CollegeController {
    @Autowired
    CollegeRepository collegeRepository;

    @GetMapping("/colleges")
    public ResponseEntity<List<College>> getAllColleges() {
        try {
            List<College> colleges = new ArrayList<College>();
                collegeRepository.findAll().forEach(colleges::add);
            if (colleges.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(colleges, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/colleges/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable("id") Integer id) {
        Optional<College> collegeData = collegeRepository.findById(id);

        if (collegeData.isPresent()) {
            return new ResponseEntity<>(collegeData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/colleges")
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        try {
            College _college = collegeRepository
                    .save(new College(college.getUserId(), college.getCollegeId(), college.getNotes(), college.getAppStatus()));
            return new ResponseEntity<>(_college, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/colleges/{userId}/{collegeId}")
    public ResponseEntity<College> updateCollege(@PathVariable("userId") Integer userId, @PathVariable("collegeId") Integer collegeId, @RequestBody College college) {
        Optional<College> collegeData = collegeRepository.findByUserIdAndCollegeId(userId, collegeId);

        if (collegeData.isPresent()) {
            College _college = collegeData.get();
            _college.setAppStatus(college.getAppStatus());
            _college.setNotes(college.getNotes());

            return new ResponseEntity<>(collegeRepository.save(_college), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/colleges/{userId}/{collegeId}")
    public ResponseEntity<HttpStatus> deleteCollege(@PathVariable("userId") Integer userId, @PathVariable("collegeId") Integer collegeId) {
        try {
           collegeRepository.deleteByUserIdAndCollegeId(userId, collegeId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/colleges")
    public ResponseEntity<HttpStatus> deleteAllColleges() {
        try {
            collegeRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
