import {
  ChangeEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react';
import styled from 'styled-components';

type PropsType = {
  imageBlob?: Blob;
  onChange: ChangeEventHandler<HTMLInputElement>;
  removeThisBlock: () => void;
};

let prevHeight = 0;

export default function Img({
  imageBlob,
  onChange,
  removeThisBlock,
}: PropsType) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  /** Pops up the file choosing modal. */
  useEffect(() => {
    if (imageBlob === undefined) {
      if (inputRef && inputRef.current) {
        inputRef.current.click();
      }
    }
  }, []);

  /** Renders selected file in the block */
  useEffect(() => {
    if (imageBlob) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImgSrc(e.target.result as string);
        }
      };
      const ContentWrapper = document.getElementById('content-wrapper');
      if (ContentWrapper) prevHeight = ContentWrapper.scrollHeight;
      reader.readAsDataURL(imageBlob);
    }
  }, [imageBlob]);

  /** Scrolls down by the height of overflowed image when image is rendered. */
  useEffect(() => {
    if (imgSrc) {
      const ContentWrapper = document.getElementById('content-wrapper');
      if (ContentWrapper && prevHeight < ContentWrapper.scrollHeight) {
        ContentWrapper.scrollTo({
          top: ContentWrapper.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [imgSrc]);

  const onClick: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.stopPropagation();

      window.onfocus = () => {
        setTimeout(() => {
          if (inputRef.current?.files) {
            removeThisBlock();
          }

          // Remove the handler
          window.onfocus = null;
        }, 300);
      };
    },
    [removeThisBlock]
  );

  if (imageBlob === undefined) {
    return (
      <Input
        type="file"
        accept={'image/*'}
        onChange={onChange}
        onClick={onClick}
        ref={inputRef}
      />
    );
  } if (imgSrc === '') {
    return <div>Loading...</div>;
  } 
    return <img src={imgSrc} alt="Something went wrong..." />;
  
}

const Input = styled.input`
  display: none;
`;
