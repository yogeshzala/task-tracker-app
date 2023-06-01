import React, { useContext } from "react";
import { AppContext } from "../../App";
import { ToDoContext } from ".";
import { dateFormat, showToast } from "../../utils/helper";
import Badge from "../../components/Badge";
import DeleteModal from "../../components/DeleteModal";

import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ToDoTable() {
  const { todos, setTodos, setForm, formRef } = useContext(ToDoContext);
  const { toastList, setToastList } = useContext(AppContext);

  const onEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    formRef.current.id.value = todo.id;
    formRef.current.title.value = todo.title;
    formRef.current.assignTo.value = todo.assignTo;
    formRef.current.startDate.value = todo.startDate;
    formRef.current.endDate.value = todo.endDate;
    formRef.current.status.value = todo.status;
    formRef.current.details.value = todo.details;
    setForm(todo);
  };

  const onDeleteClick = (id, title) => {
    document.getElementById("deleteModal").classList.remove("invisible");
    document.getElementById(
      "message"
    ).innerHTML = `Are you sure you want to delete ' ${title} ' to do?`;
    document
      .getElementById("yesButton")
      .addEventListener("click", () => onDelete(id, title));
  };

  const onDelete = (id, title) => {
    document.getElementById("deleteModal").classList.add("invisible");
    const todosData = todos.filter(function (value) {
      return value.id !== id;
    });
    setTodos(todosData);
    setToastList([
      ...toastList,
      showToast(`${title} to do deleted !`, "danger"),
    ]);
  };

  return (
    <div className="sm:px-16 px-8 py-12 shadow-lg rounded-lg dark:bg-slate-800 w-full">
      <DeleteModal id="deleteModal" message="message" yesButton="yesButton" />
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <XCircleIcon className="h-14 w-14 text-slate-400" />
          <h2 className="font-semibold text-4xl text-slate-400">
            No Data Found
          </h2>
        </div>
      ) : (
        <div>
          <div className="relative overflow-auto max-h-[550px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
              <thead className="text-base text-white bg-indigo-600">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[130px]">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[140px]">
                    Assigned To
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[125px]">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[120px]">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[165px]">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[180px]">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              {todos.map((todo, no) => {
                return (
                  <tbody key={todo.id}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{no + 1}</td>
                      <td className="px-6 py-4">{todo.title}</td>
                      <td className="px-6 py-4">{todo.assignTo}</td>
                      <td className="px-6 py-4">{dateFormat(todo.startDate)}</td>
                      <td className="px-6 py-4">{dateFormat(todo.endDate)}</td>
                      <td className="px-6 py-4">
                        <Badge status={todo.status} />
                      </td>
                      <td className="px-6 py-4">{todo.details}</td>
                      <td className="px-6 py-4">
                        {
                          <PencilIcon
                            className="h-9 w-9 bg-slate-200 hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2 dark:text-gray-500 dark:hover:text-white cursor-pointer"
                            onClick={() => onEdit(todo.id)}
                          />
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          <TrashIcon
                            className="h-9 w-9 bg-slate-200 hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2 dark:text-gray-500 dark:hover:text-white cursor-pointer"
                            onClick={() => {
                              onDeleteClick(todo.id, todo.title);
                            }}
                          />
                        }
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
