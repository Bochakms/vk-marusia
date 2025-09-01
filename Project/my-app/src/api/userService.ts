import axios from 'axios';
import z from 'zod';

export const LoginResponseSchema = z.object({
  result: z.boolean(),
});

export const LogoutResponseSchema = z.object({
  result: z.boolean(),
});

export const RegisterResponseSchema = z.object({
  success: z.boolean(),
});

export const RegisterErrorResponseSchema = z.object({
  error: z.string(),
});

export const UserProfileSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type RegisterErrorResponse = z.infer<typeof RegisterErrorResponseSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cinemaguide.skillbox.cc/';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.data?.message || 'Unknown error';
      
      switch (status) {
        case 400:
          throw new Error(`Ошибка входа`);
        case 401:
          authUtils.clearAuthData();
          throw new Error(`Unauthorized: ${message}`);
        case 403:
          throw new Error(`Forbidden: ${message}`);
        case 404:
          throw new Error(`Not found: ${message}`);
        case 409:
          throw new Error(`Пользователь уже существует`);
        default:
          throw new Error(`Server error: ${status} - ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: No response received');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    
    const response = await authApi.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = LoginResponseSchema.parse(response.data);
    authUtils.setSessionActive();
    return data;
  },
  logout: async (): Promise<LogoutResponse> => {
    const response = await authApi.get('/auth/logout');
    const data = LogoutResponseSchema.parse(response.data);
    authUtils.clearAuthData();
    return data;
  },

  register: async (
    email: string, 
    password: string, 
    name: string, 
    surname: string
  ): Promise<RegisterResponse> => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('surname', surname);
    
    const response = await authApi.post('/user', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = RegisterResponseSchema.parse(response.data);
    return data;
  },

  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await authApi.get('/profile');
      const data = UserProfileSchema.parse(response.data);
      authUtils.setSessionActive();
      return data;
    } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      authUtils.clearAuthData();
    }
      throw error;
    }
  },

  checkSession: async (): Promise<boolean> => {
    try {
      await authService.getProfile();
      return true;
    } catch {
      return false;
    }
  },
};

const SESSION_ACTIVE_KEY = 'session_active';
const LAST_ACTIVITY_KEY = 'last_activity';

export const authUtils = {
  setSessionActive: (): void => {
    const now = new Date().getTime();
    localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    localStorage.setItem(SESSION_ACTIVE_KEY, 'true');
  },
  
  isSessionActive: (): boolean => {
    const isActive = localStorage.getItem(SESSION_ACTIVE_KEY) === 'true';
    if (!isActive) return false;
    
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;
    
    const lastActivityTime = parseInt(lastActivity);
    const now = new Date().getTime();
    const sessionTimeout = 24 * 60 * 60 * 1000;
    
    return (now - lastActivityTime) < sessionTimeout;
  },
  
  clearAuthData: (): void => {
    localStorage.removeItem(SESSION_ACTIVE_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
  },
  
  getLastActivityTime: (): Date | null => {
    const timestamp = localStorage.getItem(LAST_ACTIVITY_KEY);
    return timestamp ? new Date(parseInt(timestamp)) : null;
  },
};