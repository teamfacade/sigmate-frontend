import styled from 'styled-components';

type PropsType = {
  service: string;
};

export default function OAuthBtn({ service }: PropsType) {
  return <Btn>`Continue with ${service}`</Btn>;
}

const Btn = styled.button`
  color: #d2624a;
`;
