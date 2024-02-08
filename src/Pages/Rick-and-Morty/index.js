import { useState, useEffect } from "react";
import ListItem from "./disktop/ListItem.jsx";
import ListItemMobil from "./mobil/ListItem";
import { PagePagination } from "../../Components/Pagination/pagination.js";
import { Search } from "../../Components/Search/Search.js";
import "../../App.scss";
import "../pages.scss";
import "./rm.scss";

import { useResizeScreenWidth } from "../../Hooks/Resize/useResizeScreenWidth";

import { gql, useQuery } from "@apollo/client";
import { PageProperties } from "../pagesProperties/pagesProperties.js";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Rm(props) {
	PageProperties({ title: props.title, id: props.id });
	let [pageNumber, setPageNumber] = useState(1);
	let [name, setName] = useState("");
	let [characters, setCharacters] = useState();
	let [numberOfPages, setNumberOfPages] = useState();

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
	useResizeScreenWidth({ delayTime: 300, maxWidth: 801, setHasMaxWidth, stopResize: false });

	useEffect(() => {
		document.title = props.title;
		if (data) {
			// console.log(data);
			setCharacters(data.characters);
			setNumberOfPages(data.characters.info.pages);
		}
	}, [data, pageNumber, name, props.title]);

	return (
		<div className={`rm-wrapper`}>
			<header className="rm-wrapper__header padding-to-top">
				<div className="container d-flex justify-content-center flex-column ">
					<h1 className="text-center global-paddin-top"> Rick and Morty</h1>
					<h2>En søgbar oversigt over den animerede TV serie RICK AND MORTY</h2>
					<Search setPageNumber={setPageNumber} setName={setName}></Search>
				</div>
			</header>
			<section className="main-wrapper">
				{error && (
					<section className="could-not-fetch-data">
						<h2 className="alert alert-warning " role="alert">
							could not fetch data
						</h2>
					</section>
				)}
				{loading && (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only"></span>
						</div>
					</div>
				)}

				{!error && characters && <ListItem results={characters.results} showMobil={hasMaxWidth} />}
				{!error && characters && <ListItemMobil results={characters.results} showMobil={hasMaxWidth} />}
				{!error && numberOfPages !== undefined && (
					<PagePagination pageCount={numberOfPages} setPageNumber={setPageNumber} pageNumber={pageNumber}></PagePagination>
				)}
			</section>
		</div>
	);
}

export default Rm;
