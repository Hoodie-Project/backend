import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { KakaoDto } from './dto/kakao-token.dto';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class UserService {
  private userRepository: UserRepository;

  async kakaoGetUserInfo(kakaoDto: KakaoDto) {
    return await this.userRepository.getUserInfo(kakaoDto);
  }

  async kakaoSignIn(kakaoDto: KakaoDto) {
    return this.userRepository.kakaoSignIn(kakaoDto);
  }

  // async kakaoGetTokens(code: string) {
  //   const body = {
  //     grant_type: 'authorization_code',
  //     client_id: process.env.KAKAO_CLIENT_ID,
  //     redirect_uri: `http://localhost:4000/api/user/hello`,
  //     code,
  //   };

  //   const headers = {
  //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   };

  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: 'https://kauth.kakao.com/oauth/token',
  //       timeout: 30000,
  //       headers,
  //       data: qs.stringify(body),
  //     });

  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
