import { useEffect, useRef, useState } from "react";
import data from "./galleryData";
import galleryDataSetUp from "./gallerySetUp";

import SwiperMasonryGallery from "./SwiperMasonryGallery";
// import { useResizeScreenWidth } from "../../Hooks/Resize/useResizeScreenWidth";
import { useResizeGallery } from "../../Hooks/Resize/useResizeGallery";
import "../pages.scss";
import { PageProperties } from "../pagesProperties/pagesProperties";
// import { Display } from "react-bootstrap-icons";
import { ScrollTop } from "../../router/ScrollTop";

const Gallery = (props) => {
	PageProperties({ title: props.title, id: props.id });
	ScrollTop();

	let refFullScreen = useRef(false);
	const [fullScreenGallery, setFullScreenGallery] = useState(false);

	//Click in child compunent Change fullScreenGalleryIsActive: true / false
	const callbackToParentFullScreen = (fullScreenGalleryIsActive) => {
		setFullScreenGallery(fullScreenGalleryIsActive);
		refFullScreen.current = fullScreenGalleryIsActive;
	};

	// changeGallery:string -> the name of the gallery
	const [changeGallery, setChangeGallery] = useState();

	// hasMaxWidth: boolian
	const [hasMaxWidth, setHasMaxWidth] = useState(false);

	// delayTime:number, maxWidth:number, setHasMaxWidth: setState->fun
	useResizeGallery({ delayTime: 300, maxWidth: 800, setHasMaxWidth });
	// ref
	const headerRef = useRef("header");
	const wrapperRef = useRef("wrapperRef");
	// change gallery on resize: vindow maxWidth
	useEffect(() => {
		// console.log(`change gallery resize = ${refFullScreen.current}`);
		if (fullScreenGallery) {
			setChangeGallery(galleryDataSetUp.galleryNames.fullScreenGallery);
			headerRef.current.classList.add("hide-header");
		} else if (fullScreenGallery === false) {
			const sections = wrapperRef.current.querySelectorAll(".gallery-section");
			sections.forEach((sestion) => {
				sestion.classList.remove("hide-section");
			});
			headerRef.current.classList.remove("hide-header");
			// change between Swiper and Masonry gallery on resize
			if (hasMaxWidth) {
				setChangeGallery(galleryDataSetUp.galleryNames.swiperGallery);
			} else {
				setChangeGallery(galleryDataSetUp.galleryNames.masonryGallery);
			}
		}
	}, [hasMaxWidth, fullScreenGallery]);

	return (
		<div className="main-wrapper" ref={wrapperRef}>
			{/* <ScrollTop /> */}
			<header className="header-level-1 padding-to-top" ref={headerRef}>
				<h1 className="global-paddin-top">Gadekunst i Berlin</h1>
			</header>
			<SwiperMasonryGallery
				swiperSetup={galleryDataSetUp.swiperSetup}
				masonrySetup={galleryDataSetUp.masonrySetup}
				galleryNames={galleryDataSetUp.galleryNames}
				galleryData={data.galleryStreetArtTheWallData}
				galleryStreetArtText={data.galleryStreetArtText}
				galleryClassName="gallery"
				galleryId="swiper-masonry-01"
				pageId={props.id}
				changeGallery={changeGallery}
				callbackToParentFullScreen={callbackToParentFullScreen}
			></SwiperMasonryGallery>

			<SwiperMasonryGallery
				swiperSetup={galleryDataSetUp.swiperSetup}
				masonrySetup={galleryDataSetUp.masonrySetup}
				galleryNames={galleryDataSetUp.galleryNames}
				galleryData={data.galleryStreetArtBerlin}
				galleryStreetArtText={data.galleryStreetArtBerlinText}
				galleryClassName="gallery"
				galleryId="swiper-masonry-02"
				changeGallery={changeGallery}
				pageId={props.id}
				callbackToParentFullScreen={callbackToParentFullScreen}
			></SwiperMasonryGallery>
		</div>
	);
};
export default Gallery;
