import Image1 from "../../assets/compressed/post1-transformed-transformed_compressed_compressed-transformed.webp";
import Image2 from "../../assets/compressed/post2-transformed-transformed_compressed_compressed_compressed.webp";
import Image3 from "../../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp";
import Image4 from "../../assets/compressed/post4-OBRyovQ4V-transformed-transformed_compressed_compressed-transformed-transformed.webp";
import Image5 from "../../assets/compressed/post.jpg";
export const flicks = [
  Image1, Image2, Image3, Image4, Image5,
  Image1, Image2, Image3, Image4, Image5,
  Image1, Image2
];
export const Flicks = () => {
   

    return (
        <div className="w-full h-auto overflow-y-auto scrollbar-hide">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
    {flicks.map((flick, index) => (
      <div key={index} className="w-full ">
        <img
          src={flick}
          alt={`Flick ${index + 1}`}
          className="w-full h-full rounded object-contain"
        />
      </div>
    ))}
  </div>
</div>
           
    );
};

