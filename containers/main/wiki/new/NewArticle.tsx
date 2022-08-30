import {
  FormEventHandler,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from 'react';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  topic: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  blocks: BlockType[];
  setBlocks: Dispatch<SetStateAction<BlockType[]>>;
};

export default function NewArticle({
  onSubmit,
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
      <BasicInfos topic={topic} onChangeTypes={onChangeTypes} />
      <form onSubmit={onSubmit}>
        <WriteNew
          newArticle
          title={title}
          types={selectedOption.map((selected) => selected.value)}
          onChangeTypes={onChangeTypes}
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
        <BlueBtn width="162px" margin="29px 0 0 0">
          Submit
        </BlueBtn>
      </form>
    </SectionWrapper>
  );
}
