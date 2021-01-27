import cx from 'classnames';
import * as React from 'react';
export interface UploaderProps {
  className?: string;
  id?: string;
  setImageUrl: (url: string) => void;
}

export const ImageUploader = ({
  className = undefined,
  id = undefined,
  setImageUrl,
}: UploaderProps): React.ReactElement<UploaderProps> => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();

    reader.addEventListener('load', (ev: ProgressEvent<FileReader>): unknown => {
      if (ev.target !== null) {
        setImageUrl(ev.target.result as string);
      }
    });

    if (event.target.files !== null && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="file image-uploader">
      <label className="file-label">
        <input
          className={cx('file-input', className)}
          id={id}
          type="file"
          onChange={handleUpload}
          name="resume"
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">Choose a file…</span>
        </span>
      </label>
    </div>
  );
};
