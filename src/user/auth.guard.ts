import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { headers: IncomingHttpHeaders } = context
      .switchToHttp()
      .getRequest();
    const headers: IncomingHttpHeaders = request.headers;
    const accessToken = this.extractTokenFromHeader(headers);

    if (accessToken === undefined) {
      throw new UnauthorizedException('Access token sent by incorrect headers');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }

  private extractTokenFromHeader(headers: IncomingHttpHeaders) {
    const [type, accessToken] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? accessToken : undefined;
  }
}
