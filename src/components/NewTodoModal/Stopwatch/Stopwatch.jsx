import React from "react";
import "./Stopwatch.css";

function Stopwatch({ time, setStatus }) {
	const [seconds, setSeconds] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);

	setInterval(() => {
		const currentDate = new Date();
		const timeBetweenDates = Math.ceil((time - currentDate) / 1000);
		setWatch(timeBetweenDates);
	}, 250);

	function setWatch(time) {
		setSeconds(time % 60 < 10 ? `0${time % 60}` : time % 60);
		setMinutes(
			Math.floor(time / 60) % 60 < 10
				? `0${Math.floor(time / 60) % 60}`
				: Math.floor(time / 60) % 60
		);
	}

	return (
		<div
			className={`stopwatch ${
				minutes < 5 ? "red" : minutes < 10 ? "yellow" : "green"
			}`}
		>
			<h3>
				{minutes}:{seconds}
			</h3>
		</div>
	);
}

export default Stopwatch;