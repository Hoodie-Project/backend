import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CommonAuthService {
  async validatePayload(payload: string) {}

  async validateIssuer(iss: string) {
    if (!iss) {
      throw new UnauthorizedException('No Issuer provided');
    }
    const issuer = iss.split('.')[1];

    if (issuer === 'kakao') {
      if (iss !== process.env.KAKAO_ISSUER) {
        throw new UnauthorizedException('Wrong kakao issuer');
      }
    }

    if (issuer === 'google') {
      if (iss !== `https://${process.env.GOOGLE_ISSUER}`) {
        throw new UnauthorizedException('Wrong google issuer');
      }
    }
  }

  async validateAudience(aud: string) {
    if (!aud) {
      throw new UnauthorizedException('No Issuer provided');
    }
    const googleAud = aud.split('.').reverse[1];

    if (googleAud === 'googleusercontent') {
      if (googleAud !== process.env.GOOGLE_CLIENT_ID) {
        throw new UnauthorizedException('Wrong google client key');
      }
    }

    if (aud === process.env.KAKAO_CLIENT_ID) {
      throw new UnauthorizedException('Wrong kakao client key');
    }
  }
}
