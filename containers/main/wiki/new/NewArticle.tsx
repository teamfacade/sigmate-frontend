import {
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from 'react';
import { BasicInfos } from 'containers/main/wiki/new';
import { WikiEdit } from 'containers/main/wiki/edit';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  topic: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  blocks: BlockType[];
  setBlocks: Dispatch<SetStateAction<BlockType[]>>;
};

export default function NewArticle({
  onClick,
  topic,
  title,
  setTitle,
  blocks,
  setBlocks,
}: PropsType) {
  const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);

  const onChangeTypes: MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  return (
    <SectionWrapper header="Start New Article" marginBottom="20px">
      <form>
        <BasicInfos topic={topic} onChangeTypes={onChangeTypes} />
        <WikiEdit
          newArticle
          title={title}
          types={selectedOption.map((selected) => selected.value)}
          setTitle={setTitle}
          blocks={blocks}
          setBlocks={setBlocks}
        />
        <DisclaimWrapper>
          <input type="checkbox" />
          <span>
            All of the Content above must be filled in order to claim article
            creation award.
          </span>
          <Disclaimer>
            {
              ' comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" '
            }
          </Disclaimer>
        </DisclaimWrapper>
        <BlueBtn width="162px" margin="29px 0 0 0" onClick={onClick}>
          Submit
        </BlueBtn>
      </form>
    </SectionWrapper>
  );
}
