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

  const navigation = useAppNavigation();
  const { signUp } = useAuth();

  const updateValues = (key: TFormKey, value: string) => {
    setValues(prev => {
      let updated = { ...prev };
      updated[key].value = value;
      return updated;
    });
  };

  const validateForm = () => {
    let formIsValid = true;

    setValues(prev => {
      const updated = { ...prev };

      Object.entries(updated).forEach(([key, value]) => {
        console.log(value.value);
        //validate required fields
        if (value.value.trim() === '') {
          formIsValid = false;
          updated[key].error = 'This field is required';
        } else {
          updated[key].error = null;
        }

        //validate email format
        if (key === 'email') {
          if (!emailRegex.test(value.value)) {
            formIsValid = false;
            updated[key].error = 'Invalid email format.';
          } else {
            updated[key].error = null;
          }
        }

        if (key === 'password') {
          if (value.value.length < 6) {
            formIsValid = false;
            updated[key].error = 'Password length less than 6 characters.';
          } else {
            updated[key].error = null;
          }
        }
      });

      return updated;
    });

    if (formIsValid) {
      //call sign up mock api
      submitForm();
    }
  };

  const submitForm = async () => {
    const payload = {
      name: values.name.value,
      email: values.email.value,
      password: values.password.value,
    };
    try {
      await signUp(payload);
      navigation.navigate('login');
      //reset & navigate
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <>
      <CustomHeader
        title={LABELS.signUp}
        action={() => navigation.goBack()}
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
              />

              <CustomTextField
                label={'Email'}
                value={values.email.value}
                onChange={e => updateValues('email', e)}
                placeholder={LABELS.email}
                icon={images.email}
                errorMessage={values.email.error}
                required={true}
              />

              <CustomTextField
                label={'Password'}
                value={values.password.value}
                onChange={e => updateValues('password', e)}
                placeholder={LABELS.password}
                icon={images.lock}
                secure={true}
                errorMessage={values.password.error}
                required={true}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton title={LABELS.signUp} action={validateForm} />
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
