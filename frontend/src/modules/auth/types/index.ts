import { InputHTMLAttributes, ReactNode } from "react";

export interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  to: string;
}

export interface AuthFormCardProps {
  children: ReactNode;
}

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightElement?: ReactNode;
}

export interface AuthLayoutProps {
  children: ReactNode;
  maxWidth?: 'md' | 'lg';
}

export interface AuthPageHeaderProps {
  type: 'login' | 'register' | 'verify' | 'forgot' | 'reset';
  title: string;
  subtitle: string;
}

export interface AuthSubmitButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: 'MALE' | 'FEMALE';
  role: 'CANDIDATE' | 'RECRUITER';
}

export interface LoginData {
  email: string;
  password: string;
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