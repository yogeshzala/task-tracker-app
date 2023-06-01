import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import ToDoPage from "./containers/ToDoPage";
import { getTheme, getUsersData } from "./utils/helper";

export const AppContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(getTheme);
  const [usersData, setUsersData] = useState(getUsersData().usersData);
  const [page, setPage] = useState();
  const [loggedUser, setloggedUser] = useState();
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersData));
    setPage(getUsersData().page);
    setloggedUser(getUsersData().user);
  }, [usersData]);

  return (
    <div className={theme}>
      <div className="dark:bg-gray-900">
        <AppContext.Provider
          value={{
            theme: theme,
            setTheme: setTheme,
            page: page,
            setPage: setPage,
            usersData: usersData,
            setUsersData: setUsersData,
            loggedUser: loggedUser,
            setloggedUser: setloggedUser,
            toastList: toastList,
            setToastList: setToastList,
          }}
        >
          <Navbar />
          {toastList.length !== 0 && <Toast />}
          {page === "todo" ? (
            <ToDoPage />
          ) : page === "login" ? (
            <LoginPage />
          ) : (
            <RegisterPage />
          )}
        </AppContext.Provider>
      </div>
    </div>
  );
}
