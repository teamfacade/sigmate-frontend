import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  thumbnail?: string; // will be an image
  name: string;
  issuer: string;
  mintPrice: string;
  mintDate: string; // @todo 진짜 date면 timestamp -> date parser 필요
};

export default memo(function MyDrawItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thumbnail = '',
  name,
  issuer,
  mintPrice,
  mintDate,
}: PropsType) {
  return (
    <Wrapper>
      <Thumbnail />
      <InfoWrapper>
        <Name>{name}</Name>
        <Issuer>{issuer}</Issuer>
        <MintInfoWrapper>
          <p>{mintPrice}</p>
          <p>{mintDate}</p>
        </MintInfoWrapper>
      </InfoWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 7px 9px;
  border-radius: 8px;
  border: 1px solid #f6f6f6;
`;

const Thumbnail = styled.div`
  width: 200px;
  height: 130px;
  background-color: #f7f8fa;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 200px;
  margin-left: 15px;
`;

const Name = styled.h2`
  margin: 0 0 10px 0;
  color: ${styles.colors.logoColor};
  font-size: 24px;
  font-weight: bold;
`;

const Issuer = styled.p`
  margin: 0 0 15px 0;
  color: ${styles.colors.lighterTextColor};
  font-size: 16px;
  font-weight: lighter;
`;

const MintInfoWrapper = styled.div`
  position: relative;
  left: -3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    flex: 0 0 auto;
  }

  p {
    display: inline-block;
    margin: 0;
    font-size: 16px;
    font-weight: bold;

    :nth-child(2) {
      padding-right: 8px;
      border-right: 2px solid ${styles.colors.lighterTextColor};
      color: #4c596d;
    }

    :last-child {
      padding-left: 8px;
      color: ${styles.colors.emphColor};
    }
  }
`;
