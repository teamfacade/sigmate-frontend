import {
  LeaderboardTable,
  LeaderboardHead,
  LeaderboardItem,
} from 'components/main/leaderboard';

type PropsType = {
  leaderboardItems: Leaderboad.ItemType[];
};

export default function Board({ leaderboardItems }: PropsType) {
  return (
    <LeaderboardTable>
      <LeaderboardHead />
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
