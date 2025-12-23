import { Fragment, useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  View,
} from 'react-native';

//Files
import useThemeColor from '@/src/hooks/useThemeColor';
import createStyles from './styles';

interface ICustomTextField {
  label?: string;
  value: string;
  placeholder: string;
  errorMessage?: string;
  required?: boolean;
  icon?: ImageSourcePropType | undefined;
  onChange: (text: string) => void;
}

const CustomTextField = ({
  label,
  value,
  placeholder,
  errorMessage,
  required = false,
  icon,
  onChange,
}: ICustomTextField) => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Fragment>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.error}>*</Text>}
      </Text>
      <View style={styles.main}>
        {icon ? <Image source={icon} style={styles.icon} /> : null}

        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={'default'}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </Fragment>
  );
};

export default CustomTextField;
