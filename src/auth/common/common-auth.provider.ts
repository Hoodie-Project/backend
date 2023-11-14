import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { decodedPayload } from './type/auth';

@Injectable()
export class CommonAuthService {
  async validateIss(iss: string) {
    const issuer = iss.split('.')[1];

    if (issuer === 'kakao') {
      if (iss !== process.env.KAKAO_ISSUER) {
        throw new UnauthorizedException('Wrong kakao issuer');
      }
    }

    if (issuer === 'google') {
      if (
        iss !== process.env.GOOGLE_ISSUER ||
        `https://${process.env.GOOGLE_ISSUER}`
      ) {
        throw new UnauthorizedException('Wrong google issuer');
      }
    }
  }

  async validateAud(aud: string) {
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

  async validateExp(exp: number) {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    if (exp < currentTimestamp) {
      throw new UnauthorizedException('Expired IdToken');
    }
  }

  async validateNonce(nonce: string) {
    if (!nonce) {
      throw new UnauthorizedException('Nonce required');
    }
  }

  async validateKid(jwtKeyArr, kid: string) {
    const publicKey = jwtKeyArr.find((key) => key.kid === kid);

    if (publicKey === undefined) {
      throw new InternalServerErrorException('wrong public key');
    }
    return publicKey;
  }

  async decodeHeader(header: string) {
    const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
    const { kid } = JSON.parse(decodedHeader);

    return kid;
  }

  async decodePayload(payload: string) {
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const parsedDecodedPayload = JSON.parse(decodedPayload);
    return parsedDecodedPayload;
  }
}
