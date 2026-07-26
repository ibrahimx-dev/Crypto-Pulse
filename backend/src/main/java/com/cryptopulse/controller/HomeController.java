package com.cryptopulse.controller;

import com.cryptopulse.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HomeController – provides a mapping for the root path (/) to serve as a clean health check 
 * endpoint for cloud providers (like Render) and avoid NoResourceFoundException.
 */
@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<ApiResponse<String>> index() {
        return ResponseEntity.ok(ApiResponse.success(
                "Welcome to the CryptoPulse API! The API is running correctly.", 
                "HEALTHY"
        ));
    }
}
