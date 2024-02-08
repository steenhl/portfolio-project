import ReactPaginate from "react-paginate";
import "./list-navigation.scss";
export const PagePagination = ({ pageCount, setPageNumber, pageNumber }) => {
	return (
		<div className="list-navigation">
			<nav aria-label="Page navigation">
				<ReactPaginate
					className="pagination justify-content-center gap-3 my-2"
					pageCount={pageCount}
					forcePage={pageNumber === 0 ? 1 : pageNumber - 1} // fixing a problem, when search page not shifting to the first page
					nextLabel="Next"
					previousLabel="Prev"
					previousClassName=""
					nextClassName=""
					previousLinkClassName="page-link"
					nextLinkClassName="page-link"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					activeClassName="active"
					onPageChange={(e) => {
						setPageNumber(e.selected + 1);
					}}
					pageRangeDisplayed={1}
					marginPagesDisplayed={1}
				></ReactPaginate>
			</nav>
		</div>
	);
};
