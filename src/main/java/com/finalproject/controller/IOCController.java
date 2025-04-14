package com.finalproject.controller;

import com.finalproject.entity.IOC;
import com.finalproject.service.IOCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/iocs")
public class IOCController {
    @Autowired
    private IOCService iocService;

    @GetMapping
    public List<IOC> getAllIOCs() {
        return iocService.getAllIOCs();
    }

    @PostMapping
    public IOC addIOC(@RequestBody IOC ioc) {
        return iocService.addIOC(ioc);
    }

    @GetMapping("/search")
    public List<IOC> searchIOCs(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String value,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String severity) {
        return iocService.searchIOCs(type, value, tag, severity);
    }

    @GetMapping("/enrich/{ioc}")
    public ResponseEntity<String> enrichIOC(@PathVariable String ioc) {
        // TODO: Implement enrichment logic
        return ResponseEntity.ok("Enrichment not implemented yet");
    }
} 