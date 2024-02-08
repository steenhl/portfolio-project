import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

const Birds = (props) => {
	const [vantaEffect, setVantaEffect] = useState(0);
	const myRef = useRef(null);
	useEffect(() => {
		if (!vantaEffect) {
			// console.log(THREE);
			setVantaEffect(
				BIRDS({
					// THREE: THREE,
					el: myRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					backgroundColor: 0x80834,
					birdSize: 0.9,
					wingSpan: 12.0,
					speedLimit: 4.0,
					separation: 19.0,
					alignment: 45.0,
					cohesion: 74.0,
					quantity: 2.1,
					backgroundAlpha: 0.0,
				})
			);
		}
		return () => {
			if (vantaEffect) {
				vantaEffect.destroy();
			}
		};
	}, [vantaEffect]);
	return (
		<div className="birds-wrapper" ref={myRef}>
			{props.children}
		</div>
	);
};
export default Birds;
