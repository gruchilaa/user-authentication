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
import Spinner from '@/utils/spinnerRef';

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
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const updateValues = (key: TFormKey, value: string) => {
    setLoginForm(prev => {
      let updated = { ...prev };
      updated[key].value = value;
      return updated;
    });
  };

  // validate login form
  const validateForm = async (key: TFormKey) => {
    setLoginForm((prev: ILoginForm) => {
      const updated: ILoginForm = { ...prev };
      const value = updated[key].value.trim();

      //validate required fields
      if (value === '') {
        updated[key].error = LABELS.fieldRequired;
      } else if (key === 'email' && !emailRegex.test(value)) {
        //validate email format

        updated[key].error = LABELS.invalidEmailFormat;
      } else {
        updated[key].error = undefined;
      }

      return updated;
    });
  };

  // Submit form
  const submitLoginForm = async () => {
    // validate the form
    Object.keys(loginForm).forEach(key => validateForm(key as TFormKey));

    //check if form is valid
    const formIsValid = Object.values(loginForm).every(
      field => !field.error && field.value.trim() !== '',
    );

    if(!formIsValid) {
      return;
    }
    Spinner.show(); //show spinner
    try {
      const payload = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };
      setGenericError(undefined);
      await login(payload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // show error
        setGenericError(error.message);
      }
    } finally {
      Spinner.hide(); //show spinner
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
                onBlur={() => validateForm('email')}
              />

              <CustomTextField
                value={loginForm.password.value}
                onChange={(value: string) => updateValues('password', value)}
                placeholder={LABELS.password}
                icon={images.lock}
                errorMessage={loginForm.password.error}
                secure={securePassword}
                secureAction={() => setSecurePassword(!securePassword)}
                onBlur={() => validateForm('password')}
              />
            </View>
            {genericError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>{genericError}</Text>
              </View>
            ) : undefined}

            <CustomButton title={LABELS.login} action={submitLoginForm} />
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
