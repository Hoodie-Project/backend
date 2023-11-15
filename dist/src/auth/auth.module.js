"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const kakao_auth_service_1 = require("./kakao/kakao-auth.service");
const kakao_auth_controller_1 = require("./kakao/kakao-auth.controller");
const google_auth_service_1 = require("./google/google-auth.service");
const google_controller_1 = require("./google/google.controller");
const common_auth_provider_1 = require("./common/common-auth.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [kakao_auth_controller_1.KakaoAuthController, google_controller_1.GoogleAuthController],
        providers: [kakao_auth_service_1.KakaoAuthService, google_auth_service_1.GoogleAuthService, common_auth_provider_1.CommonAuthService],
        exports: [kakao_auth_service_1.KakaoAuthService, google_auth_service_1.GoogleAuthService, common_auth_provider_1.CommonAuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map