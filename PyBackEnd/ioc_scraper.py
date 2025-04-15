import requests
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv
import logging
from typing import List, Dict, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

load_dotenv()

# API Configuration
SPRING_API_URL = os.getenv('SPRING_API_URL', 'http://localhost:8081/api/iocs')
ALIENVAULT_API_KEY = os.getenv('ALIENVAULT_API_KEY')
ABUSEIPDB_API_KEY = os.getenv('ABUSEIPDB_API_KEY')
VIRUSTOTAL_API_KEY = os.getenv('VIRUSTOTAL_API_KEY', 'f872c40bbdebbe825ee654fb9ad1df355185df994f32eacba16b5387444ee343')

def get_virustotal_iocs() -> List[Dict[str, Any]]:
    """Fetch IOCs from VirusTotal"""
    url = "https://www.virustotal.com/api/v3/search/content"
    headers = {
        'x-apikey': VIRUSTOTAL_API_KEY,
        'accept': 'application/json'
    }
    params = {
        'query': 'type:ip reputation:malicious',
        'limit': 10  # Start with a small limit to avoid hitting rate limits
    }
    
    try:
        logger.info("Fetching IOCs from VirusTotal...")
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json().get('data', [])
            iocs = []
            
            for item in data:
                attributes = item.get('attributes', {})
                stats = attributes.get('last_analysis_stats', {})
                malicious_count = stats.get('malicious', 0)
                
                ioc = {
                    'value': attributes.get('id', ''),
                    'type': 'ip',
                    'source': 'VirusTotal',
                    'severity': 'high' if malicious_count > 5 else 'medium',
                    'tags': ['malicious', 'virustotal'],
                    'threatScore': malicious_count,
                    'description': f"Detected as malicious by {malicious_count} engines",
                    'firstSeen': datetime.now().isoformat()
                }
                iocs.append(ioc)
            
            logger.info(f"Successfully fetched {len(iocs)} IOCs from VirusTotal")
            return iocs
        else:
            logger.error(f"Failed to fetch from VirusTotal: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Error fetching from VirusTotal: {str(e)}")
    return []

def get_alienvault_iocs() -> List[Dict[str, Any]]:
    """Fetch IOCs from AlienVault OTX"""
    if not ALIENVAULT_API_KEY:
        logger.warning("AlienVault API key not configured, skipping...")
        return []
        
    url = "https://otx.alienvault.com/api/v1/pulses/subscribed"
    headers = {'X-OTX-API-KEY': ALIENVAULT_API_KEY}
    
    try:
        logger.info("Fetching IOCs from AlienVault OTX...")
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            pulses = response.json()['results']
            iocs = []
            
            for pulse in pulses:
                for indicator in pulse['indicators']:
                    ioc = {
                        'value': indicator['indicator'],
                        'type': indicator['type'],
                        'source': 'AlienVault OTX',
                        'severity': 'high' if pulse['adversary'] else 'medium',
                        'tags': pulse['tags'] or [],
                        'threatScore': pulse.get('threat_score', 0),
                        'description': pulse['description'],
                        'firstSeen': datetime.now().isoformat()
                    }
                    iocs.append(ioc)
            logger.info(f"Successfully fetched {len(iocs)} IOCs from AlienVault")
            return iocs
        else:
            logger.error(f"Failed to fetch from AlienVault: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Error fetching from AlienVault: {str(e)}")
    return []

def get_abuseipdb_iocs() -> List[Dict[str, Any]]:
    """Fetch IOCs from AbuseIPDB"""
    if not ABUSEIPDB_API_KEY:
        logger.warning("AbuseIPDB API key not configured, skipping...")
        return []
        
    url = "https://api.abuseipdb.com/api/v2/blacklist"
    headers = {
        'Key': ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
    }
    params = {
        'confidenceMinimum': 90,
        'limit': 100
    }
    
    try:
        logger.info("Fetching IOCs from AbuseIPDB...")
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()['data']
            iocs = []
            
            for item in data:
                ioc = {
                    'value': item['ipAddress'],
                    'type': 'ip',
                    'source': 'AbuseIPDB',
                    'severity': 'high' if item['abuseConfidenceScore'] > 90 else 'medium',
                    'tags': ['abuse', 'malicious'],
                    'threatScore': item['abuseConfidenceScore'],
                    'description': f"Abuse confidence score: {item['abuseConfidenceScore']}",
                    'firstSeen': datetime.now().isoformat()
                }
                iocs.append(ioc)
            logger.info(f"Successfully fetched {len(iocs)} IOCs from AbuseIPDB")
            return iocs
        elif response.status_code == 429:  # Rate limit exceeded
            logger.warning("AbuseIPDB daily limit reached, skipping...")
            return []
        else:
            logger.error(f"Failed to fetch from AbuseIPDB: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Error fetching from AbuseIPDB: {str(e)}")
    return []

def save_iocs(iocs: List[Dict[str, Any]]) -> None:
    """Save IOCs to Spring Boot backend"""
    if not iocs:
        return
        
    headers = {'Content-Type': 'application/json'}
    
    for ioc in iocs:
        try:
            logger.info(f"Saving IOC: {ioc['value']} from {ioc['source']}")
            response = requests.post(SPRING_API_URL, json=ioc, headers=headers)
            if response.status_code == 200:
                logger.info(f"Successfully saved IOC: {ioc['value']}")
            else:
                logger.error(f"Error saving IOC {ioc['value']}: {response.status_code} - {response.text}")
        except Exception as e:
            logger.error(f"Error saving IOC {ioc['value']}: {str(e)}")
        time.sleep(0.1)  # Small delay to avoid overwhelming the backend

def main():
    """Main function to run the IOC scraper"""
    logger.info("Starting IOC scraper...")
    
    while True:
        try:
            # Fetch from VirusTotal
            virustotal_iocs = get_virustotal_iocs()
            if virustotal_iocs:
                save_iocs(virustotal_iocs)
                logger.info(f"Saved {len(virustotal_iocs)} IOCs from VirusTotal")
            
            # Fetch from AlienVault if configured
            if ALIENVAULT_API_KEY:
                alienvault_iocs = get_alienvault_iocs()
                if alienvault_iocs:
                    save_iocs(alienvault_iocs)
                    logger.info(f"Saved {len(alienvault_iocs)} IOCs from AlienVault")
            
            # Fetch from AbuseIPDB if configured and not rate limited
            if ABUSEIPDB_API_KEY:
                abuseipdb_iocs = get_abuseipdb_iocs()
                if abuseipdb_iocs:
                    save_iocs(abuseipdb_iocs)
                    logger.info(f"Saved {len(abuseipdb_iocs)} IOCs from AbuseIPDB")
            
            logger.info("Waiting for 5 minutes before next fetch...")
            time.sleep(300)  # 5 minutes
            
        except KeyboardInterrupt:
            logger.info("Scraper stopped by user")
            break
        except Exception as e:
            logger.error(f"Unexpected error in main loop: {str(e)}")
            time.sleep(60)  # Wait 1 minute before retrying

if __name__ == "__main__":
    main() 