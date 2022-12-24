import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Discord, Twitter } from 'public/Icons/main/wiki/read/SideItems';

type PropsType = {
  platform: string;
};

const PlatformIcons: StringKeyObj<typeof Discord> = {
  d: Discord,
  t: Twitter,
};

export default memo(function Platform({ platform }: PropsType) {
  const Icon = PlatformIcons[platform];

  return (
    <Wrapper platform={platform}>
      <Icon />
    </Wrapper>
  );
});

const Wrapper = styled.div<{ platform: string }>`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid;

  ${({ platform }) => {
    switch (platform) {
      case 'd':
        return `
            border-color: #C1E2FF;
            background-color: #ECF6FF;
          `;
      case 't':
        return `
            border-color: #9DB0EC;
            background-color: #CFDAFF;
          `;
      default:
        return ``;
    }
  }}

  svg {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
