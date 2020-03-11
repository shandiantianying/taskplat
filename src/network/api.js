export default {
  login: 'v1/user/checkUser', // 登录
  tdinit: '/v1/initTaskData?pageNum=PAGENUM', // url错误
  tdprefill: '/v1/ytxTaskData?pageNum=PAGENUM' ,// 参数错误
  tdsenddeclare: '/v1/fsbbTaskData?pageNum=PAGENUM' ,
  tddeclarepay: '/v1/scjyskjnTaskData?pageNum=PAGENUM' ,
  userPwdedit: '/v1/user/editUserPwd' ,
  cpdataQuery:'v1/creditpre/queryDatalist?ageNum=PAGENUM',
  sinfoQuery:'v1/shareInfo/queryData?ageNum=PAGENUM',
  sinfoshhQuery:'v1/shareInfo/queryShhData?ageNum=PAGENUM',
  atinit:'/v1/scjycshTaskData?pageNum=PAGENUM',
  attaxpay:'/v1/scjyskjnTaskData?pageNum=PAGENUM',
  atsenddeclare:'/v1/scjyyjnsbbTaskData?pageNum=PAGENUM',
  tdinitdata:'v1/chartData/incomeAndTaxData',
  tdpreRecordData:'v1/chartData/preRecordData',
  tdsendDeclarData:'v1/chartData/sendDeclarData',
  atinitdata:'v1/chartData/atinitdata',
  attaxpaydata:'v1/chartData/attaxpaydata',
  cpchartdata:'v1/chartData/cpchartdata'
}
