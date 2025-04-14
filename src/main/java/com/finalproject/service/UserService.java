package com.finalproject.service;

import com.finalproject.dto.UserRegistrationDto;
import com.finalproject.entity.User;
import com.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(UserRegistrationDto registrationDto) {
        // Check if user already exists
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setCompany(registrationDto.getCompany());
        user.setJobTitle(registrationDto.getJobTitle());
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setGoogleUser(registrationDto.isGoogleUser());

        return userRepository.save(user);
    }

    @Transactional
    public User registerGoogleUser(String email, String firstName, String lastName, String profilePicture) {
        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setProfilePicture(profilePicture);
        user.setGoogleUser(true);
        user.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString())); // Random password for Google users

        return userRepository.save(user);
    }

    public boolean isEmailRegistered(String email) {
        return userRepository.existsByEmail(email);
    }
} 