import { FormEventHandler, ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main/layout';
import { Search } from 'components/global';
import styles from 'styles/styleLib';

type PropsType = {
  onSearch: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export default function MainLayout({ onSearch, children }: PropsType) {
  return (
    <main>
      <div style={{ display: 'flex' }}>
        <Wrapper>
          <section>
            <MainContentWrapper>{children}</MainContentWrapper>
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

const MainContentWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 1000px;
  margin-right: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: hidden;
`;

const SideContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
