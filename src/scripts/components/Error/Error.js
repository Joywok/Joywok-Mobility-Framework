import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import errors from './Error.css';

function Error({ location }) {
  return (
    <div className={errors.error}>
    	这是不对的不对的不对的路由
    </div>
  );
}

export default Error;