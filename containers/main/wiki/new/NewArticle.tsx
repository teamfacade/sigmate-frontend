import { MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { BlockType } from 'lib/main/wiki/getWikiData';
import { WikiEdit } from 'containers/main/wiki/edit';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  blocks: BlockType[];
  setBlocks: Dispatch<SetStateAction<BlockType[]>>;
};

export default function NewArticle({
  onClick,
  title,
  setTitle,
  blocks,
  setBlocks,
}: PropsType) {
  return (
    <SectionWrapper header="Start New Article" marginBottom="20px">
      <WikiEdit
        newArticle
        title={title}
        setTitle={setTitle}
        blocks={blocks}
        setBlocks={setBlocks}
      />
      <DisclaimWrapper>
        <input type="checkbox" />
        <span>
          All of the Content above must be filled in order to claim article creation award.
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
    </SectionWrapper>
  );
}
