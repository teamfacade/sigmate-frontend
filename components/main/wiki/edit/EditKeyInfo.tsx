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
  KeyInfoBlockIds,
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
  ExtendEditable: boolean;
};

// @ts-ignore
const loaderProp = ({ src }) => {
  return src;
};

const compoName2stateKey: (name: string) => string = (name) => {
  const index = KeyInfoTitles.findIndex((title) => title.startsWith(name));
  return KeyInfoBlockIds[index];
};

/**
 * All constants are in lib/main/wiki/constants.
 *
 * KeyInfo component's name:  KeyInfoTitles[i].split(' ')[0]
 * editableKeyInfos' key:     EditableKeyInfos (=== KeyInfoBlockIds)
 */
export default memo(function EditKeyInfo({
  keyInfos,
  ExtendEditable,
}: PropsType) {
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

      setEditableKeyInfos((current) => {
        const newState: Wiki.EditableKeyInfosType = { ...current };
        newState[compoName2stateKey(name)] = value;

        return newState;
      });
    }, []);

  const TableRows = useMemo(() => {
    return Object.values(keyInfos).map((keyInfo, i) => {
      const title = KeyInfoTitles[i];
      const componentName = title.split(' ')[0];

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
      if (i === KeyInfoIndex.Category) {
        return <CategorySelect title={title} onChange={onChange} />;
      }
      if (
        i === KeyInfoIndex.Team ||
        i === KeyInfoIndex.History ||
        i === KeyInfoIndex.Utility
      ) {
        return (
          <EditableKeyInfo
            componentName={componentName}
            title={title}
            value={editableKeyInfos[componentName.toLowerCase()] || ''}
            onChange={onChange}
          />
        );
      }
      if (ExtendEditable)
        return (
          <EditableKeyInfo
            componentName={componentName}
            title={title}
            value={editableKeyInfos[compoName2stateKey(componentName)] || ''}
            onChange={onChange}
          />
        );
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
