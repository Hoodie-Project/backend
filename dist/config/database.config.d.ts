import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
export declare const databaseConfig: (configService: ConfigService) => {
    type: any;
    host: any;
    port: any;
    username: any;
    password: any;
    database: any;
    entities: string[];
    synchronize: any;
    namingStrategy: SnakeNamingStrategy;
    logging: boolean;
};
