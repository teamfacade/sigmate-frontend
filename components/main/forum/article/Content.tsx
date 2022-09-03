import { memo, MouseEventHandler, FormEventHandler } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { UtilBtns, CommentInput } from 'components/main/forum/article';
import styles from 'styles/styleLib';

import { screenshotDesktop } from 'public/Icons';

type PropsType = {
  id: number;
  category: string;
  title: string;
  content: string;
  imageUrls: string[];
  onSubmitComment: FormEventHandler<HTMLFormElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function Content({
  id,
  title,
  content,
  imageUrls,
  onSubmitComment,
  onClickReport,
}: PropsType) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <MainContentWrapper>
        <MainText>
          <Outer width="350px" height="365px">
            <Inner>
              <Image
                src={imageUrls[0] || screenshotDesktop}
                alt="Thumbnail"
                layout="fill"
              />
            </Inner>
          </Outer>
          {content}
        </MainText>
      </MainContentWrapper>
      <UtilBtns onClickReport={onClickReport} />
      <CommentInput articleID={id} onSubmitComment={onSubmitComment} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: fit-content;
  padding: 20px;
`;

const Outer = styled.span<{ width: string; height: string }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-right: 16px;
  float: left;
`;

const Inner = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
`;

const Title = styled.p`
  margin: 0 0 12px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: 900;
`;

const MainContentWrapper = styled.div`
  min-height: 365px;
  margin-bottom: 15px;
`;

const MainText = styled.span`
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
`;
