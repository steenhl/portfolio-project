import { useRef, useEffect } from "react";
import dataLink from "../data-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const InternalNavigation = (props) => {
	let scrollTween = useRef(null);
	const navInt = useRef(null);

	gsap.registerPlugin(ScrollTrigger);

	// const { activeAnimationPanel, setScrollTrigger, panels } = props;
	const { activeAnimationPanel, scrollTrigger, panels } = props;

	useEffect(() => {
		if (panels !== undefined) {
			const internalNav = navInt.current;
			const internalLinks = [...internalNav.querySelectorAll("a")];
			// set the active navigations link first time
			setActiveLink(internalLinks[0], internalLinks);
			// set the active animations panel the first time
		}
	}, [panels]);

	useEffect(() => {
		if (activeAnimationPanel && panels !== undefined) {
			const internalNav = navInt.current;
			const internalLinks = [...internalNav.querySelectorAll("a")];
			// console.log(panels);
			// console.log(activeAnimationPanel);
			// console.log(scrollTrigger);

			// rewrite to props
			// const panelWrapper = refPanelWrapper.current;
			// const panels = [...panelWrapper.querySelectorAll(".panel")];

			// set the active navigations link first time
			//setActiveLink(internalLinks[0], internalLinks);
			// set the active animations panel the first time
			//activeAnimationPanel(panels[0]);

			let panelIncrement = panels.reduce((prev, current, index) => {
				// calculate the decimal number for each panel, in relation to the entire scroll animation's length
				let scrollTweenFagment = Number(((1 / (panels.length - 1)) * index).toFixed(3));
				return [...prev, { interval: scrollTweenFagment, panel: current, index: index, active: false }];
			}, []);

			const panelIsActive = (e) => {
				let n = parseFloat(e.progress.toFixed(2));
				panelIncrement.forEach((e) => {
					// find the active panel
					// only fire ones when active
					if (e.interval === n && !e.active) {
						e.active = true;
						setActiveLink(internalLinks[e.index], internalLinks);
						activeAnimationPanel(e.panel);
					} else if (e.interval !== n) {
						e.active = false;
					}
				});
			};
			let s1 = ScrollTrigger.create({
				start: 0,
				trigger: panels,
				end: "max",
				snap: {
					snapTo: 1 / (panels.length - 1),
					// or "labels" or function or Array
					duration: 0.5,
					directional: true,
					ease: "power3",
				},
				onUpdate: (e) => {
					panelIsActive(e);
				},
			});
			scrollTrigger.current = s1;

			// cleanup function will be called when component is removed
			return () => {
				s1.kill();
			};
		}
	}, [activeAnimationPanel, panels, scrollTrigger]);

	const setActiveLink = (link, links) => {
		const duration = 0.2;
		links.forEach((el) => {
			gsap.to(el, {
				duration: duration,
				color: "black",
			});
		});
		gsap.to(link, {
			duration: duration,
			color: "white",
		});
	};
	const goToSection = (index) => {
		let scrollTo = index * window.innerHeight;
		let thisS = gsap.to(window, {
			scrollTo: { y: scrollTo, autoKill: false },
			duration: 0.5,
			onComplete: () => (scrollTween.current = null),
			overwrite: true,
		});
		scrollTween.current = thisS;
	};
	const goToLink = (e, index) => {
		e.preventDefault();
		goToSection(index, navInt.current.querySelectorAll("a"));
	};

	return (
		<nav className="internal-nav front-page" ref={navInt}>
			<ul>
				{dataLink &&
					dataLink.map((link, index) => {
						return (
							<li key={link.id}>
								<a href={link.linkHref} onClick={(e) => goToLink(e, index)}>
									<span className="internal-nav__span-circle"></span>
									<span className="internal-nav__span-text">{link.linkText}</span>
								</a>
							</li>
						);
					})}
			</ul>
		</nav>
	);
};
