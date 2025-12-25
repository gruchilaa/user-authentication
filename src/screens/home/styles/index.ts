import { ColorTypes } from "@/src/constants/theme";
import { getHeightByPercentage } from "@/utils/dimensions";
import { StyleSheet } from "react-native";

const createStyles = (theme: ColorTypes) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      paddingHorizontal: getHeightByPercentage(2),
      paddingVertical: getHeightByPercentage(1),
      paddingTop: getHeightByPercentage(10),
      backgroundColor: theme.background,
    },
    welcome: {
      fontWeight: '500',
      fontSize: getHeightByPercentage(1.7),
      textAlign: 'left',
      color: theme.defaultLabel,
    },
    title: {
      fontWeight: '600',
      fontSize: getHeightByPercentage(2),
      color: theme.defaultLabel,
      textAlign: 'left',
    },
    card: {
      flex: 0,
      borderColor: theme.primary,
      borderWidth: 1,
      borderRadius: getHeightByPercentage(1.3),
      padding: getHeightByPercentage(2),
      marginTop: getHeightByPercentage(2),
      marginVertical: getHeightByPercentage(3),
      gap: getHeightByPercentage(1),
    },
    spacer: {
      height: getHeightByPercentage(2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    key: {
      fontSize: getHeightByPercentage(1.6),
      fontWeight: '700',
      color: theme.defaultLabel,
    },
    value: {
      fontSize: getHeightByPercentage(1.6),
      fontWeight: '400',
      color: theme.defaultLabel,
    },
    buttonContainer: {
      width: '50%', 
      alignSelf: 'center'
    }
  });
};

export default createStyles;