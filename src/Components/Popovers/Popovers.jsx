import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.css";
import "./popovers.scss";
import { useEffect } from "react";
import { useRef } from "react";

export const PopoverToolTip = (props) => {
	const { headerText, bodyText, buttonText, activePanel } = props;
	const overlayTrigger = useRef();

	useEffect(() => {
		let currentOverlayTrigger = overlayTrigger.current;
		let popIsActive = currentOverlayTrigger.hasAttribute("aria-describedby");
		if (popIsActive) {
			currentOverlayTrigger.click();
		}
	}, [activePanel]);

	const popover = (
		<Popover id="popover-basic">
			<section className="tooltip-section">
				<Popover.Header as="h2">{parse(headerText)}</Popover.Header>
				<Popover.Body>{parse(bodyText)}</Popover.Body>
			</section>
		</Popover>
	);

	return (
		<OverlayTrigger trigger="click" placement="auto" overlay={popover} rootClose>
			<section className="overlay-trigger" ref={overlayTrigger}>
				<h2>{props.children}</h2>
				<Button variant="secondary" className="px-2 py-0">
					{buttonText}
				</Button>
			</section>
		</OverlayTrigger>
	);
};

export const ToolTipSimple02 = ({ headerText, bodyText, buttonText }) => {
	return (
		<OverlayTrigger
			placement="auto"
			overlay={(props) => (
				<Tooltip {...props}>
					<Popover id="popover-basic">
						<Popover.Header as="h3">{headerText}</Popover.Header>
						<Popover.Body>{bodyText}</Popover.Body>
					</Popover>
				</Tooltip>
			)}
		>
			<Button type="button" className="btn btn-secondary px-2 py-0">
				i
			</Button>
		</OverlayTrigger>
	);
};
