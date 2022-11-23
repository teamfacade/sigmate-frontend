import styled from 'styled-components';
import {
  Introduction,
  Features,
  Write2Earn,
  Calendar,
  BuildYourComm,
  CorrelationAlg,
  RoadMap,
  GoUpBtn,
  // WaitingList,
} from 'containers/landing';

export default function MyApp() {
  return (
    <Wrapper>
      <Introduction />
      <Features />
      <Write2Earn />
      <Calendar />
      <BuildYourComm />
      <CorrelationAlg />
      <RoadMap />
      <GoUpBtn />
      {/* <WaitingList /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
