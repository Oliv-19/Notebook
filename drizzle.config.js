import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/server/db/schema.js",
    out: "./src/server/db/migrations",
    dialect: "sqlite",
    driver: "d1-http",
})