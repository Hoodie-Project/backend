import { Injectable } from '@nestjs/common';
import { CommonAuthService } from '../common/idtoken-validation.provider';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly commonAuthService: CommonAuthService) {}

  async validateGoogleIdToken(payload: string) {
    // Verify that the ID token is properly signed by the issuer
    // const [payload]: string[] = idToken.split('.');

    // 페이로드 유효성 검증
    await this.validateGooglePayload(payload);
  }

  async validateGooglePayload(payload: string) {
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const { iss, aud, exp, nonce } = JSON.parse(decodedPayload);

    await this.commonAuthService.validateIssuer(iss);
    await this.commonAuthService.validateAudience(aud);
  }
}
