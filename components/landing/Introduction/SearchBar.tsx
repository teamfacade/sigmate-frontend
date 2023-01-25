import { FormEventHandler, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { ReadingGlass } from 'public/Icons/landingPage';

export default function SearchBar() {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const title = (e.target as HTMLFormElement).bar.value;
      if (title.length < 3) alert('Query should be longer than 2 characters.');
      else {
        (e.target as HTMLFormElement).bar.value = '';
        router.push(`/main/wiki/search?title=${title}`);
      }
    },
    [router]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Input name="bar" placeholder="Search NFT Collections" />
      <TransparentBtn>
        <ReadingGlass />
      </TransparentBtn>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  padding: 19px 34px 21px 34px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 2px 2px 10px 0 rgb(140, 140, 140, 0.1);
`;

const Input = styled.input`
  width: calc(100% - 50px);
  border: none;
  color: ${styles.colors.landingIntroText};
  font-family: 'Inter', sans-serif;
  font-size: 25px;
  font-weight: 500;

  :focus-visible {
    outline: none;
  }
`;

const TransparentBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
`;
