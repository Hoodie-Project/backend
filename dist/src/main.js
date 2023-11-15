"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../config/swagger.config");
const common_1 = require("@nestjs/common");
const cors_config_1 = require("../config/cors.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger();
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig, swagger_config_1.moduleOptions);
    const port = configService.get('PORT') || 8000;
    swagger_1.SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api');
    app.enableCors(cors_config_1.corsOption);
    app.use(cors_config_1.setHeader);
    await app.listen(port);
    logger.log(`Application successfully running on ${process.env.NODE_ENV} PORT ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map