const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

try {
  const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, envPath)));

  for (const config in envConfig) {
    process.env[config] = envConfig[config];
  }
} catch (err) {
  console.error(err);
}

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
