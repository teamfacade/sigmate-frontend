import { memo, MouseEventHandler } from 'react';
import { Twitter, Discord, Google } from 'public/Icons/user/account';
import LongBtn from './LongBtn';

const Icons: StringKeyObj<typeof Twitter> = {
  Twitter,
  Discord,
  Google,
};

type PropsType = {
  name: string;
  connected: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function SocialBtn({
  name,
  connected,
  onClick,
}: PropsType) {
  const Icon = Icons[name];

  return (
    <LongBtn name={name} onClick={onClick}>
      <div>
        <Icon />
        <p>
          {connected ? 'Disconnect' : 'Connect'}{' '}
          <strong>{`${name}${
            name !== 'Metamask' && name !== 'CommingSoon' ? ' (TBU)' : ''
          }`}</strong>
        </p>
      </div>
    </LongBtn>
  );
});
