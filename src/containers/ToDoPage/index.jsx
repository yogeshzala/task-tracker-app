import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../App";
import { getUsersData } from "../../utils/helper";
import ToDoForm from "./toDoForm";
import ToDoTable from "./toDoTable";

export const ToDoContext = createContext();

export default function ToDoPage() {
  const { usersData, setUsersData, loggedUser } = useContext(AppContext);
  const [todos, setTodos] = useState(getUsersData().user.todos);
  const [form, setForm] = useState({});
  const formRef = useRef();

  useEffect(() => {
    const index = usersData.findIndex(
      (user) => user.email === loggedUser.email
    );
    usersData[index].todos = todos;
    setUsersData([...usersData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return (
    <div className="flex justify-center py-8 px-5 gap-8 sm:px-32 flex-col min-h-screen">
      <ToDoContext.Provider
        value={{
          todos: todos,
          setTodos: setTodos,
          form: form,
          setForm: setForm,
          formRef: formRef,
        }}
      >
        <ToDoForm />
        <ToDoTable />
      </ToDoContext.Provider>
    </div>
  );
}
