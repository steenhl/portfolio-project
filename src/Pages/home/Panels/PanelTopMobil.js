export const PanelTopMobil = (props) => {
	const { sectionData } = props;
	return (
		<article className="explanation__top__article">
			<header className="explanation__top__article__header">
				<h2> {sectionData.header}</h2>
				<h3> {sectionData.subheading}</h3>
			</header>
			<p className="explanation__top__article__p">{sectionData.p}</p>
		</article>
	);
};
