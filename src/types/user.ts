export interface UserRequestDTO {
    email: string;
    name?: string;
    password?: string;
}

export interface UserResponse {
    email: string;
    name: string;
    role: string;
}