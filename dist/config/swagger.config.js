"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Hoodiev: Dev')
    .setDescription('hoodiev API documentation')
    .setVersion('0.0.0')
    .addTag('plan')
    .addTag('user')
    .build();
exports.moduleOptions = {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
};
//# sourceMappingURL=swagger.config.js.map