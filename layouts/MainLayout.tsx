import { ReactNode } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main';
import { Search } from 'components/global';
import colors from 'styles/colorLib';

type PropsType = {
  children: ReactNode;
};

export default function MainLayout({ children }: PropsType) {
  return (
    <main>
      <div style={{ display: 'flex' }}>
        <Wrapper>
          <section>
            <MainContentWrapper>{children}</MainContentWrapper>
          </section>
          <aside>
            <Search />
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
  @media (min-width: 1024px) {
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }
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
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};
  overflow: hidden;

  @media (max-width: 1023px) {
    width: 100vw;
    margin-right: 0;
  }
`;

const SideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    width: 100vw;
  }
`;
