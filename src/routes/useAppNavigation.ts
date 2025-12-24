import { useNavigation } from "@react-navigation/native";
import { StackRouteParamsList } from "./stack.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppNavigationProps = NativeStackNavigationProp<StackRouteParamsList>

export const useAppNavigation = () => useNavigation<AppNavigationProps>();