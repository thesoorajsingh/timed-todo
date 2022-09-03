import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NewTimer({
	time,
	setTime,
	currentTasks,
	setCurrentTasks,
	setShowModal,
}) {
	const [todo, setTodo] = useState([{ id: uuidv4(), todo: "" }]);
	const [newTime, setNewTime] = useState("");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(time);
		const currentTime = new Date().getTime();
		console.log(new Date(currentTime + time * 60000));
		setCurrentTasks([
			...currentTasks,
			{
				id: uuidv4(),
				time: currentTime + time * 60000,
				todo: todo,
			},
		]);
		// return values before this line
		setTime("");
		setTodo([{ todo: "" }]);
		console.log(currentTasks);
		setShowModal(false);
	};

	const handleTodoChange = (e, id) => {
		const newInputFields = todo.map((i) => {
			if (id === i.id) {
				i[e.target.name] = e.target.value;
			}
			return i;
		});
		setTodo(newInputFields);
	};

	const handleAddFields = (e) => {
		const { name, value } = e.target;
		setTodo([...todo, { [name]: value }]);
	};

	return (
		<>
			<div className="modal">
				<h2>Add a Task</h2>
				<input
					type="number"
					name="time"
					id="time"
					placeholder="Add Time"
					value={time}
					onChange={(e) => {
						console.log(e.target.valueAsNumber);
						setTime(parseInt(e.target.valueAsNumber));
					}}
				/>
				<form onSubmit={handleFormSubmit}>
					{todo.map((item, index) => {
						return (
							<div className="todo-input" key={index}>
								<input
									type="text"
									name="todo"
									id="todo"
									value={item.todo}
									onChange={(e) => handleTodoChange(e, item.id)}
									placeholder={`Add Task ${index + 1}`}
								/>
							</div>
						);
					})}
					<button type="button" className="add-task" onClick={handleAddFields}>
						+
					</button>
					<button className="add-button create" type="submit">
						Create
					</button>
				</form>
			</div>
		</>
	);
}

export default NewTimer;
