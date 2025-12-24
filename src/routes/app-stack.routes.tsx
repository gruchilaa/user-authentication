import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';

export type AppStackRouteParamsList = {
  home: undefined;
};

const AppStackRoutes = () => {
  const Stack = createNativeStackNavigator<AppStackRouteParamsList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStackRoutes;
