import React, { useRef, useLayoutEffect } from "react";
import "./main.scss";
import gsap from "gsap";

export const FadingGallery = ({ play, data, delayTime, fadeTime }) => {
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
		<section ref={imagesWrapper} id="teaser-gallery">
			{data &&
				data.map((thisData) => {
					return (
						<figure key={thisData.id} id={thisData.id}>
							<img src={require("../../" + thisData.src + ".jpg")} alt={thisData.header} />
							<figcaption>{thisData.paragraf}</figcaption>
						</figure>
					);
				})}
		</section>
	);
};
