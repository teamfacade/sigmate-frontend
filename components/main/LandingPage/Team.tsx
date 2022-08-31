import { memo } from 'react';
import styled from 'styled-components';
import { TeamImage } from 'public/Icons';
import styles from 'styles/styleLib';

export default memo(function Team() {
  return (
    <Wrapper>
      <Heading>Team</Heading>
      <hr />
      <TeamImage />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  hr {
    margin: 16px 0;
    border: none;
    border-bottom: 1px solid #dedede;
  }

  svg {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Heading = styled.h3`
  margin: 0;
  color: ${styles.colors.headerColor};
`;
