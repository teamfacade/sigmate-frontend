import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Metamask } from 'public/Icons/user/account';
import styles from 'styles/styleLib';

type ButtonStylesType = {
  border: string;
  bgColor: string;
  color: string;
};

type SVGIcon = ReturnType<typeof Metamask>;

type PropsType = {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Icons: StringKeyObj<SVGIcon | undefined> = {
  Metamask,
  ComingSoon: undefined,
};

const Colors: StringKeyObj<ButtonStylesType> = {
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

export default memo(function WalletBtn({ name, onClick }: PropsType) {
  const Icon = Icons[name];

  return (
    <Btn
      name={name}
      border={Colors[name].border}
      bgColor={Colors[name].bgColor}
      color={Colors[name].color}
      disabled={name === 'ComingSoon'}
      onClick={onClick}
    >
      <div>
        {Icon && <Icon />}
        {name === 'ComingSoon' ? (
          <MWCS>More wallets coming soon</MWCS>
        ) : (
          <p>{name}</p>
        )}
      </div>
    </Btn>
  );
});

const Btn = styled.button<ButtonStylesType>`
  width: 220px;
  height: 40px;
  padding: 5px 0 7px;
  border-radius: 8px;
  border: 2px solid ${({ border }) => border};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: bold;

  & + & {
    margin-left: 12px;
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

const MWCS = styled.p`
  font-size: 13px;
  font-weight: normal;
`;
