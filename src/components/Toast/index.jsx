import React, { useCallback, useContext, useEffect } from "react";
import Button from "../Button";
import { AppContext } from "../../App";

import { CheckIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Toast() {
  const { toastList, setToastList } = useContext(AppContext);

  const onClose = useCallback(
    (id) => {
      const index = toastList.findIndex((toast) => toast.id === id);
      toastList.splice(index, 1);
      setToastList([...toastList]);
    },
    [setToastList, toastList]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(toastList[0].id);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onClose, toastList]);

  return (
    <div className="fixed top-0 right-0 mt-5 mx-5 z-30">
      {toastList.map((toast) => {
        if (toast.type === "danger") {
          return (
            <div
              id={toast.id}
              key={toast.id}
              className="flex justify-between items-center w-full max-w-xs p-4 mb-4 bg-red-500 rounded-lg shadow-lg dark:text-gray-400"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-white rounded-lg dark:bg-slate-800 dark:text-red-500">
                <XMarkIcon className="h-5 w-5" />
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="ml-3 text-sm font-normal text-white">
                  {toast.message}
                </div>
                <Button
                  type="button"
                  icon={<XMarkIcon className="h-5 w-5" />}
                  onClick={() => {
                    onClose(toast.id);
                  }}
                  className="ml-2 -mx-1 -my-1 text-white hover:text-red-500 rounded-full focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-white inline-flex h-8 w-8 dark:hover:text-red-500 dark:hover:bg-slate-800"
                />
              </div>
            </div>
          );
        }
        return (
          <div
            id={toast.id}
            key={toast.id}
            className="flex justify-between items-center w-full max-w-xs p-4 mb-4 bg-emerald-500 rounded-lg shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-emerald-500 bg-white rounded-lg dark:bg-slate-800">
              <CheckIcon className="h-5 w-5 " />
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="ml-3 text-sm font-normal text-white">
                {toast.message}
              </div>
              <Button
                type="button"
                icon={<XMarkIcon className="h-5 w-5" />}
                onClick={() => {
                  onClose(toast.id);
                }}
                className="ml-2 -mx-1 -my-1 text-white hover:text-emerald-500 rounded-full focus:ring-2 focus:ring-emerald-300 p-1.5 hover:bg-white inline-flex h-8 w-8 dark:hover:text-emerald-500 dark:hover:bg-slate-800"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
