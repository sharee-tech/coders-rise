/*
Represents the structure and properties of a user entity within the application, mapping
its attributes to the database schema and encapsulating user-related data.
 */
package org.example.models;

import jakarta.persistence.*;



@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column(name = "userId")
    private int userID;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    // Constructors, getters, setters

    public User(int userID, String username, String password, String email) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getters and setters for the fields

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}