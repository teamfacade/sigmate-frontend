import {
  FormEventHandler,
  useState,
  useCallback,
  ChangeEventHandler,
} from 'react';
import { InitialKeyInfos, KeyInfoIndex } from 'lib/main/wiki/getWikiData';
import { store } from 'store/store';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  topic: string;
};

export default function NewArticle({ topic }: PropsType) {
  const [basicFetched, setBasicFetched] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<
    ReactSelect.OptionType[]
  >([]);
  const [keyInfo, setKeyInfo] =
    useState<Wiki.DocumentBlockType[]>(InitialKeyInfos);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<Wiki.DocumentBlockType[]>([]);

  const onChangeTypes: ReactSelect.MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  const onChangeKeyInfos: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      setKeyInfo((current) => {
        if (current) {
          return current.map((block, idx) => {
            if (idx === KeyInfoIndex[name]) {
              return {
                ...block,
                textContent: value,
              };
            }
            return block;
          });
        }
        return current;
      });
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
      if (topic !== 'Others') {
        if (
          keyInfo[KeyInfoIndex.marketplace].textContent &&
          keyInfo[KeyInfoIndex.team].textContent
        ) {
          // eslint-disable-next-line no-alert
          alert('submit!');
          return;
        } if (keyInfo[KeyInfoIndex.team].textContent === '') {
          (
            e.currentTarget.elements.namedItem('team') as HTMLTextAreaElement
          ).focus();
          return;
        } 
          (
            e.currentTarget.elements.namedItem(
              'marketplace'
            ) as HTMLTextAreaElement
          ).focus();
          return;
        
      }

      const { id, userName, primaryProfile } = (
        store.getState() as ReduxState.RootStateType
      ).account;
      const newDocument: Wiki.DocumentType = {
        id: Date.now(),
        title,
        types: selectedOption.map((selected) => selected.value),
        keyInfos: keyInfo,
        blocks,
        createdBy: {
          id,
          userName: userName as string,
          primaryProfile: {
            ...primaryProfile,
            profileImage: null,
          },
        },
      };
      // eslint-disable-next-line no-console
      console.log(newDocument);
    },
    [title, selectedOption, blocks, keyInfo]
  );

  return (
    <SectionWrapper header="Start New Article" marginBottom="20px">
      <BasicInfos topic={topic} onSubmit={onSubmitBasicInfo} />
      {(basicFetched || topic === 'Others') && (
        <form onSubmit={onSubmitArticle}>
          <WriteNew
            topic={topic}
            title={title}
            onChangeTypes={onChangeTypes}
            setTitle={setTitle}
            blocks={blocks}
            setBlocks={setBlocks}
            keyInfo={keyInfo}
            onChangeKeyInfos={onChangeKeyInfos}
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
