export const palette = {
  white: '#FFF',
  romanSilver: '#868D9E',
  reddishPink: '#E4003A',
  ebonyClay: '#232D3F',
  deepBlue: '#133E87',
  antiFlash: '#F0F3FA'
};

export const Colors: { light: ColorTypes; dark: ColorTypes } = {
  light: {
    surfaceBase: palette.white,
    border: palette.romanSilver,
    errorLabel: palette.reddishPink,
    defaultLabel: palette.ebonyClay,
    primary: palette.deepBlue,
    background: palette.antiFlash
  },
  dark: {
    surfaceBase: palette.white,
    border: palette.romanSilver,
    errorLabel: palette.reddishPink,
    defaultLabel: palette.ebonyClay,
    primary: palette.deepBlue,
    background: palette.antiFlash
  },
};

export type ColorTypes = {
  surfaceBase: string;
  border: string;
  errorLabel: string;
  defaultLabel: string;
  primary: string;
  background: string;
};
