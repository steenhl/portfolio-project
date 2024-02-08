import React from "react";
import { Smile02 } from "../../../Components/SVG/Smile-02";
import { Meh02 } from "../../../Components/SVG/Meh02";
import { Frown02 } from "../../../Components/SVG/Frown02";
import "./main.scss";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export const Likes = ({ play }) => {
	const wrapper = useRef(null);
	const smileRef = useRef(null);
	const mehRef = useRef(null);
	const frownRef = useRef(null);

	// Likes timeline
	const [tl, setTl] = useState();
	useEffect(() => {
		let timeline = gsap.timeline({
			onComplete: () => {
				timeline.play(1);
			},
		});
		setTl(timeline);
	}, [play]);

	useEffect(() => {
		if (tl) {
			tl.seek(0);
			const images = [smileRef.current, mehRef.current, frownRef.current];

			const firstImage = images[0],
				totalImages = images.length - 1,
				delay = 2,
				duration = 3;
			gsap.utils.toArray(images).forEach((image, index) => {
				console.log(image);
				var offset = index === 0 ? 0 : "-=" + duration;
				//insert first animation at a time of 0 or all other animations at a time that will overlap with the previous animation fading out.
				tl.to(
					image,
					{
						duration,
						autoAlpha: 1,
						repeat: 1,
						yoyo: true,
						repeatDelay: delay,
						onComplete: () => {
							console.log(1);
						},
					},
					offset
				);
				//when the last image fades out we need to cross-fade the first image
				if (index === totalImages) {
					tl.to(firstImage, { duration, autoAlpha: 1 }, offset);
				}
			});
		}
	}, [tl]);

	return (
		<div className="svg-likes-wrapper" ref={wrapper}>
			<Smile02 className="img" ref={smileRef} />
			<Meh02 className="img" ref={mehRef} />
			<Frown02 className="img" ref={frownRef} />
		</div>
	);
};
