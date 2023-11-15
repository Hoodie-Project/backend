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
exports.KakaoUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../common/repository/user.repository");
const kakao_auth_service_1 = require("../../auth/kakao/kakao-auth.service");
const axios_1 = require("axios");
const account_status_1 = require("./types/account-status");
let KakaoUserService = class KakaoUserService {
    constructor(kakaoAuthService, userRepository) {
        this.kakaoAuthService = kakaoAuthService;
        this.userRepository = userRepository;
    }
    async kakaoSignIn(kakaoTokenDto) {
        const { access_token, refresh_token, id_token } = kakaoTokenDto;
        await this.kakaoAuthService.validateKakaoIdToken(id_token);
        const { sub } = await this.getKakaoUserInfo(access_token);
        const user = await this.userRepository.getUserByUID(sub);
        console.log(user);
        console.log(sub);
        if (user === null) {
            this.registerUser(access_token, refresh_token);
        }
        return { access_token, refresh_token, id_token };
    }
    async kakaoSignOut(access_token, uid) {
        if (!access_token) {
            throw new common_1.BadRequestException('No accessToken provided');
        }
        const reqHeaders = {
            Authorization: `Bearer ${access_token}`,
        };
        const reqBody = {
            target_id_type: 'user_id',
            target_id: uid,
        };
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: process.env.KAKAO_SIGNOUT_URL,
                timeout: 30000,
                headers: reqHeaders,
                data: reqBody,
            });
            const { id } = response.data;
            console.log('hello', response);
            return id;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to sign out');
        }
    }
    async getKakaoUserInfo(accessToken) {
        if (!accessToken) {
            throw new common_1.BadRequestException('No accessToken provided');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios_1.default.get(process.env.KAKAO_USERINFO_URL, config);
            const { sub, nickname, picture, email } = response.data;
            return { sub, nickname, picture, email };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Failed to get user information');
        }
    }
    async registerUser(access_token, refresh_token) {
        const userInfo = await this.getKakaoUserInfo(access_token);
        const { sub, nickname, picture, email } = userInfo;
        const userProfileEntity = await this.userRepository.insertProfileInfo(nickname, picture);
        await this.userRepository.insertAccountInfo(sub, refresh_token, email, userProfileEntity);
    }
    async updateUser(uid, nickname) {
        const { status, profile } = await this.userRepository.getUserInfoByUID(uid);
        const id = profile.id;
        if (status !== account_status_1.AccountStatus.ACTIVE) {
            throw new common_1.UnauthorizedException(`This user is ${status}`);
        }
        await this.userRepository.updateUserInfoByUID(id, nickname);
    }
    async deleteUser(uid) {
        const user = await this.userRepository.getUserByUID(uid);
        const existedUID = user.uid;
        if (uid === existedUID) {
            await this.userRepository.deleteUserByUID(uid);
        }
    }
    async getUserInfo(uid) {
        return await this.userRepository.getUserInfoByUID(uid);
    }
};
exports.KakaoUserService = KakaoUserService;
exports.KakaoUserService = KakaoUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kakao_auth_service_1.KakaoAuthService,
        user_repository_1.UserRepository])
], KakaoUserService);
//# sourceMappingURL=kakao-user.service.js.map