import { BasicWrapper, SectionWrapper } from 'components/global';
import { LogSearch } from 'components/user/tokens';
import LogItems from './LogItems';

/*
    @todo :
       검색 기능 추가
       탭 별 로그 로딩 기능 추가
       탭 UI 추가
*/
export default function Tokens() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Token Log" marginBottom="25px">
        <LogSearch />
        <LogItems />
      </SectionWrapper>
    </BasicWrapper>
  );
}
