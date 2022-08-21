const colors = {
  globalBackgroundColor: '#F7F8FA' as const,
  modalContentBgColor: '#FDFDFD' as const,
  dividerColor: '#E1E5EC' as const,
  dividerSepColor: '#C2C2C2' as const,
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

export default styles;
