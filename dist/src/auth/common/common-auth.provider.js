"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonAuthService = void 0;
const common_1 = require("@nestjs/common");
let CommonAuthService = class CommonAuthService {
    async validateIss(iss) {
        const issuer = iss.split('.')[1];
        if (issuer === 'kakao') {
            if (iss !== process.env.KAKAO_ISSUER) {
                throw new common_1.UnauthorizedException('Wrong kakao issuer');
            }
            return;
        }
        if (issuer === 'google') {
            if (iss !== process.env.GOOGLE_ISSUER ||
                `https://${process.env.GOOGLE_ISSUER}`) {
                throw new common_1.UnauthorizedException('Wrong google issuer');
            }
            return;
        }
    }
    async validateAud(aud) {
        const googleAud = aud.split('.').reverse[1];
        if (googleAud === 'googleusercontent') {
            if (googleAud !== process.env.GOOGLE_CLIENT_ID) {
                throw new common_1.UnauthorizedException('Wrong google client key');
            }
            return;
        }
        if (aud === process.env.KAKAO_CLIENT_ID) {
            if (aud !== process.env.KAKAO_CLIENT_ID) {
                throw new common_1.UnauthorizedException('Wrong kakao client key');
            }
            return;
        }
    }
    async validateExp(exp) {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        if (exp < currentTimestamp) {
            throw new common_1.UnauthorizedException('Expired IdToken');
        }
        return;
    }
    async validateKid(jwtKeyArr, kid) {
        const publicKey = jwtKeyArr.find((key) => key.kid === kid);
        if (publicKey === undefined) {
            throw new common_1.InternalServerErrorException('wrong public key');
        }
        return publicKey;
    }
    async decodeHeader(header) {
        const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
        const { kid } = JSON.parse(decodedHeader);
        return kid;
    }
    async decodePayload(payload) {
        const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
        const parsedDecodedPayload = JSON.parse(decodedPayload);
        return parsedDecodedPayload;
    }
};
exports.CommonAuthService = CommonAuthService;
exports.CommonAuthService = CommonAuthService = __decorate([
    (0, common_1.Injectable)()
], CommonAuthService);
//# sourceMappingURL=common-auth.provider.js.map