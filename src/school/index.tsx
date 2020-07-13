import React, { Component } from 'react'
import { Table } from 'antd';
import './index.scss';
import { getSchoolData } from '../api/index'

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


interface School {
  state: StateType;
}

class School extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      top: 'none',
      bottom: 'bottomCenter',
      total: 100,
      tableData: [],
      orderBy: 'runTime',
      sort: 1
    };
  }

  componentDidMount() {
    this.getSchool(1, 'runTime', -1)
  }
  handleChange(page: any) {
    this.setState({
      page: page
    })
    this.getSchool(page, this.state.orderBy, this.state.sort)
  }

  getSchool(page: any, orderBy = 'runTime', sort = -1) {
    let params = {
      page: page - 1,
      pagesize: 50,
      order_by: orderBy,
      order: sort
    }
    getSchoolData(params).then(res => {
      if (res.data.data) {
        this.setState({
          tableData: res.data.data,
          total: res.data.total
        }, () => {
        })
      }
    })
  }
  getFilter(pagination: any, filters: any, sorte: any, extra: any) {
    if (sorte && sorte.columnKey && sorte.order && extra.action === "sort") {
      let orderBy = sorte.columnKey
      let sort = sorte.order === 'ascend' ? 1 : -1
      this.setState({
        page: 1,
        orderBy: orderBy,
        sort: sort
      })
      this.getSchool(1, orderBy, sort)
    }
  }
  render() {
    let columns: any[] = [
      {
        title: '高校名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        align: 'center'
      },
      {
        title: '代理地址',
        dataIndex: 'proxy',
        key: 'proxy',
        width: 200,
        align: 'center',
        sorter: true
      },
      {
        title: '在线状态',
        dataIndex: 'status',
        key: 'status',
        width: 200,
        align: 'center',
        render: function (val: String) {
          if (val)
            return '在线'
          else
            return '不在线'
        },
        sorter: true
      },
      {
        title: '在线时长',
        dataIndex: 'runTime',
        key: 'runTime',
        width: 200,
        align: 'center',
        render: function (val: any) {
          return (val / 3600).toFixed(2) + '小时'
        },
        sorter: true
      },
      {
        title: '上次在线时间',
        dataIndex: 'startAt',
        key: 'startAt',
        width: 200,
        align: 'center'
      },
    ];
    return (
      <div className="school-components">
        <Table
          columns={columns}
          dataSource={this.state.tableData}
          rowKey="name"
          onChange={this.getFilter.bind(this)}
          bordered
          size="middle"
          pagination={{
            position: [this.state.top, this.state.bottom],
            defaultCurrent: 1,
            size: "default",
            onChange: this.handleChange.bind(this),
            pageSize: 50,
            total: this.state.total,
            showSizeChanger: false
          }}
        />,
      </div>
    )
  }
}

export default School