import {
  memo,
  FormEventHandler,
  ChangeEventHandler,
  useState,
  useCallback,
} from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import Axios from 'lib/global/axiosInstance';
import { AxiosError } from 'axios';
import styles from 'styles/styleLib';

const waitingFetcher: Fetcher<number, string> = async (url) => {
  try {
    const res = await Axios.get(url);
    if (res.status === 200) {
      return res.data.count;
    }
    return 0;
  } catch {
    return 0;
  }
};

const ErrorMsg: StringKeyObj<string> = {
  NOT_EMAIL: 'Please submit a correct email address.',
  ALREADY_EXISTS: 'You already joined to the waitlist.',
  TOO_LONG: 'Email address should be less than 256 characters.',
};

export default memo(function WaitingList() {
  const [pending, setPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data: waitings } = useSWR('/waiting/email', waitingFetcher);
  const [springValue] = useSpring(
    {
      from: { number: 0 },
      number: waitings,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    },
    [waitings]
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setEmail(e.currentTarget.value),
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setPending(true);

      Axios.post('/waiting/email', { email })
        .then(() => {
          setSubmitted(true);
        })
        .catch((err) => {
          const res = (err as AxiosError).response;
          if (res?.status === 400) {
            alert(ErrorMsg[(res.data as any).validationErrors[0].msg]);
          } else
            alert(
              `Error white registering to waiting list. ERR: ${res?.status}`
            );
        })
        .finally(() => {
          setPending(false);
        });
    },
    [email]
  );

  return (
    <Wrapper>
      <div>
        <TextWrapper>
          <animated.div>
            {springValue.number.to((n) => n.toFixed(0))}
          </animated.div>
          <span>{' people are on the waitlist.'}</span>
        </TextWrapper>
        <div style={{ width: '100%' }}>
          <Form onSubmit={onSubmit}>
            <Input
              type="email"
              value={email}
              disabled={submitted}
              onChange={onChange}
            />
            <Submit disabled={email === '' || pending || submitted}>
              {pending ? '...' : submitted ? 'Registered!' : 'Register'}
            </Submit>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = memo(styled.div`
  width: 100%;
  background-color: ${styles.colors.globalBackgroundColor};

  @media (max-width: 728px) {
    padding: 42px 30px;
  }

  @media (min-width: 729px) {
    padding: 70px 72px 90px;
  }

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1280px;
    margin: auto;
  }
`);

const TextWrapper = memo(styled.div`
  display: flex;
  margin-bottom: 16px;

  > div,
  span {
    font-size: 36px;
    font-weight: 700;
    color: ${styles.colors.logoColor};
    white-space: break-spaces;
  }
`);

const Form = styled.form`
  @media (max-width: 728px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 729px) {
    display: flex;
    justify-content: center;
  }
  width: 100%;
`;

const Input = styled.input`
  flex: 1 1 auto;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightGrayBorderColor};

  @media (min-width: 729px) {
    max-width: 720px;
    margin: 0 16px 0 0;
  }
  @media (max-width: 728px) {
    width: 100%;
    margin: 0 0 16px 0;
  }

  :focus-visible {
    outline: none;
  }

  :disabled {
    background-color: ${styles.colors.tableRowColor};
  }
`;

const Submit = memo(styled.button`
  @media (max-width: 728px) {
    flex: 1 1 auto;
    width: 100%;
  }
  @media (min-width: 729px) {
    flex: 0 0 48px;
  }
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background-color ease-in-out 300ms;

  :disabled {
    background-color: ${styles.colors.dividerColor};
  }
`);
