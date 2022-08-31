import { useEffect } from 'react';

export default function useScript(
  url: string,
  onload: () => void,
  async = false,
  defer = false
) {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = onload;
    script.async = async;
    script.defer = defer;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
}
