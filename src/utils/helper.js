import {
  emailRegEx,
  lowerCaseRegEx,
  numberRegEx,
  passwordLength,
  specialCharRegEx,
  upperCaseRegEx,
} from "./const";

export const getTheme = () => {
  return localStorage.getItem("theme") ?? "";
};

export const getUsersData = () => {
  const usersData = JSON.parse(localStorage.getItem("users")) ?? [];
  const user = usersData.find((user) => user.logged === true);
  if (user) {
    return { page: "todo", usersData: usersData, user: user };
  }
  return { page: "login", usersData: usersData };
};

export const showToast = (message, type) => {
  const id = Math.floor(Math.random() * 1000 + 1);
  const toast = { id, message, type };
  return toast;
};

export const testEmail = (email) => {
  if (!email || email === "") {
    return "Email cannot be empty !";
  } else if (!emailRegEx.test(email)) {
    return "Invalid email !";
  }
};

export const testPassword = (password) => {
  if (!password || password === "") {
    return "Password cannot be empty !";
  } else if (password.length < passwordLength) {
    return "Password length must be 8 !";
  } else if (!upperCaseRegEx.test(password)) {
    return "Password must contain uppercase letters !";
  } else if (!lowerCaseRegEx.test(password)) {
    return "Password must contain lowercase letters !";
  } else if (!numberRegEx.test(password)) {
    return "Password must contain numbers !";
  } else if (!specialCharRegEx.test(password)) {
    return "Password must contain one special characters !";
  }
};

export const testConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword || confirmPassword === "") {
    return "Confirm password cannot be empty !";
  } else if (confirmPassword !== password) {
    return "Confirm password does not match !";
  }
};

export const testDate = (startDate, endDate) => {
  if (!endDate || endDate === "") {
    return "End date cannot be empty !";
  } else if (startDate > endDate) {
    return "Invalid end date !";
  }
};

export const dateFormat = (date) => {
  const dateArr = date.split("-");
  const yyyy = dateArr[0];
  const mm = dateArr[1];
  const dd = dateArr[2];
  return dd + "-" + mm + "-" + yyyy;
};

export const disableDates = () => {
  const todayDate = new Date();
  const dd = todayDate.getDate();
  const mm = todayDate.getMonth() + 1;
  const yyyy = todayDate.getFullYear();
  if (dd.toString().length === 1 && mm.toString().length === 1) {
    return yyyy + "-0" + mm + "-0" + dd;
  } else if (dd.toString().length === 1) {
    return yyyy + "-" + mm + "-0" + dd;
  } else if (mm.toString().length === 1) {
    return yyyy + "-0" + mm + "-" + dd;
  }
  return yyyy + "-" + mm + "-" + dd;
};
