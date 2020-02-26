require('dotenv').config()

module.exports = {
    development: {
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.DB_URL,
      migrations: {
        directory: "./database/migrations"
      },
      seeds: {
        directory: "./database/seeds"
    
      },
      seeds: {
        directory: "./database/seeds"
      }
    },
    testing: {
      client: 'cypress',
      connection: {
        filename: './cypress/server_test.spec.js',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
    },
    production: {
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./database/migrations"
      },
      seeds: {
        directory: "./database/seeds"
      },
    },
  };