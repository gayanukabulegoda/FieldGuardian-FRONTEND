export interface UserRequestDTO {
    username: string;
    password: string;
    email?: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
}

export interface ValidationResponse {
    valid: boolean;
}