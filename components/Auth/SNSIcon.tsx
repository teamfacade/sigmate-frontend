import {
  googlePlay as Google,
  telegram as Telegram,
  discord as Discord,
  medium as Medium,
} from 'public/Icons';
import Twitter from 'public/Icons/Twitter_logo.svg';

type PropsType = {
  platform?: string;
};

export default function SNSIcon({ platform = '' }: PropsType) {
  switch (platform) {
    case 'Twitter':
      return <Google />;
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
