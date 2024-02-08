import { useEffect } from "react";

export const PageProperties = (props) => {
	const { title, id } = props;
	useEffect(() => {
		const body = document.querySelector("body");
		document.title = title;
		body.id = id;
		// console.log(id);
	}, [title, id]);
};
