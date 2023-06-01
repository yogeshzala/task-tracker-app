import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import { showToast } from "../../utils/helper";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const { setPage, toastList, setToastList, usersData, setUsersData } =
    useContext(AppContext);
  const [form, setForm] = useState({});
  const [focus, setFocus] = useState({});
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (Object.keys(validateForm()).length === 0) {
      const user = usersData.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          const index = usersData.findIndex(
            (userToLog) => userToLog.email === user.email
          );
          usersData[index].logged = true;
          setUsersData([...usersData]);
          setToastList([
            ...toastList,
            showToast(`Welcome ${user.firstName} !`),
          ]);
          setForm({});
          document.getElementById("form").reset();
        } else {
          setToastList([
            ...toastList,
            showToast("Incorrect password !", "danger"),
          ]);
        }
      } else {
        setToastList([
          ...toastList,
          showToast("User does not exists !", "danger"),
        ]);
      }
    } else {
      setError(validateForm());
    }
  };

  const onSetField = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSetFocus = (name, value) => {
    setFocus({ ...focus, [name]: value });
  };

  const validateForm = useCallback(() => {
    const { email, password } = form;
    const newError = {};

    if (focus.email) {
      if (email === "") {
        newError.email = "Email cannot be empty !";
      }
    } else if (focus.password) {
      if (password === "") {
        newError.password = "Password cannot be empty !";
      }
    } else {
      if (!email) {
        newError.email = "Email cannot be empty !";
      }
      if (!password) {
        newError.password = "Password cannot be empty !";
      }
    }
    return newError;
  }, [focus.email, focus.password, form]);

  useEffect(() => {
    if (Object.keys(form).length !== 0) {
      setError(validateForm());
    }
  }, [form, validateForm]);

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-5">
      <form
        id="form"
        className="sm:px-16 px-8 py-12 shadow-lg rounded-lg dark:bg-slate-800 w-[450px] mt-[60px]"
      >
        <h1 className="font-bold text-3xl mb-10 text-indigo-600">Login</h1>
        <InputBox
          designType="floating"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => onSetField(e)}
          onFocus={(e) => onSetFocus(e.target.name, true)}
          onBlur={(e) => onSetFocus(e.target.name, false)}
        />
        {error.email && (
          <p className="text-red-600 text-sm mb-3 -mt-5">{error.email}</p>
        )}
        <InputBox
          designType="floating"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => onSetField(e)}
          onFocus={(e) => onSetFocus(e.target.name, true)}
          onBlur={(e) => onSetFocus(e.target.name, false)}
        />
        {error.password && (
          <p className="text-red-600 text-sm mb-3 -mt-5">{error.password}</p>
        )}
        <Button
          icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
          text="Login"
          type="button"
          onClick={onSubmit}
        />
        <p
          className="text-center text-slate-500 mt-8 hover:cursor-pointer hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-600"
          onClick={() => {
            setPage("register");
          }}
        >
          Don’t have an account ? Register
        </p>
      </form>
    </div>
  );
}
