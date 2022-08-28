import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  username: string;
  displayName: string;
  level: number;
};

export default function NameAndLevel({
  username,
  displayName,
  level,
}: PropsType) {
  return (
    <Wrapper>
      <Username>{username}</Username>
      <DisplayName>{displayName}</DisplayName>
      <LvWrapper>
        <p>{`Lv ${Math.floor(level)} / ${(level * 100) % 100}%`}</p>
        <progress max="100" value={(level * 100) % 100} />
      </LvWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 60px 0 32px;

  p {
    margin: 0;
  }
`;

const Username = styled.p`
  color: ${styles.colors.logoColor};
  font-size: 22px;
  font-weight: 900;
`;

const DisplayName = styled.p`
  color: ${styles.colors.logColor};
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
`;

const LvWrapper = styled.div`
  p {
    margin: 15px 0 0 0;
    color: ${styles.colors.logoColor};
    font-size: 14px;
    font-weight: 700;
  }

  progress {
    appearance: none;

    &::-webkit-progress-bar {
      width: 100%;
      height: 9px;
      margin-top: 2px;
      background: ${styles.colors.lightThumbsUpColor};
      border-radius: 30px;
    }

    &::-webkit-progress-value {
      background: ${styles.colors.emphColor};
      border-radius: 30px;
    }
  }
`;
