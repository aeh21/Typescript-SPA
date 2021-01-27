import cx from 'classnames';
import * as React from 'react';

import { ImageOrPlaceholder } from '../image-or-placeholder/image-or-placeholder';
import { ImageUploader } from '../image-uploader/image-uploader';

export interface ImagePreviewProps {
  className?: string;
  dogBreed?: string | undefined;
  error?: string | undefined;
  id?: string;
  modelLoading?: boolean;
  onLoad?: (event: unknown) => void;
  setImageUrl: (url: string) => void;
  src?: string | undefined;
}

export const ImagePreview = ({
  className = undefined,
  dogBreed = undefined,
  error = undefined,
  id = undefined,
  modelLoading = false,
  onLoad = undefined,
  setImageUrl,
  src: source = undefined,
}: ImagePreviewProps): React.ReactElement<ImagePreviewProps> => {
  return (
    <section className={cx('hero', 'is-small', className)}>
      <div className="hero-body">
        <div className="container columns">
          <div className="column is-half is-flex is-flex-direction-column is-justify-content-center">
            <h1 className="title">Hi there!</h1>
            <h2 className="subtitle">This is a dog identifier and gallery.</h2>
            <ImageUploader setImageUrl={setImageUrl} />
            {modelLoading ? (
              <p className="has-text-info">Checking your image...</p>
            ) : (
              <>
                {error === undefined ? (
                  <>
                    {dogBreed === undefined ? null : (
                      <p className="has-text-success">
                        Dog breed matches{' '}
                        <span className="capitalize-words">{dogBreed}</span>
                      </p>
                    )}
                  </>
                ) : (
                  <p className="has-text-danger">{error}</p>
                )}
              </>
            )}
          </div>
          <div className="column is-half">
            <ImageOrPlaceholder
              className="is-4by3"
              id={id}
              src={source}
              onLoad={onLoad}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
