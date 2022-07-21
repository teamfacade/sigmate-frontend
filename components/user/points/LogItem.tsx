import styled from 'styled-components';

type PropsType = {
  timestamp: number;
  task: string;
  entity: string;
  point: string;
};

export default function LogItem({ timestamp, task, entity, point }: PropsType) {
  const date = new Date(timestamp);

  return (
    <tbody>
      <tr>
        <td>{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</td>
        <td>{task}</td>
        <td>{entity}</td>
        <td>{point}</td>
      </tr>
    </tbody>
  );
}

const Tr = styled.tr`
  background-color: #fafbfc;

  td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-right: 40px;
  }

  td p {
    margin: 0;
  }
`;
