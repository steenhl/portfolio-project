import { Fireworks } from "fireworks-js";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FireworkStopAfter } from "./FireworkStopAfter";

export const FireworksModel = (containerRef, setThisFirework, thisFirework, stopDelay, fireworkHasStopped) => {
	let fireworksTl = useRef();
	useEffect(() => {
		fireworksTl.current = gsap.timeline({});
	}, []);

	useEffect(() => {
		// console.log(containerRef);
		// console.log(setThisFirework);
		// console.log(thisFirework);
		// console.log(stopDelay);
		// console.log(fireworkHasStopped);
		if (containerRef.current !== undefined && setThisFirework) {
			if (thisFirework !== undefined) {
				thisFirework.clear();
			} else {
				let container = containerRef.current;
				// console.log(container);
				let f = new Fireworks(container, {
					autoresize: true,
					opacity: 0.3,
					acceleration: 1,
					friction: 0.97,
					gravity: 1.5,
					particles: 50,
					trace: 3,
					traceSpeed: 10,
					explosion: 5,
					intensity: 8,
					flickering: 20,
					lineStyle: "round",
					hue: { min: 0, max: 220 },
					delay: { min: 15, max: 30 },
					rocketsPoint: { min: 50, max: 50 },
					lineWidth: {
						explosion: { min: 1, max: 3 },
						trace: { min: 1, max: 2 },
					},
					brightness: { min: 50, max: 80 },
					decay: { min: 0.015, max: 0.03 },
					mouse: { click: true, move: false, max: 2 },
				});

				f.canvas.id = "canvas-fireworks";
				setThisFirework(f);
				if (stopDelay !== undefined && fireworksTl.current !== undefined) {
					FireworkStopAfter(f, 7000, fireworkHasStopped);
				}
			}
		}
	}, [containerRef, fireworkHasStopped, setThisFirework, stopDelay, thisFirework]);
};
