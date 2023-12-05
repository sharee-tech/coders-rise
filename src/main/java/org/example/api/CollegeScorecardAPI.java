/*
Created by grayson cummins
 */
package org.example.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import org.example.models.College;
import org.example.models.CollegeApiResponse;

public class CollegeScorecardAPI {
    private static final String API_BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/";
    private String apiKey; // Your API key for College Scorecard

    public CollegeScorecardAPI(String apiKey) {
        this.apiKey = apiKey;
    }

    public List<College> searchByCollegeName(String collegeName) {
        List<College> colleges = new ArrayList<>();

        try {
            String encodedCollegeName = collegeName.replaceAll(" ", "%20"); // Encode spaces in URL format

            // Construct the API URL for searching colleges by name
            String apiUrl = API_BASE_URL + "schools?api_key=" + apiKey + "&school.name=" + encodedCollegeName;

            // Make HTTP GET request to the API
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

                // Parse API response into College objects using Gson (JSON parsing library)
                Gson gson = new Gson();
                CollegeApiResponse collegeApiResponse = gson.fromJson(response.toString(), CollegeApiResponse.class);

                if (collegeApiResponse != null && collegeApiResponse.getResults() != null) {
                    colleges = collegeApiResponse.getResults();
                }
            } else {
                System.out.println("Error: " + responseCode);
            }
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return colleges;
    }
}