import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Portfolio from './pages/Portfolio';
import Project from './pages/Project';
import VisualSelectQueryData from './pages/projects/VisualSelectQueryData';

import ScrollToTop from "components/common/ScrollToTop";

import 'assets/styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="root-container">
        <Header />
        <ScrollToTop />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/portfolio" />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/visual-select-query-data" element={<VisualSelectQueryData />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;