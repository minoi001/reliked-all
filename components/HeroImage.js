import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
import React from "react";
import Image from "next/image";

const HeroImage = ({ homepageContent }) => {
  return (
    <div
      className={
        "max-w-7xl bg-no-repeat bg-center bg-[url('" + homepageContent + "')"
      }
    >
      <div class="py-36 align-bottom">
        {/* <div>
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <div className="z-0">
                Announcing our next round of funding.
                <a href="#" class="font-semibold text-indigo-600">
                  <span class="absolute inset-0" aria-hidden="true"></span>Read
                  more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            The Influencer Shop
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Gorgeous pieces from your favourite influencers & celebs.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-cream px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-taupe hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shop by Influencer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
