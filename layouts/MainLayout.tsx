import { ReactNode } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main';
import { Search } from 'components/main';
import colors from 'styles/colorLib';

type PropsType = {
  children: ReactNode;
};

export default function MainLayout({ children }: PropsType) {
  return (
    <main>
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
    </main>
  );
}

const Wrapper = styled.div`
  @media (min-width: 1024px) {
    display: inline-flex;
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
  display: inline-block;
  margin-right: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};

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
