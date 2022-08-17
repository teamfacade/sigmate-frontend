import styled from 'styled-components';
import styles from 'styles/styleLib';
import { MouseEventHandler } from 'react';

type PropsType = {
  selected: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function LogSelect({ selected, onClick }: PropsType) {
  return (
    <BtnWrapper>
      <Btn name="All" selected={selected === 'All'} onClick={onClick}>
        All
      </Btn>
      <Btn name="New" selected={selected === 'New'} onClick={onClick}>
        New Article
      </Btn>
      <Btn name="Deleted" selected={selected === 'Deleted'} onClick={onClick}>
        Deleted
      </Btn>
      <Btn name="Moved" selected={selected === 'Moved'} onClick={onClick}>
        Moved
      </Btn>
      <Btn name="Undo" selected={selected === 'Undo'} onClick={onClick}>
        Undo
      </Btn>
    </BtnWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  padding: 6px 8px;
  margin-left: 30px;
  background-color: #f3f4f8;
  border-radius: 8px;
`;

const Btn = styled.button<{ selected: boolean }>`
  width: 115px;
  padding: 4px 20px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF' : 'transparent')};
  border-radius: 4px;
  border: none;
  color: ${({ selected }) => (selected ? '#595C66' : '#A3A4A9')};
  font-family: 'Inter', sans-serif;
  box-shadow: ${({ selected }) =>
    selected ? styles.shadows.containerShadow : 'none'};
`;
