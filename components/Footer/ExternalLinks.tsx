import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

export default memo(function ExternalLinks() {
  return (
    <Wrapper>
      <ul>
        <li>User Guide</li>
        <li>User Guide</li>
        <li>User Guide</li>
        <li>User Guide</li>
      </ul>
      <ul>
        <li>Docs</li>
        <li>Docs</li>
        <li>Docs</li>
        <li>Docs</li>
      </ul>
      <ul>
        <li>Security Adult</li>
        <li>Security Adult</li>
        <li>Security Adult</li>
      </ul>
      <ul>
        <li>Disclaimer</li>
        <li>Disclaimer</li>
        <li>Disclaimer</li>
      </ul>
      <ul>
        <li>FAQ</li>
        <li>FAQ</li>
        <li>FAQ</li>
      </ul>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  @media (min-width: 729px) {
    display: flex;
    justify-content: center;
    margin: auto;

    ul:not(:first-child) {
      margin-left: 40px;
    }
  }
  @media (max-width: 728px) {
    display: inline-grid;
  }

  ul {
    padding-left: 0;
    white-space: nowrap;

    li:first-child {
      margin-bottom: 8px;
      color: black;
      font-size: 16px;
      font-weight: bold;
    }
  }

  li {
    list-style-type: none;
    margin-bottom: 10px;
    color: ${styles.colors.lightTextColor};
    font-size: 13px;
    font-family: 'Inter', sans-serif;
  }
`;
