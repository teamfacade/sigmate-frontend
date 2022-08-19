import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
} from 'react';
import { Heading, Paragraph } from './index';

interface StringKeyObj<T> {
  [index: string]: T;
  p: T;
  h: T;
}

type PropsType = {
  tag: string;
  content: string;
  showInput: boolean;
  value: string;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const Components: StringKeyObj<typeof Paragraph> = {
  p: Paragraph,
  h: Heading,
};

export default memo(function EditComponent({
  tag,
  content,
  showInput,
  value,
  onBlur,
  onKeyDown,
  onChange,
}: PropsType) {
  const Component = Components[tag];

  switch (tag) {
    case 'p':
    case 'h':
      return content === '' || showInput ? (
        <textarea
          autoFocus
          placeholder={
            content || `Input ${tag === 'p' ? 'contents' : 'a subheader'}...`
          }
          value={value}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      ) : (
        <Component content={content} />
      );
    default:
      return null;
  }
});
