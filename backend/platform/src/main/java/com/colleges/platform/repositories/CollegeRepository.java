package com.colleges.platform.repositories;

import com.colleges.platform.models.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Integer> {
//    public void saveCollegeForUser(int userId, String collegeId, String customNote) {
//        String sql = "INSERT INTO UserSaved (user_id, college_id, custom_note) VALUES (?, ?, ?)";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, userId);
//            statement.setString(2, collegeId);
//            statement.setString(3, customNote);
//            statement.executeUpdate();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            // Handle exceptions
//        }

//    List<College> findByPublished(boolean published);
//    List<College> findByTitleContaining(String title);
}












