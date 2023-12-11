package com.colleges.platform.controllers;

import com.colleges.platform.models.College;
import com.colleges.platform.repositories.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CollegeController {
    @Autowired
    CollegeRepository collegeRepository;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("employers", collegeRepository.findAll());
        return "employers/index";
    }

    @GetMapping("/colleges")
    public ResponseEntity<List<College>> getAllColleges() {
        return new ResponseEntity<>(collegeRepository.findAll(), HttpStatus.OK);
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
                    .save(new College(college.getApp_status(), college.getCollege_id(), college.getNotes(), college.getUser_id()));
            return new ResponseEntity<>(_college, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PutMapping("/colleges/{id}")
//    public ResponseEntity<College> updateCollege(@PathVariable("id") Integer id, @RequestBody College college) {
//        Optional<College> collegeData = collegeRepository.findById(id);
//
//        if (collegeData.isPresent()) {
//            College _college = collegeData.get();
//            _college.setTitle(college.getTitle());
//            _college.setDescription(college.getDescription());
//            _college.setPublished(college.isPublished());
//            return new ResponseEntity<>(collegeRepository.save(_college), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

//    @DeleteMapping("/colleges/{id}")
//    public ResponseEntity<HttpStatus> deleteCollege(@PathVariable("id") Integer id) {
//        try {
//            collegeRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @DeleteMapping("/colleges")
//    public ResponseEntity<HttpStatus> deleteAllColleges() {
//        try {
//            collegeRepository.deleteAll();
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//


}
