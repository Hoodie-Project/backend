import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GoogleIdTokenPayload } from './type/auth';

@Injectable()
export class CommonAuthService {
  async validateIss(iss: string): Promise<void> {
    const issuer = iss.split('.')[1];

    if (issuer === 'kakao') {
      if (iss !== process.env.KAKAO_ISSUER) {
        throw new UnauthorizedException('Wrong kakao issuer');
      }
      return;
    }

    if (issuer === 'google') {
      if (iss !== process.env.GOOGLE_ISSUER) {
        throw new UnauthorizedException('Wrong google issuer');
      }
      return;
    }
  }

  async validateAud(aud: string): Promise<void> {
    const googleAud: string = aud.split('.').reverse[1];

    if (googleAud === 'googleusercontent') {
      if (googleAud !== process.env.GOOGLE_CLIENT_ID) {
        throw new UnauthorizedException('Wrong google client key');
      }
      return;
    }

    if (aud === process.env.KAKAO_CLIENT_ID) {
      if (aud !== process.env.KAKAO_CLIENT_ID) {
        throw new UnauthorizedException('Wrong kakao client key');
      }
      return;
    }
  }

  async validateExp(exp: number): Promise<void> {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    if (exp < currentTimestamp) {
      throw new UnauthorizedException('Expired IdToken');
    }
    return;
  }

  async validateNonce(nonce: string): Promise<void> {
    if (nonce !== process.env.NONCE) {
      throw new UnauthorizedException('Wrong Nonce value');
    }
    return;
  }

  async validateKid(publickeyArr, kid: string) {
    const publicKey = publickeyArr.find((key) => key.kid === kid);

    if (publicKey === undefined) {
      throw new InternalServerErrorException('wrong public key');
    }
    return publicKey;
  }

  async decodeHeader(header: string): Promise<string> {
    const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
    const { kid } = JSON.parse(decodedHeader);

    return kid;
  }

  async decodePayload(payload: string): Promise<GoogleIdTokenPayload> {
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const parsedDecodedPayload = JSON.parse(decodedPayload);
    return parsedDecodedPayload;
  }
}
