import "./mainNavigation.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const MainNavigation = (props) => {
	const { hasMaxWidth900 } = props;
	const mainNav = useRef();
	const btnOpen = useRef();
	const btnClose = useRef();
	const offcanvas = useRef();

	const [nav, setNav] = useState();
	useEffect(() => {
		setNav(mainNav.current);
	}, []);

	useEffect(() => {
		if (nav) {
			// disktop
			if (!hasMaxWidth900) {
				nav.classList.add("disktop-nav");
				nav.classList.remove("mobil-nav");

				// offcanvas exsist only when panel is active
				let offcanvasBackdrop = document.querySelector(".offcanvas-backdrop");
				if (offcanvasBackdrop === null) {
					btnOpen.current.click();
				}
				offcanvas.current.classList.add("show");
			}
			// mobil
			else {
				nav.classList.remove("disktop-nav");
				nav.classList.add("mobil-nav");
				let offcanvasBackdrop = document.querySelector(".offcanvas-backdrop");
				//offcanvas.current.classList.remove("show");
				if (offcanvasBackdrop !== null) {
					btnClose.current.click();
				}
			}
		}
	}, [hasMaxWidth900, nav]);

	let body = document.querySelector("body");

	const [styleBoby, setStyleBoboý] = useState();

	// useEffect(() => {
	// 	let bodyStyle = document.querySelector("body").style;
	// 	console.log(styleBoby);
	// 	// console.log(body.style.paddingRight);
	// 	// console.log(body.style.overflow);
	// });

	return (
		<nav className="main-nav navbar" ref={mainNav}>
			<div className="container-fluid">
				<button
					className="btn btn-secondary btn-sm bg-transparent"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasNavbar"
					aria-controls="offcanvasNavbar"
					ref={btnOpen}
					id="btn-open"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					ref={offcanvas}
				>
					<div className="offcanvas-header">
						<h2 className="offcanvas-title" id="offcanvasNavbarLabel">
							Navigation
						</h2>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
							ref={btnClose}
						></button>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li className="nav-item">
								<NavLink to="/" className="nav-link" aria-current="page">
									<span className="active" data-bs-target="#navbarNav" data-bs-dismiss="offcanvas" aria-label="Close">
										Home
									</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/Gallery" className="nav-link">
									<span data-bs-dismiss="offcanvas" aria-label="Close">
										Gallery
									</span>
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink to="/RM" className="nav-link">
									<span data-bs-target="#navbarNav" data-bs-dismiss="offcanvas" aria-label="Close">
										Rick and Morty
									</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/Vote" className="nav-link">
									<span data-bs-dismiss="offcanvas" aria-label="Close">
										Vote
									</span>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
