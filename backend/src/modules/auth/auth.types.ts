export interface RegisterUser {
  name: string,
  email: string,
  password: string,
  role: 'CANDIDATE' | 'RECRUITER',
  gender: 'MALE' | 'FEMALE'
}

export interface LoginUser {
  email: string,
  password: string
}

export interface UserInfo {
  id: number,
  email: string,
}

export interface JwtPayload {
  userInfo: {
    id: number;
    email: string;
  }
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordParams {
  userId: string;
  token: string;
}
