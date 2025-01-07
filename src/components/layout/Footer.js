import React from 'react';

import siteLogo from 'assets/images/site-logo.png';

import styles from 'assets/styles/layout/Footer.module.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className={styles.footer}>
      © 2025 <img src={siteLogo} alt="site logo"/>. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Footer;