import { Outlet } from "react-router-dom";
import "../Naviagtion/navigation";
import { MainNavigation } from "../Navigation/MainNavigation";
import { useResizeGallery } from "../Hooks/Resize/useResizeGallery";
import { useState } from "react";

export const Layout = (props) => {
	// PageProperties({ title: props.title, id: props.id });

	const [hasMaxWidth900, setHasMaxWidth] = useState(false);
	useResizeGallery({ delayTime: 300, maxWidth: 900, setHasMaxWidth });

	return (
		<>
			<header id="main-header">
				<MainNavigation hasMaxWidth900={hasMaxWidth900} />
			</header>
			<Outlet context={hasMaxWidth900} />
		</>
	);
};
