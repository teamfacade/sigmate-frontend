import { FormEventHandler, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { InitialKeyInfos } from 'lib/main/wiki/getWikiData';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';

type PropsType = {
  topic: string;
};

export default function NewArticle({ topic }: PropsType) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<boolean>(false);
  const [basicFetched, setBasicFetched] = useState(false);
  const [id, setId] = useState<number>(-1);
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

  const onSubmitBasicInfo: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setPending(true);
      if (topic === 'Collection') {
        const slug = (
          e.currentTarget.elements.namedItem(
            'MarketPlaceUrl'
          ) as HTMLInputElement
        )?.value
          .split('/')
          .at(4);

        dispatch(
          AuthRequiredAxios({
            method: 'POST',
            url: `/wiki/d`,
            data: {
              collection: {
                slug,
                marketplace: 'opensea',
              },
            },
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          setPending(false);
          if (action.payload.status === 201) {
            setId(action.payload.data.document.id);
            setTitle(action.payload.data.document.collection.name);
            const {
              name,
              imageUrl,
              blocks: keyInfoBlocks,
            } = action.payload.data.document.collection;

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
              history: keyInfoBlocks.history,
              category: keyInfoBlocks.category,
              utility: keyInfoBlocks.utility,
              mintingPriceWl: keyInfoBlocks.mintingPriceWl,
              mintingPricePublic: keyInfoBlocks.mintingPricePublic,
              floorPrice: keyInfoBlocks.floorPrice,
              discordUrl: keyInfoBlocks.discordUrl,
              twitterHandle: keyInfoBlocks.twitterHandle,
              websiteUrl: keyInfoBlocks.websiteUrl,
            }));
            setBasicFetched(true);
          } else if (action.payload.status === 409) {
            if (data.msg === 'ERR_DOCUMENT_ALREADY_EXISTS') {
              router.push(`/main/wiki-edit/${data.document.id}`);
            }
          } else {
            alert(
              `Error while fetching collection info. ERR:${action.payload.status}.\r\nPlease try again.`
            );
          }
        });
      } else if (topic === 'Token') {
        setPending(false);
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
      setPending(true);
      const collection: any = {};
      e.preventDefault();
      const { elements } = e.currentTarget;

      if (topic !== 'Others') {
        const team = elements.namedItem('Team') as HTMLTextAreaElement;
        const history = elements.namedItem('History') as HTMLTextAreaElement;
        const category = elements.namedItem('Category') as HTMLSelectElement;
        const utility = elements.namedItem('Utility') as HTMLTextAreaElement;

        if (team.value === '') {
          setPending(false);
          alert('NFT Collection document must have team information.');
          team.focus();
          return;
        }
        collection.team = team.value;
        collection.history = history.value;
        collection.category = category.value;
        collection.utility = utility.value;
      }
      if (title === '') {
        setPending(false);
        alert('A wiki document should have a title.');
        (elements.namedItem('Title') as HTMLButtonElement).focus();
        return;
      }
      if (blocks.length === 0) {
        setPending(false);
        alert('A wiki document must have contents.');
        return;
      }
      dispatch(
        AuthRequiredAxios({
          method: 'PATCH',
          url: `/wiki/d/${id}`,
          data: {
            document: {
              title,
              categories: selectedOption.map((selected) => selected.value),
              blocks,
            },
            collection,
          },
        })
      ).then(async (action: any) => {
        if (action.payload.status === 200) {
          alert('Created a new document!');
          await router.push(`/main/wiki/${id}`);
        } else {
          setPending(false);
          /** Validated errors */
          if (action.payload.status === 400) {
            /** Price should be a string */
            const errorData = action.payload.data.validationErrors[0];
            if (errorData?.msg === 'NOT_FLOAT')
              alert(
                `Price must be a floating number.\r\nError at: ${errorData.value}`
              );
          } else
            alert(
              `Error while creating new article. ERR: ${action.payload.status}`
            );
        }
      });
    },
    [id, title, selectedOption, blocks, keyInfo]
  );

  return (
    <SectionWrapper header="Start New Article" marginBottom="20px">
      {!basicFetched && (
        <BasicInfos
          topic={topic}
          basicPending={pending}
          onSubmit={onSubmitBasicInfo}
        />
      )}
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
          />
          <DisclaimWrapper>
            <input id="TOS" type="checkbox" required />
            <label htmlFor="TOS">
              {'By publishing new article, you agree to the '}
              <a
                href="https://sigmate.gitbook.io/sigmate/support/disclaimer"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Use
              </a>
              , and you irrevocably agree to release your contribution under the
              CC BY-SA 3.0 License. You agree that a hyperlink or URL is
              sufficient attribution under the Creative Commons license.
            </label>
          </DisclaimWrapper>
          <BlueBtn
            width="162px"
            margin="29px 0 0 0"
            type="submit"
            disabled={pending}
          >
            {pending ? '...' : 'Submit'}
          </BlueBtn>
        </form>
      )}
    </SectionWrapper>
  );
}
