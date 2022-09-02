import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Google, Metamask } from 'public/Icons/auth';
import styles from 'styles/styleLib';

type PropsType = {
  service: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  disabled: boolean;
};

type SVGIcon = ReturnType<typeof Google>;

const Icons: StringKeyObj<SVGIcon> = {
  Google,
  Metamask,
};

const Margins: StringKeyObj<string> = {
  Google: '0 19px 0 5px',
  Metamask: '0 16px 0 0',
};

export default function OAuthBtn({
  service,
  onClick,
  width,
  height,
  disabled,
}: PropsType) {
  const Icon = Icons[service];

  return (
    <Btn
      name={service}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
    >
      <FlexWrapper>
        <SVGWrapper>
          <Icon style={{ margin: Margins[service] }} />
        </SVGWrapper>
        <p>{`Continue with ${service}`}</p>
      </FlexWrapper>
    </Btn>
  );
}

const Btn = styled.button<{
  width: string | undefined;
  height: string | undefined;
}>`
    display: block;
    position: relative;
    width: ${({ width }) => width || '490px'};
    height: ${({ height }) => height || '67px'};
    padding: 0;
    border-radius: 8px;
    border: none;
    background-color: #FFFFFF;
    color: ${styles.colors.logoColor};
    font-size: 15px;
    font-weight: 600;
    box-shadow: ${styles.shadows.containerShadow};\
    cursor: pointer;
  
    & + & {
      margin-top: 15px;
    }
  
    &:active {
      background-color: ${darken(0.01, '#FFFFFF')};
    }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-left: 65px;
  }
`;

const SVGWrapper = styled.span`
  position: absolute;
  left: 0;
  margin-left: 21px;
  border-right: 2px solid #e1e5ec;

  svg {
    position: relative;
    top: 2px;
  }
`;
