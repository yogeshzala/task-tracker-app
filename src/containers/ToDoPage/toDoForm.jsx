import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ToDoContext } from ".";
import { AppContext } from "../../App";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import { disableDates, showToast, testDate } from "../../utils/helper";

export default function ToDoForm() {
  const { toastList, setToastList } = useContext(AppContext);
  const { todos, setTodos, form, setForm, formRef } = useContext(ToDoContext);
  const [focus, setFocus] = useState({});
  const [error, setError] = useState({});
  const startDate = useRef("");
  const endDate = useRef("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validateForm()).length === 0) {
      if (form.id) {
        const index = todos.findIndex((todo) => todo.id === form.id);
        todos[index] = form;
        setTodos([...todos]);
        setToastList([...toastList, showToast("To do Edited !")]);
      } else {
        const id = Math.floor(Math.random() * 1000 + 1);
        setTodos([...todos, { ...form, id: id }]);
        setToastList([...toastList, showToast("To do added !")]);
      }
      setForm({});
      startDate.current.value = "";
      startDate.current.type = "text";
      endDate.current.value = "";
      endDate.current.type = "text";
      formRef.current.reset();
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
    const { title, assignTo, startDate, endDate, status, details } = form;
    const newError = {};

    if (focus.title) {
      if (title === "") {
        newError.title = "Title cannot be empty !";
      }
    } else if (focus.assignTo) {
      if (assignTo === "") {
        newError.assignTo = "Assign to cannot be empty !";
      }
    } else if (focus.startDate) {
      if (startDate === "") {
        newError.startDate = "Start date cannot be empty !";
      }
    } else if (focus.endDate) {
      newError.endDate = testDate(startDate, endDate);
    } else if (focus.status) {
      if (status === "") {
        newError.status = "Status cannot be empty !";
      }
    } else if (focus.details) {
      if (details === "") {
        newError.details = "Details cannot be empty !";
      }
    } else {
      if (!title) {
        newError.title = "Title cannot be empty !";
      }
      if (!assignTo) {
        newError.assignTo = "Assign to cannot be empty !";
      }
      if (!startDate) {
        newError.startDate = "Start date cannot be empty !";
      }
      if (testDate(startDate, endDate)) {
        newError.endDate = testDate(startDate, endDate);
      }
      if (!status) {
        newError.status = "Status cannot be empty !";
      }
      if (!details) {
        newError.details = "Details cannot be empty !";
      }
    }
    return newError;
  }, [
    focus.assignTo,
    focus.details,
    focus.endDate,
    focus.startDate,
    focus.status,
    focus.title,
    form,
  ]);

  useEffect(() => {
    if (Object.keys(form).length !== 0) {
      setError(validateForm());
    }
  }, [form, validateForm]);

  return (
    <form
      ref={formRef}
      className="sm:px-16 px-8 py-12 shadow-lg rounded-lg dark:bg-slate-800 w-full mt-[60px]"
    >
      <h1 className="font-bold text-3xl mb-10 text-indigo-700 dark:text-indigo-600">
        To Do
      </h1>
      <InputBox type="text" name="id" className="hidden" />
      <div className="grid md:grid-cols-2 md:gap-6">
        <div>
          <InputBox
            type="text"
            name="title"
            placeholder="Title"
            label="Title"
            onChange={(e) => onSetField(e)}
            onFocus={(e) => onSetFocus(e.target.name, true)}
            onBlur={(e) => onSetFocus(e.target.name, false)}
          />
          {error.title && (
            <p className="text-red-600 text-sm mb-3 -mt-5">{error.title}</p>
          )}
        </div>
        <div>
          <InputBox
            type="text"
            name="assignTo"
            placeholder="Assign To"
            label="Assign To"
            onChange={(e) => onSetField(e)}
            onFocus={(e) => onSetFocus(e.target.name, true)}
            onBlur={(e) => onSetFocus(e.target.name, false)}
          />
          {error.assignTo && (
            <p className="text-red-600 text-sm mb-3 -mt-5">{error.assignTo}</p>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-6">
        <div>
          <InputBox
            type="text"
            name="startDate"
            label="Start Date"
            placeholder="dd-mm-yyyy"
            dateRef={startDate}
            min={disableDates()}
            onChange={(e) => onSetField(e)}
            onFocus={(e) => {
              e.target.type = "date";
              onSetFocus(e.target.name, true);
            }}
            onBlur={(e) => {
              onSetFocus(e.target.name, false);
            }}
          />
          {error.startDate && (
            <p className="text-red-600 text-sm mb-3 -mt-5">{error.startDate}</p>
          )}
        </div>
        <div>
          <InputBox
            type="text"
            name="endDate"
            label="End Date"
            placeholder="dd-mm-yyyy"
            dateRef={endDate}
            min={disableDates()}
            onChange={(e) => onSetField(e)}
            onFocus={(e) => {
              e.target.type = "date";
              onSetFocus(e.target.name, true);
            }}
            onBlur={(e) => {
              onSetFocus(e.target.name, false);
            }}
          />
          {error.endDate && (
            <p className="text-red-600 text-sm mb-3 -mt-5">{error.endDate}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </label>
          <select
            className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 mb-5"
            name="status"
            onChange={(e) => onSetField(e)}
            onFocus={(e) => onSetFocus(e.target.name, true)}
            onBlur={(e) => onSetFocus(e.target.name, false)}
          >
            <option value="">Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Quality Analysis">Quality Analysis</option>
            <option value="Done">Done</option>
          </select>
          {error.status && (
            <p className="text-red-600 text-sm mb-3 -mt-5">{error.status}</p>
          )}
        </div>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        Details
      </label>
      <textarea
        name="details"
        rows="4"
        onChange={(e) => onSetField(e)}
        onFocus={(e) => onSetFocus(e.target.name, true)}
        onBlur={(e) => onSetFocus(e.target.name, false)}
        placeholder="Details of to do..."
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 mb-6"
      ></textarea>
      {error.details && (
        <p className="text-red-600 text-sm mb-3 -mt-5">{error.details}</p>
      )}
      <Button text="Submit" type="button" onClick={onSubmit} />
    </form>
  );
}
