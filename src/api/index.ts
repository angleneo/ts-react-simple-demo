import ajax from './ajax'

interface Params {
  name?: String;
  page?: Number;
  pagesize?: Number;
  order_by?: String;
  order?: Number;
}
//数据总量
export const getTotal = (params: null) => {
  return ajax.get('/api/v1/overviews/total_data', params)
}

// 数据趋势 下拉菜单
export const getTrendsNames = (params: null) => {
  return ajax.get('/api/v1/trends/names', params)
}

// 数据趋势 折线图
export const getTrendsData = (params: Params) => {
  return ajax.get('/api/v1/trends/data_trends?name=' + params.name)
}

// 数据情况 table
export const getDailyData = (params: Params) => {
  return ajax.get(`/api/v1/status/daily_data?page=${params.page}&order_by=${params.order_by}&order=${params.order}`)
}

// 高校节点分布
export const getSchoolData = (params: Params) => {
  return ajax.get(`/api/v1/proxies/nodes?page=${params.page}&pagesize=${params.pagesize}&order_by=${params.order_by}&order=${params.order}`)
}
