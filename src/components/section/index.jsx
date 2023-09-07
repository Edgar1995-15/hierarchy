import React, { useState } from "react";
import ChildSection from "../childSection";
import styles from "./index.module.css";
import add from "../../assets/icons/add.png";
import remove from "../../assets/icons/remove.svg";
import edit from "../../assets/icons/edit.svg";

function Section({ isVisible }) {
  const initialTodos = [
    {
      id: 101,
      text: "Shirts",
      children: [
        { id: 4, text: "Child Todo 1.1" },
        { id: 5, text: "Child Todo 1.2" },
      ],
    },
    {
      id: 102,
      text: "Scarves",
      children: [],
    },
    {
      id: 103,
      text: "Jeans",
      children: [],
    },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");
  const [displayEdit, setDisplayEdit] = useState(false);
  const addTodo = () => {
    const maxId = Math.max(...todos.map((todo) => todo.id));

    const newTodoObject = {
      id: maxId + 1,
      text: newTodo,
      children: [],
    };
    setTodos([...todos, newTodoObject]);
    setNewTodo("");
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const startEditingTodo = (todo) => {
    setEditingTodo(todo.id);
    setEditedTodoText(todo.text);
  };

  const saveEditedTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodo) {
        return { ...todo, text: editedTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditedTodoText("");
  };

  return (
    <div>
      <div>
        {isVisible && (
          <>
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </>
        )}
      </div>
      <ul className={styles.sectionList}>
        {todos.map((todo) => (
          <>
            <li key={todo.id} className={styles.section}>
              <span>^</span>
              <span>{todo.id}</span>
              {editingTodo === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                  />
                  <button onClick={saveEditedTodo}>Save</button>
                </>
              ) : (
                <span>{todo.text}</span>
              )}
              <div>
                <button onClick={() => startEditingTodo(todo)}>
                  <img src={edit} alt="edit" />
                </button>
                <button onClick={() => setDisplayEdit(true)}>
                  <img src={add} alt="add" />
                </button>
                <button onClick={() => removeTodo(todo.id)}>
                  {" "}
                  <img src={remove} alt="remove" />{" "}
                </button>
              </div>
              <div></div>
            </li>
            <ChildSection displayEdit={displayEdit} />
          </>
        ))}
      </ul>
    </div>
  );
}

export default Section;
