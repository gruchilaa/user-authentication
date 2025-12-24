import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/sign-up';
import Home from '../screens/home';
import AuthProvider from '../context/auth/auth-context';

export type StackRouteParamsList = {
  login: undefined;
  signUp: undefined;
  home: undefined;
};

const StackRoutes = () => {
  const Stack = createNativeStackNavigator<StackRouteParamsList>();

  return (
    <AuthProvider>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
    </AuthProvider>
  );
};

export default StackRoutes;
