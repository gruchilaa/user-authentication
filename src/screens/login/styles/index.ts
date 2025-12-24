import { ColorTypes } from '@/src/constants/theme';
import { getHeightByPercentage } from '@/utils/dimensions';
import { StyleSheet } from 'react-native';

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    scroll: {
      paddingVertical: getHeightByPercentage(6),
    },
    scrollContent: {
      flexGrow: 1,
    },
    main: {
      flex: 1,
      flexDirection: 'column',
      padding: getHeightByPercentage(2),
      justifyContent: 'center',
      gap: getHeightByPercentage(2),
    },
    signUpButton: {
      backgroundColor: theme.surfaceBase,
      borderColor: theme.primary,
    },
    signUpLabel: {
      color: theme.primary,
    },
    errorContainer: {
      backgroundColor: theme.surfaceBase,
      opacity: 0.75,
      padding: getHeightByPercentage(1),
      borderRadius: getHeightByPercentage(1.3),
    },
    errorLabel: {
      color: theme.errorLabel,
      fontSize: getHeightByPercentage(1.6),
    },
  });
};

export default createStyles;
