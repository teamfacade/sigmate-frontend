import {
  twitter as Twitter,
  telegram as Telegram,
  discord as Discord,
  medium as Medium,
} from 'public/Icons';

type PropsType = {
  platform?: string;
};

export default function SNSIcon({ platform = '' }: PropsType) {
  switch (platform) {
    case 'Twitter':
      return <Twitter />;
    case 'Telegram':
      return <Telegram />;
    case 'Discord':
      return <Discord />;
    case 'Medium':
      return <Medium />;
    default:
      return <p>...</p>;
  }
}
