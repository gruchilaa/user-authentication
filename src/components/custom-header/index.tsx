import { ColorTypes } from '@/src/constants/theme';
import useThemeColor from '@/src/hooks/useThemeColor';
import { getHeightByPercentage } from '@/utils/dimensions';
import { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ICustomHeader {
  title: string;
  iconUrl?: ImageSourcePropType;
  action?: () => void;
}

const CustomHeader = ({ title, iconUrl, action }: ICustomHeader) => {
  const colors = useThemeColor();
  const styles = useMemo(() => createStyles(colors), [colors]);



const insets = useSafeAreaInsets();

console.log(insets)
  return (
    <View style={[styles.main, { paddingTop: insets.top}]}>
      {iconUrl ? (
        <TouchableOpacity style={styles.iconContainer} onPress={action}>
          <Image source={iconUrl} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    main: {
      backgroundColor: theme.primary,
      paddingVertical: getHeightByPercentage(2.5),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getHeightByPercentage(2),
    },
    iconContainer: {
      width: '15%',
    },
    icon: {
      width: getHeightByPercentage(2),
      height: getHeightByPercentage(2),
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    title: {
      color: theme.surfaceBase,
      fontSize: getHeightByPercentage(2.3),
      fontWeight: 700,
      textAlign: 'left',
    },
  });
};
