import React from 'react';
import { connect } from 'dva';
import styles from './../../styles/IndexPage.css';
import MainLayout from './../components/MainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className="normal">
        <h1 className="title">Yay! Welcome to dva!</h1>
        <div className="welcome" />
        <h1 className="zhailei">测试哦</h1>
        <ul className="list">
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
