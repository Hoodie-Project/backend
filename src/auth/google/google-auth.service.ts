import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommonAuthService } from '../common/common-auth.provider';
import axios from 'axios';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly commonAuthService: CommonAuthService) {}

  async validateGoogleIdToken(idToken: string) {
    const [header, payload]: string[] = idToken.split('.');
    // 페이로드 유효성 검증
    const validatedPayload = await this.validateGooglePayload(payload);

    // 서명 유효성 검증
    await this.validateGoogleSignature(header);
    return validatedPayload;
  }

  async validateGooglePayload(payload: string) {
    const { sub, iss, aud, exp, nonce, email, email_verified, picture, name } =
      await this.commonAuthService.decodePayload(payload);

    await this.commonAuthService.validateIss(iss);
    await this.commonAuthService.validateAud(aud);
    await this.commonAuthService.validateExp(exp);
    await this.commonAuthService.validateNonce(nonce);
    return { sub, email, email_verified, picture, name };
  }

  async validateGoogleSignature(header: string) {
    let googlePublicKey: string | null;
    if (!header) {
      throw new BadRequestException('No header provided');
    }

    const kid = await this.commonAuthService.decodeHeader(header);
    const publicKeyArr = await this.getDiscoveryDoc();

    if (!googlePublicKey) {
      const publicKeyArr = this.getDiscoveryDoc();
      const googlePublicKey = await this.commonAuthService.validateKid(
        publicKeyArr,
        kid,
      );
      return googlePublicKey;
    }

    return googlePublicKey;
  }

  async getDiscoveryDoc() {
    try {
      const discoveryDoc = await axios.get(process.env.GOOGLE_DISCOVERY_DOC);
      const jwkURL = discoveryDoc.data.jwks_uri;
      const jwkResponse = await axios.get(jwkURL);
      const publicKeyArr = jwkResponse.data.keys;
      return publicKeyArr;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get discovery document',
      );
    }
  }
}
