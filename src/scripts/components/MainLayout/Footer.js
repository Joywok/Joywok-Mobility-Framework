import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import footers from './Footer.css';

function Footer({ location }) {
  return (
    <div className={footers.footer}>create by joywok</div>
  );
}

export default Footer;