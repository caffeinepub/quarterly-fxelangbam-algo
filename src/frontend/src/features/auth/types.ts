export type AuthStatus =
  | "initializing"
  | "idle"
  | "authenticating"
  | "authenticated"
  | "error";

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  status: AuthStatus;
}
