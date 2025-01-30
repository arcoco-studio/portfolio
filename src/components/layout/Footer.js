import React from 'react';

import siteLogo from 'assets/images/site-logo.png';

import styles from 'assets/styles/layout/Footer.module.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerText}>© 2025 <img src={siteLogo} alt="site logo" className={styles.footerSiteLogo}/>. All Rights Reserved.</span>
          <a href="https://hits.sh/arcoco-studio.github.io/portfolio/home/">
            <img
              alt="Hits"
              src="https://hits.sh/arcoco-studio.github.io/portfolio/home.svg?style=for-the-badge&color=ff5722"
              className={styles.hitsCounter}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;