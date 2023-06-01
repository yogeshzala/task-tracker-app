import React from "react";

export default function Badge(props) {
  return (
    <div>
      {props.status === "To Do" ? (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          {props.status}
        </span>
      ) : props.status === "In Progress" ? (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          {props.status}
        </span>
      ) : props.status === "Quality Analysis" ? (
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
          {props.status}
        </span>
      ) : (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          {props.status}
        </span>
      )}
    </div>
  );
}
