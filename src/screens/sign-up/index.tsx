import { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

//Files
import CustomButton from '@/src/components/custom-button';
import CustomTextField from '@/src/components/custom-text-field';
import images from '@/src/constants/images';
import { LABELS } from '@/src/constants/labels';
import useThemeColor from '@/src/hooks/useThemeColor';
import CustomHeader from '@/src/components/custom-header';
import { emailRegex } from '@/utils/regex';
import { useAuth } from '@/src/context/auth/auth-context';
import createStyles from './styles';
import { useAppNavigation } from '@/src/routes/useAppNavigation';
import Spinner from '@/utils/spinnerRef';

type TFormKey = 'name' | 'email' | 'password';

type TForm = {
  value: string;
  error?: string;
};

interface ISignUpForm {
  name: TForm;
  email: TForm;
  password: TForm;
}

const SignUp = () => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [values, setValues] = useState<ISignUpForm>({
    name: {
      value: '',
    },
    email: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  const navigation = useAppNavigation();
  const { signUp } = useAuth();

  const updateValues = (key: TFormKey, value: string) => {
    setValues(prev => {
      let updated = { ...prev };
      updated[key].value = value;
      return updated;
    });
  };

  const validateForm = (key: TFormKey) => {
    setValues(prev => {
      const updated = { ...prev };
      const value = updated[key].value.trim();

      //validate required fields
      if (value.trim() === '') {
        updated[key].error = 'This field is required';
      } else if (key === 'email' && !emailRegex.test(value)) {
        //validate email format
        updated[key].error = 'Invalid email format';
      } else if (key === 'password' && value.length < 6) {
        updated[key].error = 'Password length should be at least 6 characters.';
      } else {
        updated[key].error = undefined;
      }

      return updated;
    });
  };

  const submitForm = async () => {
    // validate the form
    Object.keys(values).forEach(key => validateForm(key as TFormKey));

    //check if form is valid
    const formIsValid = Object.values(values).every(
      field => !field.error && field.value.trim() !== '',
    );

    if (!formIsValid) {
      return;
    }

    Spinner.show(); //show spinner
    const payload = {
      name: values.name.value,
      email: values.email.value,
      password: values.password.value,
    };
    try {
      await signUp(payload);
      Alert.alert('Succes', 'User successfully created', [
        { text: 'OK', onPress: () => navigation.navigate('login') },
      ]);

      //reset & navigate
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      Spinner.hide(); //hide spinner
    }
  };

  return (
    <>
      <CustomHeader
        title={LABELS.signUp}
        action={() => navigation.goBack()}
        iconUrl={images.left}
      />
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>{LABELS.createAccount}</Text>

            <View style={styles.subMain}>
              <CustomTextField
                label={'Name'}
                value={values.name.value}
                onChange={e => updateValues('name', e)}
                placeholder={LABELS.name}
                icon={images.user}
                errorMessage={values.name.error}
                required={true}
                onBlur={() => validateForm('name')}
              />

              <CustomTextField
                label={'Email'}
                value={values.email.value}
                onChange={e => updateValues('email', e)}
                placeholder={LABELS.email}
                icon={images.email}
                errorMessage={values.email.error}
                required={true}
                onBlur={() => validateForm('email')}
              />

              <CustomTextField
                label={'Password'}
                value={values.password.value}
                onChange={e => updateValues('password', e)}
                placeholder={LABELS.password}
                icon={images.lock}
                secure={securePassword}
                errorMessage={values.password.error}
                required={true}
                secureAction={() => setSecurePassword(!securePassword)}
                onBlur={() => validateForm('password')}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton title={LABELS.signUp} action={submitForm} />
            <CustomButton
              title={LABELS.cancel}
              customStyle={styles.cancelButton}
              customTextStyle={styles.cancelButtonLabel}
              action={() => navigation.goBack()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignUp;
