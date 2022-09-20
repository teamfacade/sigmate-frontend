import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  title: string;
  description: string;
};

export default function InfoTable({ title, description }: PropsType) {
  return (
    <Wrapper>
      <Title>
        <p>{title}</p>
      </Title>
      <Description>
        <p>{description}</p>
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 96px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: ${styles.shadows.blueShadow};
  overflow: hidden;

  & + & {
    margin-top: 22px;
  }

  > div > p {
    position: relative;
    top: 50%;
    padding: 32px 0;
    margin: 0;
    transform: translateY(-50%);
  }
`;

const Title = styled.div`
  flex: 0 1 468px;
  background-color: ${styles.colors.lightThumbsUpColor};
  text-align: center;

  p {
    color: ${styles.colors.blueTextColor};
    font-size: 20px;
    font-weight: 600;
    line-height: 150%;
  }
`;

const Description = styled.div`
  flex: 1.76 1.76 832px;
  text-align: start;

  p {
    margin: 0 48px !important;
    color: ${styles.colors.darkTextColor};
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
  }
`;
