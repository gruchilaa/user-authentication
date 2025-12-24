import { useMemo, useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import createStyles from './styles';

//File
import images from '@/src/constants/images';
import { LABELS } from '@/src/constants/labels';
import useThemeColor from '@/src/hooks/useThemeColor';
import { getHeightByPercentage } from '@/utils/dimensions';
import CustomTextField from '@/src/components/custom-text-field';
import CustomButton from '@/src/components/custom-button';
import { useAuth } from '@/src/context/auth/auth-context';
import { emailRegex } from '@/utils/regex';
import { useAppNavigation } from '@/src/routes/useAppNavigation';

type TFormKey = 'email' | 'password';

type TForm = {
  value: string;
  error?: string;
};

interface ILoginForm {
  email: TForm;
  password: TForm;
}

const Login = () => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { login } = useAuth();
  const navigation = useAppNavigation();

  //states
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: {
      value: '',
      error: undefined,
    },
    password: {
      value: '',
      error: undefined,
    },
  });
  const [genericError, setGenericError] = useState<string | undefined>();

  const updateValues = (key: TFormKey, value: string) => {
    setLoginForm(prev => {
      let updated = { ...prev };
      updated[key].value = value;
      return updated;
    });
  };

  // validate login form
  const validateForm = async () => {
    let formIsValid = true;

    setLoginForm((prev: ILoginForm) => {
      const updated: ILoginForm = { ...prev };

      Object.entries(updated).forEach(([key, value]) => {
        const fieldValue = value.value;
        //validate required fields
        if (fieldValue.trim() === '') {
          formIsValid = false;
          updated[key].error = 'This field is required';
        } else if (key === 'email') {
          //validate email format
          if (!emailRegex.test(value.value)) {
            formIsValid = false;
            updated[key].error = 'Invalid email format.';
          }
        } else if (key === 'password') {
          if (value.value.length < 6) {
            formIsValid = false;
            updated[key].error = 'Password length less than 6 characters.';
          }
        } else {
          updated[key].error = null;
        }
      });

      return updated;
    });

    if (formIsValid) {
      submitLoginForm();
    }
  };

  // Submit form
  const submitLoginForm = async () => {
    try {
      const payload = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };
      await login(payload);
      navigation.navigate('home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        // show error
        setGenericError(error.message);
      }
    }
  };

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
          <Image source={images.app} style={{ alignSelf: 'center' }} />
          <View style={{ gap: getHeightByPercentage(2) }}>
            <View>
              <CustomTextField
                value={loginForm.email.value}
                onChange={(value: string) => updateValues('email', value)}
                placeholder={LABELS.email}
                icon={images.email}
                errorMessage={loginForm.email.error}
              />

              <CustomTextField
                value={loginForm.password.value}
                onChange={(value: string) => updateValues('password', value)}
                placeholder={LABELS.password}
                icon={images.lock}
                errorMessage={loginForm.password.error}
              />
            </View>
            {genericError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>{genericError}</Text>
              </View>
            ) : undefined}

            <CustomButton title={LABELS.login} action={validateForm} />
            <CustomButton
              title={LABELS.goToSignup}
              customStyle={styles.signUpButton}
              customTextStyle={styles.signUpLabel}
              action={() => navigation.navigate('signUp')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;