# Real-Time Convoy & Vehicle GPS Tracking System

A pipeline-first architecture for reliable fleet management with real-time GPS tracking, convoy coordination, and automated alerting.

## Features

- **Real-Time GPS Tracking**: Process and store GPS data from vehicles
- **Convoy Management**: Create and manage vehicle convoys with route planning
- **Automated Alerts**: Speed violation and geofence breach detection
- **WebSocket Broadcasting**: Real-time updates to connected clients
- **Queue-Based Processing**: Reliable job processing with BullMQ
- **PostgreSQL Database**: Robust data storage with proper indexing
- **Redis Caching**: High-performance caching and queue management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Cache/Queue**: Redis, BullMQ
- **Real-time**: WebSockets
- **Validation**: Joi
- **Logging**: Winston
- **Email**: Nodemailer

## Project Structure

```
src/
├── config/          # Database, Redis, Queue configuration
├── controllers/     # (Future) Business logic controllers
├── routes/          # API route handlers
├── services/        # Business logic services
├── workers/         # BullMQ job processors
├── models/          # Data models
├── utils/           # Helpers (haversine, validators, logger)
├── sockets/         # WebSocket management
├── middleware/      # Auth, validation, error handling
├── app.js           # Express app setup
└── index.js         # Server entry point
```

## API Endpoints

### GPS
- `POST /api/gps` - Submit GPS data

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/:id` - Get vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Convoys
- `GET /api/convoys` - List all convoys
- `POST /api/convoys` - Create convoy
- `GET /api/convoys/:id` - Get convoy
- `PUT /api/convoys/:id` - Update convoy
- `DELETE /api/convoys/:id` - Delete convoy

## Setup Instructions

### Local Development

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd fleet-management
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env` and configure:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:pass@localhost:5432/convoy
   REDIS_URL=redis://127.0.0.1:6379
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

3. **Start services:**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d

   # Or start manually
   npm run dev
   ```

### Railway Deployment

1. **Connect to Railway:**
   - Import this repository to Railway
   - Railway will automatically detect the Dockerfile

2. **Environment Variables in Railway:**
   Set these in Railway dashboard:
   - `DATABASE_URL` (provided by Railway Postgres)
   - `REDIS_URL` (provided by Railway Redis)
   - `JWT_SECRET` (generate a secure secret)
   - `NODE_ENV=production`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` (for email alerts)

3. **Deploy:**
   Railway will build and deploy automatically on push.

## Testing

### GPS Pipeline Test
```bash
curl -X POST http://localhost:5000/api/gps \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": "1",
    "lat": 40.7128,
    "lng": -74.0060,
    "speed": 130,
    "timestamp": "2024-01-01T12:00:00Z"
  }'
```

### WebSocket Test
Connect to `ws://localhost:5000` and listen for real-time updates.

## Architecture

### Pipeline Flow
1. **Input**: GPS data received via API
2. **Validation**: Joi schema validation
3. **Queue**: Job added to BullMQ queue
4. **Worker**: Background processing
5. **Decision Logic**: Alert generation
6. **Output**: Database storage + WebSocket broadcast + Notifications

### Reliability Features
- Queue retries with exponential backoff
- Database connection pooling
- Error logging and monitoring
- Graceful failure handling
- Health checks for deployment

## Contributing

1. Follow the pipeline-first architecture
2. Add proper error handling and logging
3. Test thoroughly before committing
4. Update documentation as needed

## License

ISC