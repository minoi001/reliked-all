import Head from "next/head";
import React from "react";

export default function Error500() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>Reliked - 500</title>
      </Head>
      <div className="max-w-md p-4 bg-white rounded shadow">
        <h1 className="text-4xl font-bold text-rose">500</h1>
        <p>Internal Server Error</p>
        <p>Sorry, something went wrong.</p>
      </div>
    </div>
  );
}
