export const palette = {
  white: '#FFF',
  romanSilver: '#868D9E',
  reddishPink: '#E4003A',
  ebonyClay: '#232D3F'
};

export const Colors: { light: ColorTypes; dark: ColorTypes } = {
  light: {
    surfaceBase: palette.white,
    border: palette.romanSilver,
    errorLabel: palette.reddishPink,
    defaultLabel: palette.ebonyClay
  },
  dark: {
    surfaceBase: palette.white,
    border: palette.romanSilver,
    errorLabel: palette.reddishPink,
    defaultLabel: palette.ebonyClay
  },
};

export type ColorTypes = {
  surfaceBase: string;
  border: string;
  errorLabel: string;
  defaultLabel: string;
};
