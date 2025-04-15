package com.finalproject.service.impl;

import com.finalproject.model.IOC;
import com.finalproject.repository.IOCRepository;
import com.finalproject.service.IOCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IOCServiceImpl implements IOCService {
    
    @Autowired
    private IOCRepository iocRepository;

    @Override
    public List<IOC> getAllIOCs() {
        return iocRepository.findAll();
    }

    @Override
    public List<IOC> getIOCsByType(String type) {
        return iocRepository.findByType(type);
    }

    @Override
    public List<IOC> getIOCsBySeverity(String severity) {
        return iocRepository.findBySeverity(severity);
    }

    @Override
    public IOC saveIOC(IOC ioc) {
        return iocRepository.save(ioc);
    }

    @Override
    public void deleteIOC(Long id) {
        iocRepository.deleteById(id);
    }

    @Override
    public long getTotalIOCCount() {
        return iocRepository.getTotalIOCCount();
    }

    @Override
    public long getActiveThreatsCount() {
        return iocRepository.getActiveThreatsCount();
    }

    @Override
    public List<IOC> getRecentIOCs() {
        return iocRepository.findAllOrderByFirstSeenDesc();
    }
} 