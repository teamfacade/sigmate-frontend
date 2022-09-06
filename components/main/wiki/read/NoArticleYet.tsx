import { useCallback, MouseEventHandler } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import styles from 'styles/styleLib';

type PropsType = {
  title: string;
};

export default function NoArticleYet({ title }: PropsType) {
  const router = useRouter();
  const { signedIn, userName } = useAppSelector(({ auth }) => auth);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (signedIn && userName) router.push('/main/wiki-new-article');
    else {
      alert('You have to sign in to write a document.');
      router.push('/auth');
    }
  }, [signedIn, userName]);

  return (
    <Wrapper>
      <h1>{title}</h1>
      <FlexWrapper>
        <p>Can&apos;t find what you are looking for?</p>
        <button type="button" onClick={onClick}>
          <p>Create new article</p>
        </button>
      </FlexWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    margin: 0 0 18px 0;
    color: ${styles.colors.logoColor};
    font-size: 40px;
    font-weight: bold;
    line-height: 110%;
    text-align: left;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0 290px 0 0;
    color: ${styles.colors.logColor};
    font-size: 18px;
  }

  button {
    width: 255px;
    height: 41px;
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
  }
`;
