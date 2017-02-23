import React from 'react';
import styles from './../../../styles/MainLayout.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <Nav/>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MainLayout;