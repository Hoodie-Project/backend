"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const databaseConfig = (configService) => ({
    type: configService.get('DB_TYPE'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: configService.get('DB_SYNCHRONIZE'),
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    logging: true,
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map