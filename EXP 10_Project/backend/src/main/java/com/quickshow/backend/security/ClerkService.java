package com.quickshow.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class ClerkService {

    @Value("${clerk.api.key}")
    private String clerkApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public JSONObject verifyToken(String token) {
        String url = "https://api.clerk.dev/v1/tokens/verify"; // Clerk verify token endpoint

        try {
            // Set headers
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("Authorization", "Bearer " + clerkApiKey);
            headers.set("Content-Type", "application/json");

            // Prepare request body
            JSONObject body = new JSONObject();
            body.put("token", token);

            org.springframework.http.HttpEntity<String> request =
                    new org.springframework.http.HttpEntity<>(body.toString(), headers);

            // Send POST request
            org.springframework.http.ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            return new JSONObject(response.getBody());

        } catch (Exception e) {
            throw new RuntimeException("Invalid Clerk token: " + e.getMessage(), e);
        }
    }
}
