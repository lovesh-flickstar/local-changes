import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export interface GalleryViewerProps {
    images: string[];
    startIndex?: number;
    onClose?: () => void;
  }

export const GalleryViewer: React.FC<GalleryViewerProps> = ({ images }) => {
  const [index, setIndex] = useState(-1); // -1 = closed

  return (
    <>
      {/* Image grid */}
      <div className="grid grid-cols-3 gap-2 max-h-[512px]">
        <div className="col-span-2">
          <img
            src={images[0]}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => setIndex(0)}
          />
        </div>
        <div className="flex flex-col gap-2">
          {images.slice(1, 3).map((img, i) => (
            <div
              key={i + 1}
              className="relative w-full h-1/2 cursor-pointer"
              onClick={() => setIndex(i + 1)}
            >
              <img
                src={img}
                className="w-full h-full object-cover rounded-lg"
              />
              {i === 1 && images.length > 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold rounded-lg">
                  +{images.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
        on={{
          view: ({ index }) => setIndex(index),
        }}
      />
    </>
  );
};
