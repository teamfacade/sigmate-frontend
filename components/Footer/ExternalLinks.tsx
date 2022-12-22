import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

export default memo(function ExternalLinks() {
  return (
    <Wrapper>
      <ul>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/user-guide"
            target="_blank"
            rel="noreferrer"
          >
            User Guide
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/wiki"
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/community-verdict"
            target="_blank"
            rel="noreferrer"
          >
            Verdict
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/opinion-and-debate"
            target="_blank"
            rel="noreferrer"
          >
            Opinion
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/threads"
            target="_blank"
            rel="noreferrer"
          >
            Thread
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features"
            target="_blank"
            rel="noreferrer"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/whats-happening"
            target="_blank"
            rel="noreferrer"
          >
            What's happening
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/hype"
            target="_blank"
            rel="noreferrer"
          >
            Hype
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/calendar"
            target="_blank"
            rel="noreferrer"
          >
            Calendar
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/draw"
            target="_blank"
            rel="noreferrer"
          >
            Draw
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/index"
            target="_blank"
            rel="noreferrer"
          >
            Index
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/features/research-reports"
            target="_blank"
            rel="noreferrer"
          >
            Report
          </a>
        </li>
      </ul>
      <ul>
        {/* <li><a href={""} target={"_blank"}>Notice</a></li> */}
        <li>Notice</li>
      </ul>
      <ul>
        <li>Support</li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/sigmate/faq"
            target="_blank"
            rel="noreferrer"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/support/contact"
            target="_blank"
            rel="noreferrer"
          >
            Listing Request
          </a>
        </li>
        <li>
          <a
            href="https://forms.gle/DabTc76x9M48m7YF6"
            target="_blank"
            rel="noreferrer"
          >
            Advertise
          </a>
        </li>
      </ul>
      <ul>
        <li>Company</li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/introduction/why-sigmate"
            target="_blank"
            rel="noreferrer"
          >
            About Sigmate
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/support/terms-of-use"
            target="_blank"
            rel="noreferrer"
          >
            TOS
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/support/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/support/contact"
            target="_blank"
            rel="noreferrer"
          >
            Contact us
          </a>
        </li>
        <li>
          <a
            href="https://sigmate.gitbook.io/sigmate/support/disclaimer"
            target="_blank"
            rel="noreferrer"
          >
            Disclaimer
          </a>
        </li>
      </ul>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: calc(100% - 400px);

  @media (min-width: 987px) {
    display: flex;
    justify-content: start;

    ul:not(:first-child) {
      margin-left: 40px;
    }
  }
  @media (max-width: 986px) {
    display: inline-grid;
  }

  ul {
    padding-left: 0;
    white-space: nowrap;

    li:first-child {
      margin-bottom: 8px;
      color: #353535;
      font-size: 16px;
      font-weight: bold;
    }
  }

  li {
    list-style-type: none;
    margin-bottom: 10px;
    color: ${styles.colors.lightTextColor};
    font-size: 16px;
    font-family: 'Inter', sans-serif;

    a {
      color: inherit;
    }
  }
`;
