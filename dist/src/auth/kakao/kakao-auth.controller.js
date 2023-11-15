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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoAuthController = void 0;
const common_1 = require("@nestjs/common");
const kakao_auth_service_1 = require("./kakao-auth.service");
let KakaoAuthController = class KakaoAuthController {
    constructor(kakaoAuthService) {
        this.kakaoAuthService = kakaoAuthService;
    }
    tokenValidation(idToken) {
        return this.kakaoAuthService.validateKakaoIdToken(idToken);
    }
};
exports.KakaoAuthController = KakaoAuthController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KakaoAuthController.prototype, "tokenValidation", null);
exports.KakaoAuthController = KakaoAuthController = __decorate([
    (0, common_1.Controller)('auth/kakao'),
    __metadata("design:paramtypes", [kakao_auth_service_1.KakaoAuthService])
], KakaoAuthController);
//# sourceMappingURL=kakao-auth.controller.js.map