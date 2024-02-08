import ReactPaginate from "react-paginate";
import "./pagePagination.scss";
import "bootstrap/dist/css/bootstrap.css";

export const PagePagination = ({ pageCount, setPageNumber, pageNumber, setOnClickGetIndex }) => {
	return (
		<div className="list-navigation">
			<nav aria-label="Page navigation">
				<ReactPaginate
					className="pagination justify-content-center gap-3 my-2"
					pageCount={pageCount}
					forcePage={pageNumber === 0 ? 1 : pageNumber - 1} // fixing a problem, when search page not shifting to the first page
					nextLabel={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-chevron-double-down"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
							/>
							<path
								fillRule="evenodd"
								d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
							/>
						</svg>
					}
					previousLabel={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-chevron-double-up"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
							/>
							<path
								fillRule="evenodd"
								d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
							/>
						</svg>
					}
					previousClassName="prev"
					nextClassName="next"
					previousLinkClassName="page-link"
					nextLinkClassName="page-link"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					activeClassName="active"
					onPageChange={(e) => {
						setPageNumber(e.selected + 1);
						setOnClickGetIndex(e);
					}}
					pageRangeDisplayed={1}
					marginPagesDisplayed={1}
				></ReactPaginate>
			</nav>
		</div>
	);
};
