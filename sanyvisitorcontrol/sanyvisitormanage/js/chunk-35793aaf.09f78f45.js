(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35793aaf"],{"0a0d":function(t,e,i){t.exports=i("e829")},"2cf4":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{},[i("el-form",{staticClass:"marginTop20 common-form-inline",attrs:{inline:!0,size:"medium"}},[i("el-form-item",{attrs:{label:"开始日期"}},[i("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd","picker-options":t.pickerOptionsStart,placeholder:"选择日期"},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})],1),i("el-form-item",{attrs:{label:"结束日期"}},[i("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd","picker-options":t.pickerOptionsEnd,placeholder:"选择日期"},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1),i("el-form-item",[i("el-button",{staticClass:"btnIsBlue",attrs:{type:"primary"},on:{click:t.onSearch}},[t._v("查询")])],1)],1),i("div",{staticClass:"common-table",staticStyle:{"text-align":"center"}},[0===t.tableData.length?i("div",{staticClass:"lazyImg"},[i("span",{staticClass:"lazyText"},[t._v("暂无数据")])]):i("el-table",{staticStyle:{width:"100%"},attrs:{"header-row-class-name":"table-header",border:"",data:t.tableData}},[i("el-table-column",{attrs:{type:"index",label:"序号",width:"50",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"planBeginTime",label:"到访日期",width:"180",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"visitingTime",label:"拜访时间",width:"100",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"beginTime",label:"实际开始时间",width:"160",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"endTime",label:"实际结束时间",width:"160",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"vistorNum",label:"访客人数",width:"130",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"isCar",label:"是否驾车",width:"80",align:"left"}}),i("el-table-column",{attrs:{prop:"carNum",label:"驾车数量",width:"80",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"visitorStatus",label:"访问状态",width:"120",align:"left"}}),i("el-table-column",{attrs:{prop:"operaterCode",label:"操作人工号",width:"130",align:"left","header-align":"left"}}),i("el-table-column",{attrs:{prop:"operaterName",label:"操作人姓名",width:"130",align:"left"}}),i("el-table-column",{attrs:{label:"查看",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.lookInfo(e.$index,e.row)}}},[t._v("查看信息")])]}}])})],1)],1),i("div",{staticClass:"marginTop10 text-right"},[i("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.totalNum},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),i("div",{staticClass:"common_lookInfoDialog"},[i("el-dialog",{staticClass:"edit-form",attrs:{title:"拜访历史记录",visible:t.visitorInfomation,"close-on-click-modal":!1,width:"1000px"},on:{"update:visible":function(e){t.visitorInfomation=e}}},[i("el-form",{ref:"editForm",attrs:{"v-model":t.editForm,"label-width":"110px",inline:!0}},[i("div",{staticClass:"endVisitSearchDialog",staticStyle:{display:"flex"}},[i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"到访日期"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.planBeginTime,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"planBeginTime",e)},expression:"editForm.sanyBussVisitor.planBeginTime"}})],1),i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"拜访时间"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.visitingTime,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"visitingTime",e)},expression:"editForm.sanyBussVisitor.visitingTime"}})],1),i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"来访人员数量"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.vistorNum,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"vistorNum",e)},expression:"editForm.sanyBussVisitor.vistorNum"}})],1)],1),i("div",{staticClass:"endVisitSearchDialog",staticStyle:{display:"flex"}},[i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"实际开始时间"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.beginTime,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"beginTime",e)},expression:"editForm.sanyBussVisitor.beginTime"}})],1),i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"实际结束时间"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.endTime,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"endTime",e)},expression:"editForm.sanyBussVisitor.endTime"}})],1),i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"访客类型"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editFormIsVip,callback:function(e){t.editFormIsVip=e},expression:"editFormIsVip"}})],1)],1),i("div",{staticClass:"endVisitSearchDialog",staticStyle:{display:"flex"}},[i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"驾车数量"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.carNum,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"carNum",e)},expression:"editForm.sanyBussVisitor.carNum"}})],1),i("el-form-item",{staticStyle:{width:"33%"},attrs:{label:"是否驾车"}},[i("el-input",{attrs:{disabled:""},model:{value:t.editForm.sanyBussVisitor.isCar,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"isCar",e)},expression:"editForm.sanyBussVisitor.isCar"}})],1)],1),i("div",{staticClass:"endVisitSearchDialog",staticStyle:{display:"flex"}},[i("el-form-item",{staticClass:"textareaInput",staticStyle:{width:"98%"},attrs:{label:"拜访原因"}},[i("el-input",{attrs:{disabled:"",type:"textarea"},model:{value:t.editForm.sanyBussVisitor.reason,callback:function(e){t.$set(t.editForm.sanyBussVisitor,"reason",e)},expression:"editForm.sanyBussVisitor.reason"}})],1)],1)]),i("div",{staticClass:"common-table"},[i("el-table",{attrs:{"header-row-class-name":"table-header",border:"",data:t.editForm.sanyBussVisitorDetailsList}},[i("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),i("el-table-column",{attrs:{prop:"visitorName",label:"拜访人姓名"}}),i("el-table-column",{attrs:{prop:"phone",label:"电话号码"}}),i("el-table-column",{attrs:{prop:"visitorId",label:"身份证号"}}),i("el-table-column",{attrs:{prop:"carNo",label:"车牌号码"}}),i("el-table-column",{attrs:{prop:"beginTime",label:"实际开始时间"}}),i("el-table-column",{attrs:{prop:"endTime",label:"实际结束时间"}}),i("el-table-column",{attrs:{prop:"imgUrl",label:"图片名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.checkPicture(e.$index,e.row)}}},[t._v("查看图片")])]}}])})],1)],1),i("br")],1)],1),i("div",{staticClass:"checkPictureInformation"},[i("el-dialog",{staticClass:"edit-form",attrs:{title:"图片信息",visible:t.checkPictureInformationVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.checkPictureInformationVisible=e}}},[i("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center",overflow:"hidden"}},[i("img",{staticStyle:{"max-width":"100%"},attrs:{src:t.currentImg,alt:""}})])])],1)],1)},s=[],a=(i("96cf"),i("3b8d")),n=i("0a0d"),o=i.n(n),l=i("47d5"),u={name:"VisitorHistoryRecord",data:function(){var t=this;return{startTime:"",endTime:"",pickerOptionsStart:{disabledDate:function(t){return t.getTime()>o()()}},pickerOptionsEnd:{disabledDate:function(e){return e.getTime()>o()()||e.getTime()<new Date(t.startTime).getTime()+864e5}},tableData:[],currentPage:1,pageSize:10,totalNum:0,editForm:{sanyBussVisitor:{},sanyBussVisitorDetailsList:[],sanyBussVisitorCarList:[]},visitorInfomation:!1,checkPictureInformationVisible:!1,currentImg:""}},mounted:function(){this.getVisitorHistoryData(this.currentPage,this.pageSize,this.startTime,this.endTime)},methods:{getVisitorHistoryData:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e,i,r,s){var a,n,o,u;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["j"])(e,i,r,s);case 2:if(a=t.sent,console.log("获取的所有列表：",a),a&&a.data&&200===a.data.code){t.next=7;break}return this.$message({message:"请重新登录！"}),t.abrupt("return");case 7:n=a.data.data,o=n.list,u=n.total,this.totalNum=u,this.tableData=o.map(function(t){var e=t.sanyBussVisitor.visitorStatus;"01"===e?e="待访问":"02"===e?e="访问中":"03"===e&&(e="访问结束");var i=t.sanyBussVisitor.auditingType;"01"===i?i="个人审核通过":"02"===i&&(i="门岗审核通过");var r=t.sanyBussVisitor.recordType;"01"===r?r="被访人录入":"02"===r?r="访客机录入":"03"===r&&(r="门岗录入");var s=t.sanyBussVisitor.visitingTime;"01"===s?s="上午":"02"===s?s="下午":"03"===s&&(s="全天");var a=t.sanyBussVisitor.isCar;return"0"===a?a="否":"1"===a&&(a="是"),{id:t.sanyBussVisitor.id,planBeginTime:t.sanyBussVisitor.planBeginTime,visitingTime:s,beginTime:t.sanyBussVisitor.beginTime,endTime:t.sanyBussVisitor.endTime,vistorNum:t.sanyBussVisitor.vistorNum,isCar:a,carNum:t.sanyBussVisitor.carNum,visitorStatus:e,auditingType:i,recordType:r,operaterCode:t.sanyBussVisitor.operaterCode,operaterName:t.operaterName}});case 10:case"end":return t.stop()}},t,this)}));function e(e,i,r,s){return t.apply(this,arguments)}return e}(),handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getVisitorHistoryData(this.currentPage,this.pageSize,this.startTime,this.endTime)},handleCurrentChange:function(t){this.currentPage=t,this.getAllVisitorData(this.currentPage,this.pageSize,this.startTime,this.endTime)},onSearch:function(){this.currentPage=1,this.getVisitorHistoryData(this.currentPage,this.pageSize,this.startTime,this.endTime)},lookInfo:function(t,e){this.visitorInfomation=!0,this.getVisitorDetailsData(e.id)},getVisitorDetailsData:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["i"])(e);case 2:if(i=t.sent,i&&200===i.data.code){t.next=6;break}return this.$message({type:"error",message:i.data.msg}),t.abrupt("return");case 6:this.editForm=i.data.data,0===i.data.data.sanyBussVisitorDetailsList[0].isVip?this.editFormIsVip="一般访客":1===i.data.data.sanyBussVisitorDetailsList[0].isVip&&(this.editFormIsVip="Vip"),this.editForm.sanyBussVisitor.isCar="1"===this.editForm.sanyBussVisitor.isCar?"是":"否","01"===this.editForm.sanyBussVisitor.visitingTime?this.editForm.sanyBussVisitor.visitingTime="上午":"02"===this.editForm.sanyBussVisitor.visitingTime?this.editForm.sanyBussVisitor.visitingTime="下午":"03"===this.editForm.sanyBussVisitor.visitingTime&&(this.editForm.sanyBussVisitor.visitingTime="全天");case 10:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),checkPicture:function(t,e){this.checkPictureInformationVisible=!0,this.currentImg=e.imgUrl}}},c=u,m=(i("fb73"),i("2877")),d=Object(m["a"])(c,r,s,!1,null,"293bad2e",null);d.options.__file="visitHistoryRecord.vue";e["default"]=d.exports},"2f37":function(t,e,i){var r=i("63b6");r(r.S,"Date",{now:function(){return(new Date).getTime()}})},"47d5":function(t,e,i){"use strict";i.d(e,"h",function(){return a}),i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o}),i.d(e,"f",function(){return l}),i.d(e,"e",function(){return u}),i.d(e,"d",function(){return c}),i.d(e,"k",function(){return m}),i.d(e,"c",function(){return d}),i.d(e,"l",function(){return p}),i.d(e,"j",function(){return f}),i.d(e,"i",function(){return h}),i.d(e,"g",function(){return g});i("96cf");var r=i("3b8d"),s=i("c1fb"),a=(i("b1ef"),function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,i,r){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/getVisitorAllByVisitorName",{pageNum:e,pageSize:i,query:{visitorName:r}}));case 1:case"end":return t.stop()}},t,this)}));return function(e,i,r){return t.apply(this,arguments)}}()),n=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,i,r,a,n,o,l,u,c){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/addApplyAndSendHaiKang",{sanyBussVisitor:{planBeginTime:e,visitingTime:i,vistorNum:r,isCar:a,isVip:n,carNum:o,reason:l},sanyBussVisitorDetailsList:u,sanyBussVisitorCarList:[],source:c}));case 1:case"end":return t.stop()}},t,this)}));return function(e,i,r,s,a,n,o,l,u){return t.apply(this,arguments)}}(),o=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/addApplyAndSendHaiKang",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),l=function(t){return s["a"].postFileData("/user/SanyBasicShrUser/fileUploadForVisitors",t)},u=function(t){return s["a"].post("/user/SanyBasicShrUser/fileUploadForOutEmployersPhoto",{imgStr:t})},c=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,i){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/confirmVisit",{visitorId:e,source:i}));case 1:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}(),m=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/invalid",{visitorId:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/cancel",{visitorId:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/manualEnd",{visitorId:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,i,r,a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/getVisitorHistory",{pageNum:e,pageSize:i,query:{startTime:r,endTime:a}}));case 1:case"end":return t.stop()}},t,this)}));return function(e,i,r,s){return t.apply(this,arguments)}}(),h=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/getVisitorDetails",{visitorId:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,i){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",s["a"].post("/visitorcontrol/SanyBussVisitor/getNamesByLike",{queryStr:e,queryNo:i}));case 1:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}()},e829:function(t,e,i){i("2f37"),t.exports=i("584a").Date.now},f518:function(t,e,i){},fb73:function(t,e,i){"use strict";var r=i("f518"),s=i.n(r);s.a}}]);
//# sourceMappingURL=chunk-35793aaf.09f78f45.js.map