import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

export default memo(function ExternalLinks() {
  return (
    <Wrapper>
      <ul>
        <li>User Guide</li>
        <li>Wiki</li>
        <li>Verdict</li>
        <li>Opinion</li>
        <li>Thread</li>
      </ul>
      <ul>
        <li>Features</li>
        <li>What's happening</li>
        <li>Hype</li>
        <li>Calendar</li>
        <li>Draw</li>
        <li>Index</li>
        <li>Report</li>
      </ul>
      <ul>
        <li>Notice</li>
      </ul>
      <ul>
        <li>Support</li>
        <li>FAQ</li>
        <li>Docs</li>
        <li>Listing Request</li>
        <li>Advertise</li>
      </ul>
      <ul>
        <li>Company</li>
        <li>About Sigmate</li>
        <li>TOS</li>
        <li>Privacy</li>
        <li>Contact us</li>
        <li>Disclaimer</li>
      </ul>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  overflow: auto;

  ul {
    padding-left: 0;
    white-space: nowrap;

    :not(:first-child) {
      margin-left: 40px;
    }

    :last-child {
      margin-right: 40px;
    }

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
