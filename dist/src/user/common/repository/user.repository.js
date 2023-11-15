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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("../entity/user-profile.entity");
const user_account_entity_1 = require("../entity/user-account.entity");
const account_status_1 = require("../../kakao/types/account-status");
let UserRepository = class UserRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userProfileRepository =
            this.dataSource.getRepository(user_profile_entity_1.UserProfileEntity);
        this.userAccountRepository =
            this.dataSource.getRepository(user_account_entity_1.UserAccountEntity);
    }
    async insertAccountInfo(sub, refreshToken, email, profile) {
        await this.userAccountRepository.save({
            uid: sub,
            refreshToken,
            email,
            profile,
        });
    }
    async insertProfileInfo(nickname, image) {
        return this.userProfileRepository.save({
            nickname,
            image,
        });
    }
    async getUserByUID(uid) {
        return await this.userAccountRepository.findOne({ where: { uid } });
    }
    async getUserInfoByUID(uid) {
        return await this.userAccountRepository.findOne({
            where: { uid },
            relations: {
                profile: true,
            },
        });
    }
    async updateUserInfoByUID(id, nickname) {
        await this.userProfileRepository.update(id, { nickname });
    }
    async deleteUserByUID(uid) {
        await this.userAccountRepository.update({ uid: uid }, {
            status: account_status_1.AccountStatus.INACTIVE,
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map