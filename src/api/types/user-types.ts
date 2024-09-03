export interface IRegisterRequest {
    username: string;
    password: string;
}

export type RegisterResponse = string


export interface ILoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export type LoginResponse = string


export interface IUser {
    id: string;
    fullName: string;
    profileImage: string;
    username: string;
}
