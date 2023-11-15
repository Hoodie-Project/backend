"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeader = exports.corsOption = void 0;
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
const setHeader = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hoodiev.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
exports.setHeader = setHeader;
//# sourceMappingURL=cors.config.js.map