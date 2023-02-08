import {
  ChangeEventHandler,
  memo,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  EditableKeyInfos,
  KeyInfoIndex,
  KeyInfoTitles,
} from 'lib/main/wiki/constants';
import { ImageWrapper } from 'components/global';
import {
  CategorySelect,
  EditableKeyInfo,
  UnEditableKeyInfo,
} from 'components/main/wiki/edit/KeyInfo';
import { Name } from 'components/main/wiki/edit/KeyInfo/KeyinfoComponents';
import styles from 'styles/styleLib';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

type PropsType = {
  keyInfos: Wiki.KeyInfoType;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

export default memo(function EditKeyInfo({ keyInfos }: PropsType) {
  const [editableKeyInfos, setEditableKeyInfos] =
    useState<Wiki.EditableKeyInfosType>(() => {
      const initialState: Wiki.EditableKeyInfosType = {};
      EditableKeyInfos.forEach((keyinfo) => {
        initialState[keyinfo] = keyInfos[keyinfo].textContent;
      });

      return initialState;
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
      const title = KeyInfoTitles[i];

      if (i === KeyInfoIndex.Name) {
        return (
          <Name key={title}>
            <p>{keyInfo.textContent}</p>
          </Name>
        );
      }
      if (i === KeyInfoIndex.Thumbnail) {
        return (
          <ImageWrapper width="100%" height="fit-content" key={title}>
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
        const componentName = title.split(' ')[0];
        return (
          <EditableKeyInfo
            componentName={componentName}
            title={title}
            value={editableKeyInfos[componentName.toLowerCase()] || ''}
            onChange={onChange}
          />
        );
      }
      if (i === KeyInfoIndex.Category) {
        return <CategorySelect title={title} onChange={onChange} />;
      }
      return (
        <UnEditableKeyInfo title={title} value={keyInfo.textContent} i={i} />
      );
    });
  }, [editableKeyInfos]);

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
