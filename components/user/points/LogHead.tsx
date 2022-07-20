import styled from 'styled-components';

export default function LogHead() {
  return (
    <HeadWrapper>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <th />
      <th>Source</th>
      <th>Quantity</th>
      <th>Cost</th>
    </HeadWrapper>
  );
}

const HeadWrapper = styled.tr`
  th {
    text-align: start;
    font-family: 'Apple SD Gothic neo', sans-serif;

    :not(:first-child) {
      padding-left: 40px;
    }
  }
`;
