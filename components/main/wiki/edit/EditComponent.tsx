import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
  forwardRef,
} from 'react';
import { Heading, Paragraph, Img } from './index';
import { Textarea } from './TextEdit';

type PropsType = {
  element: string;
  content: string;
  showInput: boolean;
  value: string;
  imgBlob?: File;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  removeThisBlock: () => void;
};

const Components: StringKeyObj<typeof Paragraph> = {
  p: Paragraph,
  h: Heading,
};

export default memo(
  forwardRef<HTMLTextAreaElement, PropsType>(function EditComponent(
    {
      element,
      content,
      showInput,
      value,
      imgBlob,
      onBlur,
      onKeyDown,
      onChange,
      removeThisBlock,
    },
    ref
  ) {
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
            ref={ref}
          />
        ) : (
          <Component content={content} />
        );
      case 'img':
        return (
          <Img
            imageBlob={imgBlob}
            onChange={onChange}
            removeThisBlock={removeThisBlock}
          />
        );
      default:
        return <div>DEFAULT</div>;
    }
  })
);
