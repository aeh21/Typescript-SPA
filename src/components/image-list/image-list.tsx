import cx from 'classnames';
import * as React from 'react';

import ImageCard from '../image-card/image-card';
import Loader from '../loader/loader';

export interface ImageListProps {
  className?: string | undefined;
  id?: string | undefined;
  isModelLoading?: boolean;
  urlList: string[];
}

export const ImageList = ({
  className,
  id,
  isModelLoading = false,
  urlList,
}: ImageListProps): React.ReactElement<ImageListProps> => {
  return (
    <section id={id} className={cx('section', 'image-list', className)}>
      <h1 className="title">Gallery</h1>
      <div className="columns is-multiline image-list-wrapper">
        {urlList === undefined || urlList.length === 0 ? (
          <>
            {isModelLoading ? (
              <Loader />
            ) : (
              <h2 className="subtitle">Nothing to show here</h2>
            )}
          </>
        ) : (
          <>
            {urlList.map((url: string, idx: number): unknown => {
              return (
                <div
                  key={`url-${idx.toString()}`}
                  className="column is-one-quarter"
                >
                  <ImageCard className="is-4by3" src={url} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};
