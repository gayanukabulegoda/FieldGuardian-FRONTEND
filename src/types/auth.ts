export interface UserRequestDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface ValidationResponse {
    valid: boolean;
}