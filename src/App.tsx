import React from 'react';
import Header from './components/header'
import LeftMenu from './components/left-menu'
import Dashboard from './components/dashboard'
import './App.scss'
import 'antd/dist/antd.css';

export default function APP () {
  return (
    <div>
      <Header />
      <Dashboard />
      <div className="main">
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="content">
        </div>
      </div>
    </div>
  )
}

