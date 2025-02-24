import { createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Named import

// Define the shape of the decoded JWT payload
interface JwtPayload {
  id: string;
  role: string;
  iat?: number; // Optional issued-at timestamp
}

// Define the context type
interface AuthContextType {
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode<JwtPayload>(token) : null;
  });

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode<JwtPayload>(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
