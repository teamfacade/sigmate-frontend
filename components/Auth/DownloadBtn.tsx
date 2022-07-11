type PropsType = {
  platform: 'Google' | 'Apple';
};

export default function DownloadBtn({ platform }: PropsType) {
  return <button type="button">{platform}</button>;
}
