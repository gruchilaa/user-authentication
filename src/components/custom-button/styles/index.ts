import { ColorTypes } from "@/src/constants/theme";
import { getHeightByPercentage } from "@/utils/dimensions";
import { StyleSheet } from "react-native";

const creatStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      padding: getHeightByPercentage(1),
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: theme.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: getHeightByPercentage(6),
      height: getHeightByPercentage(5),
      gap: getHeightByPercentage(1),
      borderColor: theme.surfaceBase,
    },
    buttonTitle: {
      color: theme.surfaceBase,
      fontSize: getHeightByPercentage(1.7),
    },
    disabled: {
      opacity: 0.5,
    },
  });
};

export default creatStyles;
