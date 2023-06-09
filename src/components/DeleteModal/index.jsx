import React from "react";
import Button from "../Button";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function DeleteModal(props) {
  const onClose = () => {
    document.getElementById(props.id).classList.add("invisible");
  };

  return (
    <div
      id={props.id}
      tabIndex="-1"
      className="fixed flex invisible backdrop-blur-sm justify-center pt-8 top-0 left-0 right-0 bottom-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <Button
            type="button"
            onClick={onClose}
            icon={<XMarkIcon className="h-5 w-5" />}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          />
          <div className="p-6 text-center">
            <TrashIcon className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
            <h3
              id={props.message}
              className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this To Do?
            </h3>
            <div className="flex justify-center flex-wrap gap-4">
              <Button
                type="button"
                text="Yes, I'm sure"
                id={props.yesButton}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              />
              <Button
                type="button"
                text="No, cancel"
                onClick={onClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
