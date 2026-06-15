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
