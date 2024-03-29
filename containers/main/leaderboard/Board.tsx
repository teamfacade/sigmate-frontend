import {
  LeaderboardTable,
  LeaderboardHead,
  LeaderboardItem,
} from 'components/main/leaderboard';

type PropsType = {
  myData: Leaderboad.ItemType | null;
  leaderboardItems: Leaderboad.ItemType[];
};

export default function Board({ myData, leaderboardItems }: PropsType) {
  return (
    <LeaderboardTable>
      <LeaderboardHead />
      {myData && (
        <LeaderboardItem
          rank={myData.rank}
          userName="Me"
          displayName="Me"
          referral={myData.referral}
          forum={
            Number.parseInt(myData.forum.commentCreate, 10) +
            Number.parseInt(myData.forum.postCreate, 10)
          }
          editCount={myData.wiki.documentEdit}
          total={myData.total}
          isMine
        />
      )}
      {leaderboardItems?.map((item) => {
        return (
          <LeaderboardItem
            key={item.rank}
            rank={item.rank}
            userName={item.user.userName}
            displayName={item.user.primaryProfile?.displayName}
            referral={item.referral}
            forum={
              Number.parseInt(item.forum.commentCreate, 10) +
              Number.parseInt(item.forum.postCreate, 10)
            }
            editCount={item.wiki.documentEdit}
            total={item.total}
          />
        );
      })}
    </LeaderboardTable>
  );
}
