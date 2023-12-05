
/*
Created by grayson cummins
 */
package org.example.models;


public class College {
    private String name;
    private String city;
    private String state;
    private String website;
    // Add more attributes as needed

    // Constructors
    public College() {
    }

    public College(String name, String city, String state, String country, String website) {
        this.name = name;
        this.city = city;
        this.state = state;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    // toString() method for easy printing/debugging
    @Override
    public String toString() {
        return "College{" +
                "name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", website='" + website + '\'' +
                '}';
    }
}
