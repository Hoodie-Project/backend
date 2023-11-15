"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOption = void 0;
exports.corsOption = {
    origin: [
        'http://localhost:3000',
        'http://3.36.186.11:5000',
        'https://hoodiev.com',
        'https://server.hoodiev.com',
    ],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
};
//# sourceMappingURL=cors.config.js.map