import cx from 'classnames';
import * as React from 'react';

export interface ImageOrPlaceholderProps {
  className?: string;
  id?: string;
  lazyLoaded?: boolean;
  onLoad?: (event: unknown) => void;
  placeholderRef?: React.MutableRefObject<HTMLDivElement>;
  src?: string | undefined;
}

export const ImageOrPlaceholder = ({
  src: source = undefined,
  id = undefined,
  className = undefined,
  onLoad,
}: ImageOrPlaceholderProps): React.ReactElement<ImageOrPlaceholderProps> => {
  return (
    <>
      <figure className={cx('image', className)}>
        {source === undefined ? (
          <div className="placeholder" />
        ) : (
          <img id={id} src={source} onLoad={onLoad} />
        )}
      </figure>
    </>
  );
};
