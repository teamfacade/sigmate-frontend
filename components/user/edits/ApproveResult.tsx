import styled from 'styled-components';
import styles from 'styles/styleLib';

const ApproveResult = styled.p<{ approved: boolean }>`
  padding: 0 15px;
  margin: 0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  line-height: 150%;
  font-family: 'Inter', sans-serif;
  word-spacing: 0.1px;

  ${({ approved }) => {
    if (approved)
      return `background-color: ${styles.colors.positiveBgColor}; color: ${styles.colors.positiveTextColor};`;
    return `background-color: ${styles.colors.negativeBgColor}; color: ${styles.colors.negativeTextColor};`;
  }}
`;

export default ApproveResult;
