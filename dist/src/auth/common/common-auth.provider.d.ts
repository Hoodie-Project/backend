export declare class CommonAuthService {
    validateIss(iss: string): Promise<void>;
    validateAud(aud: string): Promise<void>;
    validateExp(exp: number): Promise<void>;
    validateNonce(nonce: string): Promise<void>;
    validateKid(publickeyArr: any, kid: string): Promise<any>;
    decodeHeader(header: string): Promise<any>;
    decodePayload(payload: string): Promise<any>;
}
