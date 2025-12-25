import { useMemo } from 'react';
import { Text, View } from 'react-native';

//Files
import createStyles from './styles';
import images from '@/src/constants/images';
import useThemeColor from '@/src/hooks/useThemeColor';
import { useAuth } from '@/src/context/auth/auth-context';
import CustomButton from '@/src/components/custom-button';
import { LABELS } from '@/src/constants/labels';

const Home = () => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { user: userDetails, logout } = useAuth();

  const userData = useMemo(() => {
    return [
      {
        title: LABELS.name,
        value: userDetails?.name,
      },
      {
        title: LABELS.email,
        value: userDetails?.email,
      },
    ];
  }, [userDetails]);

  const logoutUser = async () => {
    await logout();
  };

  return (
    <View style={styles.main}>
      <Text
        style={styles.welcome}
      >{`${LABELS.welcome}, ${userDetails?.name}`}</Text>

      <View style={styles.spacer} />
      <Text style={styles.title}>{LABELS.userInformation}</Text>

      <View style={styles.card}>
        {userData.map((row, index: number) => (
          <View key={index} style={styles.row}>
            <Text style={styles.key}>{`${row.title}: `}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          iconUrl={images.logout}
          title={LABELS.logout}
          action={logoutUser}
        />
      </View>
    </View>
  );
};

export default Home;
