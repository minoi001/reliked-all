import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroImage = ({ homepageContent }) => {
  console.log("heroImage:" + homepageContent);
  return (
    <div>
      <Link href="/collections">
        <Image
          src={homepageContent.hero_image.value}
          height="2000"
          width="2000"
          alt=""
          className="max-md:hidden w-full flex self-center h-2/3"
        />
        <Image
          src={homepageContent.hero_image_mobile.value}
          height="2000"
          width="2000"
          alt=""
          className="md:hidden w-full flex self-center h-2/3"
        />
        <div className="-mt-72 pb-24 text-center align-middle">
          <h1 className="font-h text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The Influencer Shop
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gorgeous pieces from your favourite influencers & celebs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="rounded-md bg-cream px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-taupe hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Shop by Influencer
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeroImage;
