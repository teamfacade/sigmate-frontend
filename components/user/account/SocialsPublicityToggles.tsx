import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { MakePublic, Header } from 'components/user/account';
import styles from 'styles/styleLib';

type PropsType = {
  edit: boolean;
  twitterPublic: boolean;
  discordPublic: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function SocialsPublicityToggles({
  edit,
  twitterPublic,
  discordPublic,
  onToggle,
}: PropsType) {
  return (
    <>
      <Header>Make my account public</Header>
      <MakePublic
        edit={edit}
        name="Twitter"
        isPublic={twitterPublic}
        onToggle={onToggle}
      />
      <MakePublic
        edit={edit}
        name="Discord"
        isPublic={discordPublic}
        onToggle={onToggle}
      />
      <Description>
        When enabled, your social account will be publically available in your
        profile page.
      </Description>
    </>
  );
});

const Description = memo(styled.p`
  margin: 12px 0 0 0;
  padding-left: 10px;
  color: ${styles.colors.logoColor};
  font-size: 14px;
  white-space: pre-wrap;
`);
