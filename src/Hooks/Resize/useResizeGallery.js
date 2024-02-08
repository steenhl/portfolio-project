// On resize
import { useEffect, useRef } from "react";
import _ from "underscore";

export const useResizeGallery = (props) => {
	const { delayTime, maxWidth, setHasMaxWidth } = props;
	const lazyLayout = useRef(undefined);
	useEffect(() => {
		const windowResize = () => {
			window.matchMedia(`(max-width:  ${maxWidth}px)`).matches ? setHasMaxWidth(true) : setHasMaxWidth(false);
		};
		windowResize();

		if (delayTime && maxWidth && lazyLayout.current === undefined) {
			lazyLayout.current = _.debounce(windowResize, delayTime);
			window.addEventListener("resize", lazyLayout.current);
		}

		// clean up function
		return () => {
			if (lazyLayout.current !== undefined) {
				lazyLayout.current.cancel();
				window.removeEventListener("resize", lazyLayout.current);
			}
		};
	}, [delayTime, setHasMaxWidth, maxWidth]);
};
