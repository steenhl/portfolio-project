import React, { useState, useEffect } from "react";
import ListItem from "../../Components/List/ListItem.jsx";
import Filters from "../../Components/Filters/Filters.js";
import { PagePagination } from "../../Components/Pagination/pagination.js";
import { Search } from "../../Components/Search/Search.js";
import "../../App.scss";

import "../pages.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSnowboarding } from "@fortawesome/free-solid-svg-icons";

import { useResizeScreenWidth } from "../../Hooks/Resize/useResizeScreenWidth";

import { gql, useQuery } from "@apollo/client";

function Rm(props) {
	let [pageNumber, setPageNumber] = useState(1);
	let [name, setName] = useState("");
	let [characters, setCharacters] = useState();
	let [numberOfPages, setNumberOfPages] = useState();
	let [showTurn, setShowTurn] = useState("");

	const COLLECTIONS = gql`
		query getCharacters($pageNumber: Int!, $name: String!) {
			characters(page: $pageNumber, filter: { name: $name }) {
				info {
					count
					pages
				}
				results {
					id
					name
					gender
					status
					species
					image
					location {
						name
					}
					origin {
						name
					}
					episode {
						name
						episode
					}
				}
			}
		}
	`;
	const { loading, error, data } = useQuery(COLLECTIONS, {
		variables: {
			pageNumber: pageNumber,
			name: name,
		},
	});

	const [hasMaxWidth, setHasMaxWidth] = useState(false);
	// delayTime:number, maxWidth:number, setHasMaxWidth: setState->fun
	useResizeScreenWidth({ delayTime: 300, maxWidth: 601, setHasMaxWidth });
	useEffect(() => {
		// setShowTurn
		hasMaxWidth ? setShowTurn("turn-screen") : setShowTurn("");
	}, [hasMaxWidth]);

	useEffect(() => {
		document.title = props.title;
		if (data) {
			setCharacters(data.characters);
			setNumberOfPages(data.characters.info.pages);
		}
	}, [data, pageNumber, name, props.title]);

	return (
		<div className={`rm-wrapper ${showTurn}`}>
			<header className="container d-flex justify-content-center flex-column mt-3">
				{/* <FontAwesomeIcon icon={["fab", "freebsd"]} />
				<FontAwesomeIcon icon={faCoffee} />

				<FontAwesomeIcon icon={faSnowboarding} /> */}

				{/* <FontAwesomeIcon icon="check-square" /> */}
				{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M241.7 3.4c15.8-7.9 35-1.5 42.9 14.3l25 50 42.4 8.5c19.5 3.9 37.8 12.3 53.5 24.5l126.1 98.1c14 10.9 16.5 31 5.6 44.9s-31 16.5-44.9 5.6l-72.1-56.1-71.5 31.8 33.1 27.6c23.2 19.3 33.5 50 26.7 79.4l-17.4 75.2c-2.2 9.4-8.2 16.8-16.1 21l86.5 33.1c4.6 1.8 9.4 2.6 14.3 2.6H504c13.3 0 24 10.7 24 24s-10.7 24-24 24H475.8c-10.8 0-21.4-2-31.5-5.8L92.1 371.3c-11.5-4.4-22-11.2-30.8-20L39 329c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.4 22.4c4 4 8.7 7.1 14 9.1l22.4 8.6c-.8-1.6-1.5-3.2-2.1-4.9c-5.6-16.8 3.5-34.9 20.2-40.5L224 264.9l0-53.2c0-24.2 13.7-46.4 35.4-57.2l45.2-22.6-7.5-1.5c-19.4-3.9-35.9-16.5-44.7-34.1l-25-50c-7.9-15.8-1.5-35 14.3-42.9zM171 350.1l159 60.9c-2.1-5.6-2.6-11.9-1.1-18.2l17.4-75.2c1.4-5.9-.7-12-5.4-15.9l-52.8-44 0 18.8c0 20.7-13.2 39-32.8 45.5L171 350.1zM464 96c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
				</svg> */}
				<FontAwesomeIcon icon="fa-person-snowboarding" />
				{/* <FontAwesomeIcon icon={["fa", "fa-solid fa-person-snowboarding"]} />
				<FontAwesomeIcon icon="fa-sharp fa-solid fa-person-snowboarding" />
				<FontAwesomeIcon icon="fa-sharp fa-solid fa-person-snowboarding" />
				<FontAwesomeIcon icon="faSnowflake" /> */}
				<h1 className="text-center global-paddin-top">Best Rick and Morty</h1>
				<Search setPageNumber={setPageNumber} setName={setName}></Search>
			</header>
			<section className="main-wrapper">
				{error && (
					<section className="could-not-fetch-data">
						<h2 className="alert alert-warning " role="alert">
							could not fetch data
						</h2>
					</section>
				)}
				{loading && <div>Loading ...</div>}
				<Filters></Filters>
				{!error && characters && <ListItem results={characters.results} />}
				{!error && numberOfPages !== undefined && (
					<PagePagination pageCount={numberOfPages} setPageNumber={setPageNumber} pageNumber={pageNumber}></PagePagination>
				)}
			</section>
		</div>
	);
}

export default Rm;
