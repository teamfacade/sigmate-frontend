import {
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getArticleEditData, KeyInfoIndex } from 'lib/main/wiki/getWikiData';
import { WikiEdit, Summary } from 'containers/main/wiki/edit';

export default function WikiEditPage({
  document,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedOption, setSelectedOption] = useState<
    ReactSelect.OptionType[]
  >(document.types?.map((type) => ({ value: type, label: type })) || []);
  const [blocks, setBlocks] = useState<Wiki.DocumentBlockType[]>(
    document.blocks || []
  );
  const [keyInfos, setKeyInfos] = useState<
    Wiki.DocumentBlockType[] | undefined
  >(document.keyInfos || undefined);
  const [summary, setSummary] = useState('');

  const onChangeTypes: ReactSelect.MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  const onChangeKeyInfos: ChangeEventHandler<
    HTMLTextAreaElement | HTMLSelectElement
  > = useCallback((e) => {
    const { name, value } = e.currentTarget;
    setKeyInfos((current) => {
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
  }, []);

  const onSummaryChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setSummary(e.target.value),
    []
  );

  const onSave: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    const newDocument = {
      ...document,
      types: selectedOption.map((selected) => selected.value),
      blocks,
    };

    alert('Save edits');
    // eslint-disable-next-line no-console
    console.log(newDocument);
  }, [selectedOption, blocks]);

  return (
    <>
      <WikiEdit
        types={selectedOption}
        onChangeTypes={onChangeTypes}
        title={document.title}
        blocks={blocks}
        setBlocks={setBlocks}
        keyInfos={keyInfos}
        onChangeKeyInfos={onChangeKeyInfos}
      />
      <Summary summary={summary} onChange={onSummaryChange} onClick={onSave} />
    </>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // Fetch data from external API
  const { document } = getArticleEditData(params?.title as string);

  // Pass data to the page via props
  return { props: { document } };
}
