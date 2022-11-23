import styled from 'styled-components';

type PropsType = {
  name: string;
  content: string;
};

export default function NameAndContent({ name, content }: PropsType) {
  return (
    <Wrapper>
      <p>{name}</p>
      <p>{content}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;
