import {
  loginMockApi,
  signUpMockApi,
} from '@/src/services/auth.service';
import { createContext, useContext, useState } from 'react';

export type TUser = {
  email: string;
  password: string;
  name: string;
};

type AuthContextType = {
  user?: Omit<TUser, 'password'>;
  login: (userDetails: Omit<TUser, 'name'>) => Promise<void>;
  signUp: (userDetails: TUser) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Omit<TUser, 'password'> | undefined>();

  const login = async (userDetails: Omit<TUser, 'name'>) => {
    //call login API
    const response = await loginMockApi(userDetails);
    setUser(response.data);

  };

  const signUp = async (userDetails: TUser) => {
    // call sign API
    await signUpMockApi(userDetails);
  };

  const logout = () => {
    if (user) {
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error with useAuth');
  }
  return context;
};

export default AuthProvider;
