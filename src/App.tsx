import "./App.scss";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
