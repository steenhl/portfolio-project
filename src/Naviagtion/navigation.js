import { NavLink, Outlet } from "react-router-dom";
// import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./main-navigation.scss";

export const Naviagtion = () => {
	return (
		<>
			<nav className="nav">
				<ul className="nav__ul">
					<li className="nav__li">
						<NavLink to="/" className="nav__a" aria-current="page">
							<span className="active nav__span">Home</span>
						</NavLink>
					</li>
					<li className="nav__li">
						<NavLink to="/About" className="nav__a">
							<span className="nav__span">About</span>
						</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
};
