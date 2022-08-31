import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type ButtonStylesType = {
  border: string;
  bgColor: string;
  color: string;
};

const Colors: StringKeyObj<ButtonStylesType> = {
  Twitter: {
    border: '#D3E8FB',
    bgColor: '#EEF7FF',
    color: '#349CE2',
  },
  Discord: {
    border: '#A7B7EB',
    bgColor: '#CCD5F3',
    color: '#5566AA',
  },
  Google: {
    border: '#F6C7D1',
    bgColor: '#FEE3E6',
    color: '#D2624A',
  },
  Metamask: {
    border: '#F19C4A',
    bgColor: '#FFF6D8',
    color: '#F6851B',
  },
  ComingSoon: {
    border: styles.colors.lightBorderColor,
    bgColor: styles.colors.globalBackgroundColor,
    color: '#98a2b2',
  },
};

const LongBtn = styled.button<{ name: string; width?: string }>`
  width: ${({ width }) => (width || '465px')};
  height: 40px;
  padding: 7px 0 5px;
  border-radius: 8px;
  border: 2px solid ${({ name }) => Colors[name].border};
  background-color: ${({ name }) => Colors[name].bgColor};
  color: ${({ name }) => Colors[name].color};
  font-size: 15px;

  & + & {
    margin-top: 9px;
  }

  div {
    display: inline-flex;
    flex-direction: row;
    align-items: center;

    p {
      margin: 0 0 0 5px;
    }
  }
`;

export default memo(LongBtn);
