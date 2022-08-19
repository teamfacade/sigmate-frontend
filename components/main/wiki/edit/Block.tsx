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

type PropsType = {
  id: number;
  onClickSelect: (id: number, tag: string) => void;
  removeBlock: (id: number) => void;
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
      removeBlock(id);
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
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <BtnWrapper>
        {showBtn && (
          <>
            <Btn onClick={onClickAdd}>+</Btn>
            <Btn onClick={onClickRemove}>-</Btn>
          </>
        )}
        {showSelect && (
          <Select
            options={options}
            onChange={onChange}
            autoFocus
            onBlur={onBlur}
          />
        )}
      </BtnWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid transparent;

  :hover {
    border-color: #276bff;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  flex: 0 0 auto;
`;
