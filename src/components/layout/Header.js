import React from 'react';
import { Link, useLocation } from "react-router-dom";

import siteLogo from 'assets/images/site-logo.png';

import styles from 'assets/styles/layout/Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className ="header-container">
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img src={siteLogo} alt="site logo"/>
          </Link>
        </div>
      
        <div className={styles.navMenu}>
          <Link to="/home" className={`${styles.navLink} ${location.pathname === '/home' ? styles.active : ''}`}>HOME</Link>
          <Link to="/posts" className={`${styles.navLink} ${location.pathname.startsWith('/posts') ? styles.active : ''}`}>Posts</Link>
          <Link to="/projects" className={`${styles.navLink} ${location.pathname.startsWith('/projects') ? styles.active : ''}`}>Projects</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;