import React from "react";

function NewTodoModal({
	showModal,
	setShowModal,
	currentTasks,
	setCurrentTasks,
}) {
	const handleModalClick = () => {
		setShowModal(true);
	};

	return (
		<>
			<div className="add-card">
				<h2>No Tasks</h2>
				<p>Add a task and set timers</p>
				<br />
				<button className="add-button" onClick={handleModalClick}>
					Add Timer
				</button>
			</div>
		</>
	);
}

export default NewTodoModal;

// new Date(currentDate.getTime() + time * 60000).getMinutes()
