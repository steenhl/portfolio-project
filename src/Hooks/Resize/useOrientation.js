import { useEffect, useState } from "react";

const Orientation = () => {
	const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? "Landscape" : "Portrait");

	useEffect(() => {
		let landscapePortrait = () => {
			setOrientation(window.innerWidth > window.innerHeight ? "Landscape" : "Portrait");
		};
		window.addEventListener("resize", landscapePortrait);

		return () => {
			window.removeEventListener("resize", landscapePortrait);
		};
	}, [orientation]);
	return orientation;
};

export default Orientation;
