import http from './http'
import BASE_URL from './global'

//预约访客查询【门岗】的接口
export const reqRightForm = (pageNum,pageSize,query) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorToES`, {pageNum: pageNum,pageSize:pageSize,query:query})
//预约访客-->点击查看详情的页面
export const reqCheckDetailList = (visitorId) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorDetails`,{visitorId:visitorId})
//结束拜访查询主列表
export const reqEndVisitList = (pageNo,pageSize,query) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorHistoryToES`,{pageNum:pageNo,pageSize:pageSize,query:query})
//结束拜访查询主列表--查看详情
// export const reqEndVisitDetailList = (pageNo,pageSize,query) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getVisitorDetails`,{pageNo:pageNo,pageSize:pageSize,query:query})
//园区模块---列表
export const reqParkServiceList = (parkName) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/getParkList`,{parkName:parkName})
//园区模块---列表
export const reqParkServiceLists = (parkName,pageNum,pageSize) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/getParkLists`,{query:{parkName},pageNum,pageSize})
//园区模块---新增园区
export const reqNewAddPark = (parkName,parkCode,parkPosition,remark) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/insertPark`,{parkName:parkName,parkCode:parkCode,parkPosition:parkPosition,remark:remark})
//园区模块---门岗列表
export const reqPorterList = (userName) => http.post(`${BASE_URL}/visitorcontrol/sanyBussParkGater/getParkEmployerList`,{userName:userName})
//园区模块---新增门岗列表
export const reqNewAddPorterList = (userName,parkCode,userCode,org,remark) => http.post(`${BASE_URL}/visitorcontrol/sanyBussParkGater/insertParkEmployer`,{userName:userName,parkCode:parkCode,userCode:userCode,org:org,remark:remark})
//园区模块---园区授权
export const reqGivePower = (parkCode,orgs) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicParkOrg/givePower`,{parkCode:parkCode,orgs:orgs})
//园区模块---门卫模糊查询员工名称
export const reqCheckPorterName = (loginAccount) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectUsersByUserNo`,{loginAccount:loginAccount})
//园区模块---组织授权tree ---内部
export const reqEmpowermentTree = () => http.post(`${BASE_URL}/user/SanyBasicShrUser/treeFast`)
//园区模块---组织授权tree ---外部
export const reqEmpowermentOutTree = () => http.post(`${BASE_URL}/user/SanyBasicShrUser/treeFastOut`)
//园区模块---编辑园区信息
export const reqEditPark = (parkId,parkName,parkPosition,remark) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/updPark`,{parkId:parkId,parkName:parkName,parkPosition:parkPosition,remark:remark})
//园区模块---删除园区信息
export const reqdeletePark = (parkId,parkCode) => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/delPark`,{parkId:parkId,parkCode:parkCode})
//园区模块---编辑门卫信息
export const reqEditPorter = (parkEmployerId,parkCode,userCode,userName,remark,org) => http.post(`${BASE_URL}/visitorcontrol/sanyBussParkGater/updParkEmployer`,{parkEmployerId,parkCode,userCode,userName,remark,org})
//园区模块---删除门卫信息
export const reqdeletePorter = (parkEmployerId) => http.post(`${BASE_URL}/visitorcontrol/sanyBussParkGater/delParkEmployer`,{parkEmployerId})
//门闸管理---闸机类型
export const reqBrakeTypeItem = () =>http.post(`${BASE_URL}/visitorcontrol/sanyGateBrake/getCodeNameByTypeCode`)
//门闸管理---查询
export const reqSearchBrakeList = (parkName,pageNum,pageSize) =>http.post(`${BASE_URL}/visitorcontrol/sanyGateBrake/getBusGatesByPark`,{query:{parkName:parkName},pageNum:pageNum,pageSize:pageSize})
//门闸管理---新增园区闸机
export const reqAddParkBrake = (gateName,parkCode,parkName,typeCode,typeName) =>http.post(`${BASE_URL}/visitorcontrol/sanyGateBrake/addBusGatesByPark`,{gateName:gateName,parkCode:parkCode,parkName:parkName,typeCode:typeCode,typeName:typeName})
//系统管理模块---外部组织机构页面（组织机构树和外部组织信息列表）
export const reqtreeFastOutAndOutTrees = (pageNum, pageSize) => http.post(`${BASE_URL}/user/SanyBasicShrUser/treeFastOutAndOutTrees`,{query: {},pageNum:pageNum, pageSize:pageSize})
//系统管理模块---外部组织机构页面（保存）
export const reqinsertSanyBasicShrOrg = (params) => http.post(`${BASE_URL}/user/SanyBasicShrUser/insertSanyBasicShrOrg`,{
  fatherId: params.fatherId,
  // orgId: params.orgId,
  orgText: params.orgText,
  orgLevel: params.orgLevel
})
//系统管理模块---外部组织机构页面（保存时判断本级机构名称是否重复）
export const reqselectSanyBasicShrOrgByOrgText = (orgText) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectSanyBasicShrOrgByOrgText`,{
  orgText: orgText
})
//系统管理模块---外部组织机构页面（删除）
export const reqdeleteSanyBasicShrOrg = (orgId) => http.post(`${BASE_URL}/user/SanyBasicShrUser/deleteSanyBasicShrOrg`,{
  orgId: orgId
})
//园区模块---外部员工管理/外部员工账号---外部组织权限树
export const reqOuterTrees = () => http.post(`${BASE_URL}/user/SanyBasicShrUser/outTreeHasPrivillege`)
//园区模块---外部员工管理---查询的接口
export const reqSearchList = (isImgUrl,isSub,userName,orgIds,pageNum,pageSize) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectEmployerRoleResponseDtoByCondition`,{query:{isImgUrl: isImgUrl,isSub:isSub,userName:userName,orgIds:orgIds},pageNum:pageNum,pageSize:pageSize})
//园区模块---外部员工管理---数据导入
export const reqUploadData = (formData) => http.post(`${BASE_URL}/user/SanyBasicShrUser/importExecel`,formData)
//园区模块---外部员工管理---照片导入
export const reqUploadImagesFile = (formData) => http.post(`${BASE_URL}/user/SanyBasicShrUser/uploadByZip`,formData)
//园区模块---外部员工管理---新增
export const reqOuterManageAddList = (username,userno,telephone,idCard,userSex,brithday,org,imgUrlUpload,roleCode,roleName,parkCode,parkName,employerType,photoPicture) => http.post(`${BASE_URL}/user/SanyBasicShrUser/insertSanyBasicShrEmployer`,{userName:username,userNo:userno,telephone,idCard,userSex,brithday,org,imgUrlUpload,roleCode,roleName,parkCode,parkName,employerType,photoPicture})
//园区模块---外部员工管理---新增--归属部门下拉选项
export const reqAddDepartment = (parkCode) => http.post(`${BASE_URL}/user/SanyBasicShrUser/outTreeHasPrivillegeBack`,{parkCode})
//园区模块---外部员工管理---新增--角色
export const reqRolelist = () => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectRolesNoPage`)
//园区模块---外部员工管理---新增--上传图片接口
export const reqUploadImages = (file) => http.postFileData(`${BASE_URL}/user/SanyBasicShrUser/fileUploadForOutEmployers`,file)
//园区模块---外部员工管理---新增--拍照接口
export const reqUploadPhotos = (imgStr) => http.postFileData(`${BASE_URL}/user/SanyBasicShrUser/fileUploadForOutEmployersPhoto`,{imgStr:imgStr})
//园区模块---外部员工账号---查询接口
export const selectAllByUserName = (params) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectAllByUserName`,{
	query:{userName:params.userName,orgIds:params.orgIds},pageNum:params.pageNum,pageSize:params.pageSize})
//园区模块---外部员工账号---主列表恢复密码
export const resetLoginPwd = (loginAccount) => http.postFileData(`${BASE_URL}/user/SanyBasicShrUser/resetLoginPwd`,{loginAccount:loginAccount})
//0227
//系统管理---园区闸机---删除
export const deleteParkBrake = (id) =>http.post(`${BASE_URL}/visitorcontrol/sanyGateBrake/removeBusGatesByPark`,{id:id})
//系统管理---园区闸机---编辑
export const editParkBrake = (id,gateName) =>http.post(`${BASE_URL}/visitorcontrol/sanyGateBrake/modifyBusGatesByPark`,{id:id,gateName:gateName})
//基础管理---园区维护管理---新增---根据输入园区编号检测数据库是否重复
export const addParkCodeCheck = (parkCode) =>http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/getParkListByParkCode`,{parkCode:parkCode})
//基础管理---园区组织机构---编辑
export const reqEditParkOrg = (id,orgText) =>http.post(`${BASE_URL}/user/SanyBasicShrUser/modifySanyBasicShrOrg`,{id:id,orgText:orgText})
//运营管理---园区员工管理---编辑
export const reqEditWorkerManage = (id,username,telephone,idCard,roleCode,roleName,parkCode,parkName,brithday,imgUrlUpload,org,userNo,employerType,userSex,photoPicture) =>http.post(`${BASE_URL}/user/SanyBasicShrUser/modifySanyBasicShrEmployer`,{id,userName:username,telephone,idCard,roleCode,roleName,parkCode,parkName,brithday,imgUrlUpload,org,userNo,employerType,userSex,photoPicture})
//访客管理---我的访客信息---发送短信
export const reqSendMessages = (messageDto) =>http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/sendOneMessage`,{messageDto})

//照片录入查询
export const reqlowerHair = (userNo) => http.post(`${BASE_URL}/user/SanyBasicShrUser/lowerHair`,{userNo})

//访客管理---下发照片
export const reqSubPhotoes = (visitorId) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/sendImg`,{visitorId})
// 访客管理---信息维护---重新上传照片接口
export const reqRUploadImage = (formData,id) => http.postFileData(`${BASE_URL}/visitorcontrol/SanyBussVisitor/fileUploadForVisitorsUpdate?id=${id}`,formData);
// 园区管理---园区车辆---查询
export const reqSearchCarsList = (carNo,userName,userNo,pageNum,pageSize) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectBussParkCarByCondition`,{query:{carNo,userName,userNo},pageNum,pageSize});
// 园区管理---园区车辆---新增
export const reqAddCars = (userNo,userName,carType,carNo,remark) => http.post(`${BASE_URL}/user/SanyBasicShrUser/insertBussParkCar`,{userNo,userName,carType,carNo,remark});
// 园区管理---园区车辆---编辑
export const reqEditCars = (id,carNo,carType,remark,userName,userNo) => http.post(`${BASE_URL}/user/SanyBasicShrUser/modifyBussParkCar`,{id,carNo,carType,remark,userName,userNo});
// 园区管理---园区车辆---删除
export const reqDeleteCars = (id) => http.post(`${BASE_URL}/user/SanyBasicShrUser/removeBussParkCar`,{id});
// 园区管理---园区车辆---数据导入
export const reqUploadCarsFile = (formData) => http.postFileData(`${BASE_URL}/user/SanyBasicShrUser/importExcel`,formData);
// 园区管理---园区员工管理---新增和编辑--验证员工工号（外部员工为手机号）
export const regExpUserNumber = (loginAccount) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectUserByUserNo`,{loginAccount});
// 园区管理---园区车辆管理---新增--验证员工工号
export const regCarsExpUserNumber = (loginAccount) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectUserByUserNoY`,{loginAccount});
// 园区管理---园区员工管理---删除
export const regDeleteData = (userNo,id) => http.post(`${BASE_URL}/user/SanyBasicShrUser/removeSanyBasicShrEmployer`,{userNo,id});
// 园区管理---园区员工管理---新增、编辑---登录成功后判断roleCode是否为门岗--接口
export const regRoleCodeIsMengang = () => http.post(`${BASE_URL}/visitorcontrol/sanyBasicPark/getParkListByRoleCode`);
// 园区管理---园区员工管理---新增、编辑---组织机构tree接口--接口
export const regOrgMengangTree = () => http.post(`${BASE_URL}/user/SanyBasicShrUser/treeFastOutHasOrgId`);
// 园区管理---园区车辆管理---新增、编辑---员工工号模糊查询--接口
export const regExpCarManageUserName = (queryString) => http.post(`${BASE_URL}/user/SanyBasicShrUser/getNamesByLike`,{queryString});
//0325优化更新
//忘记密码--手机号验证--接口
export const regTelIsExist = (telephone) => http.post(`${BASE_URL}/user/SanyBasicShrUser/forgetPassword`,{telephone});
//忘记密码--发送验证码--接口
export const regSendExpregNumber = (telephone) => http.post(`${BASE_URL}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});
//忘记密码--确定设置新密码--接口
export const regSubmitNewPwd = (password,code,telephone) => http.post(`${BASE_URL}/user/SanyBasicShrUser/setNewPassword`,{password,code,telephone});
//园区管理---园区员工管理---批量授权--接口
export const regManyAuthoriaztion = (personIds) => http.post(`${BASE_URL}/user/SanyBasicShrUser/givePowerTo`,{personIds});
//访客管理---预约访客查询---登记--接口
export const regNormalRegister = (visitorId) => http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/getNormalRegister`,{visitorId});
//0327
//园区管理---园区员工管理---新增--身份证号码验证--接口
export const regIDCard = (idCard) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectEmployerByCardId`,{idCard});
//园区管理---园区员工管理---新增--手机号码验证--接口
export const regTelephone = (telephone) => http.post(`${BASE_URL}/user/SanyBasicShrUser/selectEmployerByTelephone`,{telephone});
//0328我的访客信息---信息维护---发送短信--接口
export const reqSendMessageSingle = (messageDto) =>http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/sendOneMessageSingle`,{messageDto})
//0330我的访客信息---新增访客---点击确定后添加成功后调用发送短信--接口
export const reqAddVisitorSuccessReq = (messageDto) =>http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/sendOneMessageManyVisitors`,{messageDto})
//0330我的访客信息---新增访客---验证身份证号/临时拜访录入--接口
export const reqrRegIDCard = (idCard) =>http.post(`${BASE_URL}/visitorcontrol/SanyBussVisitor/selectVisitorsByIdCard`,{idCard})





