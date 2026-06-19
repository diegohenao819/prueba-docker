import "server-only";

import { Pool, type QueryResultRow } from "pg";

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
  const database = process.env.PGDATABASE ?? process.env.POSTGRES_DB;
  const user = process.env.PGUSER ?? process.env.POSTGRES_USER;
  const password = process.env.PGPASSWORD ?? process.env.POSTGRES_PASSWORD;

  if (!connectionString && (!database || !user || !password)) {
    throw new Error(
      "PostgreSQL is not configured. Set DATABASE_URL or the PostgreSQL environment variables.",
    );
  }

  return new Pool({
    ...(connectionString
      ? { connectionString }
      : {
          host: process.env.PGHOST ?? "127.0.0.1",
          port: Number(process.env.PGPORT ?? process.env.POSTGRES_PORT ?? 5432),
          database,
          user,
          password,
        }),
    connectionTimeoutMillis: 5_000,
    max: 10,
  });
}

function getPool() {
  globalForPostgres.postgresPool ??= createPool();
  return globalForPostgres.postgresPool;
}

export function query<Row extends QueryResultRow>(
  text: string,
  values: readonly unknown[] = [],
) {
  return getPool().query<Row>(text, [...values]);
}
