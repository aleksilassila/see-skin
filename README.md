# see-skin

See-Skin is a website that helps people select the skincare products that are most compatible with their skin. By
submitting products that a user knows cause problems with their skin, the application can deduce which ingredients may
cause irritation and filter Amazon skin care products based on those ingredients. *This
is a work-in-progress proof of concept, and is not intended for production use.* All rights reserved.

A live demo can be seen at [see-skin.com](https://see-skin.com).

## Technical Implementation

This project consists of frontend, backend, a Postgresql database and a Nginx reverse proxy.

The frontend uses the all-new Next.js app directory, Tailwind CSS, and React Query. The backend is an Express.js server
that uses Prisma ORM to interact with the database, Passport.js with Google OAuth2.0 strategy for authentication, and
Jest for testing.

Docker (and Docker Compose) is in development, testing and production. GitHub Actions are used for CI/CD (work in
progress).

## Getting Started

### .env

Create a `.env` file in the project root. The following environment variables are required:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```

### Development

The project leverages docker and docker compose. To get started, create a `.env` file in the project root
run `docker compose up` for development mode.

### Building a production image

Building a production image from source code can be done
with `docker compose -f docker-compose.yml -f docker-compose.prod.yml build`.

This image can be run as is, or it can be pushed to a docker registry, and used with the following `docker-compose.yml`
file in the production:

```yaml
version: "3"

services:
  nginx:
    container_name: see-skin-nginx
    image: 896896/see-skin:nginx
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    depends_on:
      - frontend
      - backend

  db:
    image: postgres:14
    container_name: see-skin-db
    environment:
      POSTGRES_USER: post
      POSTGRES_DB: post
      POSTGRES_PASSWORD: post
    ports:
      - 5432:5432
    volumes:
      - see-skin-db:/var/lib/postgresql/data
    restart: unless-stopped

  backend:
    container_name: see-skin-backend
    image: 896896/see-skin:backend
    environment:
      DATABASE_URL: ${DATABASE_URL:-postgresql://post:post@db:5432/post}
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      NODE_ENV: production
    depends_on:
      - db
    restart: unless-stopped

  frontend:
    container_name: see-skin-frontend
    image: 896896/see-skin:frontend
    restart: unless-stopped
    environment:
      NODE_ENV: production

volumes:
  see-skin-db:
```
