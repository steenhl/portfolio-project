import { NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { PanelTop } from "./PanelTop";
import { useResizeScreenWidth } from "../../../Hooks/Resize/useResizeScreenWidth";
import { useState } from "react";
import { PanelTopMobil } from "./PanelTopMobil";
import Birds from "../vanta/birds";

export const Panel = ({
	children,
	sectionData,
	renderTechnologyList,
	renderIcon,
	renderSvgBackground,
	setThisClick,
}) => {
	const [hasMaxWidth, setHasMaxWidth] = useState(false);
	// delayTime:number, maxWidth:number, setHasMaxWidth: setState->fun
	useResizeScreenWidth({ delayTime: 300, maxWidth: 900, setHasMaxWidth });

	return (
		<section
			className={`${sectionData.class} panel panel-link panel-wrapper-level2 padding-to-top ${sectionData.namedId}`}
			id={sectionData.id}
		>
			{sectionData.svgBackGround && renderSvgBackground(sectionData.svgBackGround)}

			{sectionData.id !== "panel-1" && sectionData.svg && (
				<div className="svg-wrapper-background">{sectionData.svg && renderIcon(sectionData.svg)}</div>
			)}
			{sectionData.id === "panel-1" &&
				sectionData.svg &&
				sectionData.header &&
				sectionData.subheading &&
				sectionData.p && <div className="panel-1__top">{!hasMaxWidth && <PanelTop sectionData={sectionData} />}</div>}

			{sectionData.images && (
				<div className="figure-wrapper-background">{sectionData.images && renderIcon(sectionData.images)}</div>
			)}

			{/* {sectionData.header && <h2 className="header-level1 panel--header"> {sectionData.header}</h2>} */}
			<div className="panel-wrapper">
				{sectionData.id === "panel-1" && (
					<div className="animation-wrapper">
						{sectionData.svg && renderIcon(sectionData.svg)}
						<Birds />
					</div>
				)}
				{/* left side  */}
				<div className="panel-wrapper__section-one"></div>

				{/* right side  */}
				<div className="panel-wrapper__section-two">
					<section className="explanation">
						{sectionData.id === "panel-1" && hasMaxWidth && <PanelTopMobil sectionData={sectionData} />}
						{/* all pages header */}
						{sectionData.id !== "panel-1" && sectionData.subheading && (
							<h2 className="explanation__header">{parse(sectionData.subheading)}</h2>
						)}
						{sectionData.id !== "panel-1" && sectionData.p && <p className="explanation__p">{parse(sectionData.p)}</p>}

						{sectionData.list && sectionData.list.header && (
							<h3 className="explanation__technology">{sectionData.list.header} </h3>
						)}

						{sectionData.list && renderTechnologyList(sectionData)}
						{/* Link  */}
						{sectionData.pageLink && (
							<NavLink to={sectionData.pageLink} className="link-to btn btn-primary mt-3">
								{sectionData.linkText}
							</NavLink>
						)}
					</section>
				</div>
			</div>
			{children}
		</section>
	);
};
