import { useEffect, useLayoutEffect, useRef } from "react";
import Swiper from "swiper"; // https://swiperjs.com/
import Masonry from "masonry-layout"; // https://masonry.desandro.com/
import imagesLoaded from "imagesloaded"; // https://imagesloaded.desandro.com/
import { useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { LazyDebounce } from "../../Hooks/Resize/LazyDebounce";
// import { useLazyDebounceWithCancel } from "../../Hooks/Resize/useLazyDebounceWithCancel";
// import { GetPageId } from "../pagesProperties/GetPageId";

import "./main.scss";
import parse from "html-react-parser";
// Import Swiper styles
import "swiper/css/bundle";
import { useMaxWidthHook } from "./useMaxWidth";
import Orientation from "../../Hooks/Resize/useOrientation";

const SwiperMasonryGallery = ({
	galleryData,
	swiperSetup,
	masonrySetup,
	changeGallery,
	galleryNames,
	galleryStreetArtText,
	galleryClassName,
	galleryId,
	pageId,
	callbackToParentFullScreen,
}) => {
	useLayoutEffect(() => {
		setTimeout(() => {
			document.documentElement.scrollTo(0, 0);
		}, 30);
	}, []);

	gsap.registerPlugin(ScrollToPlugin);
	gsap.registerPlugin(ScrollTrigger);
	// thisGalleryWrapper
	let thisGalleryWrapper = useRef();

	const swiperRef = useRef();
	const swiperWrapperRef = useRef();
	const swiperPaginationRef = useRef();
	// buttons
	const swiperButtonPrevRef = useRef();
	const swiperButtonNextRef = useRef();
	// class names for swiper gallery
	let swiperClasses = useRef({
		type: String,
		swiper: "swiper",
		swiperWrapper: "swiper-wrapper",
		swiperSlide: "swiper-slide",
		swiperPagination: "swiper-pagination",
		swiperButtonPrev: "swiper-button-prev",
		swiperButtonNext: "swiper-button-next",
	});
	let swiperObj = useRef(undefined);
	let masonryObj2 = useRef([]);
	let isClicked = useRef(undefined);

	let fullScreenGalleryRef = useRef(false);

	// state
	let [imagesIsLoaded, setImagesIsLoaded] = useState(false);
	let [thisSwiperDom, setThisSwiperDom] = useState(undefined);
	let [fontObserverDaysOne, setFontObserverDaysOne] = useState(false);
	let [fontObserverRobotoMedium, setFontObserverRobotoMedium] = useState(false);

	let [thisFullScreenGalleryState, setThisFullScreenGalleryState] = useState({
		galleriIsActive: false,
		clickEvent: undefined,
		index: 0,
		galleryWrapper: undefined,
	});

	// click event object
	const toggleFullScreenGallery = (c, e, index, el) => {
		setThisFullScreenGalleryState({
			galleriIsActive: c || undefined,
			clickEvent: e || undefined,
			index: index || 0,
			galleryWrapper: el || undefined,
		});
	};
	// FontFaceObserver
	useEffect(() => {
		// https://github.com/bramstein/fontfaceobserver

		let FontFaceObserver = require("fontfaceobserver");
		let fontDaysOne = new FontFaceObserver("Days One");
		let fontRobotoMedium = new FontFaceObserver("Roboto-Medium");

		fontDaysOne
			.load(null, 10000) //
			.then(function () {
				setFontObserverDaysOne(true);
			})
			.catch(function () {
				setFontObserverDaysOne(false);
			});

		fontRobotoMedium
			.load(null, 10000)
			.then(function () {
				setFontObserverRobotoMedium(true);
			})
			.catch(function () {
				setFontObserverRobotoMedium(false);
			});
	}, []);
	// Init
	useEffect(() => {
		imagesLoaded(".swiper", function () {
			setImagesIsLoaded(true);
		});
		/** tjek */
		//toggleFullScreenGallery(false);

		const { swiperSlide } = swiperClasses.current;
		let swiperDOM = swiperRef.current,
			swiperWrapperDOM = swiperWrapperRef.current,
			swiperSlideDOM = swiperWrapperDOM.querySelectorAll("." + swiperSlide),
			swiperPaginationDOM = swiperPaginationRef.current,
			swiperButtonPrevDOM = swiperButtonPrevRef.current,
			swiperButtonNextDOM = swiperButtonNextRef.current;

		setThisSwiperDom({
			swiperDOM,
			swiperWrapperDOM,
			swiperSlideDOM,
			swiperPaginationDOM,
			// buttons
			swiperButtonPrevDOM,
			swiperButtonNextDOM,
		});
	}, []);

	// if useMaxWidth === true : activate useMaxWidthHook
	const [useMaxWidth, setUseMaxWidth] = useState(false);
	useMaxWidthHook({ swiperRef: swiperRef.current, thisGalleryWrapper: thisGalleryWrapper.current, useMaxWidth });
	useEffect(() => {
		// thisFullScreenGalleryState.clickEvent is undefined on init
		if (thisFullScreenGalleryState.clickEvent !== undefined) {
			//console.log(galleryNames);
			const body = document.querySelector("body");
			if (thisFullScreenGalleryState.galleriIsActive) {
				body.classList.add("locked");
				thisGalleryWrapper.current.classList.add("active-fullscreen-gallery");

				setTimeout(() => {
					setCreateSwiper(true);
					//console.log(`Scroll top`);
					window.scrollTo(0, 1);

					// create ovelay
					if (document.querySelectorAll("#overlay").length === 0) {
						const overlay = document.createElement("div");
						overlay.setAttribute("id", "overlay");
						body.appendChild(overlay);
						setUseMaxWidth(true);

						setTimeout(() => {
							swiperObj.current.slideTo(thisFullScreenGalleryState.index, 1000);
						}, 500);
					}
				}, 400);
			} else {
				body.classList.remove("locked");
				// remove all 'overlays', only one is expected
				document.querySelectorAll("#overlay").forEach((o) => o.remove());
				thisGalleryWrapper.current.classList.remove("active-fullscreen-gallery");

				let id = "#" + thisGalleryWrapper.current.id;
				setTimeout(() => {
					setDestroySwiper(true);
					setUseMaxWidth(false);

					// scroll window to active position
					setTimeout(() => {
						gsap.to(window, { duration: 0, scrollTo: id });
					}, 100);
				}, 100);
			}
		}
	}, [thisFullScreenGalleryState, galleryNames]);

	// return "Landscape" : "Portrait"
	let orientation = Orientation();
	//
	useEffect(() => {
		if (thisFullScreenGalleryState.galleriIsActive) {
			// console.log(
			// 	`orientation = ${orientation} and FullScreenGalleryState = ${thisFullScreenGalleryState.galleriIsActive} `
			// );
			window.scrollTo(0, 1);
		}
	}, [orientation, thisFullScreenGalleryState]);

	// Remove swiper classes
	const [removeSwiperClass, setRemoveSwiperClass] = useState(false);
	useEffect(() => {
		if (removeSwiperClass) {
			const { swiperButtonPrev, swiperButtonNext } = swiperClasses.current;

			const {
				swiperDOM,
				swiperWrapperDOM,
				swiperSlideDOM,
				swiperPaginationDOM,
				// buttons
				swiperButtonPrevDOM,
				swiperButtonNextDOM,
			} = thisSwiperDom;

			swiperDOM.classList.remove("swiper-backface-hidden");
			swiperDOM.classList.remove("swiper");
			swiperWrapperDOM.classList.remove("swiper-wrapper");
			[...swiperSlideDOM].forEach((elm) => elm.classList.remove("swiper-slide"));
			swiperPaginationDOM.querySelectorAll("span").forEach((span) => span.remove());
			swiperPaginationDOM.removeAttribute("style");
			swiperPaginationDOM.classList = ""; // remove all classes
			swiperPaginationDOM.classList.add("swiper-pagination"); // add class: swiper-pagination
			// // Swiper: remove next and prev classes
			swiperButtonPrevDOM.classList.remove(swiperButtonPrev);
			swiperButtonNextDOM.classList.remove(swiperButtonNext);
			setRemoveSwiperClass(false);
		}
	}, [removeSwiperClass, thisSwiperDom]);
	// Add swiper classes
	const [addSwiperClass, setAddSwiperClass] = useState(false);
	useEffect(() => {
		if (addSwiperClass) {
			const { swiper, swiperWrapper, swiperSlide, swiperButtonPrev, swiperButtonNext } = swiperClasses.current;
			const { swiperDOM, swiperWrapperDOM, swiperSlideDOM, swiperButtonPrevDOM, swiperButtonNextDOM } = thisSwiperDom;

			swiperDOM.classList.add(swiper);
			swiperWrapperDOM.classList.add(swiperWrapper);
			[...swiperSlideDOM].forEach((elm) => elm.classList.add(swiperSlide));
			// next and prev button
			swiperButtonPrevDOM.classList.add(swiperButtonPrev);
			swiperButtonNextDOM.classList.add(swiperButtonNext);
			setAddSwiperClass(false);
		}
	}, [addSwiperClass, thisSwiperDom]);
	// Create Swiper
	const [createSwiper, setCreateSwiper] = useState(false);
	useEffect(() => {
		if (createSwiper) {
			// console.log(swiperObj.current);
			// console.log(swiperObj.current === undefined);
			if (swiperObj.current === undefined) {
				setAddSwiperClass(true);
				//console.log(thisGalleryWrapper.current.querySelector(".grid"));
				setTimeout(() => {
					let thisSwiperObj = new Swiper(thisGalleryWrapper.current.querySelector(".grid"), swiperSetup);
					swiperObj.current = thisSwiperObj;
				}, 300);
			}

			setCreateSwiper(false);
		}
	}, [createSwiper, swiperSetup]);
	// Destroy Swiper
	const [destroySwiper, setDestroySwiper] = useState(false);
	useEffect(() => {
		if (destroySwiper) {
			setRemoveSwiperClass(true);
			if (swiperObj.current !== undefined) {
				swiperObj.current.destroy(true, true);
				swiperObj.current = undefined;
			}
			setDestroySwiper(false);
		}
	}, [destroySwiper]);
	// Create Masonry
	const [createMasonry, setCreateMasonry] = useState(false);
	useEffect(() => {
		if (createMasonry) {
			if (fullScreenGalleryRef.current === false) {
				let id = thisGalleryWrapper.current.getAttribute("id");
				let gridSelector = `#${id} .grid`;

				let masonry = new Masonry(gridSelector, masonrySetup);

				masonryObj2.current.push(masonry);
				if (masonryObj2.current) {
					setTimeout(() => {
						masonryObj2.current.forEach((m) => {
							m.layout();
						});
					}, 10);
				}
			}
			setCreateMasonry(false);
		}
	}, [createMasonry, masonrySetup]);
	// Destroy Masonry
	const [destroyMasonry, setDestroyMasonry] = useState(false);
	useEffect(() => {
		if (destroyMasonry) {
			if (masonryObj2.current.length > 0) {
				masonryObj2.current.forEach((m) => {
					m.destroy();
				});
				masonryObj2.current.pop();
			}

			// if (masonryObj.current) {
			// 	masonryObj.current.destroy();
			// }
			setDestroyMasonry(false);
		}
	}, [destroyMasonry]);

	// fonts and images is loaded
	const [assetsIsloaded, setAssetsIsloaded] = useState();
	useEffect(() => {
		// console.log(`imagesIsLoaded = ${imagesIsLoaded}`);
		// console.log(`fontObserverRobotoMedium = ${fontObserverRobotoMedium}`);
		// console.log(`fontObserverDaysOne = ${fontObserverDaysOne}`);
		if (imagesIsLoaded && fontObserverRobotoMedium && fontObserverDaysOne) {
			setAssetsIsloaded(true);
		}
	}, [fontObserverDaysOne, fontObserverRobotoMedium, imagesIsLoaded]);

	// Change between gallery's
	useEffect(() => {
		if (assetsIsloaded) {
			// Full-screen-gallery: Destroy Masonry and swiper gallery in all child instans
			//console.log(changeGallery);
			if (changeGallery === galleryNames.fullScreenGallery) {
				setDestroyMasonry(true);
				setTimeout(() => {
					setDestroySwiper(true);
				}, 200);
			}
			// Swiper gallery
			else if (changeGallery === galleryNames.swiperGallery) {
				setDestroyMasonry(true);
				setTimeout(() => {
					setCreateSwiper(true);
				}, 200);
				// Masonry gallery
			} else if (changeGallery === galleryNames.masonryGallery) {
				setDestroySwiper(true);
				setTimeout(() => {
					setCreateMasonry(true);
				}, 200);
			}
		}
	}, [
		assetsIsloaded,
		changeGallery,
		galleryNames.fullScreenGallery,
		galleryNames.masonryGallery,
		galleryNames.swiperGallery,
	]);

	return (
		<section className={` ${galleryClassName} gallery-section`} id={galleryId} ref={thisGalleryWrapper}>
			<header className="header-level-2 gallery-section__header">
				<h2>{parse(galleryStreetArtText.header)}</h2>
				<h3>{parse(galleryStreetArtText.subHeader)}</h3>
			</header>
			<div className="grid full-screen-target gallery-outer-wrapper" ref={swiperRef}>
				{/* .grid-sizer empty element, only used for element sizing
               	<div class="grid-sizer"></div>  */}
				<div className="swiper-wrapper gallery-wrapper" ref={swiperWrapperRef}>
					{/* Slides */}
					{galleryData &&
						galleryData.map((data, index) => {
							return (
								<figure
									key={data.id}
									className="swiper-slide grid-item"
									onClick={(e) => {
										isClicked.current = !isClicked.current;
										toggleFullScreenGallery(isClicked.current, e, index, thisGalleryWrapper);
										callbackToParentFullScreen(isClicked.current);
										e.preventDefault();
									}}
								>
									<img src={require("../../" + data.src + ".jpg")} alt={data.header} />
									<figcaption>
										<h2>{parse(data.header)}</h2>
										<p>{parse(data.paragraf)}</p>
									</figcaption>
								</figure>
							);
						})}
				</div>

				{/* If Swiper need navigation buttons  */}
				<div className="swiper-button-prev" ref={swiperButtonPrevRef}></div>
				<div className="swiper-button-next" ref={swiperButtonNextRef}></div>
				{/* If Swiper need pagination  */}
				<div className="swiper-pagination" ref={swiperPaginationRef}></div>
				{/* If Swiper need scrollbar
       			<div class="swiper-scrollbar"></div>  */}
				{/* full screen button  */}
			</div>
		</section>
	);
};

export default SwiperMasonryGallery;
