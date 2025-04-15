package com.finalproject.controller;

import com.finalproject.model.IOC;
import com.finalproject.service.IOCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/iocs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IOCController {
    
    @Autowired
    private IOCService iocService;

    @GetMapping
    public List<IOC> getAllIOCs() {
        return iocService.getAllIOCs();
    }

    @GetMapping("/type/{type}")
    public List<IOC> getIOCsByType(@PathVariable String type) {
        return iocService.getIOCsByType(type);
    }

    @GetMapping("/severity/{severity}")
    public List<IOC> getIOCsBySeverity(@PathVariable String severity) {
        return iocService.getIOCsBySeverity(severity);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalIocs", iocService.getTotalIOCCount());
        stats.put("activeThreats", iocService.getActiveThreatsCount());
        stats.put("recentIocs", iocService.getRecentIOCs());
        return ResponseEntity.ok(stats);
    }

    @PostMapping
    public IOC addIOC(@RequestBody IOC ioc) {
        return iocService.saveIOC(ioc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIOC(@PathVariable Long id) {
        iocService.deleteIOC(id);
        return ResponseEntity.ok().build();
    }
} 