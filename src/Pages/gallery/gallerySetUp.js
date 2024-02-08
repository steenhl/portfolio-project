import { Navigation, Pagination, Keyboard } from "swiper";

const galleryDataSetUp = {
	swiperSetup: {
		speed: 400,
		spaceBetween: 10,
		slidesPerView: 1,
		// autoHeight: true,
		breakpoints: {},
		modules: [Navigation, Pagination, Keyboard],
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			clickable: true,
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	},
	galleryNames: {
		swiperGallery: "swiperGallery",
		masonryGallery: "masonryGallery",
		fullScreenGallery: "fullScreenGallery",
	},
	masonrySetup: {
		itemSelector: ".grid-item",
		fitWidth: true,
		gutter: 10,
		stagger: 30,
	},
};
export default galleryDataSetUp;
