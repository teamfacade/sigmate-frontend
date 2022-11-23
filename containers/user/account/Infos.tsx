import {
  memo,
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
} from 'react';
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
*/
const usernameRules: StringKeyObj<string> = {
  default: 'Something went wrong.\r\nPlease try again.',
  REQUIRED: "Username can't be empty",
  TOO_SHORT: 'Username should be more than 2 characters',
  TOO_LONG: 'Username should be less than 17 characters',
  NOT_ALPHA: 'We only allow alphabet characters and whitespaces',
  ERR_USERNAME_ILLEGAL_CHARS:
    'We only allow alphanumeric characters, underscores, dashes, and periods',
  ERR_USERNAME_CONSECUTIVE_SPECIAL_CHARS:
    'Special characters cannot appear more than 2 times in a row',
  ERR_USERNAME_START_OR_END_WITH_SPECIAL_CHARS:
    'Username cannot start nor end with a special character',
  ERR_USERNAME_ILLEGAL_WORDS: "You can't contain some words in username",
  ERR_USERNAME_IS_URL: 'Username cannot be a URL',
  ERR_USERNAME_CHANGE_INTERVAL: 'You can change your username per month.',
  ERR_USERNAME_ALREADY_MINE: 'You are using this name now.',
  DUPLICATE: 'This name is already being used by someone else.',
};

type PropsType = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function Infos({ setShowModal }: PropsType) {
  const dispatch = useAppDispatch();
  const { userName, isTwitterHandlePublic, isDiscordAccountPublic } =
    useAppSelector(({ account }) => account);
  const { displayName, bio } = useAppSelector(
    ({ account }) => account.primaryProfile
  );

  const [edit, setEdit] = useState(false);
  const [usernameEditResult, setUsernameEditResult] = useState('');
  const [displayNameEditResult, setDisplayNameEditResult] = useState('');
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

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;

      if (name === 'edit') {
        if (!edit) {
          setEdit(true);
        } else {
          // update user name
          setUsernameEditResult('');
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
                setUsernameEditResult('');
              } else if (action.payload.data.validationErrors[0]) {
                setUsernameEditResult(
                  `${
                    usernameRules[action.payload.data.validationErrors[0].msg]
                  }. Not saved.`
                );
              } else if (action.payload.status === 500)
                alert(action.payload.data.msg);
            });
          }

          // update display name and bio
          setDisplayNameEditResult('');
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
              } else if (action.payload.data.validationErrors[0]) {
                setDisplayNameEditResult(
                  `${
                    usernameRules[action.payload.data.validationErrors[0].msg]
                  }. Not saved.`
                );
              } else {
                alert(action.payload.data.msg);
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
                setSocialPublic({
                  twitter: twitterPublic,
                  discord: discordPublic,
                })
              );
              setEdit(false);
            } else if (action.payload.status === 500)
              alert(action.payload.data.msg);
            else if (action.payload.status !== 401) {
              alert(action.payload.data.validationErrors[0].msg);
            }
          });
        }
      } else setShowModal(true);
    },
    [edit, twitterPublic, discordPublic]
  );

  return (
    <BasicWrapper style={{ marginTop: '20px' }}>
      <SectionWrapper header="Account Setup" marginBottom="25px">
        <Wrapper>
          {/* <PFP level={12.3} /> */}
          <InfoWrapper>
            <InfoItem
              edit={edit}
              header="User Name"
              content={userName}
              isValid={usernameEditResult === ''}
              description={usernameEditResult}
              ref={nameRef}
            />
            <InfoItem
              edit={edit}
              header="Display Name"
              content={displayName}
              isValid={displayNameEditResult === ''}
              description={
                displayNameEditResult ||
                'Your display name will be used in places where your profile needs to be displayed. If left blank, your username will be used instead.\r\nOther users will still be able to see your username in your profile page.'
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
            {/* }
            <SocialsPublicityToggles
              edit={edit}
              twitterPublic={twitterPublic}
              discordPublic={discordPublic}
              onToggle={onToggle}
            />
            */}
            <BtnWrapper>
              <EditBtn name="edit" onClick={onClick}>
                {edit ? 'Save' : 'Edit'}
              </EditBtn>
              <EditBtn name="delete" onClick={onClick}>
                Delete account
              </EditBtn>
            </BtnWrapper>
          </InfoWrapper>
        </Wrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  // display: flex;
  display: block;

  img {
    border-radius: 50%;
  }
`;

const InfoWrapper = memo(styled.div`
  // margin-left: 60px;
  margin-left: 0;
`);

const BtnWrapper = styled.div`
  display: inline-flex;
  float: right;
`;

const EditBtn = memo(styled.button`
  padding: 7px 15px;
  margin-top: 20px;
  background-color: #0070f3;
  color: white;
  outline: none;
  border: none;
  border-radius: 8px;
  font-weight: bolder;
  font-family: 'Inter', sans-serif;
  text-align: center;

  & + & {
    margin-left: 8px;
  }
`);
