export interface KeyCloakObject {
    authenticated: boolean
    loginRequired: boolean
    silentCheckSsoFallback: boolean
    enableLogging: boolean
    messageReceiveTimeout: number
    responseMode: string
    responseType: string
    flow: string
    clientId: string
    authServerUrl: string
    realm: string
    refreshToken: string
    refreshTokenParsed: RefreshTokenParsed
    idToken: string
    idTokenParsed: IdTokenParsed
    token: string
    tokenParsed: TokenParsed
    sessionId: string
    subject: string
    realmAccess: RealmAccess2
    timeSkew: number
  }
  
export interface RefreshTokenParsed {
    exp: number
    iat: number
    jti: string
    iss: string
    aud: string
    sub: string
    typ: string
    azp: string
    nonce: string
    session_state: string
    scope: string
    sid: string
}
  
export interface IdTokenParsed {
    exp: number
    iat: number
    auth_time: number
    jti: string
    iss: string
    aud: string
    sub: string
    typ: string
    azp: string
    nonce: string
    session_state: string
    at_hash: string
    sid: string
    email_verified: boolean
    name: string
    preferred_username: string
    given_name: string
    family_name: string
    email: string
}

export interface TokenParsed {
    exp: number
    iat: number
    auth_time: number
    jti: string
    iss: string
    sub: string
    typ: string
    azp: string
    nonce: string
    session_state: string
    "allowed-origins": string[]
    realm_access: RealmAccess
    scope: string
    sid: string
    email_verified: boolean
    name: string
    preferred_username: string
    given_name: string
    family_name: string
    email: string
}

export interface RealmAccess {
    roles: string[]
}

export interface RealmAccess2 {
    roles: string[]
}
  