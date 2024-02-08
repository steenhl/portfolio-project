import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { PagePagination } from "./pagePagination";

import sectionsData from "./data-panels";
import "./home.scss";

import galleryData from "./galleryData";

import { RmBackground } from "./RM/RmBackground";
import { RM } from "./RM/RM";
import { NightLandscape } from "./NightMoods/nightLandscape";
import { TechnologyList } from "./Technology/TechnologyList";
import { Panel } from "./Panels/Panel";
import { Contact } from "./Panels/Contact";
import { Gallery } from "./Gallery/Gallery";

import { Smile } from "../../Components/SVG/emojis/Smile";
import { Meh } from "../../Components/SVG/emojis/Meh";
import { Frown } from "../../Components/SVG/emojis/Frown";

// https://reactrouter.com/en/6.4.4/hooks/use-outlet-context
// import { useOutletContext } from "react-router-dom";
//let hasMaxWidth900 = useOutletContext();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export const Home = (ref) => {
	const main = useRef();
	const pages = useRef();
	const wrapper = useRef();

	// Pagination
	let [pageNumber, setPageNumber] = useState(1);
	let [numberOfPages, setNumberOfPages] = useState();

	// click on pagination get index
	const [onClickGetIndex, setOnClickGetIndex] = useState();
	useEffect(() => {
		if (onClickGetIndex !== undefined) {
			let index = onClickGetIndex.selected;
			let scrollTo = index * window.innerHeight;

			gsap.to(window, {
				scrollTo: { y: scrollTo, autoKill: false },
				duration: 0.5,
				onComplete: () => {},
				overwrite: true,
			});
		}
	}, [onClickGetIndex]);

	// dom ref
	const refPanelWrapper = useRef();

	const panel1 = useRef();
	useEffect(() => {
		panel1.current = refPanelWrapper.current.querySelector("#panel-1");
	}, []);

	// *** Start and stop timeline in child conponent ***/
	// NightLandscape
	let [panel1Play, setpanel1Play] = useState(false);
	// RM
	let [RmPlay, setRmPlay] = useState();
	// Likes
	let [likesPlay, setLikesPlay] = useState(false);
	// Gallery
	let [galleryPlay, setGalleryPlay] = useState(false);
	// Contact
	let [contactPlay, setContactPlay] = useState(false);
	// setRmPlay, setLikesPlay, setGalleryPlay, setContactPlay

	// get images
	const galleryImagesList = useRef([]);
	useLayoutEffect(() => {
		if (galleryImagesList.current.length === 0) {
			galleryData.forEach((data) => {
				galleryImagesList.current.push(
					<img src={require("../../" + data.src + ".jpg")} alt={data.header} id={`gallery${data.id}`} />
				);
			});
		}
	}, []);

	// Emojis
	const svgEmoji = useRef([<Smile id="smile" />, <Meh id="meh" />, <Frown id="frown" />]);

	// insert SVG icon into the active panel (on load)
	function renderIcon(icon) {
		// console.log(icon);
		if (icon === "NightLandscape") {
			return <NightLandscape panel1Play={panel1Play} />;
		}
		if (icon === "RM") {
			return <RM RmPlay={RmPlay} />;
		}
		if (icon === "Gallery") {
			return <Gallery play={galleryPlay} images={galleryImagesList} delayTime="5" fadeTime="3" id="teaser-gallery" />;
		}
		if (icon === "Likes") {
			return <Gallery play={likesPlay} images={svgEmoji} delayTime="5" fadeTime="3" id="teaser-gallery-likes" />;
		}
	}
	// insert TechnologyList into the active panel (on load)
	function renderTechnologyList(sectionData) {
		if (sectionData.id === "panel-1") {
			return <TechnologyList Technology={sectionData.list} play={panel1Play} activePanel={activePanel} />;
		}
		if (sectionData.id === "panel-2") {
			return <TechnologyList Technology={sectionData.list} play={galleryPlay} activePanel={activePanel} />;
		}
		if (sectionData.id === "panel-3") {
			return <TechnologyList Technology={sectionData.list} play={RmPlay} activePanel={activePanel} />;
		}
		if (sectionData.id === "panel-4") {
			return <TechnologyList Technology={sectionData.list} play={likesPlay} activePanel={activePanel} />;
		}
		if (sectionData.id === "panel-5") {
			return <TechnologyList Technology={sectionData.list} play={contactPlay} activePanel={activePanel} />;
		}
	}

	function renderSvgBackground(icon) {
		if (icon === "RM") {
			// background animation of stars
			return <RmBackground playStars={RmPlay} />;
		}
	}

	const activeAnimationPanel = (activePanel) => {
		// Panel-1: nightLandscape
		if (activePanel === 1) {
			setpanel1Play(true);
		} else {
			setpanel1Play(false);
		}
		// Panel-2: Gallery
		if (activePanel === 2) {
			setGalleryPlay(true);
		} else {
			setGalleryPlay(false);
		}
		// Panel-3: Rick and Morthy
		if (activePanel === 3) {
			setRmPlay(true);
		} else {
			setRmPlay(false);
		}
		// Panel-4 : Likes
		if (activePanel === 4) {
			setLikesPlay(true);
		} else {
			setLikesPlay(false);
		}
		// Panel-5 : Contact
		if (activePanel === 5) {
			setContactPlay(true);
		} else {
			setContactPlay(false);
		}
	};

	const [panels, setPanels] = useState();
	const [activePanel, setActivePanel] = useState(1);
	// scroll interval
	useLayoutEffect(() => {
		const body = document.querySelector("body");
		// create
		let mm = gsap.matchMedia(),
			breakPoint = 900;
		mm.add(
			{
				// set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
				isDesktop: `(min-width: ${breakPoint}px)`,
				isMobile: `(max-width: ${breakPoint - 1}px)`,
			},
			(context) => {
				// context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
				let { isDesktop, isMobile } = context.conditions;

				if (isDesktop) {
					//console.log("START");
					const panels = gsap.utils.toArray(".panel");
					pages.current = panels;
					setPanels(pages);
					setNumberOfPages(panels.length);

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
								setActivePanel(e.index + 1);
							}
						});
					};

					ScrollTrigger.create({
						start: 0,
						end: "max",
						snap: 1 / (panels.length - 1),
						onUpdate: (e) => {
							//console.log(e);
							panelIsActive(e);
						},
						onRefreshInit: (e) => {
							// on load
							panelIsActive(e);
						},
					});

					if (body.classList.contains("mobil")) {
						body.classList.remove("mobil");
					}
					body.classList.add("disktop");
				} else if (isMobile) {
					setNumberOfPages(undefined);
					// play the list of frontend technology
					setpanel1Play(true);
					setRmPlay(true);
					setLikesPlay(true);
					setGalleryPlay(true);
					setContactPlay(true);

					if (body.classList.contains("disktop")) {
						body.classList.remove("disktop");
					}
					body.classList.add("mobil");
				}
				return () => {
					// optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
					// it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
				};
			}
		);

		return () => {
			mm.revert();
			ScrollTrigger.getAll().forEach((ST) => {
				// console.log(ST);
				ST.kill();
			});
		};
	}, []);

	return (
		<div ref={wrapper} className="home-wrapper back-ground-black">
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
				<div className="home-article-panel-wrapper panel-wrapper-level1" ref={refPanelWrapper}>
					{/* panels */}
					{sectionsData &&
						sectionsData.map((sectionData, index) => {
							// All panel exsept the last one
							if (index < sectionsData.length - 1) {
								return (
									<Panel
										sectionData={sectionData}
										renderTechnologyList={renderTechnologyList}
										renderIcon={renderIcon}
										key={sectionData.id}
										renderSvgBackground={renderSvgBackground}
										// setThisClick={setThisClick}
									>
										{index === 0 && (
											<section>
												{/* <div className="panel-background"></div> */}
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
										)}
									</Panel>
								);
							} else {
								// Last panel
								return (
									// sectionData, renderTechnologyList, renderIcon
									<Contact
										sectionData={sectionData}
										renderTechnologyList={renderTechnologyList}
										renderIcon={renderIcon}
										key={sectionData.id}
									></Contact>
								);
							}
						})}
				</div>
			</main>
		</div>
	);
};
