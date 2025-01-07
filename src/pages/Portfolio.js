// Portfolio.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/styles/pages/Portfolio.css';

import siteLogo from 'assets/images/site-logo.png';

import emailIcon from 'assets/images/email-icon.png';
import linkedinIcon from 'assets/images/linkedin-icon.png';
import githubIcon from 'assets/images/github-icon.png';
import instagramIcon from 'assets/images/instagram-icon.png';

import SkillLogoData from 'components/data/SkillLogoData';

import vsqdThumbnail from 'assets/images/vsqd-thumbnail.png';

function Portfolio() {
  return (
    <div className="home-container">
      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <img src={siteLogo} alt="site logo" className="site-logo" />
          <h1 className="about-title">Hi! I'm a Developer</h1>
          <p className="about-description">
            I am a <span className="highlight">full-stack developer</span> with over{' '}
            <span className="highlight">9 years of experience</span>, specializing in business analysis
            and development across diverse industries. I am dedicated to building web applications
            that align seamlessly with business objectives. From analysis and design to coding, I ensure
            that every project I undertake is closely tailored to meet the unique needs of each business.
          </p>
          <div className="social-links">
            <a href="mailto:acc.work.freelancer@example.com" aria-label="Email">
              <img src={emailIcon} alt="Email" className="social-icon email-icon" />
            </a>
            <a href="https://www.linkedin.com/in/--acc-software/" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon linkedin-icon" />
            </a>
            {/* <a href="https://github.com" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" className="social-icon github-icon" />
            </a> */}
            <a href="https://www.instagram.com/__acc_software/" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" className="social-icon instagram-icon" />
            </a>
        </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-header">Skills</h2>
        <div className="skills-container">
          <div className="skills-category frontend">
            <h3>Frontend Development</h3>
            <div className="skills-list">
              <div className="skill-item">
                <img src={SkillLogoData.reactLogo} alt="React" />
                React
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.cssLogo} alt="CSS" />
                CSS
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.htmlLogo} alt="HTML" />
                HTML
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.javascriptLogo} alt="Javascript" />
                JavaScript
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.jQueryLogo} alt="jQuery" />  
                JQuery
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.jspLogo} alt="JSP" />
                JSP
              </div>
            </div>
          </div>
          <div className="skills-category backend">
            <h3>Backend Development</h3>
            <div className="skills-list">
              <div className="skill-item">
                <img src={SkillLogoData.javaLogo} alt="Java" />
                Java
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.springLogo} alt="Spring" />  
                Spring
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.oracleLogo} alt="Oracle" />  
                Oracle
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.postgresqlLogo} alt="PostgreSQL" />  
                PostgreSQL
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.mybatisLogo} alt="MyBatis" />  
                MyBatis
              </div>
              <div className="skill-item">
                <img src={SkillLogoData.redisLogo} alt="Redis" />  
                Redis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side Projects Section */}
      <section className="projects-section">
        <h2 className="section-header">Side Projects</h2>
        
        <div className="project-card">
          <img src={vsqdThumbnail} alt="Visual Select Query Data" />
           <div className="project-card-content">
            <h3>Visual Select Query Data</h3>
            <p>It's practicing SELECT SQL for beginner developers.</p>
          </div>
          <Link to="/project/visual-select-query-data" className="project-card-action">
            View Project
          </Link>
        </div>
        
        <div className="more-projects">
          <Link to="/project" className="explore-more-projects">
            Explore more projects
          </Link>
        </div>

      </section>
    </div>
  );

}

export default Portfolio;
