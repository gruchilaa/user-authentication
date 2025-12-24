import { loginMockApi, signUpMockApi } from '@/src/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (userDetails: Omit<TUser, 'name'>) => {
    //call login API
    const response = await loginMockApi(userDetails);
    setUser(response.data);

    await AsyncStorage.setItem('orbit-user', JSON.stringify(response.data));
  };

  const signUp = async (userDetails: TUser) => {
    // call sign API
    await signUpMockApi(userDetails);
  };

  const logout = async () => {
    if (user) {
      setUser(undefined);
      await AsyncStorage.removeItem('orbit-user');
    }
  };

  const loadUser = async () => {
    const userDetails = await AsyncStorage.getItem('orbit-user');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
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
