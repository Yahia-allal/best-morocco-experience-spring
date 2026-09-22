# Best Morocco Experience — React + Spring Boot

## Architecture

- `frontend/` React + Vite
- `backend/` Spring Boot REST API + JPA
- Local database: H2 file database
- Production-ready DB profile: MySQL configuration included

## Run locally

### Backend

Requires Java 17+ and Maven.

```bash
cd backend
mvn spring-boot:run
```

API: http://localhost:8080

### Frontend

Requires Node.js.

```bash
cd frontend
npm install
npm run dev
```

Website: http://localhost:5173
Admin: http://localhost:5173/admin

## Admin features

The admin UI currently provides:

- Overview counts
- List circuits
- Add circuit
- Edit circuit
- Delete circuit
- View bookings
- View messages

## Before production

The local version intentionally keeps authentication simple while the site is being built. Before Hostinger deployment, add Spring Security authentication to `/api/admin/**`, create the real admin user, use MySQL, configure CORS for the final domain, and build the React frontend.

## Hostinger direction

For Spring Boot, deploy the backend to a Java-capable VPS/runtime. Use MySQL for production. The frontend can be built with `npm run build` and served as static files, or bundled into Spring Boot later for a single deployable service.
