/* eslint-disable no-unused-expressions */

import { memo, useState, useRef, useCallback, MouseEventHandler } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper, ImageWrapper } from 'components/global';
import { InfoItem } from 'components/user/account';
import UserImageEx from 'public/Icons/user/account/UserImageEx.png';

/* @todo :
     프로필 사진 변경 버튼 추가
     state 초깃값을 서버에서 받아온 사용자 정보로 지정, onClick에 업데이트된 값을 서버로 보내는 작업 추가
*/
export default function Infos() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('Initial name');
  const [email, setEmail] = useState('Initial@email.com');
  const [bio, setBio] = useState('Tell us a little bit about yourself');

  const nameRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLTextAreaElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      nameRef &&
        nameRef.current &&
        nameRef.current.value &&
        setName(nameRef.current.value);
      emailRef &&
        emailRef.current &&
        emailRef.current.value &&
        setEmail(emailRef.current.value);
      bioRef &&
        bioRef.current &&
        bioRef.current.value &&
        setBio(bioRef.current.value);
    }
  }, [edit, nameRef]);

  return (
    <BasicWrapper style={{ marginTop: '20px' }}>
      <SectionWrapper header="Account Setup" marginBottom="25px">
        <Wrapper>
          <ImageWrapper width="200px" height="200px">
            <Image
              src={UserImageEx}
              alt="Profile image"
              layout="fill"
              quality={100}
            />
          </ImageWrapper>
          <InfoWrapper>
            <InfoItem
              edit={edit}
              header="Name"
              content={name}
              description={
                'Your name may appear around GitHub where you contribute or are mentioned.\r\nYou can remove it at any time.'
              }
              ref={nameRef}
            />
            <InfoItem
              edit={edit}
              header="Email"
              content={email}
              description={
                'You have set your email address to private.\r\nTo toggle email privacy, go to email settings and uncheck "Keep my email address private."'
              }
              ref={emailRef}
            />
            <InfoItem
              edit={edit}
              header="Bio"
              content={bio}
              inputHeight="115px"
              description="You can @mention other users and organizations to link to them."
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
  margin-left: 50px;
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
`);
