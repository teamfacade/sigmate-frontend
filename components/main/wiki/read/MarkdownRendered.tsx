import { marked } from 'marked';
import DOMPurify from 'dompurify';

type PropsType = {
  content: string;
};

function MarkdownRendered({ content }: PropsType) {
  return <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked.parse(content)),
    }}
  />
}

export default MarkdownRendered;
