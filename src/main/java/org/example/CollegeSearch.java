/*
Created by grayson cummins
 */
package org.example;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class CollegeSearch {
    public static void main(String[] args) {
                try {
                    // User input for college name
                    String collegeName = "Example University"; // Replace with user input

                    // URL encode the search term
                    String encodedCollegeName = URLEncoder.encode(collegeName, "UTF-8");

                    // API endpoint for searching by name
                    String apiUrl = "https://api.data.gov/ed/collegescorecard/v1/schools?"
                            + "api_key=9ZZyOXWjgPiz1iFHyL40BbmbzgVUVQhApNCAvH5M"
                            + "&school.name=" + encodedCollegeName;

                    // Make HTTP GET request
                    URL url = new URL(apiUrl);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");

                    int responseCode = connection.getResponseCode();
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        String inputLine;
                        StringBuilder response = new StringBuilder();

                        while ((inputLine = in.readLine()) != null) {
                            response.append(inputLine);
                        }
                        in.close();

                        // Process and display API response
                        System.out.println(response.toString());
                    } else {
                        System.out.println("Error: " + responseCode);
                    }
                    connection.disconnect();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }