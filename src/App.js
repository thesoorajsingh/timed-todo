import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TodoCard from "./components/TodoCard/TodoCard";
import { useEffect } from "react";
import NewTodoModal from "./components/NewTodoModal/NewTodoModal";
import NewTimer from "./components/NewTodoModal/NewTimer/NewTimer";
import { useLocalStorage } from "./utils/apiData";
import { useWindowSize } from "./utils/useWindowSize";
import Menu from "./assets/Menu.svg";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [currentTasks, setCurrentTasks] = useLocalStorage("todo", []);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [filter, setFilter] = useState("All");
	const [time, setTime] = useState("");
	const [open, setOpen] = useState(false);
	const { width } = useWindowSize();

	useEffect(() => {
		const currentTime = new Date().getTime();
		setFilteredTasks(
			filter === "All"
				? currentTasks
				: currentTasks.filter((task) =>
						task.time > currentTime
							? filter === "Running"
							: filter === "Expired"
				  )
		);
	}, [currentTasks, filter]);

	return (
		<div className="App">
			{!open && width < 768 && (
				<>
					<img
						src={Menu}
						alt="Menu Icon"
						className="menu-icon"
						onClick={() => setOpen(!open)}
					/>
					<h4 className="current-filter">{filter}</h4>
				</>
			)}
			<div
				className={`sidebar ${width < 768 ? (open ? "open" : "closed") : ""}`}
			>
				<Sidebar
					filter={filter}
					setFilter={setFilter}
					open={open}
					setOpen={setOpen}
				/>
			</div>
			{!showModal ? (
				<>
					{currentTasks.length !== 0 ? (
						<div className="main-body">
							<button
								className="add-button new-task"
								onClick={() => setShowModal(!showModal)}
							>
								Add Timer
							</button>
							<div className="cards-section">
								{filteredTasks.map((item, index) => {
									return (
										<TodoCard time={item.time} todos={item.todo} key={index} />
									);
								})}
							</div>
						</div>
					) : (
						<div className="new-modal">
							<NewTodoModal
								showModal={showModal}
								setShowModal={setShowModal}
								currentTasks={currentTasks}
								setCurrentTasks={setCurrentTasks}
							/>
						</div>
					)}
				</>
			) : (
				<div className="new-modal">
					<NewTimer
						time={time}
						setTime={setTime}
						currentTasks={currentTasks}
						setCurrentTasks={setCurrentTasks}
						setShowModal={setShowModal}
					/>
				</div>
			)}
		</div>
	);
}
export default App;
