# To-do App

A simple task list built with Next.js.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

Open `http://localhost:3000` after starting the development server.

## Docker

```bash
docker build -t prueba-docker .
docker run --rm -p 3000:3000 prueba-docker
```

If port `3000` is already in use, run:

```bash
docker run --rm -p 3001:3000 prueba-docker
```

## Docker Compose

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f app
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
