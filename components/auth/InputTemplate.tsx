import {
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
  forwardRef,
  useMemo,
} from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Valid, Invalid } from 'public/Icons/auth';

type PropsType = {
  name: string;
  placeholder?: string;
  description?: string;
  onChange: KeyboardEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  isValid: boolean | undefined;
};

export default memo(
  forwardRef<HTMLTextAreaElement, PropsType>(function InputTemplate(
    { name, placeholder, description, onChange, onBlur, isValid },
    ref
  ) {
    const ValidityIcon = useMemo(() => {
      if (isValid === undefined) return null;
      if (isValid) return Valid;
      return Invalid;
    }, [isValid]);

    return (
      <Wrapper hasDescription={!!description}>
        <Name>{name}</Name>
        <TextareaWrapper>
          <Textarea
            name={name}
            rows={1}
            cols={30}
            maxLength={30}
            placeholder={placeholder}
            autoFocus={name === 'Username'}
            isValid={isValid}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
          {ValidityIcon && <ValidityIcon />}
        </TextareaWrapper>
        {description && <Description>{description}</Description>}
      </Wrapper>
    );
  })
);

const Wrapper = styled.div<{ hasDescription: boolean }>`
  width: 470px;
  margin: 0 0 ${({ hasDescription }) => (hasDescription ? '20px' : '30px')} 0;
`;

const Name = styled.p`
  margin: 0 0 20px 0;
  color: ${styles.colors.logoColor};
  font-size: 20px;
  font-weight: bold;
`;

const TextareaWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

const Textarea = styled.textarea<{ isValid: boolean | undefined }>`
  display: block;
  margin: 0 0 13px 0;
  width: 470px;
  height: 40px;
  padding: 9px 10px 7px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  box-shadow: ${styles.shadows.containerShadow};
  resize: none;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    border-color: ${({ isValid }) => {
      if (isValid === undefined) return `transparent`;
      if (isValid) return `#34C759`;
      return `#E54646`;
    }};
  }
`;

const Description = styled.p`
  margin: 0;
  color: #909090;
  font-size: 16px;
  font-weight: 300;
  line-height: 160%;
`;
