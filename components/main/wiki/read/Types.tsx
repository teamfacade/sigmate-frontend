import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  types: string[];
};

export default memo(function Types({ types }: PropsType) {
  return (
    <>
      <H3>Class</H3>
      <Hr />
      <TypesWrapper>
        {types.map((type, idx) => {
          return (
            <span key={type}>
              <Type>{type}</Type>
              {idx < types.length - 1 && <Divider>{' | '}</Divider>}
            </span>
          );
        })}
      </TypesWrapper>
    </>
  );
});

const H3 = memo(styled.h3`
  margin: 0 0 10px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: bold;
  line-height: 110%;
`);

const Hr = memo(styled.hr`
  margin: 0 0 20px 0;
  color: ${styles.colors.hrColor};
`);

const TypesWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  p {
    display: inline-block;
    margin: 0;
    font-size: 14px;
    line-height: 160%;
    text-align: left;
    white-space: pre;
  }
`;

const Type = styled.p`
  color: ${styles.colors.emphColor};
`;

const Divider = memo(styled.p`
  color: ${styles.colors.logColor};
  font-weight: 300;
`);
