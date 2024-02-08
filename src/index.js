// import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { ScrollTop } from "./router/ScrollTop";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
	uri: "https://rickandmortyapi.com/graphql/",
	cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	// <StrictMode>
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>
	// </StrictMode>
);
