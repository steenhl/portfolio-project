export const RmSectionOne = ({ info }) => {
	return (
		<section className="character-wrapper__section-one">
			<figure>
				<figcaption>{info.character.name}</figcaption>
				<img src={info.character.image} alt={info.character.name} />
			</figure>
			<ul className="list-group">
				<li className={`list-group-item ${info.character.status.toLowerCase()}`}>
					<em>Status: </em>
					{info.character.status}
				</li>
				<li className="list-group-item">
					<em>Species: </em>
					{info.character.species}
				</li>
				<li className="list-group-item">
					<em>Origin: </em>
					{info.character.origin.name}
				</li>
				<li className="list-group-item">
					<em>Location: </em>
					{info.character.location.name}
				</li>
			</ul>
		</section>
	);
};
