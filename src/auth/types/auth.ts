export interface kakaoPublicKey {}

export interface IdTokenPayload {
  iss: string;
  aud: string;
  exp: number;
  nonce: string;
}

export interface JWT {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}

export interface GoogleUserInfo {
  sub: string;
  email: string;
  email_verified: boolean;
  picture: string;
  name: string;
}

export interface GoogleIdTokenPayload extends IdTokenPayload, GoogleUserInfo {}

export interface DiscoveryDoc {
  issuer: string;
  authorization_endpoint: string;
  device_authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  revocation_endpoint: string;
  jwks_uri: string;
  response_types_supported: [];
  subject_types_supported: [];
  id_token_signing_alg_values_supported: [];
  scopes_supported: [];
  token_endpoint_auth_methods_supported: [];
  claims_supported: [];
  code_challenge_methods_supported: [];
}

export interface GenerateAuthToken {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
}

export interface GoogleAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface KakaoTokens {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}
