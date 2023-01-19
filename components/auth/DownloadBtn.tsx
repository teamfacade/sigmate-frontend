import styled from 'styled-components';

type PropsType = {
  platform: 'Google' | 'Apple';
};

export default function DownloadBtn({ platform }: PropsType) {
  return (
    <Btn type="button">
      <Subheader>
        {platform === 'Apple' ? 'App Store   ' : 'Google Play'}
      </Subheader>
    </Btn>
  );
}

const Btn = styled.button`
  position: relative;
  padding: 0 15px 0 45px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    margin-left: 5px;
    display: inline;
    color: unset;
  }
`;

const Subheader = styled.p`
  font-size: 15px;
  white-space: pre;

  &::before {
    display: block;
    content: 'Download from';
    font-size: 9px;
    text-align: start;
  }
`;
