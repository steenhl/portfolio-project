const data = [
	{
		id: "panel-1",
		namedId: "night-landscape",
		panelId: 1,
		linkText: "",
		linkHref: "#panel-1",
		class: "panel-1",
		header: "Portfolio",
		subheading: "En udforskning af frontend teknologi",
		p: "Udsigten fra mit køkken vindue",
		svg: "NightLandscape",
		list: {
			header: "Forklaring",
			items: [
				{
					id: "FR01",
					text: "Forsidens struktur",
					class: "fr-list-item",
					toolTipHeader: "Sektioner og link",
					popup:
						"<p><strong>Siden er opdel i en række sectioner,</strong> som hver især formidler en stemning gennem grafik og animation.</p><p><strong>Nogen af sectionerne har link</strong> til projekter som jeg har skabt gennem tiden og der kommer løbende flere til</p>",
				},
				{
					id: "FR02",
					text: "Animation",
					class: "fr-list-item",
					toolTipHeader: "Animation",
					popup:
						"<p><strong>Animation, video og bevægelse</strong> er nogen af de stærkeste virkemidler vi kan bruge i et kommunikationsflow og et vigtigt værktøj i enhver markedsføring.</p><p><strong>På forsiden</strong> har jeg udforsket Animations frameworket GSAP, som stort set kan animere alt.</p>",
				},
				{
					id: "FR03",
					text: "Canvas",
					class: "fr-list-item",
					toolTipHeader: "Canvas",
					popup:
						"<p>De flyvende og interaktive fugle i den første sektion er skabt ved hjælp en teknik som kaldes canvas.</p><p><strong>Canvas grafik</strong> skabes ved hjælp af programmeringssproget JavaScript og kan direkte ændres hvis der er brug for det.</p><p>Fuglene i den første sektion interagerer med brugerens cursor og ændre fart og placering, hvilket viser styrken i denne teknik</p>",
				},
				{
					id: "V04",
					text: "React",
					class: "vote-technology-list-item",
					toolTipHeader: "REACT",
					popup:
						"<h3>Komponentbaseret</h3><p>React er et komponentbaseret JavaScript-bibliotek til opbygning af brugergrænseflader</p><h3>Indkapsling</h3><p>Med React kan du opbygge indkapslede komponenter, der styrer deres egen tilstand.</p><p>Hver enkelt komponent kan genbruges i andre komponenter og danne mere komplekse brugergrænseflader.</p><p>Hvis de underliggende data for et komponent ændres, vil React opdatere det pågældende komponent og afspejle denne ændring i browseren.</p>",
				},
			],
		},
	},

	{
		id: "panel-2",
		namedId: "gallerys",
		panelId: 2,
		linkText: "Se Billede gallerierne",
		linkHref: "#panel-2",
		pageLink: "/Gallery",
		class: "panel-2",
		header: "Responsivt billedgalleri",
		subheading: "Swiper og Masonry",
		p: "Responsivt billedgalleri, skifter mellem to forskellige former for gallerier. Slider galleri ved mobil størrelse og Masonry galleri ved desktop størrelse",
		images: "Gallery",
		list: {
			header: "Frontend teknologi",
			className: "gallery-technology-list-wrapper",
			items: [
				{
					id: "V01",
					text: "Masonry gallery",
					toolTipHeader: "Masonry gallery",
					popup:
						"<p><strong>Masonry</strong> er et JavaScript billedgalleri.</p> <p>Det fungerer ved at placere de enkelte billeder optimalt i forhold til deres størrelse og den plads som der er til rådighed.</p> <p>Når brugeren ændrer på størrelsen af vinduet, flyttes der rundt på placeringen af de enkelte billeder, hvis der er behov for det</p>",
					class: "vote-technology-list-item",
				},
				{
					id: "V02",
					text: "Swiper gallery",
					toolTipHeader: "Swiper gallery",
					popup:
						"<p><strong>Mobil tilpasning</strong> af et billedgalleri, bygges som oftest ud fra en teknik, hvor de enkelte billeder bliver opstillet i horisontal række, hvor synsfeltet er afgrænset af en ramme som kun viser et lille udsnit af hele rækken.</p> <p>Brugeren kan nu navigere mellem de enkelte billeder ved at skyder rækkens horisontale placering og derved afdække de næste billeder.</p> <p><strong>Swiper</strong> er et JavaScript billedgalleri som er bygget ud fra ovenstående tanker og med mobiltilpasning i fokus</p>",
					class: "vote-technology-list-item",
				},
			],
		},
	},
	{
		id: "panel-3",
		namedId: "rick-and-morty",
		panelId: 3,
		linkText: "Gå til siden Rick and Morty",
		linkHref: "#panel-3",
		class: "panel-3",
		pageLink: "/RM",
		header: "Rick and Morty",
		subheading: "Rick and Morty",
		p: "Rick and Morty er en animeret tegnefilme, som følger Rick Sanchez, en super videnskabsmand og hans letpåvirkelige barnebarn Morty Smiths eventyr ",
		list: {
			header: "Frontend teknologi",
			className: "rm-technology-list-wrapper",
			items: [
				{
					id: "RM01",
					text: "GraphQL",
					class: "rm-list-item",
					toolTipHeader: "GraphQL",
					popup:
						"<p><strong>GraphQL</strong> stammer fra Facebook som gjorde det offentligt tilgængeligt i 2015 og siden da har GraphQL vundet betydelig udbredelse som en integrationsteknologi der kan supplere eller erstatte REST API’er.</p> <p>GraphQL løser det centrale problem ved REST (og Soap), at klienten ikke selv kan bestemme hvor mange associerede data den modtager fra serveren.</p> <p> Her tilbyder GraphQL en elegant løsning i form af en generel mekanisme hvor en server kan udstille en <strong>graf</strong> (en samling af associerede objekter), som klienter kan undersøge, læse, opdatere og abonnere på via HTTP og JSON.</p>",
				},
				{
					id: "RM02",
					text: "Apollo Server",
					class: "rm-list-item",
					toolTipHeader: "Apollo",
					popup:
						"<p><strong>Apollo Client</strong> er et omfattende tilstandsadministrationsbibliotek for JavaScript, der giver dig mulighed for at administrere både lokale og eksterne data med GraphQL.</p> <p>Brug det til at hente, cache og ændre applikationsdata, alt imens du automatisk opdaterer din brugergrænseflade.</p>",
				},
				{
					id: "RM03",
					text: "Bootstrap",
					class: "rm-list-item",
					toolTipHeader: "Bootstrap",
					popup:
						"<p><strong>Bootstrap</strong> er et gratis og open source CSS-framework som understøtter udviklingen af responsivt design og genbrugelige komponenter.</p> <p>Det indeholder HTML, CSS og (valgfrit) JavaScript-baserede designskabeloner til typografi, formularer, knapper, navigation og andre grænsefladekomponenter.</p>",
				},
				{
					id: "FR04",
					text: "SVG-stjerner ",
					class: "fr-list-item",
					toolTipHeader: "SVG-stjerner ",
					popup:
						"<p>Der animeres 300 svg stjerner i baggrunden.</p><p>Når man med JavaScript tilføjer elementer til siden, skal browseren bruge kraft på at optegner det nye element.</p><p> For at forhindre dette bruges en teknik ”document fragment” hvor vi oprette alle stjernerne på en gang op tilføjer dem samlet til siden</p>",
				},
				{ id: "RM05", text: "React", class: "rm-list-item" },
				{ id: "RM06", text: "React Paginate", class: "rm-list-item" },
				{ id: "RM07", text: "lodash", class: "rm-list-item" },
			],
		},
		svg: "RM",
		svgBackGround: "RM",
	},
	{
		id: "panel-4",
		namedId: "vote",
		panelId: 4,
		linkText: "Gå til siden Vote",
		linkHref: "#panel-4",
		class: "panel-4 vote",
		pageLink: "/Vote",
		header: "Vote",
		subheading: "Tilkendegiv din mening",
		p: "Du kender måske den fysiske version af denne brugertilfredsheds undersøgelse fra butikker, hvor man efter kassen mødes med teksten ’Hvordan var din kundeoplevelse?’ og tre knapper for hhv. utilfreds, mellem og glad smiley. ",
		list: {
			header: "Frontend teknologi",
			className: "vote-technology-list-wrapper",
			items: [
				{ id: "V01", text: "React", class: "vote-technology-list-item" },
				{ id: "V02", text: "react-inlinesvg", class: "vote-technology-list-item" },
				{ id: "V03", text: "Bootstrap", class: "vote-technology-list-item" },
			],
		},
		svg: "Likes",
	},

	{
		id: "panel-5",
		namedId: "contact",
		panelId: 5,
		linkHref: "#panel-5",
		class: "panel-5",
		header: "Kontakt information og baggrund",
		eMail: "mailto:sthl@youmail.dk",
		eMailAdress: "sthl@youmail.dk",
		tlf: "45:26802420",

		list: {
			header: "CV",
			className: "vote-technology-list-wrapper",
			items: [
				{
					id: "V01",
					text: "Portfolio",
					toolTipHeader: "Portfolio",
					popup:
						"<p>Udvikling af portfolio over forskellige projekter som jeg har kodet gennem tiden.</p> <p>På forsiden, er fokus lagt på animation og interaktion gennem teknologier som GSAP og React.</p><p><strong>GSAP</strong> (GreenSock Animation Platform) er et professional JavaScript animations fremwork, der stort set kan animere alt webindhold som du smider i hoved på det</p><p><strong>React</strong> er et open source, Javascript-bibliotek, udviklet og vedligeholdt af Facebook. </p>",
					class: "vote-technology-list-item",
				},
				{
					id: "V02",
					text: "Feriepartner",
					toolTipHeader: "Feriepartner",
					popup:
						"<p>Jeg har gennem en årrække arbejdet som frontend udvikler hos feriepartner, hvor jeg var ansvarlig for udviklingen og vedligeholdelsen af feriepartner.dk.</p> <p>Hos <a href='https://www.feriepartner.dk/'>feriepartner </a>arbejdede jeg ud fra et <strong>Agilt</strong> mindset og med <strong>Scrum</strong> som omdrejningspunkt.</p> <p>Jeg samarbejdede med backend udviklere, product owner og grafikere i forbindelse med opgaveløsninger og den agile udviklingsproces</p>",
					class: "vote-technology-list-item",
				},
				{
					id: "V03",
					text: "Aarhus TECH",
					toolTipHeader: "Aarhus TECH",
					popup:
						"<strong>Faglærer</strong> på mediegrafiker og webudvikler uddannelserne <p><strong>Fagområde:</strong> HTML, CSS, Wordpress, JavaScript, jQuery, GSAP, UX, UI, interaktionsdesign, animationsdesign, responsive web design, navigations design, samt diverse relevante grafiske programmer inden for web-udvikling.</p>",
					class: "vote-technology-list-item",
				},
				{
					id: "V04",
					text: "Specialfag.dk",
					toolTipHeader: "Tildmeldings portal",
					popup:
						"<strong>Mediegrafikkernes Specialefag</strong><p>Udvikling af tilmeldingsportal til Mediegrafikernes specialfag (2017), både frontend og backend.</p> <p><strong>Teknologier:</strong> JavaScript, html, css, PHP, SQL <a href='https://specialefag.dk'>Specialefag</a></p>",
					class: "vote-technology-list-item",
				},
				{
					id: "V05",
					text: "NNTV: Videotool",
					toolTipHeader: "NNTV",
					popup:
						"Udviklingen af brugergrænseflader og interaktions design for videoportalen <a href='http://www.nntv.dk/'> http://www.videotool.dk </a>",
					class: "vote-technology-list-item",
				},
				{
					id: "V06",
					text: "Københavns tekniske skole",
					toolTipHeader: "Københavns tekniske skole",
					popup:
						"<p><strong>Faglærer</strong> på mediegrafiker og web-integrator uddannelserne</p> <strong>Fagområde:</strong> HTML, CSS, AS3, JavaScript, jQuery, PHP, MYSQL, Usability, responsive web design, navigations design, samt diverse relevante grafiske programmer inden web-udvikling.",
					class: "vote-technology-list-item",
				},
			],
		},
	},
];
export default data;
