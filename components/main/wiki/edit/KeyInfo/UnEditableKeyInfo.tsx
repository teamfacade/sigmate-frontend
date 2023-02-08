import { KeyInfoIndex } from 'lib/main/wiki/constants';
import { Td, Th, Tr } from './KeyinfoComponents';

type PropsType = {
  title: string;
  value: string;
  i: number;
};

export default function UnEditableKeyInfo({ title, value, i }: PropsType) {
  return (
    <Tr key={title}>
      <Th>
        <p>{title}</p>
      </Th>
      <Td>
        <p>{`${value || 'TBA'}${
          value && i === KeyInfoIndex.CurrentPrice ? ' ETH' : ''
        }`}</p>
      </Td>
    </Tr>
  );
}
