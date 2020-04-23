require('dotenv').config()
module.exports = {
    development: {
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.DATABASE_URL,
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
      client: 'pg',
      connection: {
        filename: process.env.DATABASE_URL,
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