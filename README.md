# ThreatSense - IOC Aggregator

A full-stack cybersecurity application that collects and displays Indicators of Compromise (IOCs) from various open-source feeds.

## Features

- React.js frontend with Tailwind CSS + shadcn/ui
- Spring Boot backend with RESTful API
- Python microservice for IOC scraping
- PostgreSQL database
- Docker support

## Prerequisites

- Node.js 18+
- Java 17+
- Python 3.8+
- PostgreSQL
- Docker and Docker Compose

## Setup

### Frontend Setup

```bash
cd FrontEnd
npm install
npm run dev
```

### Backend Setup

1. Configure PostgreSQL in `application.properties`
2. Build and run:
```bash
./mvnw spring-boot:run
```

### Python Service Setup

```bash
cd PyBackEnd
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python ioc_scraper.py
```

### Docker Setup

```bash
docker-compose up --build
```

## API Endpoints

- `GET /api/iocs` - Get all IOCs
- `GET /api/iocs/search` - Search IOCs by type, value, tag, or severity
- `POST /api/iocs` - Add a new IOC
- `GET /api/iocs/enrich/{ioc}` - Enrich IOC data

## Environment Variables

### Python Service
- `SPRING_API_URL` - Backend API URL
- `ALIENVAULT_API_KEY` - AlienVault OTX API key
- `ABUSEIPDB_API_KEY` - AbuseIPDB API key

### Spring Boot
- `spring.datasource.url` - PostgreSQL connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password

## Security

- Token-based authentication
- API key support for external access
- Secure database configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 