import cx from 'classnames';
import * as React from 'react';
export interface ImageCardProps {
  className?: string;
  id?: string;
  src?: string;
}

const ImageCard = ({
  className = undefined,
  id = undefined,
  src: source = undefined,
}: ImageCardProps): React.ReactElement<ImageCardProps> => {
  const placeholder = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const [showImage, setShowImage] = React.useState(false);

  const callback = (entries: unknown[]): void => {
    entries.forEach((entry: { isIntersecting: boolean }): void => {
      if (entry.isIntersecting) {
        setShowImage(true);
      }
    });
  };

  React.useEffect((): (() => void) => {
    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(placeholder.current);

    return (): void => observer.disconnect();
  }, []);

  return (
    <div id={id} className={className}>
      <div className="card">
        <div className="card-image">
          <figure className={cx('image', className)} ref={placeholder}>
            {showImage ? (
              <img id={id} src={source} />
            ) : (
              <div className="placeholder" />
            )}
          </figure>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
