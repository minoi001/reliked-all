import Head from "next/head";
import Link from "next/link.js";
import Request from "../../../components/Account/Recovery/Request";
export default function AccountRecovery({ account }) {
  return (
    <div className="minh-screen py-12 sm:pt-20">
      <Head>
        <title>Password Recovery</title>
      </Head>
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:spacex-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-full w-full">
            <Request />
          </div>
        </div>
      </div>
    </div>
  );
}
