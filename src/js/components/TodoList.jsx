import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const USERNAME = "santigarrido";
const API_BASE = "https://playground.4geeks.com/todo";

const TodoList = () => {

  const [tomaDatos, setTomaDatos] = useState("");
  const [tarea, setTarea] = useState([]);
  const [cargando, setCargando] = useState(true);

  const createUser = () => {
    fetch(`${API_BASE}/users/${USERNAME}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setTarea([]);
        setCargando(false);
      })
      .catch((error) => console.log(error));
  };

  const getTasks = () => {
    fetch(`${API_BASE}/users/${USERNAME}`)
      .then((resp) => {
        if (resp.status === 404) {
          createUser();
          return null;
        }
        return resp.json();
      })
      .then((data) => {
        if (data) {
          setTarea(data.todos);
          setCargando(false);
        }
      })
      .catch((error) => console.log(error));
  };

useEffect(() => {getTasks();}, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tomaDatos.trim() !== "") {
      const nuevaTarea = { label: tomaDatos.trim(), is_done: false };

      fetch(`${API_BASE}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(() => {
          getTasks();
          setTomaDatos("");
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteTask = (todoId) => {
    fetch(`${API_BASE}/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => getTasks())
      .catch((error) => console.log(error));
  };

  const clearAllTasks = () => {
    fetch(`${API_BASE}/users/${USERNAME}`, {
      method: "DELETE",
    })
      .then(() => createUser())
      .catch((error) => console.log(error));
  };

  return (
      <div className="container d-flex flex-column align-items-center mt-5"
      style={{ maxWidth: "550px" }}>
        
    <div className="card d-flex flex-column align-items-center mt-5 px-3 pb-3"
      style={{ maxWidth: "500px" }}
    >

      <h1 className="card-body display-1 text-danger text-opacity-20 fw-light m-0">
        ToDos
      </h1>

      <div className="card w-100 shadow-sm border-1 rounded-1">

        <div className="border-bottom">
          <input
            type="text"
            className="form-control form-control-lg border-0 py-3 ps-4 fs-3 fw-light text-secondary"
            placeholder="What needs to be done?"
            style={{ fontStyle: "italic", boxShadow: "none" }}
            value={tomaDatos}
            onChange={(e) => setTomaDatos(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>


        <ul className="list-group list-group-flush">
          {cargando ? (
            <li className="list-group-item py-3 ps-4 text-muted fst-italic fs-5 fw-light">
              Cargando tareas...
            </li>
          ) : tarea.length === 0 ? (
            <li className="list-group-item py-3 ps-4 text-muted fst-italic fs-5 fw-light">
              Acabaste las tareas, añadir nuevas tareas
            </li>
          ) : (
            tarea.map((task) => (
              <TodoItem
                key={task.id}
                task={task.label}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </ul>
        
        <div className="card-footer bg-white text-muted py-2 ps-3 border-top-0 fs-6 fw-light shadow-sm d-flex justify-content-between align-items-center">
          <span>{tarea.length} {tarea.length === 1 ? "item" : "items"} left</span>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={clearAllTasks}
          >
            Limpiar todo
          </button>
        </div>
      </div>

      <style>{`
        .form-control::placeholder { color: #e6e6e6 !important; }
      `}</style>
    </div>
    </div>
  );
};

export default TodoList;