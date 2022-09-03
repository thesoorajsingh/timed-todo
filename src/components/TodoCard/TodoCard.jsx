import React from "react";
import "./TodoCard.css";
import Stopwatch from "../NewTodoModal/Stopwatch/Stopwatch";

function TodoCard({ time, todos, status, setStatus }) {
	const [checked, setChecked] = React.useState(
		new Array(todos.length).fill(false)
	);

	const currentTime = new Date().getTime();
	const givenTime = new Date(time).getTime();

	currentTime > givenTime ? setStatus("Expired") : setStatus("Running");

	const [allChecked, setAllChecked] = React.useState(0);

	const handleCheck = (position) => {
		const updated = checked.map((item, index) => {
			return index === position ? !item : item;
		});

		setAllChecked(
			updated.reduce((sum, item, index) => {
				if (item === true) {
					return sum + 1;
				}
				return sum;
			}, 0)
		);
		setChecked(updated);
	};

	return (
		<div className="container">
			<div className={`todo-card ${status === "Expired" ? "disabled" : ""}`}>
				{status === "Expired" ? (
					<h2 className="expired-header">
						Expired {allChecked} / {checked.length}
					</h2>
				) : (
					<Stopwatch time={time} setStatus={setStatus} />
				)}
				{todos.map((item, index) => {
					return (
						<div
							key={index}
							className={`${status === "Expired" ? "expired" : ""}`}
						>
							<label className="check-container" htmlFor="todo">
								<input
									type="checkbox"
									name="todo"
									className={`checkbox`}
									id={`checkbox-${index}`}
									checked={checked[index]}
									onChange={() => handleCheck(index)}
								/>{" "}
								<h4 className={`todo-title ${checked[index] ? "checked" : ""}`}>
									{item.todo}
								</h4>
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default TodoCard;
