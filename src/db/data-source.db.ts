import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
// import Employee from "../entity/employee.entity";
// import Address from "../entity/address.entity";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: { max: 5, min: 2 },
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["build/src/entity/*.js"],
  migrations: ["build/src/db/migrations/*.js"],
});

export default AppDataSource;
