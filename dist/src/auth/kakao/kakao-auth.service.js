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
exports.KakaoAuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const common_auth_provider_1 = require("../common/common-auth.provider");
let KakaoAuthService = class KakaoAuthService {
    constructor(commonAuthService) {
        this.commonAuthService = commonAuthService;
    }
    async validateKakaoIdToken(idToken) {
        const [header, payload] = idToken.split('.');
        await this.validateKakaoPayload(payload);
        await this.validateKakaoSignature(header);
    }
    async validateKakaoPayload(payload) {
        if (!payload) {
            throw new common_1.BadRequestException('No payload provided');
        }
        const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
        const { iss, aud, exp, nonce } = JSON.parse(decodedPayload);
        await this.commonAuthService.validateIss(iss);
        await this.commonAuthService.validateAud(aud);
        await this.commonAuthService.validateExp(exp);
        await this.commonAuthService.validateNonce(nonce);
    }
    async validateKakaoSignature(header) {
        if (!header) {
            throw new common_1.BadRequestException('No header provided');
        }
        const kid = await this.commonAuthService.decodeHeader(header);
        const publickeyArr = await this.getKakaoPublicKey();
        const confirmedKey = await this.commonAuthService.validateKid(publickeyArr, kid);
        return confirmedKey;
    }
    async getKakaoPublicKey() {
        try {
            const response = await axios_1.default.get(process.env.KAKAO_PUBLICKEY_URL);
            const publickeyArr = response.data.keys;
            return publickeyArr;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get public key');
        }
    }
    async getKakaoIdTokenInfo(payload) {
        if (!payload) {
            throw new common_1.BadRequestException('No payload provided');
        }
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: process.env.KAKAO_TOKENINFO_URL,
                timeout: 30000,
                headers,
                data: payload,
            });
            console.log('hello', response);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.KakaoAuthService = KakaoAuthService;
exports.KakaoAuthService = KakaoAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_auth_provider_1.CommonAuthService])
], KakaoAuthService);
//# sourceMappingURL=kakao-auth.service.js.map