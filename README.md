# Travel Planner AI

AI-powered travel planning application built for learning.

## Architecture

- Next.js + TypeScript
- NestJS + TypeScript
- PostgreSQL + Prisma
- Redis
- Kafka
- AI Agents
- MCP (later stage)

## Architecture Style

Microservices Architecture

## Project Structure

- `frontend` - Next.js application
- `backend` - Backend microservices
- `infrastructure` - Docker and infrastructure configuration
- `docs` - Architecture and technical documentation

## Prerequisites

Make sure you have the following installed:

- Node.js 22.21.1
- npm 11.6.2
- Docker Desktop
- Git

## How to Start the Application

### 1. Clone the Repository

```bash
git clone https://github.com/abhilashsethi/travel-planner-ai.git
cd travel-planner-ai
```

### 2. Start Infrastructure Services

Start PostgreSQL, Redis, Kafka, and Kafka UI using Docker Compose:

```bash
cd infrastructure/docker
docker compose up -d
```

Verify that the containers are running:

```bash
docker ps
```

Useful URLs and ports:

- **API Gateway:** http://localhost:3000
- **Kafka UI:** http://localhost:8080
- **PostgreSQL:** `localhost:5433`
- **Redis:** `localhost:6380`
- **Kafka:** `localhost:9092`

### 3. Configure Environment Variables

Before starting each service, make sure its `.env` file is configured.

For the User Service and Trip Service, configure the database connection:

```env
DATABASE_URL="postgresql://travel_admin:travel_password@localhost:5433/travel_planner"
```

Use the environment variables required by each service. Do not commit secrets or production credentials to Git.

### 4. Install Dependencies

Open a separate terminal for each application or service.

For each backend service:

```bash
cd backend/user-service
npm install
```

Repeat for the other backend services:

- `backend/api-gateway`
- `backend/trip-service`
- `backend/ai-service`

Install frontend dependencies:

```bash
cd frontend
npm install
```

### 5. Start the Backend Services

Start each service in a separate terminal using its development script:

```bash
npm run start:dev
```

Start the services from their respective directories:

| Service      |                  Port |
| ------------ | --------------------: |
| API Gateway  |                  3000 |
| User Service |                  3001 |
| Trip Service |                  3002 |
| AI Service   | Configure as required |

For example, start the Trip Service:

```bash
cd backend/trip-service
npm run start:dev
```

Repeat for each backend service.

### 6. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Open the frontend URL printed in the terminal, typically http://localhost:3000.

**Note:** If the API Gateway is already running on port `3000`, configure the frontend to use a different port, such as `3003`, or configure the services to use non-conflicting ports.

### 7. Verify the Services

Check the API Gateway health endpoint:

```http
GET http://localhost:3000/api/health
```

Check the User Service health endpoint:

```http
GET http://localhost:3001/api/health
```

Check the Trip Service health endpoint:

```http
GET http://localhost:3002/api/health
```

Expected response format:

```json
{
  "status": "ok",
  "service": "trip-service"
}
```

The `service` value will vary depending on which service you check.

## Stop the Application

Stop each backend and frontend process using `Ctrl + C`.

Stop the Docker infrastructure:

```bash
cd infrastructure/docker
docker compose down
```

This stops the containers but preserves their data in Docker volumes, if configured.

## Development Status

This project is being developed incrementally as a learning project. AI agents, RAG, and MCP integrations will be added in later stages.
