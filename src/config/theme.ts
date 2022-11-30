const COLORS_DARK = {
  WIN: '#00ff00',
  DRAW: '#ff9c09',
  LOSS: '#ff0000',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#1E1E1E',
  THEME: '#5AA0E1',
  PRIMARY: '#5AA0E1',
  PRIMARY_HIGHLIGHT: 'rgba(90,160,225,0.5)',
  INFO: '#1232FF',
  ERROR: '#BB0000',
  LIVE: '#FF4600', // FE2472
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
  TRANSPARENT: 'transparent',
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#000000',
  BLOCK: '#1a1a1a',
  MUTED: '#878b8f',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  LIGHT: 'rgba(255,255,255, 0.45)',
  LIGHTER: 'rgba(255,255,255, 0.15)',
  BLACKER: 'rgba(0,0,0, 0.45)',
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  DRIBBBLE: '#EA4C89',
  ICON: '#ffffff',
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
  DARK: 'true',
};

const COLORS_LIGHT = {
  WIN: '#00ff00',
  DRAW: '#ff9c09',
  LOSS: '#ff0000',
  WHITE: '#000000',
  BLACK: '#EFEFEF',
  GREY: '#A9A9A9',
  THEME: '#5AA0E1',
  PRIMARY: '#5AA0E1',
  PRIMARY_HIGHLIGHT: 'rgba(90,160,225,0.5)',
  INFO: '#1232FF',
  ERROR: '#BB0000',
  LIVE: '#CC0000', // FE2472
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
  TRANSPARENT: 'transparent',
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#F9F9F9',
  BLOCK: '#ffffff',
  MUTED: '#353535',
  NEUTRAL: 'rgba(0,0,0, 0.85)',
  LIGHT: 'rgba(0,0,0, 0.45)',
  LIGHTER: 'rgba(0,0,0, 0.15)',
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  DRIBBBLE: '#EA4C89',
  ICON: '#1a1a1a',
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
  DARK: 'false',
};
const ClavaTheme = {
  COLORS: COLORS_DARK,
};
const ClavaThemeLight = {
  COLORS: COLORS_LIGHT,
};

const getTheme = (type: 'light' | 'dark') =>
  type === 'dark' ? ClavaTheme : ClavaThemeLight;

export default getTheme;
