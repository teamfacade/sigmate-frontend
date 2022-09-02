import { memo, FormEventHandler } from 'react';
import styled from 'styled-components';
import { Name, Input as myInput, SubmitBtn } from './MarketPlaceUrlInput';

type PropsType = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function TokenInfoInput({ onSubmit }: PropsType) {
  return (
    <form onSubmit={onSubmit}>
      <Wrapper>
        <div>
          <Name>Contract address</Name>
          <Input type="text" name="Address" placeholder="0x00...00" required />
        </div>
        <div>
          <Name>Token ID</Name>
          <Input type="number" name="ID" placeholder="123" required />
        </div>
        <SubmitBtn width="135px">Submit</SubmitBtn>
      </Wrapper>
    </form>
  );
});

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 25px 0;

  div + div {
    margin: 0 25px;
  }

  button {
    margin: 32px 0 0 0;
  }
`;

const Input = styled(myInput)`
  width: 100%;
`;
