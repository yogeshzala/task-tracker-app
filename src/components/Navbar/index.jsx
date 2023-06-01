import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { AppContext } from "../../App";
import Button from "../Button";

import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { showToast } from "../../utils/helper";

export default function Navbar() {
  const {
    theme,
    setTheme,
    usersData,
    setUsersData,
    loggedUser,
    toastList,
    setToastList,
  } = useContext(AppContext);

  const onLogout = () => {
    const index = usersData.findIndex(
      (user) => user.email === loggedUser.email
    );
    usersData[index].logged = false;
    setUsersData([...usersData]);
    setToastList([
      ...toastList,
      showToast("You have been logged out !", "danger"),
    ]);
  };

  return (
    <div>
      <nav className="bg-white px-5 sm:px-32 py-2.5 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 shadow-lg">
        <div className="flex flex-wrap gap-3 items-center justify-between max-[320px]:justify-center">
          <div className="flex items-center">
            <img src={logo} className="h-8 my-1 mr-3" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              To Do
            </span>
          </div>
          <div className="flex items-center gap-5">
            {loggedUser ? (
              <Button
                icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
                text="Logout"
                onClick={onLogout}
              />
            ) : (
              ""
            )}
            {theme === "dark" ? (
              <MoonIcon
                className="w-9 h-9 px-1 py-1 text-indigo-600 hover:bg-gray-700 hover:bg-opacity-30 rounded-full hover:cursor-pointer"
                onClick={() => {
                  setTheme("");
                }}
              />
            ) : (
              <SunIcon
                className="w-9 h-9 px-1 py-1 text-indigo-600 hover:bg-gray-100 rounded-full hover:cursor-pointer"
                onClick={() => {
                  setTheme("dark");
                }}
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
