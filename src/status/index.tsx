import React, { Component } from 'react'
import { Table } from 'antd';
import './index.scss';
import { getDailyData } from '../api/index'

type StateType = {
  top?: any;
  bottom?: any;
  total?: number;
  orderBy?: string;
  sort?: number;
  tableData?: {
    name?: String, 
    proxy?: String, 
    runTime?: Number,
    startAt?: String,
    status?: Boolean
  }[];
};


interface Status {
  state: StateType;
}

class Status extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      top: 'none',
      bottom: 'bottomCenter',
      total: 100,
      tableData: [],
      orderBy: 'htmlCount',
      sort: 1
    };
  }

  componentDidMount () {
    this.getDaily(1, 'htmlCount', -1)
  }
  handleChange (page: any) {
    this.setState({
      page: page
    })
    this.getDaily(page, this.state.orderBy, this.state.sort)
  }

  getDaily (page: any, orderBy = 'htmlCount', sort = -1) {
    let params = {
      page: page - 1,
      pagesize: 20,
      order_by: orderBy,
      order: sort
    }
    getDailyData(params).then(res => {
      if (res.data.data) {
        this.setState({
          tableData: res.data.data,
          total: res.data.total
        }, () => {
        })
      }
    })
  }

  getFilter (pagination: any, filters: any, sorte: any, extra: any) {
    if (sorte && sorte.columnKey && sorte.order && extra.action==="sort") {
      let orderBy = sorte.columnKey
      let sort = sorte.order === 'ascend' ? 1: -1
      this.setState({
        page: 1,
        orderBy: orderBy,
        sort: sort
      })
      this.getDaily(1, orderBy, sort)
    }
  }
  
  render () {
    let columns: any[] = [
      {
        title: '网站名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left'
      },
      {
        title: 'HTML',
        children: [
          {
            title: '当前总数',
            dataIndex: 'htmlCount',
            key: 'htmlCount',
            width: 150,
            align: 'center',
            sorter: true
          },
          {
            title: '今日新增',
            dataIndex: 'increasedhtmlCount',
            key: 'increasedhtmlCount',
            width: 150,
            align: 'center',
            sorter: true
          },
        ],
      },
      {
        title: 'Paper',
        children: [
          {
            title: '当前总数',
            dataIndex: 'paperCount',
            key: 'paperCount',
            width: 150,
            align: 'center',
            sorter: true
          },
          {
            title: '今日新增',
            dataIndex: 'increasedpaperCount',
            key: 'increasedpaperCount',
            width: 150,
            align: 'center',
            sorter: true
          },
        ],
      },
      {
        title: 'PDF',
        children: [
          {
            title: '当前总数',
            dataIndex: 'pdfCount',
            key: 'pdfCount',
            width: 150,
            align: 'center',
            sorter: true
          },
          {
            title: '今日新增',
            dataIndex: 'increasedpdfCount',
            key: 'increasedpdfCount',
            width: 150,
            align: 'center',
            sorter: true
          },
        ],
      },
    ];
    return (
      <div className="status-components">
        <Table
          columns={columns}
          dataSource={this.state.tableData}
          rowKey="name"
          bordered
          size="middle"
          onChange={this.getFilter.bind(this)}
          pagination={{
            position: [this.state.top, this.state.bottom],
            size: "default",
            onChange: this.handleChange.bind(this),
            pageSize: 20,
            total: this.state.total,
            showSizeChanger: false
          }}
        />,
      </div>
    )
  }
}

export default Status