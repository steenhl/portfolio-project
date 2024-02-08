export const PanelTop = (props) => {
	const { sectionData } = props;
	return (
		<article className="panel-1__top__article">
			<header className="panel-1__top__article__header">
				<h2> {sectionData.header}</h2>
				<h3> {sectionData.subheading}</h3>
			</header>
			<p className="panel-1__top__article__p">{sectionData.p}</p>
		</article>
	);
};
