import { memo } from 'react';
import { Heading, Paragraph } from 'components/main/wiki/read';

interface StringKeyObj<T> {
  [index: string]: T;
  p: T;
  h: T;
}

type PropsType = {
  tag: string;
  content: string;
};

const Components: StringKeyObj<typeof Paragraph> = {
  p: Paragraph,
  h: Heading,
};

export default memo(function ReadComponent({ tag, content }: PropsType) {
  const Component = Components[tag];

  switch (tag) {
    case 'p':
    case 'h':
      return <Component content={content} />;
    default:
      return null;
  }
});
