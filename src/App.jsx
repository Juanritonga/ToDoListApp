import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isCheckedScreen, setIsCheckedScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [checkedTodos, setCheckedTodos] = useState([]);

  const handleAddTodo = () => {
    if (!newTitle || !newDescription) {
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      checked: false,
    };

    /*ini punya juan ya tolong hargai*/
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCheckedTodos = JSON.parse(localStorage.getItem("checkedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCheckedTodos) {
      setCheckedTodos(savedCheckedTodos);
    }
  }, []);

  const handleDeleteTodo = (index, isChecked = false) => {
    if (isChecked) {
      let reducedCheckedTodo = [...checkedTodos];
      reducedCheckedTodo.splice(index, 1);
      localStorage.setItem("checkedTodos", JSON.stringify(reducedCheckedTodo));
      setCheckedTodos(reducedCheckedTodo);
    } else {
      let reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1);
      localStorage.setItem("todolist", JSON.stringify(reducedTodo));
      setTodos(reducedTodo);
    }
  };

  const handleCheckedTodo = (index) => {
    let checkedOn = new Date();
    let filteredItem = {
      ...allTodos[index],
      checkedOn: checkedOn,
      checked: true,
    };

    let updatedCheckedArr = [...checkedTodos];
    updatedCheckedArr.push(filteredItem);
    setCheckedTodos(updatedCheckedArr);

    localStorage.setItem("checkedTodos", JSON.stringify(updatedCheckedArr));

    handleDeleteTodo(index, false);
  };

  const handleUncheckedTodo = (index) => {
    let uncheckedItem = { ...checkedTodos[index], checked: false };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(uncheckedItem);
    setTodos(updatedTodoArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    handleDeleteTodo(index, true);
  };

  /*ini punya juan ya tolong hargai*/
  return (
    <div className="App">
      <h1>My To Do List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's your doing today?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of the activities you will do today?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="secondaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`primaryBtn ${
              isCheckedScreen === false ? "active" : ""
            }`}
            onClick={() => setIsCheckedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`primaryBtn ${isCheckedScreen === true ? "active" : ""}`}
            onClick={() => setIsCheckedScreen(true)}
          >
            Checked
          </button>
        </div>

        <div className="todo-list">
          {isCheckedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="todo-item-buttons">
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(index, false)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCheckedTodo(index)}
                    className="btn btn-primary"
                  >
                    Check
                  </button>
                </div>
              </div>
            ))}

          {isCheckedScreen === true &&
            checkedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Checked on: {item.checkedOn.toString()}</p>
                </div>
                <div className="todo-item-buttons">
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(index, true)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUncheckedTodo(index)}
                    className="btn btn-warning"
                  >
                    Uncheck
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
