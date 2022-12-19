import React, { useMemo } from 'react';
import { File } from '../../../client/api';

const ClavaImage: React.FC<{
  image: File;
  width: number | string;
  className?: string;
  isEditable?: boolean;
}> = ({ image, width, isEditable, className }) => {
  const { formats, url, caption } = image;
  const srcSet = useMemo<string>(
    () => formats.map((format) => `${format.url} ${format.width}w`).join(', '),
    [formats],
  );

  return (
    <img
      src={url}
      srcSet={srcSet}
      key={`image-${image.hash}`}
      width={width}
      className={`img ${isEditable ? 'editable' : ''} ${className}`}
      alt={caption}
    />
  );
};

ClavaImage.defaultProps = {
  isEditable: false,
  className: undefined,
};
export default ClavaImage;
