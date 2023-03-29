// import Embed from '@editorjs/embed'
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
// import Code from '@editorjs/code'
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header';
// import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'
// import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  // embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },
  // code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      },
    },
  },
  // raw: Raw,
  header: Header,
  // quote: Quote,
  // marker: Marker,
  // checklist: CheckList,
  // delimiter: Delimiter,
  // inlineCode: InlineCode,
  // simpleImage: SimpleImage,
};
