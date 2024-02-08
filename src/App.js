// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect } from "react";

// import "../src/pages/Home/main.scss";
import "../src/Pages/home/main.scss";
import "./_variables.scss";
import "./App.scss";
import "./fonts/fontFace.css";
// import { Naviagtion } from "./Naviagtion/navigation";
// test git 2
import { Router } from "./router/router";

export default function App() {
	// let body = document.querySelector("body");
	// useEffect(() => {
	// 	console.log(body.style.paddingRight);
	// 	console.log(body.style.overflow);
	// });

	return (
		<div className='App'>
			<Router />
		</div>
	);
}
