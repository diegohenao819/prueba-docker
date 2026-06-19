# To-do App

A task list built with Next.js and PostgreSQL. Tasks remain available after
page reloads and container restarts.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

For local development, copy `.env.example` to `.env`, change the
password if needed, and start PostgreSQL before Next.js:

```bash
docker compose up -d db
npm run dev
```

Open `http://localhost:3000` after starting the development server.

## Docker

The application requires PostgreSQL, so Docker Compose is the recommended way
to run the production image.

## Docker Compose

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f app db
```

To update the app on a VPS after pulling the latest code:

```bash
git pull
docker compose up --build -d
```

To publish it on another host port:

```bash
APP_PORT=3001 docker compose up --build -d
```

PostgreSQL stores its files in the named `postgres_data` volume. The schema in
`db/init.sql` is applied automatically the first time that volume is created.
Set `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` in a `.env` file for
deployment; the values in `.env.example` are development examples.

## GitHub Actions Deployment

Create these repository secrets in GitHub:

- `VPS_HOST`: VPS IP address or domain.
- `VPS_USER`: SSH user.
- `VPS_SSH_KEY`: private SSH key with access to the VPS.

The VPS must have this repository cloned at `/home/diego/mi-app`, Docker installed, and the SSH user must be able to run `docker compose`.
