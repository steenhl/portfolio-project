import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

export const RmSectionTwo = ({ info }) => {
	return (
		<section className="character-wrapper__section-two">
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
	);
};
