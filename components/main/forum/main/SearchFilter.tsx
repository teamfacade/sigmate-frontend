import { memo, useCallback, Dispatch, SetStateAction } from 'react';
import Select, { GroupBase, StylesConfig } from 'react-select';
import {
  ValueContainer,
  IndicatorsContainer,
  Placeholder,
} from 'components/global/CustomSelectComponents';
import styles from 'styles/styleLib';

const options: ReactSelect.OptionType[] = [
  { value: 'Category', label: 'Category' },
  { value: 'Title', label: 'Thread Title' },
  { value: 'Content', label: 'Thread content' },
];

const customStyles: ReactSelect.CustomStyleType = {
  control: (base) => ({
    ...base,
    width: 200,
    height: 40,
    marginRight: 8,
    borderRadius: 8,
    border: `1px solid ${styles.colors.lightBorderColor}`,
    boxShadow: styles.shadows.containerShadow,
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 16,
    fontWeight: 300,
    fontFamily: 'Inter, sans-serif',
    color: styles.colors.logColor,
  }),
};

type PropsType = {
  setFilter: Dispatch<SetStateAction<ForumSearchFilter>>;
};

export default memo(function SearchFilter({ setFilter }: PropsType) {
  const onChange: ReactSelect.SingleSelectChangeEventHandler = useCallback(
    (selected) => {
      setFilter(selected?.value as ForumSearchFilter);
    },
    []
  );

  return (
    <Select
      styles={customStyles}
      options={options}
      components={{ ValueContainer, IndicatorsContainer, Placeholder }}
      placeholder="Search as ..."
      onChange={onChange}
    />
  );
});
