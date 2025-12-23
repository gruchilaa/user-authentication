import { Dimensions } from "react-native"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Get height based on screen height percentage
export const getHeightByPercentage = (value: number) => {
  if (value) {
    let finalValue = (screenHeight * value) / 100;
    return finalValue;
  }
  return screenHeight;
}

// Get width based on screen width percentage
export const getWidthByPercentage = (value: number) => {
  if (value) {
    let finalValue = (screenWidth * value) / 100;
    return finalValue;
  }
  return screenWidth;
}