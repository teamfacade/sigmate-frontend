import { memo, useState, useRef, useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import {
  setUserName,
  setDisplayName,
  setBio,
  setSocialPublic,
} from 'store/modules/accountSlice';
import { BasicWrapper, SectionWrapper } from 'components/global';
import {
  InfoItem,
  PFP,
  SocialsPublicityToggles,
} from 'components/user/account';

/* @todo :
     프로필 사진 변경 버튼 추가
     state 초깃값을 서버에서 받아온 사용자 정보로 지정, onClick에 업데이트된 값을 서버로 보내는 작업 추가
*/
export default function Infos() {
  const dispatch = useAppDispatch();
  const { userName, isTwitterHandlePublic, isDiscordAccountPublic } =
    useAppSelector(({ account }) => account);
  const { displayName, bio } = useAppSelector(
    ({ account }) => account.primaryProfile
  );

  const [edit, setEdit] = useState(false);
  const [twitterPublic, setTwitterPublic] = useState<boolean>(
    isTwitterHandlePublic
  );
  const [discordPublic, setDiscordPublic] = useState<boolean>(
    isDiscordAccountPublic
  );

  const nameRef = useRef<HTMLTextAreaElement>(null);
  const displayNameRef = useRef<HTMLTextAreaElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const onToggle: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'Twitter':
        setTwitterPublic((current) => !current);
        break;
      case 'Discord':
        setDiscordPublic((current) => !current);
        break;
      default:
        break;
    }
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
      // update user name
      if (nameRef && nameRef.current && nameRef.current.value) {
        const newUserName = nameRef.current.value;
        dispatch(
          AuthRequiredAxios({
            method: 'PATCH',
            url: '/user',
            data: {
              userName: newUserName,
            },
          })
        ).then((action: any) => {
          if (action.payload.status === 200) {
            dispatch(setUserName(newUserName));
          } else if (
            action.payload.data.validationErrors[0].msg ===
            'ERR_USERNAME_CHANGE_INTERVAL'
          ) {
            alert('You can change your username per month.');
          }
        });
      }

      // update display name and bio
      if (displayNameRef?.current?.value || bioRef?.current?.value) {
        const profileUpdate: any = {};

        if (displayNameRef?.current?.value) {
          profileUpdate.displayName = displayNameRef.current.value;
        }
        if (bioRef?.current?.value) {
          profileUpdate.bio = bioRef.current.value;
        }
        dispatch(
          AuthRequiredAxios({
            method: 'PATCH',
            url: '/profile',
            data: profileUpdate,
          })
        ).then((action: any) => {
          if (action.payload.status === 200) {
            if (profileUpdate.bio) dispatch(setBio(profileUpdate.bio));
            if (profileUpdate.displayName)
              dispatch(setDisplayName(profileUpdate.displayName));
          } else {
            alert(action.payload.data.validationErrors[0].msg);
          }
        });
      }

      // update twitter and discord publicity
      dispatch(
        AuthRequiredAxios({
          method: 'PATCH',
          url: '/user',
          data: {
            isTwitterHandlePublic: twitterPublic,
            isDiscordAccountPublic: discordPublic,
          },
        })
      ).then((action: any) => {
        if (action.payload.status === 200) {
          dispatch(
            setSocialPublic({ twitter: twitterPublic, discord: discordPublic })
          );
        } else {
          alert(action.payload.data.validationErrors[0].msg);
        }
      });
    }
  }, [edit, twitterPublic, discordPublic]);

  return (
    <BasicWrapper style={{ marginTop: '20px' }}>
      <SectionWrapper header="Account Setup" marginBottom="25px">
        <Wrapper>
          <PFP level={12.3} />
          <InfoWrapper>
            <InfoItem
              edit={edit}
              header="User Name"
              content={userName}
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
            <SocialsPublicityToggles
              edit={edit}
              twitterPublic={twitterPublic}
              discordPublic={discordPublic}
              onToggle={onToggle}
            />
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
