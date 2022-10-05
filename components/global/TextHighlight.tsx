import styled from 'styled-components';

const TextHighlight = styled.span<{ color: string }>`
  background: ${({ color }) => `
    radial-gradient(farthest-side, ${color} 98%,#0000) bottom left,
    linear-gradient(${color} 0 0) bottom,
    radial-gradient(farthest-side, ${color} 98%,#0000) bottom right
  `};
  background-size: 20px 50%, calc(100% - 20px) 50%;
  background-repeat: no-repeat;
  padding: 0 10px 4px 10px;
`;

export default TextHighlight;
