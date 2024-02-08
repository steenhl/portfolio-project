import { Box } from "@material-ui/core";
import { RmSectionOne } from "./RmSectionOne";
import { RmSectionTwo } from "./RmSectionTwo";

export function ShowCharacter(info) {
	return (
		<Box className="character-wrapper">
			<RmSectionOne info={info} />
			<RmSectionTwo info={info} />
		</Box>
	);
}
