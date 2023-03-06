import { DataSource } from "typeorm";
const config = new DataSource( {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "jenny2668263",
    database: "CreacionesSundayBD",
    synchronize: false,
    logging: false,
    entities: ["./src/**/*.entity.ts"],
    subscribers: [],
    migrationsTableName: "migration",
    migrations: ["src/db/migration/*.ts"],
})

export default config
