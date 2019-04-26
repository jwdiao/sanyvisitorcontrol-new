import $http from './http'
import BASE_URL from './global'
// =============================myVisitor.vue页面接口======================================

/**
 * 根据访客姓名查询的接口
 * userNo 当前登录员工的工号
 * pageNum 页数
 * pageSize 数据条数
 * visitorName 访客姓名
 *  */

export const getVisitorAllByVisitorNameRequest = async (pageNum,pageSize,visitorName) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorAllByVisitorName`, {
  'pageNum': pageNum,
  'pageSize': pageSize,
  'query': {
    'visitorName': visitorName
  }
})

/**
 * 新增申请接口
 *
  {
    sanyBussVisitor: { // 拜访主表数据
      planBeginTime: '', // 拜访计划开始时间,
      planEndTime: '', // 拜访计划结束时间
      vistorNum: '', // 来访人数量,
      isCar: '', // 是否驾车（1.是，0.否）
      carNum: '', // 来访车数量,
      reason: '', // 拜访原因
    },
    sanyBussVisitorDetailsList: {//拜访人员信息（存在多条，以集合的方式传递）
      visitorName: '', // 拜访人姓名
      phone: '', //手机号码
      visitorId: '', // 访客身份证号
      imgUrl: '', //照片路径
    }
    sanyBussVisitorCarList : [ // 拜访车辆数据（存在多条，以集合的方式传递）
      {
        carNo: '车牌号', // 车牌号
      }
    ]
  }
*/
export const addApplyRequest = async (
  planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason,
  visitorName,gender,phone,visitorId,imgUrl,carNo,countCard,
  source
) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/addApplyAndSendHaiKang`,
  {
    sanyBussVisitor:{planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason},
    sanyBussVisitorDetailsList:[{visitorName,gender,phone,visitorId,imgUrl,carNo,countCard}],
    sanyBussVisitorCarList:[],
    source
})
export const addApplyRequest1 = async (
 paramsData
) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/addApplyAndSendHaiKang`,
      paramsData
)




/*
* {"sanyBussVisitor":{"planBeginTime":"2019-04-26","visitingTime":"03","vistorNum":1,"isCar":"0","isVip":0,"carNum":0,"reason":"拜访原因"},
* "sanyBussVisitorDetailsList":[{"visitorName":"djw","gender":"1","phone":"13245455656","visitorId":"123456199912122323","imgUrl":"http://10.19.8.22:8080/fangke/344efdffda2f4b2bae39956a49c9a41credux.png","carNo":"","countCard":""}],
* "sanyBussVisitorCarList":[],"source":1}
*
*
* */



/**
 * 上传照片接口
 *
 */
export const fileUploadRequest = (formData) =>  $http.postFileData(`${BASE_URL}/user/SanyBasicShrUser/fileUploadForVisitors`,formData);

/**
 * 拍照上传图片
 * @param {*} imgStr图片字符串
 */
export const fileUploadForOutEmployersPhotoRequest = (imgStr) => $http.post(`${BASE_URL}/user/SanyBasicShrUser/fileUploadForOutEmployersPhoto`,{imgStr:imgStr})

/**
 * 确认访问接口
 * visitorId：拜访主表id
 * source：确认访问操作是从哪个页面发起的：1为我的访客信息，2为预约访客查询【门岗】
 */
export const confirmVisitRequest = async (visitorId, source) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/confirmVisit`,{
  visitorId: visitorId,
  source: source
})

/**
 * 无效访问接口
 * visitorId：拜访主表id
 */
export const invalidVisitRequest = async (visitorId) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/invalid`,{
  visitorId: visitorId
})

/**
 * 作废接口
 * visitorId：拜访主表id
 */
export const cancelRequest = async (visitorId) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/cancel`,{
  visitorId: visitorId
})

/**
 * 手动结束接口
 * visitorId：拜访主表id
 */
export const manualEndRequest = async (visitorId) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/manualEnd`,{
  visitorId: visitorId
})


// =============================visitHistoryRecord.vue页面接口======================================
/**
 * 拜访历史记录查询的接口
 *
 * pageNum 页数
 * pageSize 数据条数
 * startTime 开始日期
 * endTime 结束日期
 *  */

export const getVisitorHistoryRequest = async (pageNum,pageSize,startTime,endTime) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorHistory`, {
  pageNum: pageNum,
  pageSize: pageSize,
  query: {
    startTime:startTime,
    endTime:endTime
  }
})
/**
 * 查看信息的接口
 *
 * visitorId：行id
 *  */
export const getVisitorDetailsRequest = async (visitorId) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorDetails`, {visitorId: visitorId})



// =============================tempVisitInput.vue页面接口======================================
/**
 * 模糊查询被拜访人
 *
 *  */
export const getNamesByLikeRequest = async (queryStr,queryNo) => $http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getNamesByLike`, {queryStr,queryNo})

