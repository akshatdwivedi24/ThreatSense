package com.finalproject.repository;

import com.finalproject.model.IOC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOCRepository extends JpaRepository<IOC, Long> {
    List<IOC> findByType(String type);
    List<IOC> findBySeverity(String severity);
    
    @Query("SELECT COUNT(i) FROM IOC i")
    long getTotalIOCCount();
    
    @Query("SELECT COUNT(i) FROM IOC i WHERE i.severity = 'high'")
    long getActiveThreatsCount();
    
    @Query("SELECT i FROM IOC i ORDER BY i.firstSeen DESC")
    List<IOC> findAllOrderByFirstSeenDesc();
} 