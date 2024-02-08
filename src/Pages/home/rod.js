import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./home.scss";

export const Home = () => {
	gsap.registerPlugin(ScrollTrigger);
	const ref = useRef();

	useEffect(() => {
		const panels = gsap.utils.toArray(".panel");

		ScrollTrigger.create({
			start: 0,
			trigger: panels,
		});

		ScrollTrigger.create({
			snap: 1 / 4,
		});
		return () => {
			ScrollTrigger.getAll().forEach((instance) => {
				instance.kill();
			});
			ScrollTrigger.killAll();
			// This in case a scroll animation is active while the route is updated
			gsap.killTweensOf(window);
		};
	}, []);
	return (
		<div className="main-home" ref={ref}>
			<section className="panel">
				<h2>
					Homer: <em>ScrollTrigger</em>
				</h2>
				<p>section 1</p>
			</section>
			<section className="panel">
				<p>section 2</p>
			</section>
			<section className="panel">
				<p>section 3</p>
			</section>
			<section className="panel">
				<p>section 4</p>
			</section>
			<section className="panel">
				<p>section 5</p>
			</section>
		</div>
	);
};

// useLayoutEffect(()=>{
//     let ctx = gsap.context(() => {
//     },[wrapper])
//     return () => {
// 		ctx.revert();
// 	};
// })

return (
	<div ref={wrapper}>
		<header className="header-intern-nav">
			{panels && numberOfPages !== undefined && (
				<PagePagination
					pageCount={numberOfPages}
					setOnClickGetIndex={setOnClickGetIndex}
					// state: change which page / panel is active
					setPageNumber={setPageNumber}
					pageNumber={pageNumber}
				></PagePagination>
			)}
		</header>
		<main ref={main} className="main">
			<section className="description panel blue" id="s1">
				<div>
					<h1>Layered pinning</h1>
					<p>ONE.</p>
					<div className="scroll-down">
						Scroll down<div className="arrow"></div>
					</div>
				</div>
			</section>
			<section className="panel red" id="s2">
				Two
			</section>
			<section className="panel orange" id="s3">
				THREE
			</section>
			<section className="panel purple" id="s4">
				FOUR
			</section>
			<section className="panel green" id="s5">
				FIVE
			</section>
		</main>
	</div>
);

const activeAnimationPanel = (activePanel) => {
	// setActivePanel(activePanel);
	// activePanelTest.current = activePanel;

	// Panel-1: nightLandscape
	if (activePanel.id === "panel-1") {
		setpanel1Play(true);
	} else {
		setpanel1Play(false);
	}
	// Panel-2: Rick and Morthy
	if (activePanel.id === "panel-2") {
		setRmPlay(true);
	} else {
		setRmPlay(false);
	}
	// Panel-3 : Likes
	if (activePanel.id === "panel-3") {
		setLikesPlay(true);
	} else {
		setLikesPlay(false);
	}
	// Panel-4 : Gallery
	if (activePanel.id === "panel-4") {
		setGalleryPlay(true);
	} else {
		setGalleryPlay(false);
	}
	// Panel-5 : Contact
	if (activePanel.id === "panel-5") {
		setContactPlay(true);
	} else {
		setContactPlay(false);
	}
};

import { useEffect, useRef, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { Info } from "react-bootstrap-icons";
import gsap from "gsap";
import "../../Pages/home/infobuttons.scss";

export const InforSLider = (props) => {
	let {
		wrapperClassName = "",
		activePanel,
		thisFirework,
		setInforsliderIsActive,
		siteLoad,
		setSiteLoad,
		panelScrollTriggerRef,
	} = props;

	// ref
	const collapseRef = useRef();
	const infoWrapperRef = useRef();
	const toggleButtonRef = useRef();
	const fadeBackgroundRef = useRef();
	const cardBodyRef = useRef();
	const bodyRef = useRef(document.body);
	const htmlRef = useRef(document.querySelector("html"));
	// state
	const [tl, setTl] = useState();
	const [active, setActive] = useState(false);
	// class names var
	const lockScrollBarsClass = "lock-scroll-bars";

	// lock scrollBras on load and create a timeline
	useEffect(() => {
		//setActive(true);
		setTl(gsap.timeline({}));
	}, []);

	useEffect(() => {
		console.log("reflow");
	});

	useEffect(() => {
		if (tl !== undefined) {
			const collapse = collapseRef.current;
			const fadeBackground = fadeBackgroundRef.current;
			const toggleButton = toggleButtonRef.current;
			const body = bodyRef.current;
			const html = htmlRef.current;
			const lightboxClass = "lightbox-show";
			const infoWrapper = infoWrapperRef.current;
			const cardBody = cardBodyRef.current;
			const toggleButtonBackgroundColor = window.getComputedStyle(toggleButton).backgroundColor;
			const hideLightBox = () => {
				setInforsliderIsActive(false);
				// console.log("hideLightBox");
				body.classList.remove(lockScrollBarsClass);
				html.classList.remove(lockScrollBarsClass);
				//scrollTrigger.enable();
				//panelScrollTriggerRef.current.enable();
				tl
					.to(fadeBackground, {
						opacity: 0,
						duration: 0.5,
						onComplete: () => {
							fadeBackground.classList.add("hide");
						},
					})
					.set(fadeBackground, {
						display: "none",
					});
				tl
					.set(toggleButton, {
						display: "block",
					})
					.to(toggleButton, {
						backgroundColor: "coral",
						duration: 0.5,
					})
					.to(toggleButton, {
						backgroundColor: toggleButtonBackgroundColor,
						duration: 0.5,
					});
				infoWrapper.classList.remove(lightboxClass);
			};
			const showLightBox = () => {
				setInforsliderIsActive(true);
				// console.log("showLightBox");
				fadeBackground.classList.remove("hide");
				//scrollTrigger.disable();
				//panelScrollTriggerRef.current.disable();
				//panelScrollTriggerRef.current.disable()
				body.classList.add(lockScrollBarsClass);
				html.classList.add(lockScrollBarsClass);
				infoWrapper.classList.add(lightboxClass);
				tl.set(toggleButton, {
					//display: "none",
				});
				tl.set(cardBody, {});
				//collapse-horizontal
				tl.set(fadeBackground, {
					display: "block",
					opacity: 0,
				});
				tl.to(fadeBackground, {
					opacity: 0.4,
					duration: 0.5,
				});
			};
			// only show lightBox first time, without click
			if (siteLoad) {
				//showLightBox();
			}
			const handelLightBox = (evt) => {
				// show lightBox

				if (evt.type === "show.bs.collapse") {
					showLightBox();
				}
				// Hide lightBox
				else {
					//setSiteLoad(false);
					hideLightBox();
				}
			};
			console.log(active);
			if (active === false) {
				setActive(true);
				console.log("load");
				console.log("show lightBox");
				toggleButton.addEventListener("show.bs.collapse", handelLightBox.bind(this));
				toggleButton.addEventListener("hidden.bs.collapse", handelLightBox.bind(this));

				collapse.addEventListener("hidden.bs.collapse", handelLightBox.bind(this));
				collapse.addEventListener("show.bs.collapse", handelLightBox.bind(this));
			}
			// clearUp
			return () => {
				tl.kill();
				console.log("unload");
				toggleButton.removeEventListener("show.bs.collapse", handelLightBox.bind(this));
				toggleButton.removeEventListener("hidden.bs.collapse", handelLightBox.bind(this));
				collapse.removeEventListener("hidden.bs.collapse", handelLightBox);
				collapse.removeEventListener("show.bs.collapse", handelLightBox);
			};
		}
		// tl, collapseRef, infoWrapperRef, fadeBackgroundRef, cardBodyRef
	}, [
		tl,
		collapseRef,
		infoWrapperRef,
		fadeBackgroundRef,
		cardBodyRef,
		active,
		setInforsliderIsActive,
		setSiteLoad,
		siteLoad,
		panelScrollTriggerRef,
	]);

	// const showLightBox = useRef(true);
	// const showLightBox = useRef(false);
	// useEffect(() => {
	// 	// init activate lightBox
	// 	// // console.log(activePanel);

	// 	if (activePanel !== undefined && thisFirework !== undefined) {
	// 		if (activePanel.id === "panel-1" && showLightBox.current === true && toggleButtonRef.current !== undefined) {
	// 			showLightBox.current = false;
	// 			//toggleButtonRef.current.click();
	// 			setTimeout(() => {
	// 				thisFirework.stop();
	// 			}, 300);
	// 		}
	// 	}
	// }, [activePanel, thisFirework]);

	return (
		<div className={wrapperClassName + " info-wrapper"} ref={infoWrapperRef}>
			<button
				className="px-2 py-2 btn btn-secondary info-wrapper__firstbutton"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapsedInfor"
				aria-expanded="true"
				aria-controls="collapsedInfor"
				ref={toggleButtonRef}
			>
				<Info size={25} />
			</button>
			<div className="collapse collapse-horizontal" id="collapsedInfor" ref={collapseRef}>
				<div className="card card-body" ref={cardBodyRef}>
					<div className="gap-2 d-flex justify-content-end">
						<button
							className="px-2 pt-1 pb-1.5 btn btn-secondary info-wrapper__sccondbutton"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapsedInfor"
							aria-expanded="true"
							aria-controls="collapsedInfor"
						>
							<XLg />
						</button>
					</div>
					<article>{props.children}</article>
				</div>
			</div>
			{/* <div
				className="fade-background hide"
				ref={fadeBackgroundRef}
				data-bs-toggle="collapse"
				data-bs-target="#collapsedInfor"
				style={{ opacity: 0.4 }}
			></div> */}
		</div>
		// <div className={wrapperClassName + " info-wrapper lightbox-show"} ref={infoWrapperRef}>
		// 	<button
		// 		className="px-2 py-2 btn btn-secondary info-wrapper__firstbutton collapsed"
		// 		type="button"
		// 		data-bs-toggle="collapse"
		// 		data-bs-target="#collapsedInfor"
		// 		aria-expanded="true"
		// 		aria-controls="collapsedInfor"
		// 		ref={toggleButtonRef}
		// 	>
		// 		<Info size={25} />
		// 	</button>
		// 	<div
		// 		// className={`collapse collapse-horizontal ${siteLoad === true ? "show" : ""}`}
		// 		className={`collapse collapse-horizontal`}
		// 		id="collapsedInfor"
		// 		ref={collapseRef}
		// 	>
		// 		{/* <div className="collapse collapse-horizontal  show" id="collapsedInfor" ref={collapseRef}> */}
		// 		<div className="card card-body" ref={cardBodyRef}>
		// 			<div className="gap-2 d-flex justify-content-end">
		// 				<button
		// 					className="px-2 pt-1 pb-1.5 btn btn-secondary info-wrapper__sccondbutton"
		// 					type="button"
		// 					data-bs-toggle="collapse"
		// 					data-bs-target="#collapsedInfor"
		// 					aria-expanded="true"
		// 					aria-controls="collapsedInfor"
		// 				>
		// 					<XLg />
		// 				</button>
		// 			</div>
		// 			<article>{props.children}</article>
		// 		</div>
		// 	</div>
		// 	<div
		// 		className="fade-background hide"
		// 		ref={fadeBackgroundRef}
		// 		data-bs-toggle="collapse"
		// 		data-bs-target="#collapsedInfor"
		// 		style={{ opacity: 0.4 }}
		// 	></div>
		// </div>
	);
};

// TEST scrollTrigger mobil
useLayoutEffect(() => {
	let mm = gsap.matchMedia(),
		breakPoint = 900;
	mm.add(
		{
			// set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
			isDesktop: `(min-width: ${breakPoint}px)`,
			isMobile: `(max-width: ${breakPoint - 1}px)`,
		},
		(context) => {
			let { isMobile } = context.conditions;

			if (isMobile) {
				console.log(main.current);
				// panels.forEach((panel, i) => {
				ScrollTrigger.create({
					trigger: main.current,
					start: 0,
					end: "max",
					onUpdate: (e) => {
						//panelIsActive(e);
						//console.log(e);
					},
				});
				const panels = gsap.utils.toArray(".panel");

				//** OBJ interval **/
				let panelIncrement = panels.reduce((prev, current, index) => {
					// calculate the decimal number for each panel, in relation to the entire scroll animation's length
					let fregment = Number((1 / (panels.length - 1)).toFixed(3));
					let scrollTweenFagment = fregment * index.toFixed(3);
					let activeInterval = {};
					// first
					if (index === 0) {
						let startVAl = 0;
						let endVAl = fregment - fregment / 2;
						activeInterval = { start: startVAl, end: endVAl };
					}
					if (index === 1) {
						prev.fregment = scrollTweenFagment;
					}
					// between start and end
					if (index > 0 && index <= panels.length - 1) {
						let startVAl = scrollTweenFagment - fregment / 2;
						let endVAl = scrollTweenFagment + fregment / 2;
						activeInterval = { start: startVAl, end: endVAl };
					}

					// last
					if (index === panels.length - 1) {
						activeInterval = { start: scrollTweenFagment - fregment / 2, end: 1 };
					}

					return [
						...prev,
						{
							index: index,
							active: false,
							interval: scrollTweenFagment,
							scrollTweenFagment,
							fregment,
							activeInterval,
							panel: current,
						},
					];
				}, []);

				//* find the active panel */
				const panelIsActive = (e) => {
					let progress = parseFloat(e.progress.toFixed(2));

					panelIncrement.forEach((e, i) => {
						if (e.activeInterval.start <= progress && progress < e.activeInterval.end && e.active === false) {
							// panel is active (e.active)
							e.active = true;
							// panel is not active (e.active)
							panelIncrement.forEach((elm, index) => {
								if (index !== i) {
									elm.active = false;
								}
							});
							setPageNumber(e.index + 1);
							activeAnimationPanel(e.index + 1);
						}
					});
				};
			}
			return () => {
				// optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
				// it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
			};
		}
	);
	// console.log(inforsliderIsActive);
	// let ctx = gsap.context(() => {
	// 	// const panels = gsap.utils.toArray(".panel");
	// 	console.log(main.current);
	// 	// panels.forEach((panel, i) => {
	// 	ScrollTrigger.create({
	// 		trigger: main.current,
	// 		start: 0,
	// 		end: "max",
	// 		onUpdate: (e) => {
	// 			console.log(e);
	// 		},
	// 	});
	// 	// });
	// }, main);
	// return () => {
	// 	console.log("Revert unload");
	// 	ctx.revert();
	// };
}, [inforsliderIsActive]);

if (index === 0) {
	return (
		<section
			className={sectionData.class + " panel panel-link"}
			id={sectionData.id}
			key={sectionData.class}
			onClick={(e) => setThisClick(e)}
			ref={fireworksRef}
		>
			{sectionData.svg && (
				<div className="svg-wrapper-background-frontpage z-2">{sectionData.svg && renderIcon(sectionData.svg)}</div>
			)}

			<div className="panel-wrapper">
				{/* left side  */}
				<div className="panel-wrapper__section-one">
					{/* <article className="panel-wrapper__section-one__header-wrapper article-wrapper" ref={panel01Header}>
						<div className="panel-wrapper__section-one__header-wrapper__inner-wrapper article-inner-wrapper">
							<header className="panel-wrapper__section-one__header-wrapper__inner-wrapper__header">
								{sectionData.header && <h2 className="header-level1"> {sectionData.header}</h2>}
								{sectionData.subheading && <h3 className="header-level1">{sectionData.subheading}</h3>}
							</header>
							{sectionData.p && <p>{sectionData.p}</p>}
						</div>
					</article> */}
				</div>
				<div className="panel-wrapper__section-two">
					<section className="explanation">
						<h2>Animation</h2>
						<p>
							<strong>Animation, video og bevægelse</strong> er nogen af de stærkeste virkemidler vi kan bruge i et
							kommunikationsflow og et vigtigt værktøj i enhver markedsføring.
						</p>
						<p>
							<strong>På forsiden</strong> har jeg udforsket Animations frameworket GSAP, som stort set kan animere alt.
						</p>
						<p>
							<strong>Siden er opdel i en række sectioner,</strong> som hver især formidler en stemning gennem grafik og
							animation.
						</p>
						<p>
							<strong>Nogen af sectionerne har link</strong> til projekter som jeg har skabt gennem tiden og der kommer løbende
							flere til
						</p>
						<h3>Frontend teknologi</h3>
						<TechnologyList Technology={sectionData.list} play={true} activePanel={activePanel} />
					</section>
				</div>
			</div>

			{/* <article className="article-wrapper" ref={panel01Header}>
				<div className="article-inner-wrapper">
					<header>
						{sectionData.header && <h2 className="header-level1"> {sectionData.header}</h2>}
						{sectionData.subheading && <h3 className="header-level1">{sectionData.subheading}</h3>}
					</header>
					{sectionData.p && <p>{sectionData.p}</p>}
				</div>
				<InforSLider setInforsliderIsActive={setInforsliderIsActive} siteLoad={siteLoad}>
					<h2>Animation</h2>
					<p>
						<strong>Animation, video og bevægelse</strong> er nogen af de stærkeste virkemidler vi kan bruge i et
						kommunikationsflow og et vigtigt værktøj i enhver markedsføring.
					</p>
					<p>
						<strong>På forsiden</strong> har jeg udforsket Animations frameworket GSAP, som stort set kan animere alt.
					</p>
					<p>
						<strong>Siden er opdel i en række sectioner,</strong> som hver især formidler en stemning gennem grafik og
						animation.
					</p>
					<p>
						<strong>Nogen af sectionerne har link</strong> til projekter som jeg har skabt gennem tiden og der kommer
						løbende flere til
					</p>
					<h3>Frontend teknologi</h3>
					<TechnologyList Technology={sectionData.list} play={true} activePanel={activePanel} />
				</InforSLider>
			</article> */}

			<div className="panel-background"></div>
			<div className="scrolldown-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="currentColor"
					className="bi bi-chevron-down"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</div>
		</section>
	);
}

// list: {
// 	header: "Frontend teknologi",
// 	className: "fp-technology-list-wrapper",
// 	items: [
// 		{ id: "FR01", text: "GSAP", class: "fr-list-item" },
// 		{ id: "FR02", text: "React", class: "fr-list-item" },
// 		{ id: "FR03", text: "Bootstrap", class: "fr-list-item" },
// 		{ id: "FR04", text: "react-router-dom", class: "fr-list-item" },
// 		{ id: "FR05", text: "lodash", class: "fr-list-item" },
// 		{ id: "FR06", text: "Scroll triggers", class: "fr-list-item" },
// 		{ id: "FR07", text: "SCSS", class: "fr-list-item" },
// 		{ id: "FR08", text: "typescript", class: "fr-list-item" },
// 	],
// },
