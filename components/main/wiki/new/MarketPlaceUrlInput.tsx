import {
  memo,
  FormEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import BlueBtn from 'components/main/wiki/BlueBtn';
import { MARKETPLACES } from 'lib/main/wiki/constants';
import styles from 'styles/styleLib';

const options: ReactSelect.OptionType[] = MARKETPLACES.map((marketplace) => ({
  value: marketplace,
  label: marketplace,
}));

const selectStyles: ReactSelect.CustomStyleType = {
  control: (base) => ({
    ...base,
    width: 200,
    height: 40,
    marginRight: 20,
    borderRadius: 8,
    border: `1px solid ${styles.colors.lightBorderColor}`,
  }),
};

type PropsType = {
  basicPending: boolean;
  basicFetched: Wiki.MarketplaceType;
  setBasicFetched: Dispatch<SetStateAction<Wiki.MarketplaceType>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default memo(function MarketPlaceUrlInput({
  basicPending,
  basicFetched,
  setBasicFetched,
  onSubmit,
}: PropsType) {
  /**
   * @listener
   * Change event listener for React Select component.
   * Disables the Input && submit button component when user selected 'unregistered'.
   */
  const onChange: ReactSelect.SingleSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) setBasicFetched(selected?.value as Wiki.MarketplaceType);
    },
    []
  );

  return (
    <form onSubmit={onSubmit}>
      <Name>Marketplace Collection URL</Name>
      <Wrapper>
        <Input
          type="url"
          name="MarketPlaceUrl"
          placeholder="https://opensea.io/collection/..."
          required
          disabled={basicFetched === 'unregistered'}
        />
        <Select
          styles={selectStyles}
          options={options}
          placeholder="Marketplace"
          onChange={onChange}
        />
        <SubmitBtn
          width="135px"
          disabled={basicPending || basicFetched === 'unregistered'}
        >
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

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
