import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Metamask } from 'public/Icons/user/account';
import LongBtn from './LongBtn';

type PropsType = {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Icons: StringKeyObj<typeof Metamask | undefined> = {
  Metamask,
  ComingSoon: undefined,
};

export default memo(function WalletBtn({ name, onClick, disabled }: PropsType) {
  const Icon = Icons[name];

  return (
    <Btn name={name} disabled={disabled} onClick={onClick}>
      <div>
        {Icon && <Icon />}
        {name === 'ComingSoon' ? (
          <MWCS>More wallets coming soon</MWCS>
        ) : (
          <p>{disabled ? 'Connected!' : name}</p>
        )}
      </div>
    </Btn>
  );
});

const Btn = styled(LongBtn)<{ name: string }>`
  height: ${({ name }) => (name === 'ComingSoon' ? '90px !important' : '40px')};

  div {
    transform: translateY(-3px);
  }
`;

const MWCS = styled.p`
  font-size: 13px;
  font-weight: normal;
`;
