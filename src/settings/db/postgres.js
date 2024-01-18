require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_USER_PASSWORD,
    migrationStorage: "json",
    seederStorage: "json",
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_USER_PASSWORD,
    migrationStorage: "json",
    seederStorage: "json",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_USER_PASSWORD,
    migrationStorage: "json",
    seederStorage: "json",
  },
}