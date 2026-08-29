iimport React, { useState } from "react";

const Home = () => {

	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const deleteTask = (indexToDelete) => {
		setTasks(
			tasks.filter((task, index) => {
				return index !== indexToDelete;
			})
		);
	};
	const addTask = () => {
		if (task.trim() !== "") {
			setTasks([...tasks, task]);
			setTask("");
		}
	};
	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<div className="todo-box">
				<input
					type="text"
					placeholder="¿Qué tareas tienes pendientes?"
					value={task}
					onChange={(event) => setTask(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							addTask();
						}
					}}
				/>
				<ul>
					{tasks.length === 0 ? (
						<li className="task-item">No hay tareas pendientes, añadir tareas.</li>
					) : (
						tasks.map((task, index) => (
							<li key={index} className="task-item">
								{task}
								<i
									className="fa-regular fa-circle-xmark delete-btn"
									onClick={() => deleteTask(index)}
								></i>
							</li>
						))
					)}
				</ul>
				<p>
					{tasks.length} {tasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}
				</p>
			</div>
		</div>
	);
};

export default Home;