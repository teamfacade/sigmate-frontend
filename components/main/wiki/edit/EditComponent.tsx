import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
} from 'react';
import { Heading, Paragraph } from './index';
import Textarea from './TextEdit';

type PropsType = {
  element: string;
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
  element,
  content,
  showInput,
  value,
  onBlur,
  onKeyDown,
  onChange,
}: PropsType) {
  const Component = Components[element];

  switch (element) {
    case 'p':
    case 'h':
      return content === '' || showInput ? (
        <Textarea
          autoFocus
          placeholder={
            content ||
            `Input ${element === 'p' ? 'contents' : 'a subheader'}...`
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
      return <div>DEFAULT</div>;
  }
});
