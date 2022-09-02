import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Types } from 'containers/main/wiki/new/Guidelines';
import { SectionWrapper } from 'components/global';
import { TypeExample } from 'components/main/wiki/new';
import BlueBtn from 'components/main/wiki/BlueBtn';
import styles from 'styles/styleLib';

type PropsType = {
  onClick: MouseEventHandler;
};

const Others = ['Team', 'Cryptocurrency', 'Examples', 'Guidelines'];

export default function Categorize({ onClick }: PropsType) {
  return (
    <>
      <SectionWrapper header="Start New Article" marginBottom="20px">
        <NextBtnWrapper>
          <CategorizeQuestion>
            Is this article content about the NFT Collection?
          </CategorizeQuestion>
          <BlueBtn name="Collection" onClick={onClick}>
            Start
          </BlueBtn>
        </NextBtnWrapper>
        <NextBtnWrapper>
          <CategorizeQuestion>
            Is this article content about a specific # NFT?
          </CategorizeQuestion>
          <BlueBtn name="Token" onClick={onClick}>
            Start
          </BlueBtn>
        </NextBtnWrapper>
      </SectionWrapper>
      <SectionWrapper
        header="To Help you with the Catagorization, Here are catagories of our articles"
        marginBottom="20px"
      >
        {Types.map((type) => {
          return <TypeExample key={type}>{type}</TypeExample>;
        })}
      </SectionWrapper>
      <NextBtnWrapper marginTop="40px">
        <CategorizeQuestion>
          Is this article content other than NFT? (e.g. Team, Crypto, Person
          etc.)
        </CategorizeQuestion>
        <BlueBtn name="Others" onClick={onClick}>
          Start
        </BlueBtn>
      </NextBtnWrapper>
      <SectionWrapper
        header="To Help you with the Catagorization, Here are catagories of our articles"
        marginBottom="20px"
      >
        {Others.map((type) => {
          return <TypeExample key={type}>{type}</TypeExample>;
        })}
      </SectionWrapper>
    </>
  );
}

const NextBtnWrapper = styled.div<{ marginTop?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${({ marginTop }) => marginTop || '0'} 0 40px 0;
`;

const CategorizeQuestion = styled.div`
  flex: 1 1 auto;
  padding: 8px 200px 8px 18px;
  margin-right: 20px;
  border-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
  color: ${styles.colors.headerColor};
  font-size: 18px;
  line-height: 160%;
  white-space: nowrap;
  overflow: auto;
`;
