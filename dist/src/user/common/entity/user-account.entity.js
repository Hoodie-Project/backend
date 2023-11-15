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
exports.UserAccountEntity = void 0;
const typeorm_1 = require("typeorm");
const user_profile_entity_1 = require("./user-profile.entity");
const account_status_1 = require("../../kakao/types/account-status");
let UserAccountEntity = class UserAccountEntity {
};
exports.UserAccountEntity = UserAccountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UserAccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAccountEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAccountEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAccountEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: account_status_1.AccountStatus.ACTIVE }),
    __metadata("design:type", String)
], UserAccountEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], UserAccountEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], UserAccountEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfileEntity, (profile) => profile.account),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_profile_entity_1.UserProfileEntity)
], UserAccountEntity.prototype, "profile", void 0);
exports.UserAccountEntity = UserAccountEntity = __decorate([
    (0, typeorm_1.Entity)('account')
], UserAccountEntity);
//# sourceMappingURL=user-account.entity.js.map