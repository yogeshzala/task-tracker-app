import React from "react";

export default function InputBox(props) {
  return (
    <div>
      {props.designType === "floating" ? (
        <div className="relative z-0 w-full mb-6 group">
          <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            placeholder=" "
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {props.placeholder}
          </label>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {props.label}
          </label>
          <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
            min={props.min}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            autoComplete="off"
            ref={props.dateRef}
            className={
              "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:bg-slate-800 " +
              props.className
            }
          />
        </div>
      )}
    </div>
  );
}
