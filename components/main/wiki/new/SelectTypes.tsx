import Select from 'react-select';
import { ReactSelectTypes } from 'index';

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

type PropsType = {
  onChange: ReactSelectTypes.MultiSelectChangeEventHandler;
};

export default function SelectTypes({ onChange }: PropsType) {
  return <Select onChange={onChange} options={options} isMulti />;
}
