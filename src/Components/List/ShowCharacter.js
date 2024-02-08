import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

export function ShowCharacter(info) {
	let statusClass = "";
	if (info.character.status === "Alive") {
		statusClass = "alive";
	} else if (info.character.status === "unknown") {
		statusClass = "unknown";
	} else if (info.character.status === "Dead") {
		statusClass = "dead";
	}

	return (
		<Box className="character-wrapper">
			<section>
				<figure>
					<figcaption>{info.character.name}</figcaption>
					<img src={info.character.image} alt={info.character.name} />
				</figure>
				<ul className="list-group">
					<li className={`list-group-item ${statusClass}`}>{info.character.status}</li>
					<li className="list-group-item">{info.character.species}</li>
					<li className="list-group-item">{info.character.origin.name}</li>
					<li className="list-group-item">{info.character.location.name}</li>
				</ul>
			</section>
			<section>
				<TableContainer className="more-info-table">
					<Table className="table table-striped">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Season</TableCell>
								<TableCell>Eposode</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{info.character.episode.map((episodes, index) => (
								<TableRow key={index + info.character.name}>
									<TableCell>{episodes.name}</TableCell>
									<TableCell>{episodes.episode.slice(1, 3)}</TableCell>
									<TableCell>{episodes.episode.slice(4, 6)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</section>
		</Box>
	);
}
