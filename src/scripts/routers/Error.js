import React from 'react';
import { connect } from 'dva';
import styles from './../../styles/Error.css';
import ErrorComponent from './../components/Error/Error';
import MainLayout from './../components/MainLayout/MainLayout';


function Users() {
  return (
  	<MainLayout location={location}>
	    <div className={styles.normal}>
	      <ErrorComponent />
	    </div>
    </MainLayout>
  );
}

// function mapStateToProps() {
//   return {};
// }

// export default connect(mapStateToProps)(Users);
export default connect()(Users);
