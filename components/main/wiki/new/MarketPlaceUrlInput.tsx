import { memo, FormEventHandler, useState, useCallback } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  basicPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function MarketPlaceUrlInput({
  basicPending,
  onSubmit,
}: PropsType) {
  return (
    <form onSubmit={onSubmit}>
      <Wrapper>
        <Name>Marketplace Collection URL</Name>
        <Input
          type="url"
          name="MarketPlaceUrl"
          placeholder="https://opensea.io/collection/..."
          required
        />
        <SubmitBtn width="135px" disabled={basicPending}>
          {basicPending ? '...' : 'Submit'}
        </SubmitBtn>
      </Wrapper>
    </form>
  );
});

const textStyle = `
    color: ${styles.colors.logColor};
  font-size: 17px;
  font-weight: 500;
  line-height: 160%;
`;

const Wrapper = styled.div``;

const Name = styled.p`
  margin: 0 0 5px 0;
  ${textStyle};
`;

const Input = styled.input`
  width: 35%;
  height: 40px;
  padding: 5px 10px;
  margin: 0 20px 0 0;
  ${textStyle};
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightBorderColor};

  ::placeholder {
    color: ${styles.colors.lighterTextColor};
  }

  :focus::placeholder {
    color: transparent;
  }
`;

const SubmitBtn = styled(BlueBtn)`
  float: none;
`;

export { Name, Input, SubmitBtn };
