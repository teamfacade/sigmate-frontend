import styled from 'styled-components';
import styles from 'styles/styleLib';

const Description = styled.p`
  max-width: 500px;
  height: 37px;
  margin: 0 0 15px 0;
  color: ${styles.colors.textColor};
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  display: flex;

  button {
    width: 220px;
    height: 114px;
    padding: 10px 35px;
    margin-bottom: 12px;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    font-size: 16px;
  }

  @media (min-width: 766px) {
    button + button {
      margin-left: 10px;
    }
  }

  @media (max-width: 765px) {
    display: block;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export { Description, ButtonWrapper };
