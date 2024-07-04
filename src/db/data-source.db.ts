import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
// import Employee from "../entity/employee.entity";
// import Address from "../entity/address.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "user123",
  password: "password123",
  database: "training",
  extra: { max: 5, min: 2 },
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["build/src/entity/*.js"],
  migrations: ["build/src/db/migrations/*.js"]
});

export default AppDataSource;
