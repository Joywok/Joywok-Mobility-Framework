import React from 'react';
import { Menu, Icon } from 'antd';
import Headers from './../../../styles/Headers.css';
import { Link } from 'dva/router';

function Header({ location }) {
  console.log(location);
  return (
    <div className="header">
        <div className="network">
          <ul>
            <li className="selected">iphoto.hk</li>
            <li>土豆粉</li>
          </ul>
        </div>
        <div className="setting">
          <div className="setting_n setting_r">
            <div className="set_icon set_exit"></div>
            <div className="set_icon set_set"></div>
            <div className="set_icon set_help"></div>
          </div >
          <div className="setting_n line">&nbsp;</div>
        </div>
        <div className="setting_n setting_m">

        </div >
        <div className="setting_n setting_l">

        </div >
    </div>
  );
}

export default Header;