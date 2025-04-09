import post3 from "../../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp";

export default function Test() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-amber-400 rounded-xl h-[80vh] w-[90vw] max-w-4xl"> {/* Added wrapper */}
        <img 
          src={post3} 
          alt="User Description"
          className="w-full h-full object-fit p-2" // Changed width handling
        />
      </div>
    </div>
  );
}