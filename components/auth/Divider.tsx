import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  direction: 'row' | 'column';
  separate: boolean;
};

export default function Divider({ direction, separate }: PropsType) {
  return (
    <Wrapper direction={direction}>
      {separate ? (
        <>
          <DivBar direction={direction} separate={separate} />
          <p>or</p>
          <DivBar direction={direction} separate={separate} />
        </>
      ) : (
        <DivBar direction={direction} separate={separate} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  width: ${({ direction }) => (direction === 'row' ? '100%' : 'auto')};
  height: ${({ direction }) => (direction === 'column' ? 'unset' : 'auto')};

  & > p {
    padding-bottom: 7px;
    margin: 0 20px;
    color: ${styles.colors.dividerColor};
    font-size: 20px;
    font-weight: 400;
  }

  @media (max-width: 640px) {
    display: ${({ direction }) => (direction === 'column' ? 'none' : 'flex')};
  }
`;

const DivBar = styled.div<{ direction: string; separate: boolean }>`
  width: ${({ direction, separate }) => {
    if (direction === 'row') {
      if (separate) return 'calc(50% - 10px)';
      return '100%';
    }
    return '1.5px';
  }};
  height: ${({ direction, separate }) => {
    if (direction === 'column') {
      if (separate) return 'calc(50% - 10px)';
      return '100%';
    }
    return '1.5px';
  }};
  background-color: ${styles.colors.dividerColor};
`;
