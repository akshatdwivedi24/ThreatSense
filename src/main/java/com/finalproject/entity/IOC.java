package com.finalproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "iocs")
@Data
public class IOC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // IP, DOMAIN, HASH

    @Column(nullable = false)
    private String value;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column
    private String tags;

    @Column
    private String severity;

    @Column
    private String description;
} 