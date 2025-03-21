import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./database/migrations",
  schema: "./database/schemas/*",
  dialect: "postgresql",
  casing: "camelCase",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
