import React from 'react';
import { Menu, Icon } from 'antd';
import Headers from './Headers.css';
import { Link } from 'dva/router';

function Header({ location }) {
  console.log(location);
  return (
    <div className={Headers.header}>
        <div className={Headers.network}>
          <ul>
            <li className={Headers.selected}>iphoto.hk</li>
            <li>土豆粉</li>
          </ul>
        </div>
        <div className={Headers.setting}>
          <div className={Headers.setting_n + " " + Headers.setting_r}>
            <div className={ Headers.set_icon + " "+ Headers.set_exit}></div>
            <div className={ Headers.set_icon + " "+ Headers.set_set}></div>
            <div className={ Headers.set_icon + " "+ Headers.set_help}></div>
          </div >
          <div className={Headers.setting_n + " " + Headers.line}>&nbsp;</div>
        </div>
        <div className={Headers.setting_n + " " + Headers.setting_m}>

        </div >
        <div className={Headers.setting_n + " " + Headers.setting_l}>

        </div >
    </div>
  );
}

export default Header;