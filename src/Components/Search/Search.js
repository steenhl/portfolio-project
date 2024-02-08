import React from "react";
import "./search.scss";
import _ from "lodash";
export const Search = ({ setName, setPageNumber }) => {
	const delaySearch = (e) => {
		setPageNumber(1);
		setName(e.target.value);
	};
	let lazyLayout = _.debounce(delaySearch, 300);

	return (
		<div className="search-simple">
			<form className="d-flex justify-content-center gap-4 mb-5">
				<input
					placeholder="Search for charactes"
					type="text"
					className="form-control search-input shadow-none"
					aria-label="Small"
					onChange={(e) => {
						lazyLayout(e);
					}}
				/>
			</form>
		</div>
	);
};
