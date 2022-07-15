import { SNSIcon } from '.';

type PropsType = {
  platform: string;
};

type ColorsType = {
  [index: string]: string;
  Twitter: string;
  Telegram: string;
  Discord: string;
  Medium: string;
};

const colors: ColorsType = {
  Twitter: '#48B5FF',
  Telegram: '#03AFE5',
  Discord: '#6175C3',
  Medium: '#12100E',
};

export default function SNSBtn({ platform }: PropsType) {
  return (
    <button type="button" style={{ backgroundColor: colors[platform] }}>
      <SNSIcon platform={platform} />
    </button>
  );
}
