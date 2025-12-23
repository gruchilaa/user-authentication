import { useMemo, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import createStyles from './styles';

//Image
import images from '@/src/constants/images';
import { LABELS } from '@/src/constants/labels';
import useThemeColor from '@/src/hooks/useThemeColor';
import { getHeightByPercentage } from '@/utils/dimensions';
import CustomTextField from '@/src/components/custom-text-field';
import CustomButton from '@/src/components/custom-button';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ImageBackground source={images.background} style={styles.backgroundImage}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.main}>
          <View>
            <CustomTextField
              value={email}
              onChange={setEmail}
              placeholder={LABELS.signIn.email}
              icon={images.email}
            />
            <CustomTextField
              value={password}
              onChange={setPassword}
              placeholder={LABELS.signIn.password}
              icon={images.lock}
            />
            <View style={{ height: getHeightByPercentage(2) }} />
            <CustomButton title={LABELS.signIn.login} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;