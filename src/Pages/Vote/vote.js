import "../../fonts/fontFace.css";
// import "normalize";
import SVG from "react-inlinesvg";
import data from "./data.json";
import { useState, useRef } from "react";
import "../pages.scss";

import "./vote.scss";
import { PageProperties } from "../pagesProperties/pagesProperties";

export default function Vote(props) {
	PageProperties({ title: props.title, id: props.id });
	document.title = props.title;
	const inputRef = useRef(null);

	const { mainText } = data;
	const [useName, setName] = useState([]);

	const [useLikes, setLikes] = useState([
		{
			_id: "1",
			value: "0",
			svgClassName: "far fa-frown>",
			name: "frown",
			color: "#BF2B21",
			svgFolder: "assets/svg",
			svgFileName: "frown-regular.svg",
			svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 650' preserveAspectRatio='none'> <path id='background' fill='red' d='M600.05 300.05q0-124.3-87.9-212.15Q424.3.05 300.05.05 175.75.05 87.9 87.9.05 175.75.05 300.05q0 124.25 87.85 212.1 87.85 87.9 212.15 87.9 124.25 0 212.1-87.9 87.9-87.85 87.9-212.1Z' transform='translate(-.05 -.05) scale(1.08333)'/> <path id='head' fill='#FFF' d='M421.55 96.5Q375.45 77 325 77q-50.45 0-96.55 19.5-44.5 18.8-78.8 53.15-34.35 34.3-53.15 78.8Q77 274.55 77 325q0 50.45 19.5 96.55 18.8 44.5 53.15 78.85 34.3 34.3 78.8 53.1Q274.55 573 325 573q50.45 0 96.55-19.5 44.5-18.8 78.85-53.1 34.3-34.35 53.1-78.85Q573 375.45 573 325q0-50.45-19.5-96.55-18.8-44.5-53.1-78.8-34.35-34.35-78.85-53.15M325 125q40.6 0 77.75 15.75 35.9 15.2 63.6 42.9 27.7 27.7 42.9 63.55Q525 284.35 525 325t-15.75 77.8q-15.2 35.85-42.9 63.55-27.7 27.7-63.6 42.9Q365.6 525 325 525q-40.65 0-77.8-15.75-35.9-15.2-63.6-42.9-27.7-27.7-42.85-63.55Q125 365.65 125 325q0-40.6 15.75-77.75 15.2-35.9 42.85-63.6 27.7-27.7 63.6-42.9Q284.35 125 325 125Z'/> <path id='mouth' fill='#FFF' d='M382.3 385.75Q355.15 373 325 373t-57.3 12.75q-27.15 12.7-46.55 35.9-6.35 7.65-5.45 17.5.9 9.9 8.6 16.25 7.65 6.3 17.55 5.45 9.9-.9 16.25-8.55 12.45-14.95 29.95-23.15 17.55-8.25 36.95-8.25 19.4 0 36.9 8.2t29.95 23.2q6.25 7.45 15.95 8.5 10 1.1 17.85-5.4 7.65-6.35 8.55-16.25.85-9.85-5.45-17.5-19.3-23.2-46.45-35.9Z'/> <path id='right_eye' fill='#FFF' d='M437 277q0-13.25-9.35-22.6-9.4-9.4-22.65-9.4-13.3 0-22.65 9.4Q373 263.75 373 277q0 13.3 9.35 22.65Q391.7 309 405 309q13.3 0 22.65-9.35Q437 290.3 437 277Z'/> <path id='left_eye' fill='#FFF' d='M277 277q0-13.25-9.4-22.6-9.35-9.4-22.6-9.4-13.25 0-22.65 9.4Q213 263.75 213 277q0 13.3 9.35 22.65Q231.75 309 245 309q13.25 0 22.6-9.35 9.4-9.4 9.4-22.65Z'/> </svg>",
		},
		{
			_id: "2",
			value: "0",
			svgClassName: "far fa-meh>",
			name: "meh",
			color: "#A89914",
			svgFolder: "assets/svg",
			svgFileName: "meh-regular.svg",
			svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 650' preserveAspectRatio='none'> <path id='background' fill='#CCBF0F' d='M645.8 180q-88.7-88.7-214.15-88.7T217.5 180q-88.7 88.7-88.7 214.15t88.7 214.15Q306.2 697 431.65 697t214.15-88.7q88.7-88.7 88.7-214.15T645.8 180Z' transform='matrix(1.07312 0 0 1.0732 -138.2 -98)'/> <path id='head' fill='#FFF' d='M446.55 121.5Q400.45 102 350 102q-50.45 0-96.55 19.5-44.5 18.8-78.8 53.15-34.35 34.3-53.15 78.8Q102 299.55 102 350q0 50.45 19.5 96.55 18.8 44.5 53.15 78.85 34.3 34.3 78.8 53.1Q299.55 598 350 598q50.45 0 96.55-19.5 44.5-18.8 78.85-53.1 34.3-34.35 53.1-78.85Q598 400.45 598 350q0-50.45-19.5-96.55-18.8-44.5-53.1-78.8-34.35-34.35-78.85-53.15M350 150q40.6 0 77.75 15.75 35.9 15.2 63.6 42.9 27.7 27.7 42.9 63.55Q550 309.35 550 350t-15.75 77.8q-15.2 35.85-42.9 63.55-27.7 27.7-63.6 42.9Q390.6 550 350 550q-40.65 0-77.8-15.75-35.9-15.2-63.6-42.9-27.7-27.7-42.85-63.55Q150 390.65 150 350q0-40.6 15.75-77.75 15.2-35.9 42.85-63.6 27.7-27.7 63.6-42.9Q309.35 150 350 150Z' transform='translate(-25 -25)'/> <path id='mouth' fill='#FFF' d='M262 414q-9.9 0-16.95 7.05Q238 428.1 238 438q0 9.95 7.05 16.95Q252.1 462 262 462h176q9.9 0 16.95-7.05 7.05-7 7.05-16.95 0-9.9-7.05-16.95Q447.9 414 438 414H262Z' transform='translate(-25 -25)'/> <path id='right_eye' fill='#FFF' d='M430 270q-13.3 0-22.65 9.4Q398 288.75 398 302q0 13.3 9.35 22.65Q416.7 334 430 334q13.3 0 22.65-9.35Q462 315.3 462 302q0-13.25-9.35-22.6-9.4-9.4-22.65-9.4Z' transform='translate(-25 -25)'/> <path id='left_eye' fill='#FFF' d='M270 270q-13.25 0-22.65 9.4Q238 288.75 238 302q0 13.3 9.35 22.65Q256.75 334 270 334q13.25 0 22.6-9.35 9.4-9.4 9.4-22.65 0-13.25-9.4-22.6-9.35-9.4-22.6-9.4Z' transform='translate(-25 -25)'/> </svg>",
		},
		{
			_id: "3",
			value: "0",
			svgClassName: "far fa-smile>",
			name: "smile",
			color: "#259A1A",
			svgFolder: "assets/svg",
			svgFileName: "smile-regular.svg",
			svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 650' preserveAspectRatio='none'> <path id='background' fill='#19A320' d='M600.05 300.7q0-124.3-87.9-212.15Q424.3.7 300.05.7 175.75.7 87.9 88.55.05 176.4.05 300.7q0 124.25 87.85 212.1 87.85 87.9 212.15 87.9 124.25 0 212.1-87.9 87.9-87.85 87.9-212.1Z' transform='translate(-.05 -.75) scale(1.08333)'/> <path id='head' fill='#FFF' d='M446.55 121.5Q400.45 102 350 102q-50.45 0-96.55 19.5-44.5 18.8-78.8 53.15-34.35 34.3-53.15 78.8Q102 299.55 102 350q0 50.45 19.5 96.55 18.8 44.5 53.15 78.85 34.3 34.3 78.8 53.1Q299.55 598 350 598q50.45 0 96.55-19.5 44.5-18.8 78.85-53.1 34.3-34.35 53.1-78.85Q598 400.45 598 350q0-50.45-19.5-96.55-18.8-44.5-53.1-78.8-34.35-34.35-78.85-53.15M350 150q40.6 0 77.75 15.75 35.9 15.2 63.6 42.9 27.7 27.7 42.9 63.55Q550 309.35 550 350t-15.75 77.8q-15.2 35.85-42.9 63.55-27.7 27.7-63.6 42.9Q390.6 550 350 550q-40.65 0-77.8-15.75-35.9-15.2-63.6-42.9-27.7-27.7-42.85-63.55Q150 390.65 150 350q0-40.6 15.75-77.75 15.2-35.9 42.85-63.6 27.7-27.7 63.6-42.9Q309.35 150 350 150Z' transform='translate(-25 -25)'/> <path id='mouth' fill='#FFF' d='M266 406.65q-6.35-7.65-16.3-8.55-9.9-.9-17.55 5.4-7.6 6.35-8.5 16.3-.9 9.9 5.4 17.5 22.55 27 54.2 41.8 31.6 14.8 66.75 14.8 35.1 0 66.7-14.8 31.65-14.8 54.15-41.8 6.4-7.65 5.5-17.55-.9-9.9-8.6-16.25-7.6-6.3-17.45-5.4-9.95.9-16.3 8.55-15.6 18.75-37.6 29.05T350 446q-24.45 0-46.4-10.25-22.05-10.3-37.6-29.1Z' transform='translate(-25 -25)'/> <path id='right_eye' fill='#FFF' d='M430 270q-13.3 0-22.65 9.4Q398 288.75 398 302q0 13.3 9.35 22.65Q416.7 334 430 334q13.3 0 22.65-9.35Q462 315.3 462 302q0-13.25-9.35-22.6-9.4-9.4-22.65-9.4Z' transform='translate(-25 -25)'/> <path id='left_eye' fill='#FFF' d='M270 270q-13.25 0-22.65 9.4Q238 288.75 238 302q0 13.3 9.35 22.65Q256.75 334 270 334q13.25 0 22.6-9.35 9.4-9.4 9.4-22.65 0-13.25-9.4-22.6-9.35-9.4-22.6-9.4Z' transform='translate(-25 -25)'/> </svg>",
		},
	]);

	const [userName, setUserName] = useState("");
	const [userNameOk, setValidateName] = useState(null);

	const submitForm = (e) => {
		e.preventDefault();
	};
	// simple test for name
	const validateName = (name) => {
		const regName = /^([æøåÆØÅa-zA-Z ]){2,30}$/;
		return regName.test(name);
	};

	const handelUserName = (e) => {
		let nameValue = e.target.value;
		let ok = validateName(nameValue);
		if (ok) {
			e.target.className = "ok";
			setUserName(nameValue);
			setValidateName(true);
		} else {
			e.target.className = "error";
			setUserName(nameValue);
			setValidateName(false);
		}
	};

	const handelVote = (e, like) => {
		e.preventDefault();

		if (userNameOk) {
			// new useLink Array
			const newLike = [...useLikes];
			let index = like._id - 1;
			newLike[index].value++;
			setLikes(newLike);

			// reset username input felt and validation
			setUserName("");
			setValidateName(false);

			// DOM input element
			inputRef.current.className = "";
			//inputRef.current.focus();

			// update state useName (array)
			let newUseName = [...useName];
			newUseName.push({ name: userName, color: like.color });

			setName(newUseName);
		} else {
			inputRef.current.click();
			inputRef.current.focus();
		}
	};

	const handelVoteKeyDown = (e, like) => {
		if (e.keyCode === 13) {
			handelVote(e, like);
		}
	};

	const handelReset = (e) => {
		e.preventDefault();

		// rest likes count
		const newLike = [...useLikes];
		newLike.forEach((like) => {
			like.value = 0;
		});
		setLikes(newLike);

		// reset name
		setName([]);
		setUserName("");
		setValidateName(false);

		// Reset DOM input element className
		inputRef.current.className = "";
	};

	return (
		<div className="vote">
			<div className="vote-main">
				<section className="likes">
					{mainText &&
						mainText.map((main) => (
							<div className="likes__header-wrapper" key={main._id}>
								<section>
									<h2 className="global-paddin-top">{main.mainHeader} </h2>
									<p>{main.mainPragraf}</p>
								</section>
							</div>
						))}
					<form className="likes__form-wrapper" action="" onSubmit={(e) => submitForm(e)}>
						<section className="likes__form-wrapper__section-vote">
							<label className="likes__form-wrapper__label">
								<input
									ref={inputRef}
									value={userName}
									placeholder="indtast dit navn"
									onChange={(e) => {
										handelUserName(e);
									}}
									onClick={(e) => {
										handelUserName(e);
									}}
									type="text"
									id="userName"
									name="userName"
									minLength="2"
									size="10"
									autoComplete="username"
								/>
							</label>

							<ul className="emojiWrapper">
								{useLikes.map((like) => (
									<li className="emojiItem" key={like._id}>
										<button className="btn btn-primary btn-lg" onKeyDown={(e) => handelVoteKeyDown(e, like)}>
											<div className="emojiItemWrapper">
												<SVG className="emojiSvg" src={like.svg} onClick={(e) => handelVote(e, like)} />
												<span className="emojiText">{like.value}</span>
											</div>
										</button>
									</li>
								))}
							</ul>
						</section>
						<section className="likes__form-wrapper__section-name">
							<div className="likes__form-wrapper__section-name__wrapper">
								<ul>
									{useName.map((thisName, index) => (
										<li style={{ color: thisName.color }} key={index}>
											{thisName.name}
										</li>
									))}
								</ul>
							</div>
							<button
								className="btn btn-primary btn-lg btn-reset"
								onClick={(e) => {
									handelReset(e);
								}}
							>
								Nulstil
							</button>
						</section>
					</form>
				</section>
			</div>
		</div>
	);
}
