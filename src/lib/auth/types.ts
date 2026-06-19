/**
 * Authentication Architecture
 * 
 * Provider-agnostic interfaces for managing user sessions.
 * Decouples the UI from the underlying auth mechanism (Supabase Auth, Firebase, Custom).
 */

export interface User {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  isGuest: boolean;
  provider: 'guest' | 'google' | 'github' | 'email';
}

export interface Session {
  user: User;
  accessToken?: string;
  expiresAt?: number;
}

export interface IAuthProvider {
  getSession(): Promise<Session | null>;
  
  signIn(options: { provider: string; credentials?: any }): Promise<Session>;
  signOut(): Promise<void>;
  
  // Event listener for auth state changes
  onAuthStateChange(callback: (session: Session | null) => void): () => void;
}

// Placeholder interfaces for specific providers
export interface GuestProvider extends IAuthProvider {
  // Upgrades a guest session to a real user account
  upgradeSession(newProvider: 'google' | 'github' | 'email'): Promise<Session>;
}

export interface GoogleProvider extends IAuthProvider {}
export interface GitHubProvider extends IAuthProvider {}
export interface EmailProvider extends IAuthProvider {}
