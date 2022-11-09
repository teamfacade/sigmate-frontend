import {
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AuthRequiredAxios, signOut } from 'store/modules/authSlice';
import { useAppSelector, useAppDispatch } from 'hooks/reduxStoreHooks';
import { BasicWrapper, SectionWrapper } from 'components/global';
import styles, { BlueBtnStyle } from 'styles/styleLib';

export default function DeletAccountModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector(({ account }) => account);

  const [pending, setPending] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setUserInput(e.currentTarget.value),
    []
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setPending(true);
    dispatch(
      AuthRequiredAxios({
        method: 'DELETE',
        url: '/user',
      })
    ).then(async (action: any) => {
      setPending(false);
      if (action.payload.status === 204) {
        dispatch(signOut());
        alert('Deleted your account.');
        await router.push('/main/wiki/Sigmate');
      } else {
        alert(
          `Error while deleting your account. ERR: ${action.payload.status}`
        );
      }
    });
  }, []);

  return (
    <BasicWrapper>
      <SectionWrapper header="Delete account" marginBottom="16px">
        <Description>
          This action <strong>cannot be undone.</strong>
          {'\r\nPlease enter your username to confirm.'}
        </Description>
        <Wrapper>
          <Input value={userInput} onChange={onChange} />
          <ConfirmBtn
            disabled={userInput !== userName || pending}
            onClick={onClick}
          >
            {pending ? '...' : 'Confirm'}
          </ConfirmBtn>
        </Wrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Description = styled.p`
  display: block;
  padding: 5px 0;
  margin: 0 0 5px 0;
  color: ${styles.colors.textColor};
  line-height: 27px;
  font-size: 18px;
  font-weight: 300;
  white-space: pre;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${styles.colors.logColor};
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightBorderColor};
  font-size: 17px;
  font-weight: 500;
  line-height: 160%;

  :focus-visible {
    outline: none;
  }
`;

const ConfirmBtn = memo(styled.button`
  ${BlueBtnStyle};
  flex: 0 1 auto;
  width: 133px;
  margin: 0 0 0 32px;
`);
