import styled from 'styled-components';

export default function EmailForm() {
  return (
    <Form>
      <Input placeholder="Email Address" />
      <Submit>Continue With Email</Submit>
      <KeepSignIn>
        <input type="checkbox" id="checkbox" />
        <span>Keep me signed in</span>
      </KeepSignIn>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const Submit = styled.button`
  width: 100%;
`;

const KeepSignIn = styled.div`
  width: 100%;
`;
