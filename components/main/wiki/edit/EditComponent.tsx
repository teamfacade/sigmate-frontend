import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
  forwardRef,
} from 'react';

import Heading from 'components/main/wiki/read/Heading';
import Paragraph from 'components/main/wiki/read/Paragraph';
import { Textarea } from './TextEdit';

type PropsType = {
  element: string;
  content: string;
  showInput: boolean;
  value: string;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default memo(
  forwardRef<HTMLTextAreaElement, PropsType>(function EditComponent(
    { element, content, showInput, value, onBlur, onKeyDown, onChange },
    ref
  ) {
    switch (element) {
      case 'p':
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
            ref={ref}
          />
        ) : (
          <Paragraph content={content} />
        );
      case 'h':
        return content === '' || showInput ? (
          <Textarea
            autoFocus
            placeholder={content || `Input ${'a subheader'}...`}
            value={value}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onChange={onChange}
            ref={ref}
          />
        ) : (
          <Heading content={content} />
        );
      default:
        return <div>DEFAULT</div>;
    }
  })
);
