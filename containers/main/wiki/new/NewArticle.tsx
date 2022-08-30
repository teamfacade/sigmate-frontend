import { FormEventHandler, useState, useCallback } from 'react';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  topic: string;
};

const initialKeyInfo: CollectionKeyInfoType = {
  team: '',
  rugpool: '',
  utility: '',
  marketplace: '',
};

export default function NewArticle({ topic }: PropsType) {
  const [basicFetched, setBasicFetched] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);
  const [keyInfo, setKeyInfo] = useState<CollectionKeyInfoType>(initialKeyInfo);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const onChangeTypes: MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  const onSubmitBasicInfo: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (topic === 'Collection') {
        // eslint-disable-next-line no-alert
        alert(
          (
            e.currentTarget.elements.namedItem(
              'MarketPlaceUrl'
            ) as HTMLInputElement
          )?.value
        );
      } else if (topic === 'Token') {
        // eslint-disable-next-line no-console
        console.log(
          `Contract Address: ${
            (e.currentTarget.elements.namedItem('Address') as HTMLInputElement)
              ?.value
          }`
        );
        // eslint-disable-next-line no-console
        console.log(
          `Token ID: ${
            (e.currentTarget.elements.namedItem('ID') as HTMLInputElement)
              ?.value
          }`
        );
      }
      setBasicFetched(true);
    },
    []
  );

  const onSubmitArticle: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (keyInfo.marketplace && keyInfo.team) {
        // eslint-disable-next-line no-alert
        alert('submit!');
      } else if (keyInfo.team === '') {
        (
          e.currentTarget.elements.namedItem('team') as HTMLTextAreaElement
        ).focus();
      } else {
        (
          e.currentTarget.elements.namedItem(
            'marketplace'
          ) as HTMLTextAreaElement
        ).focus();
      }
    },
    [keyInfo]
  );

  return (
    <SectionWrapper header="Start New Article" marginBottom="20px">
      <BasicInfos topic={topic} onSubmit={onSubmitBasicInfo} />
      {basicFetched && (
        <form onSubmit={onSubmitArticle}>
          <WriteNew
            title={title}
            onChangeTypes={onChangeTypes}
            setTitle={setTitle}
            blocks={blocks}
            setBlocks={setBlocks}
            keyInfo={keyInfo}
            setKeyInfo={setKeyInfo}
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
      )}
    </SectionWrapper>
  );
}
