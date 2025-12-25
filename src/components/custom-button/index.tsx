import { useMemo } from 'react';
import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
//Files
import useThemeColor from '@/src/hooks/useThemeColor';
import creatStyles from './styles';

interface ICustomButton {
  title: string;
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  iconUrl?: any;
  customTextStyle?: StyleProp<TextStyle>;
  action?: () => void;
}

const CustomButton = ({
  title,
  disabled = false,
  customStyle,
  customTextStyle,
  iconUrl,
  action,
}: ICustomButton) => {
  const colors = useThemeColor();
  const styles = useMemo(() => creatStyles(colors), [colors]);

  return (
    <TouchableOpacity
      style={[styles.main, customStyle, disabled && styles.disabled]}
      onPress={action}
      disabled={disabled}
    >
      {iconUrl ? (
        <Image
          source={iconUrl}
          style={styles.icon}
        />
      ) : null}
      <Text style={[styles.buttonTitle, customTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

