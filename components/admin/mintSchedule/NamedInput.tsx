import { ChangeEventHandler } from 'react';

type PropsType = {
  name: string;
  inputElemName: string;
  type: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function NamedInput({
  name,
  inputElemName,
  type,
  value,
  onChange,
}: PropsType) {
  return (
    <div>
      <p>{name}</p>
      <input
        name={inputElemName}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
