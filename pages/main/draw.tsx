import { memo } from 'react';
import { Introduction, RecentDraw, MyDraw } from 'components/main/Draw';
import { SectionWrapper } from 'components/global';

export default memo(function Draw() {
  return (
    <>
      <Introduction />
      <RecentDraw />
      <MyDraw />
      <SectionWrapper header="Other Events">
        {/* 왠지 임시 디자인인 것 같아서 대충 해둠 */}
        <p style={{ maxWidth: '1000px', whiteSpace: 'pre' }}>
          {'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of clas BC\n' +
            'McClintock, a Latin professor at Hking  over 2000\n'}
        </p>
      </SectionWrapper>
    </>
  );
});
