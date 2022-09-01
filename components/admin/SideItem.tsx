import Link from 'next/link';
import styled from 'styled-components';

type PropsType = {
  name: string;
  path: string;
};

export default function SideItem({ name, path }: PropsType) {
  return (
    <Link href={`/admin/${path}`} passHref>
      <a>
        <Btn>{name}</Btn>
      </a>
    </Link>
  );
}

const Btn = styled.button`
  width: 200px;
  height: 40px;
  padding: 5px 10px;
`;
