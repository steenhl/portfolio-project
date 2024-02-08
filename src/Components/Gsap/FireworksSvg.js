import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const FireworksSvg = ({ clickEvent }) => {
	let sparklesTl = useRef(null);
	let sparklesSvg = useRef(null);
	useEffect(() => {
		sparklesTl.current = gsap.timeline({ paused: true, ease: "elastic.out(1, 0.3)" });
		const tl = sparklesTl.current;

		tl.set(sparklesSvg.current, { scale: 2 });
		tl.fromTo(".red-dot", { x: -15, y: 45 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(".yellow-dot", { x: -35, y: 35 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(".yellow-dot-big", { x: -70, y: 30 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(
			".red-element",
			{ x: -45, y: 40, transformOrigin: "center center" },
			{ scale: 0, x: 0, y: 0, rotate: 360 },
			"cracker"
		);

		tl.fromTo(".red-dot-big", { x: -5, y: 5 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(".purple-circle", { x: 10, y: 30 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(".yellow-dot-2", { x: 10, y: 20 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.fromTo(
			".red-element-2",
			{ x: 40, y: -40, transformOrigin: "center center" },
			{ scale: 0, x: 0, y: 0, rotate: 360 },
			"cracker"
		);
		tl.fromTo(".yellow-dot-3", { x: 50, y: -50 }, { scale: 0, x: 0, y: 0 }, "cracker");
		tl.timeScale(0.01);
	}, []);

	useEffect(() => {
		if (sparklesTl.current && sparklesSvg.current) {
			const sparkles = sparklesSvg.current;
			const tl = sparklesTl.current;

			if (clickEvent) {
				if (sparkles.style.opacity === "0") {
					sparklesTl.current.set(sparkles, {
						opacity: 1,
					});
				}
				tl.paused(!tl.paused());
				tl.play(0);

				const left = clickEvent.clientX;
				const top = clickEvent.clientY;

				const rect = sparkles.getBoundingClientRect();
				const width = rect.width;
				const height = rect.height;

				const widthSparkles = width / 2;
				const heightSparkles = height / 2;

				gsap.set(".sparkles", {
					x: left + widthSparkles,
					y: top + heightSparkles,
				});
			}
		}
	}, [clickEvent]);

	return (
		<svg className="sparkles" ref={sparklesSvg} style={{ opacity: 0, position: "absolute" }}>
			<path
				className="yellow-dot-3"
				fill="#FFC91D"
				d="M0,101.5c0,1.5,1.3,2.8,2.8,2.8s2.8-1.3,2.8-2.8c0-1.5-1.3-2.8-2.8-2.8S0,100,0,101.5"
			/>
			<path
				className="red-element-2"
				fill="#FC0808"
				d="M14.7,86.1c0,0.6,0.4,1,1,1c0.6,0,1-0.4,1-1v-3.3c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1V86.1z M14.7,97c0,0.6,0.4,1,1,1c0.6,0,1-0.4,1-1v-3.3c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1V97z M19.5,89c-0.6,0-1,0.4-1,1s0.4,1,1,1h3.3 c0.6,0,1-0.4,1-1s-0.4-1-1-1H19.5z M8.6,89c-0.6,0-1,0.4-1,1s0.4,1,1,1h3.3c0.6,0,1-0.4,1-1s-0.4-1-1-1H8.6z"
			/>
			<path
				className="yellow-dot-2"
				fill="#FFC91D"
				d="M40.6,32.5c0,1.5,1.3,2.8,2.8,2.8c1.5,0,2.8-1.3,2.8-2.8s-1.3-2.8-2.8-2.8 C41.8,29.7,40.6,31,40.6,32.5"
			/>
			<path
				className="purple-circle"
				fill="#7C02AF"
				d="M41.2,18.2c0-3.6,2.8-6.5,6.5-6.5s6.5,2.8,6.5,6.5s-2.8,6.5-6.5,6.5 C44.1,24.8,41.2,21.9,41.2,18.2 M43.8,18.2c0,2.2,1.8,3.9,3.9,3.9c2.1,0,3.9-1.8,3.9-3.9s-1.8-3.9-3.9-3.9 C45.5,14.3,43.8,16.1,43.8,18.2"
			/>
			<path
				className="red-dot-big"
				fill="#FC0808"
				d="M58.5,40c0,2.4,2,4.3,4.3,4.3c2.4,0,4.3-2,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3 C60.4,35.7,58.5,37.6,58.5,40"
			/>
			<path
				className="red-element"
				fill="#FC0808"
				d="M101.2,9.8c0.3,0.3,0.3,0.9,0,1.2l-2,2c-0.3,0.3-0.9,0.3-1.2,0s-0.3-0.9,0-1.2l2-2 C100.3,9.4,100.8,9.4,101.2,9.8z M99.1,2.3c-0.3-0.3-0.9-0.3-1.2,0c-0.3,0.3-0.3,0.9,0,1.2l2,2c0.3,0.3,0.9,0.3,1.2,0 c0.3-0.3,0.3-0.9,0-1.2L99.1,2.3z M109.9,6.7h-2.8c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9h2.8c0.5,0,0.9-0.4,0.9-0.9 C110.8,7.2,110.4,6.7,109.9,6.7z M103.3,10.7c-0.5,0-0.9,0.4-0.9,0.9v2.8c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9v-2.8 C104.2,11.1,103.8,10.7,103.3,10.7z M100.1,7.6c0-0.5-0.4-0.9-0.9-0.9h-2.8c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9h2.8 C99.7,8.5,100.1,8.1,100.1,7.6z M106.7,9.8c-0.3-0.3-0.9-0.3-1.2,0s-0.3,0.9,0,1.2l2,2c0.3,0.3,0.9,0.3,1.2,0s0.3-0.9,0-1.2 L106.7,9.8z M103.3,0c-0.5,0-0.9,0.4-0.9,0.9v2.8c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9V0.9C104.2,0.4,103.8,0,103.3,0z M106.6,5.4l2-2c0.3-0.3,0.3-0.9,0-1.2s-0.9-0.3-1.2,0l-2,2c-0.3,0.3-0.3,0.9,0,1.2C105.7,5.8,106.3,5.8,106.6,5.4z"
			/>
			<path
				className="yellow-dot-big"
				fill="#FFC91D"
				d="M127.2,17.8c1.6,0,2.8,1.3,2.8,2.8c0,1.6-1.3,2.8-2.8,2.8c-1.6,0-2.8-1.3-2.8-2.8 C124.3,19.1,125.6,17.8,127.2,17.8z"
			/>
			<path
				className="yellow-dot"
				fill="#FFC91D"
				d="M91.4,12.9c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S90.3,12.9,91.4,12.9z"
			/>
			<path
				className="red-dot"
				fill="#FC0808"
				d="M70.3,1.2c0.9,0,1.6,0.7,1.6,1.6s-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6S69.4,1.2,70.3,1.2z"
			/>
		</svg>
	);
};
