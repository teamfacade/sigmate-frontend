import { MutableRefObject, useCallback } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from 'lib/global/editorTools';
import { EditorCore } from '@react-editor-js/core';

type PropsType = {
  editorCoreRef: MutableRefObject<null>;
};

const defaultValue = {
  time: 1672746855468,
  blocks: [
    {
      id: '6kQVvjGKph',
      type: 'paragraph',
      data: {
        text: 'ha',
      },
    },
    {
      id: 'a_-puyOOWm',
      type: 'header',
      data: {
        text: 'hello',
        level: 2,
      },
    },
    {
      id: '0HFUBFA9mt',
      type: 'paragraph',
      data: {
        text: 'how are you?',
      },
    },
    {
      id: 'a1oaEgfbpn',
      type: 'paragraph',
      data: {
        text: 'aewflalala',
      },
    },
  ],
  version: '2.26.4',
};

export default function NewEditor({ editorCoreRef }: PropsType) {
  const ReactEditorJS = createReactEditorJS();
  const handleInitialize: (core: EditorCore) => void = useCallback(
    (instance) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      editorCoreRef.current = instance;
    },
    []
  );

  return (
    <ReactEditorJS
      defaultValue={defaultValue}
      onInitialize={handleInitialize}
      tools={EDITOR_JS_TOOLS}
    />
  );
}
