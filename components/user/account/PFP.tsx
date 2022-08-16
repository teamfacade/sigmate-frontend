import {
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { Pencil } from 'public/Icons/user/account';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';
import styles from 'styles/styleLib';

type PropsType = {
  level: number;
};

export default memo(function PFP({ level }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();

    if (e.target.files) {
      const file = e.target.files[0];
      // eslint-disable-next-line
      console.log(file);
    }
  }, []);

  return (
    <>
      <Wrapper>
        <ImageWrapper width="200px" height="200px">
          <Image
            src={UserImageEx}
            alt="Profile image"
            layout="fill"
            quality={100}
          />
          <EditBtn onClick={onClick}>
            <div>
              <Pencil />
              <p>Edit</p>
            </div>
          </EditBtn>
        </ImageWrapper>
        <LvWrapper>
          <p>{`Lv ${Math.floor(level)} / ${(level * 100) % 100}%`}</p>
          <progress max="100" value={(level * 100) % 100} />
        </LvWrapper>
      </Wrapper>
      <Input type="file" onChange={onChange} ref={inputRef} />
    </>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  display: none;
`;

const EditBtn = styled.button`
  position: absolute;
  right: -37px;
  bottom: 0;
  width: 94px;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid ${styles.colors.lightBorderColor};
  border-radius: 8px;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      display: inline-block;
      margin: 0;
      color: ${styles.colors.logoColor};
      font-size: 16px;
    }
  }

  &:focus-visible {
    outline: none;
  }
`;

const LvWrapper = styled.div`
  p {
    margin: 12px 0 0 0;
    color: ${styles.colors.logoColor};
    font-size: 16px;
    font-weight: bold;
  }

  progress {
    appearance: none;

    &::-webkit-progress-bar {
      width: 223px;
      height: 9px;
      margin-top: 2px;
      background: #eef7ff;
      border-radius: 30px;
    }

    &::-webkit-progress-value {
      background: ${styles.colors.emphColor};
      border-radius: 30px;
    }
  }
`;
