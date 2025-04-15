@echo off
title ThreatSense IOC Scraper
color 0A

echo ================================
echo    ThreatSense IOC Scraper
echo ================================
echo.
echo Starting IOC scraper...
echo The scraper will collect threat intelligence from:
echo - VirusTotal
echo - AlienVault OTX (if configured)
echo - AbuseIPDB (if not rate limited)
echo.
echo Press Ctrl+C to stop the scraper
echo.

"C:\Users\aksha\AppData\Local\Programs\Python\Python313\python.exe" ioc_scraper.py

if errorlevel 1 (
    color 0C
    echo.
    echo Error running the scraper! Please check the error message above.
    echo.
    pause
    exit /b 1
) 