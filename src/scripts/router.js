import React from 'react';
import { Router, Route,hashHistory} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Error from "./routes/Error";

// function RouterConfig({ hashHistory }) {
//   return (
//     <Router history={hashHistory}>
//       <Route path="/" component={IndexPage} />
//       <Route path="/users" />
//       <Route path="*"/>
//     </Router>
//   );
// }

// export default RouterConfig;
module.exports = function({hashHistory}) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="*"component={Error} />
    </Router>
  );
};


