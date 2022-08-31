import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SectionWrapper, Search } from 'components/global';
import { TypeExample } from 'components/main/wiki/new';
import BlueBtn from 'components/main/wiki/BlueBtn';
import styles from 'styles/styleLib';

export const Types = [
  'Giveaway',
  'Freemint',
  'Membership',
  'Auction',
  'Collaboaration',
  '2D',
  '3D',
  'Pixel',
  'PFP',
  'Social ',
];

type PropsType = {
  onClick: MouseEventHandler;
};

export default function Guidelines({ onClick }: PropsType) {
  return (
    <>
      <SectionWrapper header="Preliminary Notes" marginBottom="20px">
        <Description margin="0 0 50px 0">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          comes from sections 1.10.32 and 1.
        </Description>
      </SectionWrapper>
      <SectionWrapper header="How to Start New Article" marginBottom="20px">
        <Description margin="0 0 20px 0">
          {"1. First, check that the article you're looking for doesn't already exist:\n" +
            'Search Wikipedia (or use a search engine) for existing articles. If an article exists, but not at the title you expected, you can create a redirect.\n' +
            'Check your spelling.\n' +
            'Articles generally use the most common name for the subject. This may not be the official name, scientific name, or another name you have in mind.\n'}
        </Description>
        <Description margin="0 0 20px 0">
          {
            '2. Next, be sure the article is suitable for inclusion in Wikipedia. Articles must be about notable topics: those that have received significant coverage in independent, reliable sources. We have a fairly precise definition of what is considered a "reliable source", as well as detailed inclusion guidelines.\n'
          }
        </Description>
        <Description margin="0 0 10px 0">
          {
            '3. Next, search the existing article requests to make sure your subject is not already listed:\n'
          }
        </Description>
        <div style={{ width: '360px' }}>
          <Search />
        </div>
        <Description margin="10px 0 30px 0">
          4. Now choose an appropriate general topic area below, choose the best
          sub-topic that fits your subject, and use that link to go to its page.
          Add your request there by clicking "edit" at the appropriate heading.
          Give a brief description, with links if possible, for the proposed
          topic, to aid others in understanding your request.
        </Description>
        <Description margin="0 0 60px ">
          {'Help maintain the list by moving misplaced or unsorted requests to the appropriate section.\n' +
            'Many requests can be fulfilled by creating a redirect from the requested title.\n' +
            'Fulfilled requests should be removed from the list. Remember to categorize newly created articles, and tag them as stubs if they are short.\n' +
            'More tasks available at WikiProject Requested Articles.'}
        </Description>
      </SectionWrapper>
      <SectionWrapper
        header="To Help you with the Catagorization, Here are catagories of our articles"
        marginBottom="20px"
      >
        {Types.map((type) => {
          return <TypeExample key={type}>{type}</TypeExample>;
        })}
        <BlueBtn absoluteRight onClick={onClick}>
          Next
        </BlueBtn>
      </SectionWrapper>
    </>
  );
}

const Description = styled.p<{ margin: string | undefined }>`
  margin: ${({ margin }) => margin || '0'};
  color: ${styles.colors.headerColor};
  font-size: 14px;
  line-height: 160%;
  text-align: left;
  white-space: pre-line;
`;
