# Adilabs UI

## Docker quickstart

1. Copy the Docker env template and update values as needed:

```bash
cp .env.docker.example .env.docker
```

2. Build and run:

```bash
docker compose up --build
```

3. Open `http://localhost:3000`.

## Notes

- Update `NEXTAUTH_URL` in `.env.docker` when running on a different host or port.
