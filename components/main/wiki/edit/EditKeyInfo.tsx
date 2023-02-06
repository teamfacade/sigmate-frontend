import {
  ChangeEventHandler,
  memo,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Image from 'next/image';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { KeyInfoIndex, KeyInfoTitles } from 'lib/main/wiki/constants';
import { ImageWrapper } from 'components/global';
import styles from 'styles/styleLib';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

type PropsType = {
  keyInfos: Wiki.KeyInfoType;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

const categoriesFetcher: Fetcher<CollectionCategoryType[], string> = async (
  url: string
) => {
  const { status, data } = await Axios.get(url);
  if (status === 200) {
    return data.categories || [];
  }
  alert(
    `Error while fetching collection categories: ERR ${status}.\r\nPlease reload the page.`
  );
  return [];
};

export default memo(function EditKeyInfo({ keyInfos }: PropsType) {
  const { data: categories } = useSWR(
    `/wiki/collection/category`,
    categoriesFetcher
  );

  const [editableKeyInfos, setEditableKeyInfos] =
    useState<Wiki.EditableKeyInfosType>({
      team: keyInfos.team.textContent,
      history: keyInfos.history.textContent,
      category: keyInfos.category.textContent,
      utility: keyInfos.utility.textContent,
      mintingPriceWl: keyInfos.mintingPriceWl.textContent,
      mintingPricePublic: keyInfos.mintingPricePublic.textContent,
      discordUrl: keyInfos.discordUrl.textContent,
      twitterHandle: keyInfos.twitterHandle.textContent,
      websiteUrl: keyInfos.websiteUrl.textContent,
    });

  const onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLSelectElement> =
    useCallback((e) => {
      const { name, value } = e.currentTarget;
      switch (name) {
        case 'Team':
          setEditableKeyInfos((current) => ({
            ...current,
            team: value,
          }));
          break;
        case 'History':
          setEditableKeyInfos((current) => ({
            ...current,
            history: value,
          }));
          break;
        case 'Category':
          setEditableKeyInfos((current) => ({
            ...current,
            category: value,
          }));
          break;
        case 'Utility':
          setEditableKeyInfos((current) => ({
            ...current,
            utility: value,
          }));
          break;
        case 'Whitelist':
          setEditableKeyInfos((current) => ({
            ...current,
            mintingPriceWl: value,
          }));
          break;
        case 'Public':
          setEditableKeyInfos((current) => ({
            ...current,
            mintingPricePublic: value,
          }));
          break;
        default:
          break;
      }
    }, []);

  const TableRows = useMemo(() => {
    return Object.values(keyInfos).map((keyInfo, i) => {
      if (i === KeyInfoIndex.Name) {
        return (
          <Name key={KeyInfoTitles[i]}>
            <p>{keyInfo.textContent}</p>
          </Name>
        );
      }
      if (i === KeyInfoIndex.Thumbnail) {
        return (
          <ImageWrapper
            width="100%"
            height="fit-content"
            key={KeyInfoTitles[i]}
          >
            <Image
              loader={loaderProp}
              src={keyInfo.textContent || UserImageEx}
              alt="thumbnail image"
              width="100%"
              height="100%"
              layout="responsive"
            />
          </ImageWrapper>
        );
      }
      if (
        i === KeyInfoIndex.Team ||
        i === KeyInfoIndex.History ||
        i === KeyInfoIndex.Utility ||
        i === KeyInfoIndex.WLPrice ||
        i === KeyInfoIndex.PublicPrice
      ) {
        const componentName = KeyInfoTitles[i].split(' ')[0];
        return (
          <Tr key={KeyInfoTitles[i]}>
            <Th>
              <p>{KeyInfoTitles[i]}</p>
            </Th>
            <Td>
              <textarea
                name={componentName}
                rows={1}
                placeholder={`Type about ${KeyInfoTitles[i].toLowerCase()}`}
                value={editableKeyInfos[componentName.toLowerCase()] || ''}
                onChange={onChange}
              />
            </Td>
          </Tr>
        );
      }
      if (i === KeyInfoIndex.Category) {
        return (
          <Tr key={KeyInfoTitles[i]}>
            <Th>
              <p>{KeyInfoTitles[i]}</p>
            </Th>
            <Td key={KeyInfoTitles[i]}>
              <select name="Category" onChange={onChange}>
                {categories?.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Td>
          </Tr>
        );
      }
      return (
        <Tr key={KeyInfoTitles[i]}>
          <Th>
            <p>{KeyInfoTitles[i]}</p>
          </Th>
          <Td>
            <p>{`${keyInfo.textContent || 'TBA'}${
              keyInfo.textContent && i === KeyInfoIndex.CurrentPrice
                ? ' ETH'
                : ''
            }`}</p>
          </Td>
        </Tr>
      );
    });
  }, [editableKeyInfos, categories]);

  return (
    <>
      <H3>Key Info</H3>
      <Hr />
      <Table>{TableRows.map((row) => row)}</Table>
    </>
  );
});

const H3 = memo(styled.h3`
  margin: 0 0 10px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: bold;
  line-height: 110%;
`);

const Hr = memo(styled.hr`
  height: 1px;
  margin: 0 0 20px 0;
  color: ${styles.colors.hrColor};
`);

const Table = styled.div`
  min-width: 250px;
  max-width: 450px;
  margin-bottom: 24px;
  border: 1px solid ${styles.colors.hrColor};
  border-bottom: none;

  p {
    margin: 0;
    color: ${styles.colors.logColor};
    font-family: 'Inter', sans-serif;
  }
`;

const Name = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${styles.colors.hrColor};
  background-color: ${styles.colors.globalBackgroundColor};

  p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 17px;
    font-weight: 700;
    text-align: center;
  }
`;

const Tr = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${styles.colors.hrColor};
  background-color: ${styles.colors.globalBackgroundColor};
`;

const Th = styled.div`
  flex: 0 1 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent;

  p {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;

const Td = styled.div`
  flex: 1 1 300px;
  display: flex;
  align-items: center;
  min-height: 35px;
  padding: 8px 14px;
  background-color: #ffffff;

  p {
    font-size: 13px;
    font-weight: 300;
    text-align: start;
    line-break: anywhere;
  }

  textarea {
    width: 100%;
    margin: 0;
    color: ${styles.colors.logColor};
    font-size: 13px;
    font-weight: 300;
    font-family: 'Inter', sans-serif;
    line-height: 160%;
    text-align: start;
    border: none;
    resize: none;

    :focus-visible {
      outline: none;
    }

    ::placeholder {
      color: #c4c4c4;
    }
  }

  select {
    width: 100%;
    margin: 0;

    :focus-visible {
      outline: none;
    }
  }
`;
