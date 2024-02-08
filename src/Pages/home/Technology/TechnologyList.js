import { useRef, useEffect, useState } from "react";
import "./technology.scss";
import { PopoverToolTip } from "../../../Components/Popovers/Popovers.jsx";
import { gsap } from "gsap";

export const TechnologyList = ({ Technology, play, activePanel }) => {
	const ul = useRef(null);
	const [tl, setTl] = useState();

	useEffect(() => {
		setTl(gsap.timeline({}));
	}, []);

	useEffect(() => {
		if (tl) {
			play ? tl.play() : tl.reverse();
		}
	}, [play, tl]);

	useEffect(() => {
		const curUl = ul.current;
		const li = [...curUl.querySelectorAll("li")];
		if (tl) {
			tl.fromTo(
				li,
				{
					xPercent: 30,
					opacity: 0,
				},
				{
					xPercent: 0,
					opacity: 1,
					stagger: 0.1,
					duration: 0.5,
				}
			);

			return () => {
				tl.kill();
			};
		}
	}, [tl]);

	return (
		<section className="technology">
			<ul ref={ul} className="technology--ul">
				{Technology.items.map &&
					Technology.items.map((listItem, i) => {
						// toolTip has header
						if (listItem.toolTipHeader !== undefined && listItem.popup !== undefined) {
							return (
								<li key={listItem.id} className="technology--li has-tooltip">
									<PopoverToolTip
										headerText={listItem.toolTipHeader}
										bodyText={listItem.popup}
										buttonText="i"
										activePanel={activePanel}
									>
										{listItem.text}
									</PopoverToolTip>
								</li>
							);
						} else {
							return (
								<li key={listItem.id} className="technology--li">
									{listItem.text}
								</li>
							);
						}
					})}
			</ul>
		</section>
	);
};
