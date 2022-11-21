import { useEffect, FormEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main/layout';
import { Search } from 'components/global';
import styles, { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  needsWrapper: boolean;
  onSearch: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export default function MainLayout({
  needsWrapper,
  onSearch,
  children,
}: PropsType) {
  useEffect(() => localStorage.removeItem('refCode'), []);

  return (
    <main>
      <div>
        <Wrapper>
          <Section>
            <MainContentWrapper needsWrapper={needsWrapper}>
              {children}
            </MainContentWrapper>
          </Section>
          <Aside>
            {/* <CheckInBtn>Daily Check-In</CheckInBtn> */}
            <Search placeholder="Search content..." onSubmit={onSearch} />
            <SideContentWrapper>
              <SideContent />
            </SideContentWrapper>
          </Aside>
        </Wrapper>
      </div>
    </main>
  );
}

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto 30px auto;
  flex-wrap: wrap;

  @media (max-width: 728px) {
    display: block;
  }
`;

const Section = styled.section`
  @media (min-width: 729px) {
    width: calc(100vw - 362px);
    max-width: 1080px;
    margin-right: 40px;
  }

  @media (max-width: 728px) {
    padding: 0 20px;
    margin: auto;
  }
`;

const Aside = styled.aside`
  max-width: 252px;

  @media (max-width: 728px) {
    max-width: unset;
    padding: 20px;
  }
`;

const MainContentWrapper = styled.div<{ needsWrapper: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;

  ${({ needsWrapper }) =>
    needsWrapper
      ? `
          padding: 40px;
          background-color: white;
          border-radius: 8px;
          box-shadow: ${styles.shadows.containerShadow};
        `
      : `
          padding: 0;
          background-color: transparent;
        `}
`;

const SideContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const CheckInBtn = styled.button`
  ${BlueBtnStyle};
  width: 100%;
  margin: 0 0 20px 0;
  font-weight: 700;
`;
