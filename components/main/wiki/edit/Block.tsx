import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  isTitle?: boolean;
  onClickSelect: (id: number, tag: string) => void;
  removeBlock?: (id: number) => void;
  children: ReactNode;
};

const options: ReactSelect.OptionType[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h', label: 'Heading' },
];

let prevHeight = 0;

export default memo(function Block({
  id,
  isTitle = false,
  onClickSelect,
  removeBlock,
  children,
}: PropsType) {
  const [showBtn, setShowBtn] = useState(isTitle);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    if (showSelect) {
      const ContentWrapper = document.getElementById('content-wrapper');
      if (ContentWrapper && prevHeight < ContentWrapper.scrollHeight) {
        ContentWrapper.scrollTo({
          top: ContentWrapper.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [showSelect]);

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowBtn(true),
    []
  );
  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setShowBtn(false);
  }, []);

  const onClickAdd: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowBtn(false);
    const ContentWrapper = document.getElementById('content-wrapper');
    if (ContentWrapper) prevHeight = ContentWrapper.scrollHeight;
    setShowSelect(true);
  }, []);

  const onClickRemove: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (removeBlock) removeBlock(id);
    }, [removeBlock, id]);

  const onChange: ReactSelect.SingleSelectChangeEventHandler = useCallback(
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

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const ContentWrapper = document.getElementById('content-wrapper');
      if (ContentWrapper) prevHeight = ContentWrapper.scrollHeight;
      setShowSelect(true);
    }
  }, []);

  const onSelectKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        setShowSelect(false);
      }
    },
    []
  );

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      isTitle
    >
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
            onKeyDown={onSelectKeyDown}
            autoFocus
            defaultMenuIsOpen
            onBlur={onBlur}
          />
        </BlockTypeSelectWrapper>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ isTitle: boolean }>`
  position: relative;
  padding: 10px 14px;
  border-left: 8px solid transparent;

  :hover {
    background-color: ${styles.colors.lightThumbsUpColor};
    border-left-color: rgba(37, 99, 235, 0.8);
  }
`;

const BlockControlBtnWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  padding-right: 10px;
  transform: translate(-100%, -50%);
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
  border-radius: 8px;
  color: ${styles.colors.emphColor};
  font-size: 25px;
  font-weight: 500;
  line-height: 160%;

  :not(:first-child) {
    transform: translateY(-2px);
  }

  :hover {
    scale: 1.2;
  }
`;
