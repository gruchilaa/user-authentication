import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/sign-up';

export type AuthStackRouteParamsList = {
  login: undefined;
  signUp: undefined;
};

const AuthStackRoutes = () => {
  const Stack = createNativeStackNavigator<AuthStackRouteParamsList>();

  return(
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signUp" component={SignUp} />
  </Stack.Navigator>
  )
  ;
};

export default AuthStackRoutes;