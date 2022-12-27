import { useCallback, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import styles from 'styles/styleLib';

type PropsType = {
  title: string;
};

export default function NoArticleYet({ title }: PropsType) {
  const router = useRouter();
  const { signedIn } = useAppSelector(({ auth }) => auth);
  const { userName } = useAppSelector(({ account }) => account);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (signedIn && userName) router.push('/main/wiki-new-article');
    else {
      alert('You have to sign in to write a document.');
      router.push('/auth');
    }
  }, [signedIn, userName]);

  return (
    <Button type="button" onClick={onClick}>
      <p>Create new article</p>
    </Button>
  );
}

const Button = styled.button`
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  font-size: 18px;
  cursor: pointer;
  text-align: center;

  p {
    margin: 0;
    color: #ffffff;
    white-space: nowrap;
  }
`;
