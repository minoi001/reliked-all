import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroImage = ({ homepageContent }) => {
  return (
    <div className="">
      <Link href="/collections">
        <Image
          src={homepageContent.hero_image.value}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          height="1000"
          width="1000"
          alt=""
          loading="eager"
          className="max-md:hidden w-full flex self-center h-full object-cover"
        />
        <Image
          src={homepageContent.hero_image_mobile.value}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          height="1000"
          width="1000"
          alt=""
          className="md:hidden w-full flex self-center h-2/3"
          loading="eager"
        />
        <div className="-mt-72 pb-24 text-center align-middle">
          <h1 className="font-h text-4xl tracking-tight text-almostBlack sm:text-6xl ts-white">
            The Influencer Shop
          </h1>
          <p className="mt-6 text-lg leading-8 text-almostBlack ts-white">
            Gorgeous pieces from your favourite influencers & celebs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="bg-cream px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-taupe hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Shop by Influencer
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeroImage;
