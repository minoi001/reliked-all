export const ChevronDown = () => (
  <div className={"px-1"}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4 self-center"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>
);

export const Cross = () => {
  return (
    <div className={"px-1"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4 self-center"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 6.75l10.5 10.5M17.25 6.75L6.75 17.25"
        />
      </svg>
    </div>
  );
};
