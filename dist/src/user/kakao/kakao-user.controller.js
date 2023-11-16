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
exports.KakaoUserController = void 0;
const common_1 = require("@nestjs/common");
const kakao_user_service_1 = require("./kakao-user.service");
const kakao_token_dto_1 = require("./dto/kakao-token.dto");
let KakaoUserController = class KakaoUserController {
    constructor(kakaoUserService) {
        this.kakaoUserService = kakaoUserService;
    }
    sayHello() {
        return {
            message: 'hello',
        };
    }
    kakaoSignIn(kakaoTokenDto) {
        console.log('connected');
        return this.kakaoUserService.kakaoSignIn(kakaoTokenDto);
    }
    kakaoSignOut(accessToken, uid) {
        return this.kakaoUserService.kakaoSignOut(accessToken, uid);
    }
    updateUser(uid, nickname) {
        return this.kakaoUserService.updateUser(uid, nickname);
    }
    updateUserImage() { }
    deleteUser(uid) {
        return this.kakaoUserService.deleteUser(uid);
    }
    getUserInfo(uid) {
        return this.kakaoUserService.getUserInfo(uid);
    }
};
exports.KakaoUserController = KakaoUserController;
__decorate([
    (0, common_1.Get)('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "sayHello", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_token_dto_1.KakaoTokenDto]),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "kakaoSignIn", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Body)('accessToken, uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "kakaoSignOut", null);
__decorate([
    (0, common_1.Patch)('/:uid'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Body)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)('/profile_image/:uid'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "updateUserImage", null);
__decorate([
    (0, common_1.Delete)('/:uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('/info'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KakaoUserController.prototype, "getUserInfo", null);
exports.KakaoUserController = KakaoUserController = __decorate([
    (0, common_1.Controller)('kakao'),
    __metadata("design:paramtypes", [kakao_user_service_1.KakaoUserService])
], KakaoUserController);
//# sourceMappingURL=kakao-user.controller.js.map