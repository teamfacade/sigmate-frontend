import styled from 'styled-components';

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
          <p>OR</p>
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
  width: ${({ direction }) => (direction === 'row' ? '100%' : 'auto')};
  height: ${({ direction }) => (direction === 'column' ? '100%' : 'auto')};

  & > p {
    margin: 0 20px;
    color: var(--divider-sep-color);
    font-weight: 500;
  }
`;

const DivBar = styled.div<{ direction: string; separate: boolean }>`
  width: ${({ direction, separate }) => {
    if (direction === 'row') {
      if (separate) return 'calc(50% - 10px)';
      return '100%';
    }
    return '5px';
  }};
  height: ${({ direction, separate }) => {
    if (direction === 'column') {
      if (separate) return 'calc(50% - 10px)';
      return '150px';
    }
    return '5px';
  }};
  background-color: var(--divider-color);
`;
