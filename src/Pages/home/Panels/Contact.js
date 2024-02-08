import { NavLink } from "react-router-dom";

export const Contact = ({ children, sectionData, renderTechnologyList, renderIcon, renderSvgBackground }) => {
	return (
		<section
			className={`${sectionData.class}  panel panel-link panel-wrapper-level2 padding-to-top ${sectionData.namedId}`}
			id={sectionData.id}
		>
			<div className="panel-wrapper panel-wrapper-level3">
				{/* left side  */}
				<figure className="portrait">
					<img src={require("../../../img/steen/potræt.jpg")} alt="steen hjalmar larsen" />
				</figure>
				<div className="panel-wrapper__section-one"></div>
				{/* right side  */}
				<div className="panel-wrapper__section-two">
					<section className="explanation">
						{/* Header */}
						{sectionData.list.header && <h2 className="explanation--header">{sectionData.list.header} </h2>}
						{/* {list of used tech} */}
						{/* <h2 className="header-level2 technology--header">{Technology.header && Technology.header}</h2> */}

						{sectionData.list && renderTechnologyList(sectionData)}
						{/* Link  */}
						{sectionData.pageLink && <NavLink to={sectionData.pageLink}> {sectionData.linkText}</NavLink>}
						{/* only on contact page  */}
						{sectionData.eMail && (
							<div className="link-to">
								<h3>Kontakt</h3>

								<a className="btn btn-primary" href={sectionData.eMail}>
									{sectionData.eMailAdress}
								</a>
							</div>
						)}
						{children}
					</section>
				</div>
			</div>
		</section>
	);
};
