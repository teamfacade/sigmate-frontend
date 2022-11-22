import {
  LeaderboardTable,
  LeaderboardHead,
  LeaderboardItem,
} from 'components/main/leaderboard';

type PropsType = {
  leaderboardItems: any[];
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
            userName={item.userName}
            displayName={item.primaryProfile?.displayName}
            referral={item.referral}
            forum={item.forum}
            editCount={item.editCount}
            total={item.total}
          />
        );
      })}
    </LeaderboardTable>
  );
}
