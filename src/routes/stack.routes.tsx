import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import signUp from '../screens/sign-up';
import Home from '../screens/home';

export type StackRouteParamsList = {
  login: undefined;
  signUp: undefined;
  home: undefined;
};

const StackRoutes = () => {
  const Stack = createNativeStackNavigator<StackRouteParamsList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signUp" component={signUp} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
