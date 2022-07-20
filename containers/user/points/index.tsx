import { BasicWrapper, SectionWrapper } from 'components/global';
import { LogSearch } from 'components/user/points';
import LogItems from './LogItems';

export default function Points() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Token Log" marginBottom="25px">
        <LogSearch />
        <LogItems />
      </SectionWrapper>
    </BasicWrapper>
  );
}
