import { FocusEventHandler, KeyboardEventHandler, memo, useMemo } from 'react';
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

export default memo(function InputTemplate({
  name,
  placeholder,
  description,
  onChange,
  onBlur,
  isValid,
}: PropsType) {
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
          onChange={onChange}
          onBlur={onBlur}
        />
        {ValidityIcon && <ValidityIcon />}
      </TextareaWrapper>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
});

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

const Textarea = styled.textarea`
  display: block;
  margin: 0 0 13px 0;
  width: 470px;
  height: 40px;
  padding: 9px 10px 7px 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  box-shadow: ${styles.shadows.containerShadow};
  resize: none;

  &:focus-visible {
    outline: none;
  }
`;

const Description = styled.p`
  margin: 0;
  color: #909090;
  font-size: 16px;
  font-weight: 300;
  line-height: 160%;
`;
