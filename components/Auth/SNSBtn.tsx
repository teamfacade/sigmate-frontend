type PropsType = {
  platform: string;
};

export default function SNSBtn({ platform }: PropsType) {
  return <button type="button">{platform}</button>;
}
