import React, { Component } from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../../home/index'
import Status from '../../status'
import School from '../../school'
import './index.scss'
import { getTotal } from '../../api/index'


type StateType = {
  htmlTotal: Number;
  paperTotal: Number;
  pdfTotal: Number;
  increasedhtmlTotal: Number;
  increasedpaperTotal: Number;
  increasedpdfTotal: Number;
};

interface Dashboard {
  state: StateType;
}

class Dashboard extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      htmlTotal: 1000,
      paperTotal: 1000,
      pdfTotal: 1000,
      increasedhtmlTotal: 100,
      increasedpaperTotal: 200,
      increasedpdfTotal: 300
    }
  }
  componentDidMount() {
    this.getTotalData()
  }
  getTotalData() {
    getTotal(null).then(res => {
      if (res.data.data) {
        let data = res.data.data
        this.setState({
          htmlTotal: data.htmlTotal,
          paperTotal: data.paperTotal,
          pdfTotal: data.pdfTotal,
          increasedhtmlTotal: data.increasedhtmlTotal,
          increasedpaperTotal: data.increasedpaperTotal,
          increasedpdfTotal: data.increasedpdfTotal
        })
      }
    })
  }

  stringFilter(count: Number) {
    let num = (count || 0).toString(),
      result = "";
    while (num.length > 3) {
      result = "," + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  }

  render() {
    return (
      <div className="dashboard-components">
        <section className="total-info">
          <div className="item">
            <h2>HTML</h2>
            当前总数
            <p className="yellow">{this.stringFilter(this.state.htmlTotal)}</p>

            <div className="item-increase">
              今日新增
            <p className="yellow">{this.stringFilter(this.state.increasedhtmlTotal)}</p>
            </div>
          </div>
          <div className="item">
            <h2>PAPER</h2>
            当前总数
            <p className="red">{this.stringFilter(this.state.paperTotal)}</p>

            <div className="item-increase">
              今日新增
            <p className="red">{this.stringFilter(this.state.increasedpaperTotal)}</p>
            </div>
          </div>
          <div className="item">
            <h2>PDF</h2>
            当前总数
            <p className="blue">{this.stringFilter(this.state.pdfTotal)}</p>

            <div className="item-increase">
              今日新增
            <p className="blue">{this.stringFilter(this.state.increasedpdfTotal)}</p>
            </div>
          </div>
        </section>
        <section className="router-data">

          <Switch>
            <Route exact path="/" component={Home}>
            </Route>
            <Route path="/status" component={Status}>
            </Route>
            <Route path="/school" component={School}>
            </Route>
          </Switch>

        </section>
      </div>
    )
  }
}


export default Dashboard;