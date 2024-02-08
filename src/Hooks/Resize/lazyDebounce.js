import { useEffect } from "react";
import _ from "underscore";
// LazyDebounce(func, delayTime)
export const LazyDebounce = (props) => {
	const { func, delayTime } = props;

	useEffect(() => {
		if (func !== undefined && delayTime !== undefined) {
			let lazyLayout = _.debounce(func, delayTime);
			window.addEventListener("resize", lazyLayout);
			// clean up function
			return () => {
				lazyLayout.cancel();
				window.removeEventListener("resize", lazyLayout);
				console.log(lazyLayout);
			};
		}
	}, [delayTime, func]);
};
