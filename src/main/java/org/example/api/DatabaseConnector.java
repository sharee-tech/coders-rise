/*
Created by grayson cummins
 */
package org.example.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.example.models.College;

public class DatabaseConnector {
    private Connection connection;

    // Establish a connection to the SQLite database
        public void connect() {
            String url = "jdbc:mysql://localhost:3306/collegerise";
            String username = "coderrise";
            String password = "coderrise";

            try {
                connection = DriverManager.getConnection(url, username, password);
                System.out.println("Connected to the database.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    // Close the database connection
    public void close() {
        try {
            if (connection != null) {
                connection.close();
                System.out.println("Database connection closed.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Save a college to the database
    public void saveCollege(College college) {
        connect(); // Connect to the database

        try {
            PreparedStatement pstmt = connection.prepareStatement("INSERT INTO colleges(name, city, state, country, website) VALUES (?, ?, ?, ?, ?)");
            pstmt.setString(1, college.getName());
            pstmt.setString(2, college.getCity());
            pstmt.setString(3, college.getState());
            pstmt.setString(4, college.getWebsite());

            pstmt.executeUpdate();
            System.out.println("College saved to the database.");
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(); // Close the connection after the operation
        }
    }

    // Retrieve a college from the database by name
    public College getCollegeByName(String name) {
        connect(); // Connect to the database
        College college = null;

        try {
            PreparedStatement pstmt = connection.prepareStatement("SELECT * FROM colleges WHERE name = ?");
            pstmt.setString(1, name);

            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                college = new College();
                college.setName(rs.getString("name"));
                college.setCity(rs.getString("city"));
                college.setCity(rs.getString("state"));
                college.setWebsite(rs.getString("website"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(); // Close the connection after the operation
        }

        return college;
    }
}
