import os
import asyncio
import aiohttp
from datetime import datetime
from dotenv import load_dotenv
import schedule
import time

load_dotenv()

class IOCScraper:
    def __init__(self):
        self.api_url = os.getenv('SPRING_API_URL', 'http://localhost:8080/api/iocs')
        self.headers = {'Content-Type': 'application/json'}

    async def fetch_alienvault(self):
        async with aiohttp.ClientSession() as session:
            async with session.get('https://otx.alienvault.com/api/v1/pulses/subscribed') as response:
                if response.status == 200:
                    data = await response.json()
                    return self.process_alienvault_data(data)
        return []

    async def fetch_abuseipdb(self):
        async with aiohttp.ClientSession() as session:
            async with session.get('https://api.abuseipdb.com/api/v2/blacklist') as response:
                if response.status == 200:
                    data = await response.json()
                    return self.process_abuseipdb_data(data)
        return []

    def process_alienvault_data(self, data):
        iocs = []
        for pulse in data.get('results', []):
            for indicator in pulse.get('indicators', []):
                ioc = {
                    'type': indicator.get('type', '').upper(),
                    'value': indicator.get('indicator', ''),
                    'source': 'AlienVault OTX',
                    'timestamp': datetime.now().isoformat(),
                    'tags': ','.join(pulse.get('tags', [])),
                    'severity': pulse.get('tlp', 'unknown'),
                    'description': pulse.get('description', '')
                }
                iocs.append(ioc)
        return iocs

    def process_abuseipdb_data(self, data):
        iocs = []
        for entry in data.get('data', []):
            ioc = {
                'type': 'IP',
                'value': entry.get('ipAddress', ''),
                'source': 'AbuseIPDB',
                'timestamp': datetime.now().isoformat(),
                'tags': 'malicious',
                'severity': 'high',
                'description': f"Abuse confidence score: {entry.get('abuseConfidenceScore', 0)}"
            }
            iocs.append(ioc)
        return iocs

    async def send_to_backend(self, iocs):
        async with aiohttp.ClientSession() as session:
            for ioc in iocs:
                async with session.post(self.api_url, json=ioc, headers=self.headers) as response:
                    if response.status != 201:
                        print(f"Failed to send IOC: {ioc}")

    async def run_scraping(self):
        print("Starting IOC scraping...")
        alienvault_iocs = await self.fetch_alienvault()
        abuseipdb_iocs = await self.fetch_abuseipdb()
        
        all_iocs = alienvault_iocs + abuseipdb_iocs
        await self.send_to_backend(all_iocs)
        print(f"Scraped and sent {len(all_iocs)} IOCs")

def main():
    scraper = IOCScraper()
    
    async def scheduled_task():
        await scraper.run_scraping()

    # Schedule the task to run every hour
    schedule.every().hour.do(lambda: asyncio.run(scheduled_task()))

    # Run the scheduler
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main() 