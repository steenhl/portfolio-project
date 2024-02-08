import React, { useRef, useLayoutEffect } from "react";
import "./main.scss";
import gsap from "gsap";

export const Gallery = ({ play, images, delayTime, fadeTime, id }) => {
	let stopAni = useRef();
	const imagesWrapper = useRef();
	useLayoutEffect(() => {
		if (imagesWrapper.current !== undefined && play && stopAni.current === undefined) {
			let images = [...imagesWrapper.current.querySelectorAll("figure")];
			function crossfade() {
				gsap.set(images[0], { autoAlpha: 1 });
				gsap
					.timeline()
					.to(images[0], { autoAlpha: 0, duration: fadeTime })
					.to(images[1], { autoAlpha: 1, duration: fadeTime }, 0);

				images.push(images.shift());
				// start endless run
				stopAni.current = gsap.delayedCall(delayTime, crossfade);
			}
			// start the crossfade after delayTime = xxx sec
			gsap.delayedCall(delayTime, crossfade);
		}
		// stop
		if (play === false && stopAni.current !== undefined) {
			stopAni.current.pause();
		} else if (play === true && stopAni.current !== undefined) {
			stopAni.current.play();
		}
	}, [delayTime, fadeTime, play]);

	return (
		<section ref={imagesWrapper} id={id} className="teaser-gallery">
			{images.current &&
				images.current.map((thisImg) => {
					return <figure key={thisImg.props.id}>{thisImg}</figure>;
				})}
		</section>
	);
};
