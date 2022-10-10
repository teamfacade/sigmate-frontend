import { Dispatch, memo, SetStateAction } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { KeyInfoIndex, KeyInfoTitles } from 'lib/main/wiki/getWikiData';
import { ImageWrapper } from 'components/global';
import { VerdictBlock } from 'components/main/wiki/read/verdictModal';
import styles from 'styles/styleLib';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

type PropsType = {
  keyInfo: Wiki.KeyInfoType;
  setShowModal?: Dispatch<SetStateAction<Wiki.ModalDataType>>;
};

export default memo(function ReadKeyInfo({ keyInfo, setShowModal }: PropsType) {
  const TableRows = Object.values(keyInfo).map((_keyInfo, i) => {
    if (i === KeyInfoIndex.Name) {
      return (
        <Name key={KeyInfoTitles[i]}>
          <p>{_keyInfo.textContent}</p>
        </Name>
      );
    } if (i === KeyInfoIndex.Thumbnail) {
      return (
        <ImageWrapper width="100%" height="fit-content" key={KeyInfoTitles[i]}>
          <Image
            src={_keyInfo.textContent || UserImageEx}
            alt="thumbnail image"
            layout="responsive"
          />
        </ImageWrapper>
      );
    }
    return (
      <Tr key={KeyInfoTitles[i]}>
        <Th>
          <p>{KeyInfoTitles[i]}</p>
        </Th>
        <VerdictBlock
          id={_keyInfo.id}
          verifications={_keyInfo.verifications}
          setShowModal={
            setShowModal as Dispatch<SetStateAction<Wiki.ModalDataType>>
          }
          isKeyInfo
        >
          <Td>
            <p>{_keyInfo.textContent || 'TBA'}</p>
          </Td>
        </VerdictBlock>
      </Tr>
    );
  });

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
`;
