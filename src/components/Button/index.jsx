import React from "react";

export default function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      id={props.id}
      className={
        props.className
          ? props.className
          : "text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      }
    >
      <div className="flex gap-2 items-center justify-center">
        {props.icon} {props.text}
      </div>
    </button>
  );
}
