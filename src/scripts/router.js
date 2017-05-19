import React from 'react';
import { Router, Route,hashHistory} from 'dva/router';
import IndexPage from './routers/IndexPage';
import Error from "./routers/Error";

module.exports = function({hashHistory}) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="*"component={Error} />
    </Router>
  );
};


