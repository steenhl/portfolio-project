import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollTop = () => {
	let location = useLocation();

	useLayoutEffect(() => {
		setTimeout(() => {
			document.documentElement.scrollTo(0, 0);
		}, 30);
	}, [location]);
	return null;
};
