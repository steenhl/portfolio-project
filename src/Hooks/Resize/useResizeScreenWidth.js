import { useEffect, useRef } from "react";
import _ from "underscore";
export const useResizeScreenWidth = (props) => {
	// delayTime:number, maxWidth:number, setHasMaxWidth: setState:boolien
	const { delayTime, maxWidth, setHasMaxWidth, stopResize } = props;
	const lazyLayout = useRef(undefined);
	// init
	useEffect(() => {
		if (stopResize === false) {
			window.matchMedia(`(max-width:  ${maxWidth}px)`).matches ? setHasMaxWidth(true) : setHasMaxWidth(false);
		}
	}, [maxWidth, setHasMaxWidth, stopResize]);

	// On resize
	useEffect(() => {
		const windowResize = () => {
			window.matchMedia(`(max-width:  ${maxWidth}px)`).matches ? setHasMaxWidth(true) : setHasMaxWidth(false);
		};

		if (delayTime !== undefined && maxWidth !== undefined) {
			if (stopResize === false) {
				lazyLayout.current = _.debounce(windowResize, delayTime);
				window.addEventListener("resize", lazyLayout.current);
				// console.log("AddEventListener");
			} else if (stopResize) {
				lazyLayout.current.cancel();
				window.removeEventListener("resize", lazyLayout.current);
				lazyLayout.current = undefined;
				// console.log("RemoveEventListener");
			}
			// clean up function
			return () => {
				if (lazyLayout.current !== undefined) {
					lazyLayout.current.cancel();
					window.removeEventListener("resize", lazyLayout.current);
				}
			};
		}
	}, [delayTime, setHasMaxWidth, maxWidth, stopResize]);
};
