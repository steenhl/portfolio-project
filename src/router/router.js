import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "../Pages/home/home";
import Gallery from "../Pages/gallery/Gallery";
import Rm from "../Pages/Rick-and-Morty/index";
import Vote from "../Pages/Vote/vote";
// import { About } from "../Pages/about/about.js";
import { Layout } from "../Layout/Layout";

// import { MainNavigation } from "../Navigation/MainNavigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Router = (props) => {
	// let [] = useOutletContext();
	// console.log(useOutletContext);
	// const [count, setCount] = useOutletContext();
	// const [hasMaxWidth900, setHasMaxWidth] = useOutletContext();

	// useEffect(() => {
	// 	console.log(hasMaxWidth900);
	// }, [hasMaxWidth900]);

	//which page is active
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);

	const frontPageScrollTrigger = useRef(null);

	// useEffect(() => {
	// 	//if (frontPageScrollTrigger !== undefined) {
	// 	console.log(frontPageScrollTrigger);
	// 	// }
	// });

	// the page changes
	useEffect(() => {
		if (location !== displayLocation) {
			ScrollTrigger.getAll().forEach((ST) => {
				ST.kill();
			});
			setDisplayLocation(location);
		}
		// console.log(displayLocation);
	}, [location, displayLocation]);

	// const [siteLoad, setSiteLoad] = useState(true);

	// useEffect(() => {
	// 	setSiteLoad(false);
	// 	return () => {
	// 		setSiteLoad(true);
	// 		//console.log("site cleanUp");
	// 	};
	// }, [siteLoad]);

	let siteLoad = useRef(true);

	const NoMatch = () => {
		return <p>Top side: 404!</p>;
	};
	const mainWrapper = useRef(null);
	const body = useRef(document.querySelector("body"));

	// useEffect(() => {
	// 	console.log(location);
	// }, [location]);

	useEffect(() => {
		if (location.pathname === "/Gallery") {
			mainWrapper.current.className = "gallery-main-wrapper";
		} else {
			if (mainWrapper.current.classList.contains("gallery-main-wrapper")) {
				mainWrapper.current.classList.remove("gallery-main-wrapper");
			}
			if (body.current.classList.contains("locked")) {
				body.current.classList.remove("locked");
			}
		}
	}, [location]);

	return (
		<div id="main-wrapper" ref={mainWrapper}>
			<main id="main">
				<Routes location={displayLocation}>
					<Route exact path="/" element={<Layout />}>
						<Route exact index element={<Home title="home" siteLoad={siteLoad} id={"home"} />}></Route>
						<Route
							exact
							path="/Gallery"
							element={<Gallery title="Gallery" frontPageScrollTrigger={frontPageScrollTrigger} id={"gallery"} />}
						></Route>
						<Route exact path="/RM" element={<Rm title="Rick and morty" />}></Route>
						<Route exact path="/Vote" element={<Vote title="Vote" />}></Route>
						{/* <Route exact path="/About" element={<About title="About" />}></Route> */}
						<Route path="*" element={<NoMatch />} />
					</Route>
				</Routes>
			</main>
		</div>
	);
};
