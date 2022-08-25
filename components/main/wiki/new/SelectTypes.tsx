import { useCallback, useState } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';

const options = [
  { value: 'Giveaway', label: 'Giveaway' },
  { value: 'Freemint', label: 'Freemint' },
  { value: 'Membership', label: 'Membership' },
  { value: 'Auction', label: 'Auction' },
  { value: 'Collaboaration', label: 'Collaboaration' },
  { value: '2D', label: '2D' },
  { value: '3D', label: '3D' },
  { value: 'Pixel', label: 'Pixel' },
  { value: 'PFP', label: 'PFP' },
  { value: 'Social', label: 'Social' },
];

type OptionType = {
  value: string;
  label: string;
};

type SelectChangeEventHandler = (
  option: MultiValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => void;

export default function SelectTypes() {
  const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);

  const onChange: SelectChangeEventHandler = useCallback((selected) => {
    if (selected) {
      setSelectedOption(selected.concat());
    }
  }, []);

  return (
    <Select
      defaultValue={selectedOption}
      onChange={onChange}
      options={options}
      isMulti
    />
  );
}
