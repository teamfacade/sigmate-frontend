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
  width: inherit;
`;

const Input = styled.input`
  width: inherit;
`;

const Submit = styled.button`
  width: inherit;
`;

const KeepSignIn = styled.div`
  width: inherit;
`;
