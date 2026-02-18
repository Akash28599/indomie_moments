export interface AuthAdmin {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  lastLogin?: Date | null;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  admin: AuthAdmin;
}
