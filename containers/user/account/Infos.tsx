import { memo, useState, useRef, useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { InfoItem, PFP, MakePublic } from 'components/user/account';
import styles from 'styles/styleLib';

/* @todo :
     프로필 사진 변경 버튼 추가
     state 초깃값을 서버에서 받아온 사용자 정보로 지정, onClick에 업데이트된 값을 서버로 보내는 작업 추가
*/
export default function Infos() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('Initial name');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  const nameRef = useRef<HTMLTextAreaElement>(null);
  const displayNameRef = useRef<HTMLTextAreaElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      if (nameRef && nameRef.current && nameRef.current.value)
        setName(nameRef.current.value);
      if (
        displayNameRef &&
        displayNameRef.current &&
        displayNameRef.current.value
      )
        setDisplayName(displayNameRef.current.value);
      if (bioRef && bioRef.current && bioRef.current.value)
        setBio(bioRef.current.value);
    }
  }, [edit]);

  return (
    <BasicWrapper style={{ marginTop: '20px' }}>
      <SectionWrapper header="Account Setup" marginBottom="25px">
        <Wrapper>
          <PFP level={12.3} />
          <InfoWrapper>
            <InfoItem
              edit={edit}
              header="User Name"
              content={name}
              description=""
              ref={nameRef}
            />
            <InfoItem
              edit={edit}
              header="Display Name"
              content={displayName}
              description={
                'Your display name will be used in places where your profile needs to be displayed. If left blank, your username\r\nwill be used instead. Other users will still be able to see your username in your profile page.'
              }
              ref={displayNameRef}
            />
            <InfoItem
              edit={edit}
              header="Bio"
              content={bio}
              inputHeight="115px"
              description="Your bio will be publicly available in your profile page."
              ref={bioRef}
            />
            <Header>Make my account public</Header>
            <MakePublic edit={edit} name="Twitter" />
            <MakePublic edit={edit} name="Discord" />
            <Description>
              When enabled, your social account will be publically available in your profile page.
            </Description>
            <EditBtn onClick={onClick}>{edit ? 'Save' : 'Edit'}</EditBtn>
          </InfoWrapper>
        </Wrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  img {
    border-radius: 50%;
  }
`;

const InfoWrapper = memo(styled.div`
  margin-left: 60px;
`);

const Header = memo(styled.h2`
  margin: 50px 0 15px 0;
  font-size: 18px;
  font-weight: bold;
  white-space: pre;
`);

const Description = memo(styled.p`
  margin: 12px 0 0 0;
  padding-left: 10px;
  color: ${styles.colors.logoColor};
  font-size: 14px;
  white-space: pre-wrap;
`);

const EditBtn = memo(styled.button`
  width: 75px;
  padding: 7px 15px;
  margin-top: 20px;
  background-color: #0070f3;
  color: white;
  outline: none;
  border: none;
  border-radius: 8px;
  font-weight: bolder;
  font-family: 'Inter', sans-serif;
  float: right;
`);
