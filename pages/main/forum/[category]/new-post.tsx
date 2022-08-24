import { useState, useCallback, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import {
  SingleLineTextArea,
  MainContentTextArea,
} from 'components/main/forum/new';
import { WrapperStyle, BlueBtnStyle } from 'styles/styleLib';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'Title':
        setTitle(e.currentTarget.value);
        break;
      case 'Content':
        setContent(e.currentTarget.value);
        break;
      case 'Tag':
        setTag(e.currentTarget.value);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Wrapper>
      <SingleLineTextArea name="Title" value={title} onChange={onChange} />
      <MainContentTextArea name="Content" value={content} onChange={onChange} />
      <SingleLineTextArea name="Tag" value={tag} onChange={onChange} />
      <BtnWrapper>
        <BlueBtn>Post</BlueBtn>
      </BtnWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${WrapperStyle};
  width: 975px;
`;

const BtnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 18px;
`;

const BlueBtn = styled.button`
  position: absolute;
  right: 0;
  ${BlueBtnStyle};
  padding: 9px 50px;
`;
