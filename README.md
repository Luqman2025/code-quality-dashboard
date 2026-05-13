# Code Quality Intelligence Dashboard

A full-stack dashboard that extends SonarQube with multi-project visibility and developer productivity scoring. The system includes Docker and Kubernetes demos, plus public access via ngrok and frontend hosting on Vercel.

## Project Structure

```
backend/
  src/
    controllers/
    middleware/
    routes/
    services/
    utils/
frontend/
  src/
    components/
    pages/
    services/
kubernetes/
  backend-deployment.yaml
  backend-service.yaml
.env.example
docker-compose.yml
README.md
```

## Prerequisites

- Docker Desktop
- Node.js 18+
- ngrok account
- SonarQube token (Community Edition)
- Optional: GitHub token and repo

## Environment Variables

Create a `.env` file at the project root using `.env.example` as a template.

```
SONARQUBE_URL=http://localhost:9000
SONARQUBE_TOKEN=your_token_here
GITHUB_TOKEN=your_github_token
GITHUB_REPO=owner/repo
API_PORT=5001
VITE_API_BASE_URL=http://localhost:5001/api
```

## Run with Docker (Required)

```
docker-compose up --build
```

Services:
- SonarQube: http://localhost:9000
- Backend API: http://localhost:5001
- Frontend UI: http://localhost:3000
- Grafana: http://localhost:3001 (admin/admin123)
- Prometheus: http://localhost:9090

## Local Development (Optional)

Backend:
```
cd backend
npm install
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/sonar/dashboard`
- `GET /api/developers/scores`
- `GET /api/projects`

## Token-Based Sign-In (Local)

Open the **Connections** page in the UI to paste your SonarQube URL/token and GitHub token/repo.
These values are stored in your browser `localStorage` and sent to the backend with each request.
If values are missing or invalid, the backend falls back to mock data.

## Grafana (Optional)

Grafana runs on http://localhost:3001 with the demo TestData datasource.
Login with `admin` and the password in `GRAFANA_ADMIN_PASSWORD`.
Replace the datasource with Prometheus, Loki, or a JSON API plugin if you want real metrics.

## Prometheus + Grafana (Real Metrics)

This stack scrapes the backend `/metrics` endpoint and visualizes it in Grafana.

Run:
```
docker-compose up --build
```

Verify metrics:
```
curl http://localhost:5001/metrics
```

Open Grafana and check dashboards:
- Grafana: http://localhost:3001
- Dashboard: "Backend Metrics (Prometheus)"

## Kubernetes (Basic Demo)

```
minikube start
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/backend-service.yaml
```

Check:
```
minikube service backend-service
```

## ngrok Integration (Important)

Expose the backend locally:
```
ngrok http 5001
```

Update the frontend API base URL to use the ngrok URL:
- Vercel: set `VITE_API_BASE_URL` to `https://YOUR_NGROK_URL/api`
- Local Docker: update the `VITE_API_BASE_URL` build arg in `docker-compose.yml` and rebuild

## Vercel Deployment (Frontend Only)

1. Push the `frontend` folder to a Git repo.
2. Import the repo in Vercel.
3. Set the environment variable:
   - `VITE_API_BASE_URL=https://YOUR_NGROK_URL/api`
4. Deploy.

The frontend will call the ngrok-exposed backend running on your machine.

## Automated Tests

Backend unit + API tests:
```
cd backend
npm install
npm test
```

Frontend component tests:
```
cd frontend
npm install
npm test
```

## Mock Data Support

If SonarQube or GitHub are unavailable, the backend automatically uses mock data so the UI still renders.

## Notes

- SonarQube token is passed as basic auth username with an empty password.
- For consistent results, keep SonarQube project keys stable.
