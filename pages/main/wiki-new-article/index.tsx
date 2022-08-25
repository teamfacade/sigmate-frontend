import { useState, useCallback, MouseEventHandler } from 'react';
import { Guidelines, Categorize, NewArticle } from 'containers/main/wiki/new';
import { BlockType } from 'lib/main/wiki/getWikiData';

export default function MakeNewArticle() {
  const [phase, setPhase] = useState(1);
  const [topic, setTopic] = useState('Others');
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const onClickNext: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setPhase((curPhase) => curPhase + 1),
    []
  );
  const onClickStart: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setPhase((curPhase) => curPhase + 1);
      setTopic(e.currentTarget.name);
    },
    []
  );
  const onClickSubmit: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      // eslint-disable-next-line no-alert
      alert('submit!');
    }, []);

  switch (phase) {
    case 1:
      return <Guidelines onClick={onClickNext} />;
    case 2:
      return <Categorize onClick={onClickStart} />;
    case 3:
      return (
        <NewArticle
          onClick={onClickSubmit}
          topic={topic}
          title={title}
          setTitle={setTitle}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      );
    default:
      break;
  }
}
