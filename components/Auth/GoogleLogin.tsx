import { useRef, useCallback } from 'react';
import useScript from 'hooks/useScript';

/*
 *   reference:
 *   https://developers.google.com/identity/gsi/web/guides/display-button
 *   https://velog.io/@heelieben/Google-Oauth2-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8React-Spring
 *   https://www.typescriptlang.org/docs/handbook/declaration-merging.html#handbook-content
 */

export default function GoogleLogin() {
  const googleLoginBtn = useRef<HTMLDivElement>(null);

  /*
        response type을 찾을 수가 없음. 일단 any로 설정.
        @todo - callback은 추후 백엔드 서버로 response credential을 넘겨주는 일을 할 것.
    */
  const onGoogleSignIn = useCallback((response: any) => {
    // eslint-disable-next-line no-console
    console.log(response.credential);
  }, []);

  const onload = useCallback(() => {
    window.google.accounts.id.initialize({
      client_id:
        '165938451463-pa5uikdhdcmm8si1vo702ga3df5k2mgm.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      prompt_parent_id: 'google-one-tap-container',
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleLoginBtn.current, {
      theme: 'outline',
    });
  }, [onGoogleSignIn]);
  useScript('https://accounts.google.com/gsi/client', onload);

  return <div id="google" ref={googleLoginBtn} />;
}
