import React from "react";
import "./TodoCard.css";
import Stopwatch from "../NewTodoModal/Stopwatch/Stopwatch";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function TodoCard({ time, todos }) {
	const [status, setStatus] = useState("Running");
	const [checked, setChecked] = useState(new Array(todos.length).fill(false));
	const [allChecked, setAllChecked] = React.useState(0);

	const handleCheck = (position) => {
		console.log(checked);
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
