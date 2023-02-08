import styled from 'styled-components';
import styles from 'styles/styleLib';

const Name = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${styles.colors.hrColor};
  background-color: ${styles.colors.globalBackgroundColor};

  p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 17px;
    font-weight: 700;
    text-align: center;
  }
`;

const Tr = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${styles.colors.hrColor};
  background-color: ${styles.colors.globalBackgroundColor};
`;

const Th = styled.div`
  flex: 0 1 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent;

  p {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;

const Td = styled.div`
  flex: 1 1 300px;
  display: flex;
  align-items: center;
  min-height: 35px;
  padding: 8px 14px;
  background-color: #ffffff;

  p {
    font-size: 13px;
    font-weight: 300;
    text-align: start;
    line-break: anywhere;
  }

  textarea {
    width: 100%;
    margin: 0;
    color: ${styles.colors.logColor};
    font-size: 13px;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    line-height: 160%;
    text-align: start;
    border: none;
    resize: none;

    :focus-visible {
      outline: none;
    }

    ::placeholder {
      color: #c4c4c4;
    }
  }

  select {
    width: 100%;
    margin: 0;

    :focus-visible {
      outline: none;
    }
  }
`;

export { Name, Th, Tr, Td };
