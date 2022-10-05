import styled from 'styled-components';
import styles from 'styles/styleLib';

const DisclaimWrapper = styled.div`
  width: 100%;
  margin-top: 24px;

  input {
    margin: 0 8px 0 0;
  }

  span {
    position: relative;
    top: -2.5px;
    color: ${styles.colors.headerColor};
    font-size: 14px;
    line-height: 140%;
    text-align: left;
  }

  & + & {
    margin-top: 4px;
  }
`;

export default DisclaimWrapper;
