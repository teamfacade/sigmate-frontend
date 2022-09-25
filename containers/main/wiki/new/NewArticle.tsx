import {
  FormEventHandler,
  useState,
  useCallback,
  ChangeEventHandler,
} from 'react';
import { InitialKeyInfos } from 'lib/main/wiki/getWikiData';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { store } from 'store/store';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  topic: string;
};

export default function NewArticle({ topic }: PropsType) {
  const dispatch = useAppDispatch();
  const [basicFetched, setBasicFetched] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<
    ReactSelect.OptionType[]
  >([]);
  const [keyInfo, setKeyInfo] = useState<Wiki.KeyInfoType>(InitialKeyInfos);
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
        const newKeyInfo = current;
        newKeyInfo[name.toLowerCase()].textConent = value;
        return newKeyInfo;
      });
    },
    []
  );

  const onSubmitBasicInfo: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (topic === 'Collection') {
        const slug = (
          e.currentTarget.elements.namedItem(
            'MarketPlaceUrl'
          ) as HTMLInputElement
        )?.value
          .split('/')
          .at(-1);

        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/wiki/collection/s/${slug}?create=true&update=false`,
          })
        ).then((action: any) => {
          if (action.payload.status === 200) {
            const {
              name,
              imageUrl,
              blocks: keyInfoBlocks,
            } = action.payload.data.collection;

            setKeyInfo((cur) => ({
              name: {
                ...cur.name,
                textContent: name,
              },
              thumbnail: {
                ...cur.thumbnail,
                textContent: imageUrl || '',
              },
              team: keyInfoBlocks.team,
              rugpool: keyInfoBlocks.history,
              category: keyInfoBlocks.category,
              utility: keyInfoBlocks.utility,
              mintingPriceWl: keyInfoBlocks.mintingPriceWl,
              mintingPricePublic: keyInfoBlocks.mintingPricePublic,
              floorPrice: keyInfoBlocks.floorPrice,
              discordUrl: keyInfoBlocks.discordUrl,
              twitterHandle: keyInfoBlocks.twitterHandle,
              websiteUrl: keyInfoBlocks.websiteUrl,
              paymentTokens: keyInfoBlocks.paymentTokens,
              marketplace: keyInfoBlocks.marketplace,
            }));
            setBasicFetched(true);
          } else {
            alert(
              `Error while fetching collection info. ERR:${action.payload.status}.\r\nPlease try again.`
            );
          }
        });
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
    },
    []
  );

  const onSubmitArticle: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (topic !== 'Others') {
        if (keyInfo.marketplace.textContent && keyInfo.team.textContent) {
          // eslint-disable-next-line no-alert
          alert('submit!');
          return;
        }
        if (keyInfo.team.textContent === '') {
          (
            e.currentTarget.elements.namedItem('Team') as HTMLTextAreaElement
          ).focus();
          return;
        }
        (
          e.currentTarget.elements.namedItem(
            'Marketplace'
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
        keyInfo,
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
            <input type="checkbox" required />
            <span>
              {'By publishing new article, you agree to the '}
              <a href="https://www.naver.com" target="_blank" rel="noreferrer">
                Terms of Use
              </a>
              , and you irrevocably agree to release your contribution under the CC BY-SA 3.0 License. You agree that a hyperlink or URL is sufficient attribution under the Creative Commons license.
            </span>
          </DisclaimWrapper>
          <BlueBtn width="162px" margin="29px 0 0 0" type="submit">
            Submit
          </BlueBtn>
        </form>
      )}
    </SectionWrapper>
  );
}
