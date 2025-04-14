package com.finalproject.service;

import com.finalproject.entity.IOC;
import com.finalproject.repository.IOCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IOCService {
    @Autowired
    private IOCRepository iocRepository;

    public List<IOC> getAllIOCs() {
        return iocRepository.findAll();
    }

    public IOC addIOC(IOC ioc) {
        ioc.setTimestamp(LocalDateTime.now());
        return iocRepository.save(ioc);
    }

    public List<IOC> searchIOCs(String type, String value, String tag, String severity) {
        if (type != null && value != null) {
            return iocRepository.findByTypeAndValue(type, value);
        } else if (type != null) {
            return iocRepository.findByType(type);
        } else if (value != null) {
            return iocRepository.findByValueContaining(value);
        } else if (tag != null) {
            return iocRepository.findByTagsContaining(tag);
        } else if (severity != null) {
            return iocRepository.findBySeverity(severity);
        }
        return iocRepository.findAll();
    }
} 