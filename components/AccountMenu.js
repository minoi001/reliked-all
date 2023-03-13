import Link from "next/link";
import Image from "next/image";
import { formatter } from "../utils/helpers";
import { Fragment } from "react";

const AccountMenu = ({ account }) => {
  return (
    <div>
      <Link href="/account">Account</Link>
    </div>

    // <Link href="/account">
    //   <h3 className="mt-4 text-lg font-medium text-gray-900">My Account</h3>
    // </Link>
  );
};

export default AccountMenu;
