package com.finalproject.controller;

import com.finalproject.dto.UserRegistrationDto;
import com.finalproject.entity.User;
import com.finalproject.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        logger.info("Received registration request for email: {}", registrationDto.getEmail());
        
        try {
            // Validate email format
            if (!registrationDto.getEmail().contains("@")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid email format"));
            }

            // Check if email already exists
            if (userService.isEmailRegistered(registrationDto.getEmail())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
            }

            User user = userService.registerUser(registrationDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", user.getId());
            response.put("email", user.getEmail());
            
            logger.info("Successfully registered user with email: {}", user.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("Error during user registration: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error during user registration", e);
            return ResponseEntity.internalServerError().body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/register/google")
    public ResponseEntity<?> registerGoogleUser(@RequestBody Map<String, String> googleUser) {
        try {
            User user = userService.registerGoogleUser(
                googleUser.get("email"),
                googleUser.get("firstName"),
                googleUser.get("lastName"),
                googleUser.get("profilePicture")
            );
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Google user registered successfully");
            response.put("userId", user.getId());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        logger.info("Checking email existence: {}", email);
        boolean exists = userService.isEmailRegistered(email);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
} 