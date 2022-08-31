import {
  MouseEventHandler,
  memo,
  useState,
  FormEventHandler,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { OpinionInput } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';

export default memo(function Opinion() {
  const [showOpinion, setShowOpinion] = useState(false);
  const [opinion, setOpinion] = useState('');

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowOpinion((curShow) => !curShow),
    []
  );

  return (
    <>
      <Btn onClick={onClick}>{`Write an opinion explaining your choice ${
        showOpinion ? '▼' : '▶'
      }`}</Btn>
      <OpinionInputWrapper>
        <OpinionInput
          opinion={opinion}
          showOpinion={showOpinion}
          setOpinion={setOpinion}
        />
      </OpinionInputWrapper>
    </>
  );
});

const Btn = styled.button`
  padding: 0;
  margin: 29px 0 0 0;
  background-color: transparent;
  border: none;
  color: ${styles.colors.logoColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`;

const OpinionInputWrapper = styled.div`
  width: 100%;
  margin-top: 9px;
  background-color: transparent;
  overflow: hidden;
`;
