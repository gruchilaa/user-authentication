import { useColorScheme } from 'react-native';
import { Colors } from '../constants/theme';

const useThemeColor = () => {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = theme === 'light' ? Colors.light : Colors.dark;
  return colorFromProps;
};

export default useThemeColor;
