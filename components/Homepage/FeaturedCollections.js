import { ArrowRightIcon } from "@heroicons/react/24/outline";

const FeaturedCollections = () => {
  return (
    // <div className="w-full h-auto flex justify-center relative mt-6 ">
    //   <div>
    //     <div className="container h-full left-0 ml-0 -mr-12 absolute bg-cream">
    //       <div className="grid px-6 sm:px-12 place-items-center align-middle p-2 w-full pb-12">
    //         <h1 className="text-almostBlack text-3xl pt-6 m-2">
    //           Featured Collections
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    //   <div>

    //   </div>
    // </div>
    <div className="mt-12">
      <h1 className="text-3xl capitalize pt-6 -mb-20">
        <center>Featured Collections</center>
      </h1>
      <div className="w-3/4 bg-cream py-12">
        <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="inline px-6 sm:px-12 align-middle p-2 w-full pb-12">
            <div className="-mr-12 sm:-mr-32 container h-full static p-0 py-0  mx-auto flex flex-col justify-around lg:flex-row">
              {/* Content */}
              <div className="w-full lg:w-1/2 flex-col  p-4 lg:p-2 lg:ml-12 ">
                <h2 className="font-h text-2xl lg:text-4xl p-2 lg:p-5 text-almostBlack font-semibold">
                  Scarves
                </h2>
                <div className="relative w-full shadow-sm">
                  <img
                    className="w-full object-cover "
                    src="https://images.hardlyeverwornit.com/scale_half/module/managed-hewi06-03-2023-6405f1f45d14d.jpg"
                    alt=""
                  />
                  <button className="absolute p-2 px-4 bg-mint white -bottom-6 flex items-center text-almostBlack font-semibold text-sm transition duration-1000 hover:scale-x-105 hover:outline outline-pink hover:outline-offset-2">
                    Shop Now <ArrowRightIcon className="text-2xl ml-2" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex-col p-2 lg:ml-12 ">
                <h2 className="font-h text-2xl lg:text-4xl p-2 lg:p-5 text-almostBlack font-semibold">
                  Scarves
                </h2>
                <div className="relative w-full shadow-sm">
                  <img
                    className="w-full object-cover "
                    src="https://images.hardlyeverwornit.com/scale_half/module/managed-hewi06-03-2023-6405f1f45d14d.jpg"
                    alt=""
                  />
                  <button className="absolute p-2 px-4 bg-mint white -bottom-6 flex items-center text-almostBlack font-semibold text-sm transition duration-1000 hover:scale-x-105 hover:outline outline-pink hover:outline-offset-2">
                    Shop Now <ArrowRightIcon className="text-2xl ml-2" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex-col  p-4 lg:p-2 lg:ml-12 hidden xxl:block ">
                <h2 className="font-h text-2xl lg:text-4xl p-2 lg:p-5 text-almostBlack font-semibold">
                  Scarves
                </h2>
                <div className="relative w-full shadow-sm">
                  <img
                    className="w-full object-cover "
                    src="https://images.hardlyeverwornit.com/scale_half/module/managed-hewi06-03-2023-6405f1f45d14d.jpg"
                    alt=""
                  />
                  <button className="absolute p-2 px-4 bg-mint white -bottom-6 flex items-center text-almostBlack font-semibold text-sm transition duration-1000 hover:scale-x-105 hover:outline outline-pink hover:outline-offset-2">
                    Shop Now <ArrowRightIcon className="text-2xl ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
