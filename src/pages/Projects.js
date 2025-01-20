import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/styles/pages/Projects.css';


import projectData from 'components/data/ProjectsData';


function Projects() {
  return (
    <div className="project-page">
      <header className="project-header">
        <h1>Projects</h1>
        <p>Explore the software I’ve developed.</p>
      </header>
      <div className={`project-list ${projectData.length <= 1 ? "single-project" : ""}`}>
        {projectData.map((project) => (
          <div className="project-card" key={project.id}>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="project-thumbnail"
            />
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={project.pageLink} className="project-action">
                View Details
              </Link>    
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;