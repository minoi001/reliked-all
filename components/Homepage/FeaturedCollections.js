import { ArrowRightIcon } from "@heroicons/react/24/outline";

const FeaturedCollections = () => {
  return (
    <div className="w-full h-auto flex justify-center relative mt-6">
      <div className="container h-10 left-0  ml-0 absolute z-0 bg-cream pb-34r"></div>
      <div className=" max-w-7xl container z-10 h-full my-8 static p-0 py-0  mx-auto flex flex-col justify-around lg:flex-row">
        <div className="w-full lg:w-5/12 flex-col  p-2 lg:p-2 ">
          <h2 className="text-2xl lg:text-4xl p-2 lg:p-5 text-almostBlack font-semibold">
            Scarves
          </h2>
          <div className="relative w-full shadow-sm">
            <img
              className="w-full object-cover "
              src="https://images.hardlyeverwornit.com/scale_half/module/managed-hewi06-03-2023-6405f1f45d14d.jpg"
              alt=""
            />
            <button className="absolute p-2 px-4 bg-mint white -bottom-6 flex items-center text-almostBlack font-semibold text-sm transition duration-1000 hover:scale-x-105 hover:outline outline-pink hover:outline-offset-2">
              Shop Now <ArrowRightIcon className="text-2xl ml-2" />{" "}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-5/12 flex-col  p-2 lg:p-2 ">
          <h2 className="text-2xl lg:text-4xl p-2 lg:p-4 text-almostBlack font-semibold">
            Hats
          </h2>
          <div className="relative w-full shadow-sm">
            <img
              className="w-full object-cover "
              src="https://images.hardlyeverwornit.com/scale_half/module/managed-hewi06-03-2023-6405f1f45d14d.jpg"
              alt=""
            />
            <button className="absolute p-2 px-4 bg-mint white -bottom-6 flex items-center text-almostBlack font-semibold text-sm transition duration-1000 hover:scale-x-105 hover:outline outline-pink hover:outline-offset-2">
              Shop Now <ArrowRightIcon className="text-2xl ml-2" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
