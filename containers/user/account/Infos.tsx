/* eslint-disable no-unused-expressions */

import { memo, useState, useRef, useCallback, MouseEventHandler } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper, ImageWrapper } from 'components/global';
import { InfoItem, PFP } from 'components/user/account';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

/* @todo :
     프로필 사진 변경 버튼 추가
     state 초깃값을 서버에서 받아온 사용자 정보로 지정, onClick에 업데이트된 값을 서버로 보내는 작업 추가
*/
export default function Infos() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('Initial name');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('Tell us a little bit about yourself');

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
            <EditBtn onClick={onClick}>{edit ? 'Submit' : 'Edit'}</EditBtn>
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
