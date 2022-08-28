import Link from 'next/link';
import styled from 'styled-components';

export default function RegisterBtn() {
  return (
    <Btn>
      <Link href="https://google.com">
        <a>Register your event</a>
      </Link>
    </Btn>
  );
}

const Btn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 34px;
  border-radius: 8px;
`;
