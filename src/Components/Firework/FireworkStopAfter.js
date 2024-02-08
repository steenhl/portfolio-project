import gsap from "gsap";

export const FireworkStopAfter = (fireworks, stopDelay, fireworkHasStopped) => {
	if (fireworkHasStopped.current) {
		fireworkHasStopped.current = false;
		const tl = gsap.timeline({});
		setTimeout(() => {
			// DOM Canvas
			let canvas = fireworks.canvas;
			tl.to(canvas, {
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					fireworks.stop();
					fireworkHasStopped.current = true;
					tl.to(canvas, {
						opacity: 1,
						duration: 0.1,
					});
				},
			});
		}, stopDelay);
	}
};
