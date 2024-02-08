import { useEffect, useRef, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { Info } from "react-bootstrap-icons";
import gsap from "gsap";
import "../../Pages/home/infobuttons.scss";
export const InforSLider = (props) => {
	// setInforsliderIsActive, siteLoad, setSiteLoad
	let { wrapperClassName = "", setInforsliderIsActive, siteLoad } = props;
	// ref
	const collapseRef = useRef();
	const infoWrapperRef = useRef();
	const toggleButtonRef = useRef();
	const fadeBackgroundRef = useRef();
	const cardBodyRef = useRef();
	const bodyRef = useRef(document.body);
	const htmlRef = useRef(document.querySelector("html"));
	const thisTl = useRef(gsap.timeline({}));

	let lightboxShowClass = useRef("lightbox-show");
	let showClass = useRef("show");
	// class names var
	const lockScrollBarsClass = "lock-scroll-bars";
	// lock scrollBras on load and create a timeline

	useEffect(() => {
		let tl = thisTl.current;
		// console.log(siteLoad.current);
		// console.log(thisTl.current);
		// if (tl !== undefined) {
		const collapse = collapseRef.current;
		const fadeBackground = fadeBackgroundRef.current;
		const toggleButton = toggleButtonRef.current;
		const body = bodyRef.current;
		const html = htmlRef.current;
		const lightboxClass = "lightbox-show";
		const infoWrapper = infoWrapperRef.current;
		const cardBody = cardBodyRef.current;
		const toggleButtonBackgroundColor = window.getComputedStyle(toggleButton).backgroundColor;
		console.log(toggleButtonBackgroundColor);

		const hideLightBox = () => {
			setInforsliderIsActive(false);
			body.classList.remove(lockScrollBarsClass);
			html.classList.remove(lockScrollBarsClass);

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
					// backgroundColor: toggleButtonBackgroundColor,
					backgroundColor: "#944601",
					duration: 0.5,
				});
			infoWrapper.classList.remove(lightboxClass);
		};
		const showLightBox = () => {
			fadeBackground.classList.remove("hide");
			setInforsliderIsActive(true);
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

		if (siteLoad.current) {
			siteLoad.current = false;
			showLightBox();
		} else {
			lightboxShowClass.current = "";
			showClass.current = "";
		}

		const handelLightBox = (evt) => {
			// show lightBox
			if (evt.type === "show.bs.collapse") {
				showLightBox();
			}
			// Hide lightBox
			else {
				hideLightBox();
			}
		};

		// console.log("load");
		toggleButton.addEventListener("show.bs.collapse", handelLightBox.bind(this));
		toggleButton.addEventListener("hidden.bs.collapse", handelLightBox.bind(this));

		collapse.addEventListener("hidden.bs.collapse", handelLightBox.bind(this));
		collapse.addEventListener("show.bs.collapse", handelLightBox.bind(this));

		// clearUp
		return () => {
			// console.log("unload");
			tl.kill();
			collapse.removeEventListener("hidden.bs.collapse", handelLightBox);
			collapse.removeEventListener("show.bs.collapse", handelLightBox);
		};
		//}
	}, [setInforsliderIsActive, siteLoad]);

	// const showLightBox = useRef(true);
	// useEffect(() => {
	// 	// init activate lightBox
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
		// <div className={wrapperClassName + " info-wrapper lightbox-show"} ref={infoWrapperRef}>
		<div className={wrapperClassName + `info-wrapper ${lightboxShowClass.current}`} ref={infoWrapperRef}>
			<button
				className="px-2 py-2 btn btn-secondary info-wrapper__firstbutton collapsed"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapsedInfor"
				aria-expanded="true"
				aria-controls="collapsedInfor"
				ref={toggleButtonRef}
			>
				<Info size={25} />
			</button>
			<div className={`collapse collapse-horizontal ${showClass.current}`} id="collapsedInfor" ref={collapseRef}>
				{/* <div className="collapse collapse-horizontal" id="collapsedInfor" ref={collapseRef}> */}
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
			<div
				className="fade-background hide"
				ref={fadeBackgroundRef}
				data-bs-toggle="collapse"
				data-bs-target="#collapsedInfor"
				style={{ opacity: 0.4 }}
			></div>
		</div>
	);
};
