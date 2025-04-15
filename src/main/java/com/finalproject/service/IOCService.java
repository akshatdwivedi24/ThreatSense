package com.finalproject.service;

import com.finalproject.model.IOC;
import java.util.List;

public interface IOCService {
    List<IOC> getAllIOCs();
    List<IOC> getIOCsByType(String type);
    List<IOC> getIOCsBySeverity(String severity);
    IOC saveIOC(IOC ioc);
    void deleteIOC(Long id);
    long getTotalIOCCount();
    long getActiveThreatsCount();
    List<IOC> getRecentIOCs();
} 