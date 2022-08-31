import {
  ReactNode,
  memo,
  MouseEventHandler,
  useState,
  useCallback,
  FocusEventHandler,
} from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  isTitle?: boolean;
  onClickSelect: (id: number, tag: string) => void;
  removeBlock?: (id: number) => void;
  children: ReactNode;
};

type OptionType = {
  value: string;
  label: string;
};

type SelectChangeEventHandler = (
  option: SingleValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => void;

const options: OptionType[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h', label: 'Heading' },
];

export default memo(function Block({
  id,
  isTitle,
  onClickSelect,
  removeBlock,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowBtn(true),
    []
  );
  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setShowBtn(false);
  }, []);

  const onClickAdd: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowBtn(false);
    setShowSelect(true);
  }, []);

  const onClickRemove: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (removeBlock) removeBlock(id);
    }, [removeBlock, id]);

  const onChange: SelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        onClickSelect(id, selected.value);
      }
      setShowBtn(false);
      setShowSelect(false);
    },
    [id]
  );

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setShowSelect(false);
  }, []);

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} isTitle>
      {children}
      {showBtn && (
        <BlockControlBtnWrapper>
          <BlockControlBtn onClick={onClickAdd}>+</BlockControlBtn>
          {!isTitle && (
            <BlockControlBtn onClick={onClickRemove}>-</BlockControlBtn>
          )}
        </BlockControlBtnWrapper>
      )}
      {showSelect && (
        <BlockTypeSelectWrapper>
          <Select
            options={options}
            onChange={onChange}
            autoFocus
            onBlur={onBlur}
          />
        </BlockTypeSelectWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ isTitle: boolean }>`
  position: relative;
  height: ${({ isTitle }) => (isTitle ? '100px' : '40px')};
  padding: 10px;
  border: 1px solid transparent;

  :hover {
    background-color: ${styles.colors.lightThumbsUpColor};
  }
`;

const BlockControlBtnWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  display: flex;
  align-items: center;
`;

const BlockTypeSelectWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;
`;

const BlockControlBtn = styled.button`
  flex: 0 0 auto;
  background-color: transparent;
  border: none;
  color: ${styles.colors.emphColor};
  font-size: 25px;
  font-weight: 500;
  line-height: 160%;
`;
