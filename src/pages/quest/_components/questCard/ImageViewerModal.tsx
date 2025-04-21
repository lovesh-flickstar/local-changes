import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useState } from "react";

export interface GalleryViewerProps {
  images: string[];
  startIndex?: number;
  onClose?: () => void;
}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({
  images,
  startIndex = 0,
  onClose,
}) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  return (
    <Lightbox
      open={index >= 0}
      close={() => {
        setIndex(-1);
        onClose?.();
      }}
      index={index}
      slides={images.map((src) => ({ src }))}
      on={{
        view: ({ index }) => setIndex(index),
      }}
    />
  );
};
