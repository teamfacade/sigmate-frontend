import { FormEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main/layout';
import { Search } from 'components/global';
import styles from 'styles/styleLib';

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
  return (
    <main>
      <div style={{ display: 'flex' }}>
        <Wrapper>
          <section>
            <MainContentWrapper needsWrapper={needsWrapper}>
              {children}
            </MainContentWrapper>
          </section>
          <aside>
            <Search placeholder="Search content..." onSubmit={onSearch} />
            <SideContentWrapper>
              <SideContent />
            </SideContentWrapper>
          </aside>
        </Wrapper>
      </div>
    </main>
  );
}

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;

  margin: 0 auto 30px auto;
`;

const MainContentWrapper = styled.div<{ needsWrapper: boolean }>`
  position: relative;
  display: inline-block;
  margin: 0 20px 0 70px;
  overflow: hidden;

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
