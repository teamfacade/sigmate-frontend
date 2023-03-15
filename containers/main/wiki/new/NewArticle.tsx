import { FormEventHandler, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { InitialKeyInfos } from 'lib/main/wiki/getWikiData';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { BasicInfos, WriteNew } from 'containers/main/wiki/new';
import { SectionWrapper } from 'components/global';
import { DisclaimWrapper } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';
import {
  createCollectionJSON,
  keyInfoValidationErrorHandler,
} from 'components/main/wiki/edit/KeyInfo/utils';

type PropsType = {
  topic: string;
};

export default function NewArticle({ topic }: PropsType) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<boolean>(false);
  const [basicFetched, setBasicFetched] =
    useState<Wiki.MarketplaceType>(undefined);
  const [id, setId] = useState<number>(-1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<
    ReactSelect.OptionType[]
  >([]);
  const [keyInfo, setKeyInfo] = useState<Wiki.KeyInfoType>(InitialKeyInfos);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<Wiki.DocumentBlockType[]>([]);

  /**
   *  @handler
   *  Select type of this article. Can select multiple types.
   */
  const onChangeTypes: ReactSelect.MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  /**
   *  @handler
   *  Submit basic info to make an article.
   *  Sends opensea url slug when topic is collection.
   */
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
          if (status === 201) {
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
            setBasicFetched('opensea');
          } else if (status === 409) {
            if (data.msg === 'ERR_DOCUMENT_ALREADY_EXISTS') {
              router.push(`/main/wiki-edit/${data.document.id}`);
            }
          } else if (data === 'Unauthorized') {
            router.push('/auth');
          } else {
            alert(
              `Error while fetching collection info. ERR:${action.payload.status}.\r\nPlease try again.`
            );
          }
        });
      } else if (topic === 'Token') {
        /** Not used now */
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

  /**
   *  @handler
   *  Submit current contents as new article.
   */
  const onSubmitArticle: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      setPending(true);
      let collection: Wiki.EditableKeyInfosType = {};
      e.preventDefault();
      const { elements } = e.currentTarget;

      /** Currently this if statement has no effect. Always executed. */
      if (topic !== 'Others') {
        collection = createCollectionJSON(elements);
        if (collection.team === '') {
          setPending(false);
          alert('NFT Collection document must have team information.');
          (elements.namedItem('Team') as HTMLTextAreaElement).focus();
          return;
        }
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
            const errorData = action.payload.data.validationErrors[0];
            if (errorData)
              keyInfoValidationErrorHandler(errorData.msg, errorData.param);
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
      <BasicInfos
        topic={topic}
        basicPending={pending}
        basicFetched={basicFetched}
        setBasicFetched={setBasicFetched}
        onSubmit={onSubmitBasicInfo}
      />
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
            marketPlace={basicFetched}
          />
          <DisclaimWrapper>
            <input id="TOS" type="checkbox" required />
            <label htmlFor="TOS">
              {'By publishing new article, you agree to the '}
              <a
                href="https://sigmate.gitbook.io/sigmate/support/terms-of-use"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
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
