package com.colleges.platform.models;

import jakarta.persistence.*;

@Entity
@Table(name="colleges")
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "college_id")
    private int college_id;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "notes")
    private String notes;

    @Column(name = "app_status")
    private int app_status;

    public College() {

    }

    public College(int college_id, int user_id, String notes, int app_status) {
        this.college_id = college_id;
        this.user_id = user_id;
        this.notes = notes;
        this.app_status = app_status;
    }

    public int getId() {
        return id;
    }

    public int getCollege_id() {
        return college_id;
    }

    public void setCollege_id(int college_id) {
        this.college_id = college_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getApp_status() {
        return app_status;
    }

    public void setApp_status(int app_status) {
        this.app_status = app_status;
    }

    @Override
    public String toString() {
        return "College{" +
                "id=" + id +
                ", college_id=" + college_id +
                ", user_id=" + user_id +
                ", notes='" + notes + '\'' +
                ", app_status=" + app_status +
                '}';
    }

}
