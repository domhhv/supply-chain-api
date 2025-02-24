# Supply Chain API

This project is a NestJS-based REST API for managing supply chain items and their events. It provides the following core functions:

- **Create a new supply chain item**
- **Update supply chain item reference data** (color, price, etc.)
- **Add new events** associated with an item (location, custodian, etc.)
- **Query all events of an item** – with a shortcut to get the last event

In addition, the project includes:
- An **OpenAPI/Swagger** specification for the API.
- **JSON Schema generation** from DTOs for runtime payload validation.
- A **Dockerfile** and **Docker Compose** configuration for containerized local development.
- A **local-first** setup using a local PostgreSQL database (via Docker Compose) and a Neon PostgreSQL database for production (deployed on Fly.io).

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Local Development](#local-development)
5. [Production Deployment](#production-deployment)
6. [Database Configuration](#database-configuration)
7. [JSON Schema Generation and Validation](#json-schema-generation-and-validation)
8. [API Endpoints](#api-endpoints)
9. [Development Process](#development-process)
10. [Notes](#notes)

---

## Features

- **Supply Chain Management:** Create and update items and record events.
- **OpenAPI Documentation:** Auto-generated Swagger docs available at `/api`.
- **Robust Payload Validation:** Uses class-validator with DTOs and a custom AJV-based JSON Schema validation pipe.
- **Local-First Setup:** Automatically creates and manages a local PostgreSQL database via Docker Compose.
- **Production Ready:** Deploys to Fly.io and connects to a Neon PostgreSQL database.
- **Incremental Development:** Frequent commits showcase the iterative progress throughout the project.

---

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL (local via Docker Compose, production via Neon)
- **ORM:** TypeORM
- **Validation:** class-validator, class-transformer, and AJV (via a custom JSON Schema validation pipe)
- **Documentation:** Swagger (OpenAPI)
- **Containerization:** Docker and Docker Compose

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/domhhv/supply-chain-api.git
cd supply-chain-api
```

### 2. Install Dependencies

```bash
yarn install
```

---

## Local Development

### Environment Variables

Create a `.env.development` file in the root directory with:

```env
NODE_ENV=development
PGHOST=postgres
PGPORT=5433
PGUSER=postgres
PGPASSWORD=local_db_password
PGDATABASE=supply_chain
```

### Docker Compose Setup

The `docker-compose.yml` file sets up two services:

- **api:** Runs the NestJS application.
- **postgres:** Runs a PostgreSQL container with the database name `supply_chain`.

**Important:** The Postgres container’s internal port 5432 is mapped to host port 5433 (to avoid conflicts with any local PostgreSQL instance).

To start the application and the database:

```bash
docker-compose up --build
```

### Connecting to the Database

To connect using a client like Postico 2 or `psql`:

- **Host:** `localhost`
- **Port:** `5433`
- **User:** `postgres`
- **Password:** `local_db_password`
- **Database:** `supply_chain`

---

## Production Deployment

- **Deployment:** The API is deployed to Fly.io.
- **Production Variables:**  
  Set via Fly.io Secrets:
    - `NODE_ENV=production`
    - `DATABASE_URL=<your_neon_db_connection_string>`

In production, it is recommended to disable `synchronize` (and use migrations) for schema changes.

---

## Database Configuration

- **Local:** A PostgreSQL container is managed via Docker Compose.
- **Production:** The Neon PostgreSQL database is used, with credentials securely provided via environment variables.

---

## JSON Schema Generation and Validation

### Generating JSON Schemas

The project uses [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema) to generate JSON Schemas from the DTOs.

**Generation Script:**

A script is located at `scripts/generate-schemas.ts` which imports the DTOs and generates a `dto-schemas.json` file in the `/schemas` directory.

**Run the script:**

```bash
yarn generate-schemas
```

### Runtime Validation

A custom `JsonSchemaValidationPipe` (located at `src/validation/json-schema-validation.pipe.ts`) uses AJV to validate payloads against the generated JSON Schemas. It’s added globally in `main.ts` along with the standard ValidationPipe:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsonSchemaValidationPipe } from './validation/json-schema-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ...rest of the setup
  
  // Class-validator based validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // JSON Schema validation via AJV
  app.useGlobalPipes(new JsonSchemaValidationPipe());
  
  // ...rest of the setup
  
  await app.listen(3000);
}
bootstrap();
```

---

## API Endpoints

The API provides the following endpoints under the `/supply-chain` prefix:

- **POST /supply-chain/items**  
  Create a new supply chain item.

- **PATCH /supply-chain/items/:id**  
  Update an existing supply chain item.

- **POST /supply-chain/items/:id/events**  
  Add a new event to an item.

- **GET /supply-chain/items/:id/events**  
  Retrieve all events for an item.

- **GET /supply-chain/items/:id/events/last**  
  Get the last event (current state) for an item.

Swagger documentation is available at:

```plaintext
http://localhost:3000/api
```

---

## Development Process

This project was developed incrementally with frequent commits to document progress:

1. **Initial Scaffold:**  
   Generated using the NestJS CLI.
2. **Production Setup:**  
      Configured deployment on Fly.io with Neon PostgreSQL.
3. **Docker Compose Integration:**  
   Configured for local PostgreSQL setup.
4. **Entity & DTO Creation:**  
   Implemented entities for `SupplyChainItem` and `SupplyChainEvent` and corresponding DTOs.
5. **Service & Controller Implementation:**  
   Developed core business logic and REST endpoints.
6. **Swagger Integration:**  
   Added auto-generated API documentation.
7. **JSON Schema Generation:**  
   Automated schema generation using class-validator-jsonschema and implemented runtime validation.
8. **Incremental Commits:**  
   A detailed commit history showcasing each development step.

---

## Notes

- **TypeORM Synchronize:**
    - `synchronize: true` is enabled in development for rapid iteration.
    - In production, it's best practice to disable it and use migrations.

- **Port Mapping:**  
  The PostgreSQL container uses port mapping (`5433:5432`) to avoid conflicts with any local installations.

- **Environment Variables:**  
  Sensitive credentials (especially for production) are managed via environment files and Fly.io Secrets. Remember to exclude `.env` files from version control.

- **JSON Schema Validation:**  
  Even though class-validator handles most validation, the JSON Schema and AJV-based validation is included per assignment requirements to demonstrate API contract validation.

---

Happy coding, and thanks for checking out the Supply Chain API!  
If you have any questions or feedback, please feel free to reach out to me.
