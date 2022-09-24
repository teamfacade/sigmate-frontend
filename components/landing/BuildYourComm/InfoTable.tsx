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
  min-height: 130px;
  background-color: ${styles.colors.tableRowColor};
  border-radius: 20px;
  overflow: hidden;

  & + & {
    margin-top: 24px;
  }

  > div > p {
    position: relative;
    top: 50%;
    padding: 40px 0;
    margin: 0;
    transform: translateY(-50%);
  }
`;

const Title = styled.div`
  flex: 0 1 280px;
  background-color: ${styles.colors.lightThumbsUpColor};
  border-right: 3px solid #e9eaec;
  text-align: center;

  p {
    color: ${styles.colors.blueTextColor};
    font-size: 28px;
    font-weight: 600;
    line-height: 150%;
  }
`;

const Description = styled.div`
  flex: 3.64 3.64 1020px;
  text-align: start;

  p {
    margin: 0 40px !important;
    color: ${styles.colors.darkTextColor};
    font-size: 18px;
    font-weight: 400;
    line-height: 150%;
    white-space: pre-wrap;
  }
`;