import React, { useRef, useLayoutEffect } from "react";
import "./main.scss";
import gsap from "gsap";


type GalleryProps =	{
	play:boolean,
	data: [],
	delayTime:string,
	fadeTime:string,
}

type mapData={
	id:string,
	src:string,
	header:string,
	paragraf:string
}


const Gallery02 = ({ play, data, delayTime, fadeTime }: GalleryProps) => {
// const Gallery02: React.FC<GalleryPropsInterface> = () => {
//const Gallery02 = ({ play, data, delayTime, fadeTime }:GalleryProps) => {
	
	const imagesWrapper = useRef<HTMLElement>(null)
	let images 	=useRef<[]>(null)

	// const t = useRef(ReturnType<typeof gsap> | null)
	// let t: ReturnType<typeof gsap> | null;
	let stopAni = useRef<GSAP>(null);

	const inputRef = useRef<HTMLInputElement>(null)
	
	useLayoutEffect(() => {
		if (imagesWrapper.current !== null && play && stopAni.current === undefined) {
			// let images = [...imagesWrapper.current.querySelectorAll("figure")];
			//images = [...Array.from(imagesWrapper.current.querySelectorAll("figure"))];

			// start the crossfade after delayTime = xxx sec
			//gsap.delayedCall(delayTime, crossfade);
		}
		// function crossfade() {
		// 	gsap.set(images[0], { autoAlpha: 1 });
		// 	gsap
		// 		.timeline()
		// 		.to(images[0], { autoAlpha: 0, duration: fadeTime })
		// 		.to(images[1], { autoAlpha: 1, duration: fadeTime }, 0);

		// 	images.push(images.shift());
		// 	// start endless run
		// 	stopAni.current = gsap.delayedCall(delayTime, crossfade);
		// }

		// stop
		// if (play === false && stopAni.current !== undefined) {
		// 	stopAni.current.pause();
		// } else if (play === true && stopAni.current !== undefined) {
		// 	stopAni.current.play();
		// }
	}, [delayTime, fadeTime, play]);
	
	return (
		<section ref={imagesWrapper}>
			{data &&
				data.map((thisData:mapData) => {
					return (
						<figure key={thisData.id} id={thisData.id}>
							<img src={require("../../../" + thisData.src + ".jpg")} alt={thisData.header} />
							<figcaption>{thisData.paragraf}</figcaption>
						</figure>
					);
				})}
		</section>
	);
};
export default Gallery02;