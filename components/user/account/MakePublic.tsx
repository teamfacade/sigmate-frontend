import { memo, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Twitter, Discord } from 'public/Icons/user/account';
import LongBtn from './LongBtn';

const Icons: StringKeyObj<typeof Twitter> = {
  Twitter,
  Discord,
};

type PropsType = {
  edit: boolean;
  name: string;
};

export default memo(function MakePublic({ edit, name }: PropsType) {
  const [turnOn, setTurnOn] = useState(false);

  const onToggle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setTurnOn((current) => !current);
  }, []);

  const Icon = Icons[name];
  return (
    <Wrapper>
      <LongBtn name={name} width="450px" disabled>
        <div>
          <Icon />
          <p>
            <strong>{name}</strong> account
          </p>
        </div>
      </LongBtn>
      <Toggle turnOn={turnOn} disabled={!edit} onClick={onToggle}>
        <ToggleInsider />
      </Toggle>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 8px;
  }
`;

const Toggle = styled.button<{ turnOn: boolean }>`
  display: flex;
  justify-content: ${({ turnOn }) => (turnOn ? 'flex-start' : 'flex-end')};
  align-items: center;
  width: 45px;
  height: 20px;
  padding: 2px;
  margin: 0 0 0 20px;
  border: none;
  border-radius: 16px;
  background-color: ${({ turnOn }) =>
    turnOn ? styles.colors.logoColor : styles.colors.emphColor};
  transition: all 300ms ease-in-out;

  :disabled {
    background-color: ${styles.colors.emptyColor};
  }
`;

const ToggleInsider = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.modalShadow};
`;
