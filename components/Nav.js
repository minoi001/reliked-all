import Link from "next/link";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { AccountContext } from "../context/accountContext";
import MiniCart from "./MiniCart";
import Image from "next/image";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Nav() {
  const { cart, cartOpen, setCartOpen, headerContent } =
    useContext(ShopContext);
  const { getUserInfo } = useContext(AccountContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  return (
    <div>
      <header className="border-b stick top-0 z-20 bg-white">
        <div className="flex item-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
          <Link href="/" passHref>
            <div className="cursor-pointer">
              <Image
                src={headerContent.logo}
                alt="Reliked"
                width="135"
                height="135"
              />
            </div>
          </Link>
          <div className="text-md font-bold cursor-pointer">
            <div className="inline-block">
              <Link href="/account">
                <UserIcon width="20px" />
              </Link>
              <a
                onClick={() => {
                  setCartOpen(!cartOpen);
                }}
              >
                <ShoppingCartIcon width="20px" />
              </a>
            </div>

            <MiniCart cart={cart} />
          </div>
        </div>
      </header>
    </div>
  );
}
