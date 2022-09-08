import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { Member } from 'components/main/landing';

type MemberColorType = {
  bgColor: string;
  positionBgColor: string;
  fontColor: string;
};

type MemberType = {
  name: string;
  position: string;
  color: MemberColorType;
};

const MemberColors: StringKeyObj<MemberColorType> = {
  Apple: {
    bgColor: '#F3B2C1',
    positionBgColor: '#FDEDF5',
    fontColor: '#DB2777',
  },
  'Mr Mango': {
    bgColor: '#F8FACA',
    positionBgColor: '#F8FACA',
    fontColor: '#8D7726',
  },
  Lime: {
    bgColor: '#B6E5D2',
    positionBgColor: '#B6E5D2',
    fontColor: '#3C745C',
  },
  'Ultra Violet': {
    bgColor: '#A69CF8',
    positionBgColor: 'rgba(166, 156, 248, 54%)',
    fontColor: '#6A4EAC',
  },
  Orca: {
    bgColor: '#5AABF8',
    positionBgColor: 'rgba(90, 171, 248, 48%)',
    fontColor: '#25619A',
  },
  'Mr Steen': {
    bgColor: '#ECC9FB',
    positionBgColor: '#ECC9FB',
    fontColor: '#AA3540',
  },
  Strawberry: {
    bgColor: '#F4B3A4',
    positionBgColor: '#E39987',
    fontColor: '#A82822',
  },
};

const members: MemberType[] = [
  {
    name: 'Apple',
    position: 'CEO',
    color: MemberColors.Apple,
  },
  {
    name: 'Mr Mango',
    position: 'CFO',
    color: MemberColors['Mr Mango'],
  },
  {
    name: 'Lime',
    position: 'CMO',
    color: MemberColors.Lime,
  },
  {
    name: 'Ultra Violet',
    position: 'CTO',
    color: MemberColors['Ultra Violet'],
  },
  {
    name: 'Orca',
    position: 'Blockchain developer',
    color: MemberColors.Orca,
  },
  {
    name: 'Mr Steen',
    position: 'Frontend developer',
    color: MemberColors['Mr Steen'],
  },
  {
    name: 'Strawberry',
    position: 'CDO',
    color: MemberColors.Strawberry,
  },
];

export default function Members() {
  return (
    <BasicWrapper>
      <SectionWrapper header="Members" marginBottom="0">
        <GriddyWrapper>
          {members.map((member) => (
            <Member
              key={member.name}
              name={member.name}
              position={member.position}
              bgColor={member.color.bgColor}
              positionBgColor={member.color.positionBgColor}
              fontColor={member.color.fontColor}
            />
          ))}
        </GriddyWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const GriddyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin: 20px 10px 0 10px;
  }
`;
