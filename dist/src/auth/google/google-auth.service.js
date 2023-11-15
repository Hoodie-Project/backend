"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const common_1 = require("@nestjs/common");
const common_auth_provider_1 = require("../common/common-auth.provider");
const axios_1 = require("axios");
let GoogleAuthService = class GoogleAuthService {
    constructor(commonAuthService) {
        this.commonAuthService = commonAuthService;
    }
    async validateGoogleIdToken(idToken) {
        const [header, payload] = idToken.split('.');
        const validatedPayload = await this.validateGooglePayload(payload);
        await this.validateGoogleSignature(header);
        return validatedPayload;
    }
    async validateGooglePayload(payload) {
        const { sub, iss, aud, exp, nonce, email, email_verified, picture, name } = await this.commonAuthService.decodePayload(payload);
        await this.commonAuthService.validateIss(iss);
        await this.commonAuthService.validateAud(aud);
        await this.commonAuthService.validateExp(exp);
        await this.commonAuthService.validateNonce(nonce);
        return { sub, email, email_verified, picture, name };
    }
    async validateGoogleSignature(header) {
        if (!header) {
            throw new common_1.BadRequestException('No header provided');
        }
        const kid = await this.commonAuthService.decodeHeader(header);
        const publicKeyArr = await this.getDiscoveryDoc();
        const confirmedKey = await this.commonAuthService.validateKid(publicKeyArr, kid);
        return confirmedKey;
    }
    async getDiscoveryDoc() {
        try {
            const discoveryDoc = await axios_1.default.get(process.env.GOOGLE_DISCOVERY_DOC);
            const jwkURL = discoveryDoc.data.jwks_uri;
            const jwkResponse = await axios_1.default.get(jwkURL);
            const publicKeyArr = jwkResponse.data.keys;
            return publicKeyArr;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get discovery document');
        }
    }
};
exports.GoogleAuthService = GoogleAuthService;
exports.GoogleAuthService = GoogleAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_auth_provider_1.CommonAuthService])
], GoogleAuthService);
//# sourceMappingURL=google-auth.service.js.map