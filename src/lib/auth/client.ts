'use client';

import type { User } from '@/types/user';
import axios from "axios";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post('http://localhost:8080/users/sign-up', params);
      const token = generateToken();
      return {};
    } catch (error) {
      // @ts-ignore
      return { error: error.response?.data?.message || 'An error occurred during sign-up' };
    }
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;
    try {
      const response = await axios.post('http://localhost:8080/users/sign-in', null, {
        params: { username, password }
      });
      const token = generateToken();
      sessionStorage.setItem('custom-auth-token', token);
      sessionStorage.setItem('username', username);
      return {};
    } catch (error) {
      // @ts-ignore
      return { error: error.response?.data?.message || 'Có lỗi trong quá trình đăng nhập' };
    }
  }

  async resetPassword(param: ResetPasswordParams): Promise<{ error?: string }> {
    const { email } = param;
    try {
      const response = await axios.post('http://localhost:8080/users/reset-password', null, {
        params: { email }
      });
      return {};
    } catch (e) {
      return { error: 'Có lỗi trong quá trình đặt lại mật khẩu' };
    }

  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = sessionStorage.getItem('custom-auth-token');
    const username = sessionStorage.getItem('username');
    if (!username) {
      return { data: null };
    }

    try {
      const response = await axios.get(`http://localhost:8080/users/${username}`);
      return { data: response.data };
    } catch (error) {
      // @ts-ignore
      return { error: error.response?.data?.message || 'Có lỗi xảy ra' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    sessionStorage.removeItem('custom-auth-token');
    sessionStorage.removeItem('username');

    return {};
  }
}

export const authClient = new AuthClient();
