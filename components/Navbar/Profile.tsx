import { memo } from 'react';
import styled from 'styled-components';
import { profile as ProfileIcon, settings as Settings } from 'public/Icons';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  description?: string;
};

export default memo(function Profile({ name, description }: PropsType) {
  return (
    <Wrapper>
      <ProfileIcon />
      <TextWrapper>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </TextWrapper>
      <Settings />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  margin: 0 40px 0 20px;
`;

const Name = styled.p`
  margin: 0;
  color: ${styles.colors.profileNameColor};
  font-size: 12px;
  font-weight: bolder;
  font-family: 'Inter', sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: ${styles.colors.profileDescriptionColor};
  font-size: 10px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;
