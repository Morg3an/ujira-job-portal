import { Fragment } from "react";

function JobIcon() {
  return (
    <Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-12 h-12 mb-4 text-gray-900"
      >
        <path
          fillRule="evenodd"
          d="M16 4V2H8v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-4zM8 4h8v2H8V4zm12 14H4V8h16v10z"
          clipRule="evenodd"
        ></path>
        <path d="M16 4V2H8v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-4zM8 4h8v2H8V4zm12 14H4V8h16v10z"></path>
      </svg>
    </Fragment>
  );
}

export default JobIcon;