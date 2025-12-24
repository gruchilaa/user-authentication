import { Fragment, useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

//Files
import useThemeColor from '@/src/hooks/useThemeColor';
import createStyles from './styles';
import images from '@/src/constants/images';

interface ICustomTextField {
  label?: string;
  value: string;
  placeholder: string;
  errorMessage?: string;
  required?: boolean;
  icon?: ImageSourcePropType | undefined;
  secure?: boolean;
  onChange: (text: string) => void;
  secureAction?: () => void;
}

const CustomTextField = ({
  label,
  value,
  placeholder,
  errorMessage,
  required = false,
  icon,
  secure = false,
  onChange,
  secureAction,
}: ICustomTextField) => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [focused, setFocused] = useState(false);

  return (
    <Fragment>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.error}>*</Text>}
      </Text>
      <View
        style={[
          styles.main,
          errorMessage && { borderColor: colors.errorLabel },
        ]}
      >
        {icon ? <Image source={icon} style={styles.icon} /> : null}

        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={'default'}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!focused && value && secureAction && (
          <Pressable onPress={secureAction}>
            <Image
              source={secure ? images.eyeOpen : images.eyeClose}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </Fragment>
  );
};

export default CustomTextField;
