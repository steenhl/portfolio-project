import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./list.scss";
import { ShowCharacter } from "./ShowCharacter";

const ListItem = ({ results }) => {
	return (
		<div className="rick-morty-table-wrapper">
			<table className="table accordion" id="acc3">
				<thead>
					<tr className="according-tr">
						<th className="accordion-thead small-width" scope="col">
							According
						</th>
						<th className="accordion-thead" scope="col">
							Name
						</th>
						<th className="accordion-thead small-width" scope="col">
							Gender
						</th>
						<th className="accordion-thead small-width" scope="col">
							Status
						</th>
						<th className="accordion-thead small-width" scope="col">
							Species
						</th>
						<th className="accordion-thead" scope="col">
							Location
						</th>
						<th className="accordion-thead" scope="col">
							episodes
						</th>
					</tr>
				</thead>

				<tbody className="accordion-item">
					{results.map((r, index) => (
						<React.Fragment key={r.id}>
							{index === 0 && (
								<>
									<tr className="show-header">
										<td colSpan={7}>
											<table className="table">
												<tbody>
													<tr className="accordion-header according-tr" id={"heading" + r.id}>
														<td className="small-width">
															<button
																className="accordion-button collapsed"
																type="button"
																data-bs-toggle="collapse"
																data-bs-target={"#collapse" + r.id}
																aria-expanded="false"
																aria-controls={"collapse" + r.id}
															></button>
														</td>
														<td>{r.name}</td>
														<td className="small-width">{r.gender}</td>
														<td className="small-width">{r.status}</td>
														<td className="small-width">{r.species}</td>
														<td>{r.location.name}</td>
														<td>{r.episode.length}</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr className="show-more">
										<td colSpan={7}>
											<div id={"collapse" + r.id} className="accordion-collapse collapse" aria-labelledby={"heading" + r.id}>
												<ShowCharacter character={r}>{/* {console.log()} */}</ShowCharacter>
											</div>
										</td>
									</tr>
								</>
							)}
							{index > 0 && (
								<>
									<tr className="show-header">
										<td colSpan={7}>
											<table className="table">
												<tbody>
													<tr className="accordion-header according-tr" id={"heading" + r.id}>
														<td className="small-width">
															<button
																className="accordion-button collapsed"
																type="button"
																data-bs-toggle="collapse"
																data-bs-target={"#collapse" + r.id}
																aria-expanded="false"
																aria-controls={"collapse" + r.id}
															></button>
														</td>
														<td>{r.name}</td>
														<td className="small-width">{r.gender}</td>
														<td className="small-width">{r.status}</td>
														<td className="small-width">{r.species}</td>
														<td>{r.location.name}</td>
														<td>{r.episode.length}</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr className="show-more">
										<td colSpan={7}>
											<div id={"collapse" + r.id} className="accordion-collapse collapse hide" aria-labelledby={"heading" + r.id}>
												<ShowCharacter character={r}>{/* {console.log()} */}</ShowCharacter>
											</div>
										</td>
									</tr>
								</>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListItem;
