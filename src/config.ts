import * as dotenv from 'dotenv';
dotenv.config();
export default () => ({
  postgres: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    entities: [`dist/src/entities/*.entity.js`],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    migrations: [`dist/migrations/*`],
    cli: {
      migrationsDir: './migrations',
    },
  },
  crypto: {
    secret: process.env.CRYPTO_SECRET || 'test',
    rounds: 10,
  },
});
