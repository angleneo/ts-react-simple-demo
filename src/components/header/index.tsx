import React, { Component } from 'react'
import './index.scss'

type StateType = {
  date: String;
  time: any;
};

interface Header {
  state: StateType;
}
let timeId: any;

class Header extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + new Date().getDate(),
      time: new Date()
    }
  }
  componentDidMount () {
    timeId = setInterval(() => {
      this.tick()
    }, 1000)
  }
  tick () {
    this.setState({
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + new Date().getDate(),
      time: new Date()
    })
  }
  componentWillUnmount () {
    clearInterval(timeId)
  }
  render () {
    return (
      <div className="header">
        <div className="top">
          <div className="dashboard">
            <svg width="33" className="icon" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.1134 8.83281C22.0712 6.79005 19.3561 5.66553 16.4678 5.66553C13.5799 5.66553 10.8642 6.79012 8.82277 8.83281C6.78023 10.8751 5.65527 13.5901 5.65527 16.478C5.65527 16.9751 6.05895 17.3791 6.55634 17.3791C7.05418 17.3791 7.45742 16.9751 7.45742 16.478C7.45742 14.0714 8.39494 11.8092 10.097 10.1069C11.799 8.40469 14.0612 7.4676 16.4678 7.4676C18.8749 7.4676 21.1376 8.40469 22.8394 10.1069C24.5411 11.8092 25.4783 14.0714 25.4783 16.478C25.4783 16.9751 25.8822 17.3791 26.3793 17.3791C26.8774 17.3791 27.2804 16.9751 27.2804 16.478C27.2803 13.5905 26.1558 10.8755 24.1134 8.83281Z" fill="white" />
              <path d="M16.4679 16.0275C16.3447 16.0275 16.2228 16.0402 16.1045 16.0645L13.5373 13.1766C13.2069 12.8043 12.6371 12.7709 12.2653 13.1018C11.8932 13.4322 11.8595 14.0015 12.1905 14.3733L14.7634 17.2678C14.7036 17.4499 14.6649 17.64 14.6658 17.8375C14.668 18.3188 14.8577 18.7702 15.199 19.1091C15.5387 19.4461 15.9892 19.6318 16.4684 19.6318C16.9528 19.6318 17.4068 19.4425 17.7482 19.0981C18.4469 18.3919 18.442 17.2489 17.7367 16.5502C17.57 16.3839 17.3721 16.2521 17.1544 16.1624C16.9366 16.0727 16.7033 16.0269 16.4679 16.0275Z" fill="white" />
              <path d="M26 26.0917C28.47 23.6451 30 20.2512 30 16.5C30 9.04416 23.9558 3 16.5 3C9.04416 3 3 9.04416 3 16.5C3 19.9912 4.3252 23.1728 6.5 25.5693" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            DASHBOARD
          </div>
          <div className="logo">
            <a href="https://dev.acemap.info">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className="admin">
          <div className="admin-info">
            <div className="avatar"></div>
            <div className="name">管理员</div>
            <div className="date">{this.state.date}</div>
            <div className="time">{this.state.time.toLocaleTimeString()}</div>
            <div className="log-out">LOG OUT</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header