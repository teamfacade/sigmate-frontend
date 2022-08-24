import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  category: string;
};

export default memo(function PostBtn({ category }: PropsType) {
  return (
    <BlueBtn>
      <Link href={`main/forum/post/${category}`}>
        <a>Make new</a>
      </Link>
    </BlueBtn>
  );
});

const BlueBtn = styled.button`
  ${BlueBtnStyle};
  padding: 0 12px;
`;
