declare module 'authMF/ResetPassword' {
  const ResetPassword: React.ComponentType;
  export default ResetPassword;
}

declare module 'authMF/SignupForm' {
  const ResetPassword: React.ComponentType;
  export default SignupForm;
}

declare module 'authMF/LoginForm' {
  const ResetPassword: React.ComponentType;
  export default LoginForm;
}

declare module 'authMF/EmailForm' {
  const ResetPassword: React.ComponentType;
  export default EmailForm;
}

declare module 'authMF/OtpForm' {
  const ResetPassword: React.ComponentType;
  export default OtpForm;
}

declare module 'authMF/ImageCarousel' {
  const ResetPassword: React.ComponentType;
  export default ImageCarousel;
}

declare module 'profileMF/ProfilePage' {
  const ResetPassword: React.ComponentType;
  export default ProfilePage;
}

declare module 'profileMF/FriendsPage' {
  export default ProfilePage;
}

declare module 'profileMF/FeedsPage' {
  export default FeedsPage;
}

declare module 'profileMF/PostsPage' {
  export default PostsPage;
}

declare module 'profileMF/SearchPage' {
  const SearchPage: React.ComponentType;
  export default SearchPage;
}

declare module 'hostApp/toast' {
  import type { ComponentType } from 'react';

  export const Toaster: ComponentType;
  export const toastOptions: { position: 'bottom-right'; duration: number };
  export const showErrorToast: (message: string) => void;
  export const showSuccessToast: (message: string) => void;
}

declare module "hostApp/useAxiosInstance" {
  interface AxiosRequestConfig {
    params?: Record<string, unknown>;
    signal?: AbortSignal;
    headers?: Record<string, string>;
  }

  interface AxiosLikeResponse<T = unknown> {
    data: T;
  }

  interface AxiosLikeInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosLikeResponse<T>>;
    post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosLikeResponse<T>>;
    put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosLikeResponse<T>>;
    patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosLikeResponse<T>>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosLikeResponse<T>>;
  }

  const useAxiosInstance: () => AxiosLikeInstance;
  export default useAxiosInstance;
}

// types.d.ts
declare module 'hostApp/GlobalStore' {
  // Define the type of the store's state (adjust according to your actual state shape)
  export interface GlobalState {
    username: string | null;
    profilePic: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    setUsername: (username: string) => void;
    setProfilePic: (profilePic: string) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    clearTokens: () => void;
  }

  // Define the type of the exported store (React component or Zustand store)
  const globalStore: import('zustand').Store<GlobalState>;  // Zustand store type
  export default globalStore;
}
