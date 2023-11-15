export declare class CommonAuthService {
    validateIss(iss: string): Promise<void>;
    validateAud(aud: string): Promise<void>;
    validateExp(exp: number): Promise<void>;
    validateKid(jwtKeyArr: any, kid: string): Promise<any>;
    decodeHeader(header: string): Promise<any>;
    decodePayload(payload: string): Promise<any>;
}
