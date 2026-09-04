import React, { useState } from "react";

const TodoItem = ({ task, onDelete }) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center py-3 ps-4 fs-4 fw-light text-dark position-relative"
      style={{ cursor: "default" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{task}</span>

      <button
        className="btn text-danger border-0 p-0 fs-3 position-absolute end-0 me-3"
        style={{
          visibility: isHovered ? "visible" : "hidden",
          lineHeight: "1",
        }}
        onClick={onDelete}
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;