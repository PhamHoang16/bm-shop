'use client';

import type { User } from '@/types/user';
import axios from "axios";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Hoang',
  lastName: 'Pham',
  email: 'hoangp@gmail.com',
} satisfies User;

export interface SignUpParams {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
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

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    try {
      const response = await axios.post('http://localhost:8080/users/sign-in', null, {
        params: { email, password }
      });
      const token = generateToken();
      sessionStorage.setItem('custom-auth-token', token);
      sessionStorage.setItem('username', email);
      return {};
    } catch (error) {
      // @ts-ignore
      return { error: error.response?.data?.message || 'An error occurred during sign-in' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = sessionStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    sessionStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
