import React from "react";

export default function Error404() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-4 bg-white rounded shadow">
        <h1 className="text-4xl font-bold text-rose">404</h1>
        <p>Page not found</p>
        <p>The requested page does not exist.</p>
      </div>
    </div>
  );
}
