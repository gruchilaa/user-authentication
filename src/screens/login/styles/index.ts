import { ColorTypes } from '@/src/constants/theme';
import { getHeightByPercentage } from '@/utils/dimensions';
import { StyleSheet } from 'react-native';

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    scroll: {
      paddingVertical: getHeightByPercentage(6)
    },
    scrollContent: {
      flexGrow: 1
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        padding: getHeightByPercentage(2),
        justifyContent: 'center',
    }

  });
};

export default createStyles;
