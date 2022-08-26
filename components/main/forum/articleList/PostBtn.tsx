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
      <Link href={`/main/forum/${category}/new-post`}>
        <a>Post new</a>
      </Link>
    </BlueBtn>
  );
});

const BlueBtn = styled.button`
  ${BlueBtnStyle};
  padding: 9px 30px;
`;