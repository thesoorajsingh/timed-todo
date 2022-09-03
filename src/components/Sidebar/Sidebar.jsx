import React from "react";
import "./Sidebar.css";
import { useWindowSize } from "../../utils/useWindowSize";
import Home from "../../assets/Home.svg";
import Close from "../../assets/Close.svg";

function Sidebar({ filter, setFilter, open, setOpen }) {
	const { width } = useWindowSize();

	const handleClick = (e) => {
		setFilter(e.target.innerText);
		console.log(e.target.innerText);
	};

	const handleSidebarClick = () => {
		setOpen(!open);
	};

	return (
		<div className="main-container">
			{width < 768 ? (
				open ? (
					<div className="close-icons">
						<img
							src={Home}
							alt="Home Icon"
							height={"32"}
							width={"32"}
							onClick={handleSidebarClick}
						/>
						<img src={Close} alt="Close Icon" onClick={handleSidebarClick} />
					</div>
				) : null
			) : null}
			<div
				className={`options ${width < 768 ? (open ? "open" : "closed") : ""}`}
			>
				{open || width > 768 ? (
					<>
						<button
							className={`list-item ${filter === "Running" && "active"}`}
							onClick={handleClick}
						>
							Running
						</button>
						<button
							className={`list-item ${filter === "Expired" && "active"}`}
							onClick={handleClick}
						>
							Expired
						</button>
						<button
							className={`list-item ${filter === "All" && "active"}`}
							onClick={handleClick}
						>
							All
						</button>
					</>
				) : null}
			</div>
		</div>
	);
}

export default Sidebar;
