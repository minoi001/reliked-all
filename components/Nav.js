import Link from "next/link";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { AccountContext } from "../context/accountContext";
import MiniCart from "./MiniCart";
import Image from "next/image";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import MegaMenu from "./MegaMenu";
export default function Nav() {
  const { cart, cartOpen, setCartOpen, headerContent } =
    useContext(ShopContext);
  const { getUserInfo } = useContext(AccountContext);

  return (
    <div>
      {/* <header className="border-b stick top-0 z-20 bg-white">
        <div className="flex item-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
          <Link href="/" passHref>
            <div className="cursor-pointer">
              <Image
                src={headerContent.logo}
                alt="Reliked"
                width="135"
                height="135"
                className=""
              />
            </div>
          </Link>
          <div className="text-md font-bold cursor-pointer">
            <div className="inline-flex p-2">
              <Link href="/account">
                <UserIcon width="35px" className="p-1" />
              </Link>
              <a
                onClick={() => {
                  setCartOpen(!cartOpen);
                }}
              >
                <ShoppingCartIcon width="35px" className="p-1" />
              </a>
            </div>

            <MiniCart cart={cart} />
          </div>
        </div>
      </header> */}
      <menu>
        <MegaMenu />
      </menu>
    </div>
  );
}
