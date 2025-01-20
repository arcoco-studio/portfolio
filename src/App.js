import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import Portfolio from './pages/Portfolio';
import PostList from './pages/PostList';
import PostDetail from 'pages/PostDetail';
import Projects from './pages/Projects';
import VisualSelectQueryData from './pages/projects/VisualSelectQueryData';

import ScrollToTop from "components/common/ScrollToTop";

import 'assets/styles/App.css';

function App() {
  return (
    <BrowserRouter basename='portfolio' future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="root-container">
        <Header />
        <ScrollToTop />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Portfolio />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/visual-select-query-data" element={<VisualSelectQueryData />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;