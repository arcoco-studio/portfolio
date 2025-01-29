import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate  } from "react-router-dom";
import styles from 'assets/styles/layout/NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/',{ replace: true});
        }, 3000); // Redirect to main page after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.notfound}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Redirecting to main...</p>
            <p>
                If you are not redirected, <Link to="/">click here</Link>.
            </p>
        </div>
    );
}

export default NotFound;