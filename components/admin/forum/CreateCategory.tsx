import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { NamedInput } from 'components/admin/forum';
import styles, { BlueBtnStyle } from 'styles/styleLib';

export default function EditSchedule() {
  const [imgName, setImgName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onChangeImgs: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (e.target.files) {
        const file = e.target.files[0];
        if (file) setImgName(file.name);
      }
    },
    []
  );

  return (
    <BasicWrapper>
      <SectionWrapper header="New category">
        <form onSubmit={(e) => e.preventDefault()}>
          <Wrapper>
            <NamedInput name="Name" inputElemName="name" type="text" />
            <NamedInput
              name="Description"
              inputElemName="description"
              type="text"
            />
            <div>
              <EditBtn onClick={onClick}>Upload Images</EditBtn>
              <span>{imgName}</span>
            </div>
            <Input
              type="file"
              onChange={onChangeImgs}
              ref={inputRef}
              accept="image/*"
            />
          </Wrapper>
          <SaveBtn>Create</SaveBtn>
        </form>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  height: 60vh;
  overflow: scroll;
`;

const EditBtn = styled.button`
  margin: 20px 5px 0 0;
  background-color: #ffffff;
  border: 1px solid ${styles.colors.lightBorderColor};
  border-radius: 8px;
  color: ${styles.colors.logColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const SaveBtn = styled.button`
  ${BlueBtnStyle};
  font-weight: 500;
`;
