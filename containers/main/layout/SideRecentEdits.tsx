import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { RecentEdit } from 'components/main/Layout';

type RecentEditType = {
  timestamp: number;
  title: string;
};

export default memo(function RecentEdits() {
  const [recentEdits, setRecentEdits] = useState<RecentEditType[]>([]);

  useEffect(() => {
    /* @todo 서버에서 x초마다 N개 받아오기 */
    setRecentEdits([
      {
        timestamp: 1660702797917,
        title: 'Example1',
      },
      {
        timestamp: 1660702797918,
        title: 'Example2',
      },
      {
        timestamp: 1660702797919,
        title: 'Example3',
      },
      {
        timestamp: 1660702797916,
        title: 'Example4',
      },
      {
        timestamp: 1660702797915,
        title: 'Example5',
      },
    ]);
  }, []);

  return (
    <Wrapper>
      <Header>Recent Edits</Header>
      <EditsWrapper>
        {recentEdits.map((edit) => {
          return (
            <RecentEdit
              key={edit.timestamp}
              timestamp={edit.timestamp}
              title={edit.title}
            />
          );
        })}
      </EditsWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const Header = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  color: #323c4d;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;

const EditsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
