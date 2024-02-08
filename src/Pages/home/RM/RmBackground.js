import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./RmBackground.scss";
import { RoughEase } from "gsap/EasePack";
export const RmBackground = ({ playStars }) => {
	gsap.registerPlugin(RoughEase);
	const banner = useRef(null);
	const star = useRef(null);
	const stars = useRef(null);

	useEffect(() => {
		if (stars.current !== null) {
			if (playStars) {
				stars.current.forEach((star) => {
					star.timeline.resume();
				});
			} else {
				stars.current.forEach((star) => {
					star.timeline.pause();
				});
			}
		}
	}, [playStars]);

	useEffect(() => {
		let baseStar = document.querySelector(".star");

		let frag = document.createDocumentFragment();
		// Creating fragment: Appending a star directly to the banner element will trigger a reflow. There are 300 stars,
		// so appending them one at a time could trigger 300 reflows. That does not include any additional reflows
		// or repaints that might be caused by changing the initial style for each star. By appending all the stars to a document fragment,
		// modifying them on there, and then adding it to the banner element will trigger only 1 reflow and repaint.

		let delayMin = 2;
		let delayMax = 6;

		let durationMin = 0.3;
		let durationMax = 1;

		let numAnimations = 50;
		let numStars = 200;

		stars.current = [];
		let eases = [];

		for (var i = 0; i < numAnimations; i++) {
			// {duration: 1, opacity: 0, ease: "rough"}
			//ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})"
			var ease = new RoughEase({
				// ease: "none",
				// template: Linear.easeNone,
				template: "none",
				strength: random(1, 3),
				points: Math.floor(random(50, 200)),
				taper: "both",
				randomize: true,
				clamp: true,
			});

			eases.push(ease);
		}

		function onLoad() {
			for (let i = 0; i < numStars; i++) {
				stars.current.push(createStar());
			}
			baseStar.remove();
			banner.current.appendChild(frag);
		}
		onLoad();
		function createStar() {
			let appearMin = 0.3;
			let appearMax = 0.8;

			var star = baseStar.cloneNode(true);
			frag.appendChild(star);

			gsap.set(star, {
				rotation: random(360),
				xPercent: -50,
				yPercent: -50,
				scale: 0,
				top: randomPercent(),
				left: randomPercent(),
			});

			let tl = gsap.timeline({ repeat: -1, yoyo: true });

			for (var i = 0; i < numAnimations; i++) {
				let ease1 = eases[Math.floor(random(numAnimations))];
				let ease2 = eases[Math.floor(random(numAnimations))];

				let alpha = random(0.7, 1);
				let scale = random(0.15, 0.4);

				let appear = "+=" + random(appearMin, appearMax);
				let delay = "+=" + random(delayMin, delayMax);
				let duration1 = random(durationMin, durationMax);
				let duration2 = random(durationMin, durationMax);

				tl
					.to(star, { autoAlpha: alpha, scale: scale, ease: ease1, duration: duration1 }, delay)
					.to(star, { autoAlpha: 0, scale: 0, ease: ease2, duration: duration2 }, appear);
			}

			tl.progress(random(1));

			return {
				element: star,
				timeline: tl,
			};
		}

		function randomPercent() {
			return Math.ceil(0 + (100 - 0) * Math.random()) + "%";
		}
		function random(min, max) {
			if (max == null) {
				max = min;
				min = 0;
			}
			if (min > max) {
				var tmp = min;
				min = max;
				max = tmp;
			}
			return min + (max - min) * Math.random();
		}
	}, []);

	return (
		<>
			<div id="banner" ref={banner}></div>
			<div ref={star} className="star">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 9 9">
					<path
						id="star"
						fill="#FFFDCC"
						d="m5.75 5.35 3.8.25-3.2-2.05 1.4-3.5-2.95 2.4L1.9.05l1.4 3.5L.05 5.6l3.8-.25.95 3.7.95-3.7Z"
					/>
				</svg>
			</div>
		</>
	);
};
