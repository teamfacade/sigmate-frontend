import { darken } from 'polished';

const colors = {
  globalBackgroundColor: '#F7F8FA' as const,
  modalContentBgColor: '#FDFDFD' as const,
  dividerColor: '#D7DCE4' as const,
  logoColor: '#475366' as const,
  logColor: '#626262' as const,
  emphColor: '#276BFF' as const,
  textColor: '#464646' as const,
  boldTextColor: '#4E5C74' as const,
  lightTextColor: '#676767' as const,
  lighterTextColor: '#BFBFBF' as const,
  dimTextColor: '#606C80' as const,
  headerColor: '#323C4D' as const,
  linkColor: '#98A2B2' as const,
  tableRowColor: '#FAFBFC' as const,
  hrColor: '#DEDEDE' as const,
  lightBorderColor: '#EBEEF2' as const,
  darkBorderColor: '#E4E4E4' as const,
  profileDescriptionColor: '#A3B6CC' as const,
  profileNameColor: '#294566' as const,
  twitterNameColor: '#349CE2' as const,
  twitterBackgroundColor: '#EEF7FF' as const,
  twitterBorderColor: '#D3E8FB' as const,
  discordNameColor: '#5566AA' as const,
  discordBackgroundColor: '#CCD5F3' as const,
  discordBorderColor: '#A7B7EB' as const,
  metamaskNameColor: '#F6851B' as const,
  metamaskBackgroundColor: '#FFF6D8' as const,
  lightThumbsUpColor: '#EEF7FF' as const,
  lightWarningColor: '#FBEFEF' as const,
  verdictModalTextColor: '#727272' as const,
  warningColor: '#DC2626' as const,
  emptyColor: '#EBEDF1' as const,
  forumSubTextColor: '#8894A7' as const,
  positiveTextColor: '#0D9488' as const,
  positiveBgColor: '#E0F2F2' as const,
  negativeTextColor: '#E54646' as const,
  negativeBgColor: '#FDECEC' as const,
};

const shadows = {
  verdictBtnShadow: '0 4px 10px 0 rgba(58, 63, 69, .15)',
  containerShadow: `0 1px 3px 0 ${colors.darkBorderColor}`,
  modalShadow: '0 4px 4px 0 rgba(0, 0, 0, .25)',
};

const styles = {
  colors,
  shadows,
};

export const BlueBtnStyle = `
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  
  :disabled {
    background-color: ${styles.colors.verdictModalTextColor};
  }
  
  :hover {
    background-color: ${darken(0.3, styles.colors.emphColor)};
  }
  
  a {
    color: #ffffff;
  }
`;

export const WrapperStyle = `
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

export default styles;
