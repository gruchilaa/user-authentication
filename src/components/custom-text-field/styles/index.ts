import { ColorTypes } from '@/src/constants/theme';
import { getHeightByPercentage } from '@/utils/dimensions';
import { StyleSheet } from 'react-native';

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    main: {
      flexDirection: 'row',
      borderColor: theme.border,
      borderWidth: 1,
      padding: getHeightByPercentage(1.5),
      borderRadius: getHeightByPercentage(1),
      gap: getHeightByPercentage(1),
      backgroundColor: theme.surfaceBase
    },
    label: {
      color: theme.defaultLabel,
      marginBottom: getHeightByPercentage(0.5),
    },
    error: {
      color: theme.errorLabel,
    },
    textInput: {
      flex: 1,
    },
    icon: {
      width: getHeightByPercentage(3),
      height: getHeightByPercentage(3),
    },
  });
};

export default createStyles;
