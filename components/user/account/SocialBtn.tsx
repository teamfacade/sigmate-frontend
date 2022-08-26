import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Twitter, Discord } from 'public/Icons/user/account';

type ButtonStylesType = {
  border: string;
  bgColor: string;
  color: string;
};

type SVGIcon = ReturnType<typeof Twitter>;

type PropsType = {
  name: string;
  connected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Icons: StringKeyObj<SVGIcon> = {
  Twitter,
  Discord,
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
};

export default memo(function SocialBtn({
  name,
  connected,
  onClick,
}: PropsType) {
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
        <Icon />
        <p>
          {connected ? 'Disconnect' : 'Connect'} <strong>{name}</strong>
        </p>
      </div>
    </Btn>
  );
});

const Btn = styled.button<ButtonStylesType>`
  width: 220px;
  height: 40px;
  padding: 7px 0 5px;
  border-radius: 8px;
  border: 2px solid ${({ border }) => border};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: 15px;

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
