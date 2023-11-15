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
exports.GoogleUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../common/repository/user.repository");
const google_auth_service_1 = require("../../auth/google/google-auth.service");
const common_auth_provider_1 = require("../../auth/common/common-auth.provider");
let GoogleUserService = class GoogleUserService {
    constructor(userRepository, googleAuthService, commonAuthService) {
        this.userRepository = userRepository;
        this.googleAuthService = googleAuthService;
        this.commonAuthService = commonAuthService;
    }
    async googleSignIn(googleTokenDto) {
        const { access_token, refresh_token, id_token } = googleTokenDto;
        const [payload] = id_token.split('.');
        await this.googleAuthService.validateGoogleIdToken(id_token);
        const { sub, email, email_verified, profile } = await this.commonAuthService.decodePayload(payload);
        const { uid } = await this.userRepository.getUserByUID(sub);
        if (sub !== uid) {
            await this.registerUser(sub, refresh_token, email, email_verified, profile);
        }
        return { access_token, refresh_token, id_token };
    }
    async registerUser(sub, refresh_token, email, email_verified, profile) {
        const { id, picture } = profile;
        if (email_verified !== true) {
            throw new common_1.UnauthorizedException('Unverified email');
        }
        const userProfileEntity = await this.userRepository.insertProfileInfo(id, picture);
        await this.userRepository.insertAccountInfo(sub, refresh_token, email, userProfileEntity);
    }
};
exports.GoogleUserService = GoogleUserService;
exports.GoogleUserService = GoogleUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        google_auth_service_1.GoogleAuthService,
        common_auth_provider_1.CommonAuthService])
], GoogleUserService);
//# sourceMappingURL=google-user.service.js.map