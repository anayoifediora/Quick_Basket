import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { setContext } from "@apollo/client/link/context";

import "./App.css";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Products from '../src/pages/Products';
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import SearchResult from "./pages/SearchResult";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products  />} />
          <Route path="/products/:productId" element={<ProductPage  />} />
          <Route path="/cart" element={<CartPage  />}/>
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/search/" element={<SearchResult />} />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
