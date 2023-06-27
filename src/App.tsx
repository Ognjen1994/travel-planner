import "./App.scss";

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // HashRouter has been used because of GitHub Pages

import SearchForm from "./pages/SearchForm";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/search-results" element={<SearchResult />} />
      </Routes>
    </Router>
  );
};

export default App;
