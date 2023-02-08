import { ChangeEventHandler } from 'react';
import {
  Td,
  Th,
  Tr,
} from 'components/main/wiki/edit/KeyInfo/KeyinfoComponents';

type PropsType = {
  componentName: string;
  title: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default function EditableKeyInfo({
  componentName,
  title,
  value,
  onChange,
}: PropsType) {
  return (
    <Tr key={title}>
      <Th>
        <p>{title}</p>
      </Th>
      <Td>
        <textarea
          name={componentName}
          rows={1}
          placeholder={`Type about ${title.toLowerCase()}`}
          value={value}
          onChange={onChange}
        />
      </Td>
    </Tr>
  );
}
