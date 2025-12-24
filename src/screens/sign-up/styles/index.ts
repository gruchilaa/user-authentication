import { ColorTypes } from "@/src/constants/theme";
import { getHeightByPercentage } from "@/utils/dimensions";
import { StyleSheet } from "react-native";

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      paddingHorizontal: getHeightByPercentage(2),
      paddingVertical: getHeightByPercentage(1),
      justifyContent: 'space-between',
      backgroundColor: theme.background,
    },
    subMain: {
      gap: getHeightByPercentage(1),
      paddingVertical: getHeightByPercentage(1.5),
    },
    title: {
      fontSize: getHeightByPercentage(2.5),
      fontWeight: '700',
    },
    buttonsContainer: {
      marginBottom: getHeightByPercentage(8),
      gap: getHeightByPercentage(1.5),
    },
    cancelButton: {
      backgroundColor: theme.surfaceBase,
      borderColor: theme.primary,
    },
    cancelButtonLabel: {
      color: theme.primary,
    },
  });
};

export default createStyles;