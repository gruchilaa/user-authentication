import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackRouteParamsList } from "./app-stack.routes";
import { AuthStackRouteParamsList } from "./auth-stack.routes";

type AppNavigationProps = NativeStackNavigationProp<AppStackRouteParamsList & AuthStackRouteParamsList>

export const useAppNavigation = () => useNavigation<AppNavigationProps>();