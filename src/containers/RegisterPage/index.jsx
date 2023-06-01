import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import {
  showToast,
  testConfirmPassword,
  testEmail,
  testPassword,
} from "../../utils/helper";

export default function RegisterPage() {
  const { setPage, usersData, setUsersData, toastList, setToastList } =
    useContext(AppContext);
  const [form, setForm] = useState({});
  const [focus, setFocus] = useState({});
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = form;
    if (Object.keys(validateForm()).length === 0) {
      const user = usersData.find((user) => user.email === email);
      if (user) {
        setToastList([
          ...toastList,
          showToast("User already exists !", "danger"),
        ]);
      } else {
        const user = {
          firstName,
          lastName,
          email,
          password,
          logged: true,
          todos: [],
        };
        setUsersData([...usersData, user]);
        setToastList([...toastList, showToast("Registration successful !")]);
        setForm({});
        document.getElementById("form").reset();
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
    const { firstName, lastName, email, password, confirmPassword } = form;
    const newError = {};

    if (focus.firstName) {
      if (firstName === "") {
        newError.firstName = "First name cannot be empty !";
      }
    } else if (focus.lastName) {
      if (lastName === "") {
        newError.lastName = "Last name cannot be empty !";
      }
    } else if (focus.email) {
      newError.email = testEmail(email);
    } else if (focus.password) {
      newError.password = testPassword(password);
    } else if (focus.confirmPassword) {
      newError.confirmPassword = testConfirmPassword(confirmPassword, password);
    } else {
      if (!firstName) {
        newError.firstName = "First name cannot be empty !";
      }
      if (!lastName) {
        newError.lastName = "Last name cannot be empty !";
      }
      if (testPassword(password)) {
        newError.password = testPassword(password);
      }
      if (testConfirmPassword(confirmPassword, password)) {
        newError.confirmPassword = testConfirmPassword(
          confirmPassword,
          password
        );
      }
      if (testEmail(email)) {
        newError.email = testEmail(email);
      }
    }
    return newError;
  }, [
    focus.confirmPassword,
    focus.email,
    focus.firstName,
    focus.lastName,
    focus.password,
    form,
  ]);

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
        <h1 className="font-bold text-3xl mb-10 text-indigo-600">Register</h1>
        <InputBox
          designType="floating"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => onSetField(e)}
          onFocus={(e) => onSetFocus(e.target.name, true)}
          onBlur={(e) => onSetFocus(e.target.name, false)}
        />
        {error.firstName && (
          <p className="text-red-600 text-sm mb-3 -mt-5">{error.firstName}</p>
        )}
        <InputBox
          designType="floating"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => onSetField(e)}
          onFocus={(e) => onSetFocus(e.target.name, true)}
          onBlur={(e) => onSetFocus(e.target.name, false)}
        />
        {error.lastName && (
          <p className="text-red-600 text-sm mb-3 -mt-5">{error.lastName}</p>
        )}
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
        <InputBox
          designType="floating"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => onSetField(e)}
          onFocus={(e) => onSetFocus(e.target.name, true)}
          onBlur={(e) => onSetFocus(e.target.name, false)}
        />
        {error.confirmPassword && (
          <p className="text-red-600 text-sm mb-3 -mt-5">
            {error.confirmPassword}
          </p>
        )}
        <Button text="Register" type="button" onClick={onSubmit} />
        <p
          className="text-center text-slate-500 mt-8 hover:cursor-pointer hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-600"
          onClick={() => {
            setPage("login");
          }}
        >
          Already have an account ? Login
        </p>
      </form>
    </div>
  );
}
