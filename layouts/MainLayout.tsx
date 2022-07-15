import { ReactNode } from 'react';
import styled from 'styled-components';
import { SideContent } from 'containers/main';
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
  margin: auto;
`;

const MainContentWrapper = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};

  @media (max-width: 1023px) {
    width: 100vw;
  }
`;

const SideContentWrapper = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};

  @media (max-width: 1023px) {
    width: 100vw;
  }
`;
