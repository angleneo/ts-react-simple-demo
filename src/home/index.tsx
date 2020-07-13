import React, { Component } from 'react'
import './index.scss';
import { Select } from 'antd';
import { Line } from '@ant-design/charts';
import { getTrendsNames, getTrendsData } from '../api/index';
const { Option } = Select;

type StateType = {
  webList: number[];
  lineData: number[];
};

interface Home {
  state: StateType;
}

type StateLine = {
  Line: any;
};

type PropLine = {
  data: number[];
}
interface LineChart {
  state: StateLine;
  props: PropLine;
}

class LineChart extends Component {
  render () {
    let data = this.props.data
    let config: any = {
      title: {
        visible: false,
        text: '多折线图',
      },
      description: {
        visible: false,
        text: '通过回调函数指定折线颜色',
      },
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'recordAt',
      yField: 'value',
      yAxis: {
        visible: true
      },
      legend: { position: 'right-top' },
      seriesField: 'name',
      color: (d:any) => {
        switch (d) {
          case 'htmlCount':
            return '#e78717'
          case 'paperCount':
            return '#ff0000'
          default:
            return '#015e90'
        }
      },
      responsive: true,
    };

    return <Line {...config} style={{ height: 800 }} />;
  }
}

class Home extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      webList: [],
      lineData: []
    };
  }

  componentDidMount () {
    this.getNames()
    this.getChartsData("all")
  }

  handleChange (value: String) {
    this.getChartsData(value)
  }

  getNames () {
    getTrendsNames(null).then(res => {
      if (res.data.data) {
        this.setState({
          webList: res.data.data
        })
      }
    })
  }

  getChartsData (value: String) {
    let params: Object = {
      name: value
    }
    getTrendsData(params).then(res => {
      if (res.data.data) {
        this.setState({
          lineData: res.data.data
        }, () => {
        })
      }
    })
  }

  render () {
    return (
      <div className="home">
        <div className="action-bar">
          <div className="left-bar">
            <span>网站</span>
            <Select defaultValue="all" style={{ width: 370 }} onChange={this.handleChange.bind(this)} size="large">
              {this.state.webList.map((item: any, index) =>
                <Option value={item.name} key={index}>{item.name}</Option>
              )}
            </Select>
          </div>
        </div>
        <div className="charts">
          <LineChart data={this.state.lineData} />
        </div>
      </div>
    )
  }
}

export default Home