import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from '../context/auth/auth-context';
import AppStackRoutes from './app-stack.routes';
import AuthStackRoutes from './auth-stack.routes';

const RootNavigator = () => {
  const { user } = useAuth();
  return user ? <AppStackRoutes /> : <AuthStackRoutes />;
};

const Routes = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Routes;
