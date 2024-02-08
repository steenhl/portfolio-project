import { useRef, useEffect } from "react";
import _ from "underscore";

// swiperRef, thisGalleryWrapper
export const useMaxWidthHook = (props) => {
	const { swiperRef, thisGalleryWrapper, useMaxWidth } = props;
	//console.log(swiperRef, thisGalleryWrapper, useMaxWidth);

	const lazyLayout = useRef(undefined);
	useEffect(() => {
		if (swiperRef !== undefined && thisGalleryWrapper !== undefined) {
			if (useMaxWidth) {
				const calculateRationWidth = () => {
					const dividerAB = (a, b) => a / b;
					const multipliedAB = (a, b) => a * b;
					let firstImg = thisGalleryWrapper.querySelector("figure:first-of-type img");
					let imgRation = dividerAB(firstImg.width, firstImg.height);
					let max = multipliedAB(window.innerHeight, imgRation);
					swiperRef.style.maxWidth = max + "px";
					// console.log(`useMaxWidth = ${useMaxWidth}`);
					// console.log(`lazyLayout.current = ${lazyLayout.current}`);
				};
				calculateRationWidth();
				lazyLayout.current = _.debounce(calculateRationWidth, 400);
				window.addEventListener("resize", lazyLayout.current);
			} else {
				if (lazyLayout.current !== undefined) {
					lazyLayout.current.cancel();
					window.removeEventListener("resize", lazyLayout.current);
					swiperRef.style.maxWidth = "";
				}
			}
		}
		return () => {
			if (lazyLayout.current !== undefined) {
				lazyLayout.current.cancel();
				window.removeEventListener("resize", lazyLayout.current);
			}
		};
	}, [swiperRef, thisGalleryWrapper, useMaxWidth]);
};
