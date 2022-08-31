import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  length: number;
  firstName: string;
};

export default function ScheduleThumbnail({ length, firstName }: PropsType) {
  return (
    <Wrapper>
      <VerticalBar />
      <p>{`${firstName}${length > 1 ? `, ${length - 1}+` : ''}`}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 13px;
  display: flex;
  align-items: center;

  p {
    margin: 0;
    font-weight: bold;
  }
`;

const VerticalBar = styled.div`
  width: 5px;
  height: 18px;
  margin-right: 5px;
  border-radius: 5px;
  background-color: ${styles.colors.emphColor};
`;
