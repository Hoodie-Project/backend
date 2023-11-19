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

export interface ProcessEnv {
  [key: string]: string | undefined;
}

export interface Secret {
  issuer: string;
}
