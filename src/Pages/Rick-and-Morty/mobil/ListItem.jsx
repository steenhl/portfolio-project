import React from "react";
import "./list.scss";
import { ShowCharacter } from "../Shared/ShowCharacter";
import "@material/layout-grid/dist/mdc.layout-grid.css";

const ListItemMobil = ({ results, showMobil }) => {
	return (
		<div className={`rick-morty-table-wrappe rm-mobil ${showMobil ? "" : "hide"}`}>
			<table className="table accordion" id="acc3">
				<thead className="mdc-layout-grid">
					<tr className="mdc-layout-grid__inner according-tr">
						{/* <th className="mdc-layout-grid__cell accordion-thead small-width" scope="col"> */}
						<th className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone accordion-thead small-width" scope="col">
							According
						</th>
						<th className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone accordion-thead" scope="col">
							Name
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
												<tbody className="mdc-layout-grid">
													<tr className="mdc-layout-grid__inner accordion-header according-tr" id={"heading" + r.id}>
														<td className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone small-width">
															<button
																className="accordion-button collapsed"
																type="button"
																data-bs-toggle="collapse"
																data-bs-target={"#collapse" + r.id}
																aria-expanded="false"
																aria-controls={"collapse" + r.id}
															></button>
														</td>
														<td className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone">{r.name}</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr className="show-more">
										<td colSpan={2}>
											<div id={"collapse" + r.id} className="accordion-collapse collapse" aria-labelledby={"heading" + r.id}>
												<ShowCharacter character={r} />
											</div>
										</td>
									</tr>
								</>
							)}
							{index > 0 && (
								<>
									<tr className="show-header">
										<td colSpan={2}>
											<table className="table">
												<tbody className="mdc-layout-grid">
													<tr className="mdc-layout-grid__inner accordion-header according-tr" id={"heading" + r.id}>
														<td className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone small-width">
															<button
																className="accordion-button collapsed"
																type="button"
																data-bs-toggle="collapse"
																data-bs-target={"#collapse" + r.id}
																aria-expanded="false"
																aria-controls={"collapse" + r.id}
															></button>
														</td>
														<td className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-phone">{r.name}</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr className="show-more">
										<td colSpan={7}>
											<div id={"collapse" + r.id} className="accordion-collapse collapse hide" aria-labelledby={"heading" + r.id}>
												<ShowCharacter character={r} />
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

export default ListItemMobil;
