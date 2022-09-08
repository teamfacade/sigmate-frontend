import { memo } from 'react';
import { Heading, Paragraph } from 'components/main/wiki/read';

type PropsType = {
  element: string;
  content: string;
};

const Components: StringKeyObj<typeof Paragraph> = {
  p: Paragraph,
  h: Heading,
};

export default memo(function ReadComponent({ element, content }: PropsType) {
  const Component = Components[element];

  switch (element) {
    case 'p':
    case 'h':
      return <Component content={content} />;
    default:
      return null;
  }
});
