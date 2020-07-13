import React, { Component } from 'react'
import {
  Link,
  withRouter
} from "react-router-dom";
import './index.scss'

type StateType = {
  activeLink?: Number;
};

type PropType = {
  location: any;
}
interface LeftMenu {
  state: StateType;
  props: PropType;
}

class LeftMenu extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      activeLink: 0
    }
  }
  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      switch (this.props.location.pathname) {
        case '/':
          this.setState({
            activeLink: 0
          })
          break
        case '/status':
          this.setState({
            activeLink: 1
          })
          break
        case '/school':
          this.setState({
            activeLink: 2
          })
          break
        default:
          this.setState({
            activeLink: 0
          })
      }
    }
  }
  setActiveMenu(index: Number) {
    this.setState({
      activeLink: index
    }, () => {
    })
  }
  render() {
    return (
      <div className="left-menu-content">
        <ul>
          <li onClick={this.setActiveMenu.bind(this, 0)}>
            <Link to="/" className={this.state.activeLink === 0 ? "active" : ""}>数据趋势</Link>
          </li>
          <li onClick={this.setActiveMenu.bind(this, 1)}>
            <Link to="/status" className={this.state.activeLink === 1 ? "active" : ""}>数据情况</Link>
          </li>
          <li onClick={this.setActiveMenu.bind(this, 2)}>
            <Link to="/school" className={this.state.activeLink === 2 ? "active" : ""}>高校节点分布</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(LeftMenu);