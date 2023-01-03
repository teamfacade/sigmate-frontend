import { useState, useCallback, useEffect, MouseEventHandler } from 'react';
import {
  Guidelines,
  Categorize,
  NewArticle,
  NewArticleNewEditor,
} from 'containers/main/wiki/new';

export default function MakeNewArticle() {
  const [phase, setPhase] = useState(3);
  const [topic, setTopic] = useState('Collection');

  useEffect(() => window.scrollTo(0, 0), [phase]);

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

  switch (phase) {
    case 1:
      return <Guidelines onClick={onClickNext} />;
    case 2:
      return <Categorize onClick={onClickStart} />;
    case 3:
      return <NewArticleNewEditor topic={topic} />;
    default:
      break;
  }
}
