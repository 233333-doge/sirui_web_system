"use strict";(self["webpackChunkvue_ts_mall_demo"]=self["webpackChunkvue_ts_mall_demo"]||[]).push([[535],{3330:function(e,r,l){l.r(r),l.d(r,{default:function(){return k}});var o=l(3396),u=l(6949);const a=e=>((0,o.dD)("data-v-053f7a32"),e=e(),(0,o.Cn)(),e),t={class:"login"},s={class:"form-cls"},m=a((()=>(0,o._)("img",{class:"logo",src:u,alt:""},null,-1))),n=a((()=>(0,o._)("h2",null,"直播小程序——后台管理",-1))),i=(0,o.Uk)("登录"),d=(0,o.Uk)("重置");function c(e,r,l,u,a,c){const p=(0,o.up)("el-input"),f=(0,o.up)("el-form-item"),g=(0,o.up)("el-button"),w=(0,o.up)("el-form");return(0,o.wg)(),(0,o.iD)("div",t,[(0,o._)("div",s,[(0,o.Wm)(w,{ref:"ruleFormRef",model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"70px"},{default:(0,o.w5)((()=>[m,n,(0,o.Wm)(f,{label:"用户名:",prop:"username"},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{modelValue:e.ruleForm.username,"onUpdate:modelValue":r[0]||(r[0]=r=>e.ruleForm.username=r),type:"text",autocomplete:"off",placeholder:"请输入用户名"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(f,{label:"密码:",prop:"password"},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{modelValue:e.ruleForm.password,"onUpdate:modelValue":r[1]||(r[1]=r=>e.ruleForm.password=r),type:"password",autocomplete:"off",placeholder:"请输入密码"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(f,null,{default:(0,o.w5)((()=>[(0,o.Wm)(g,{class:"login-btn",type:"primary",onClick:r[2]||(r[2]=r=>e.submitForm(e.ruleFormRef))},{default:(0,o.w5)((()=>[i])),_:1}),(0,o.Wm)(g,{class:"login-btn",onClick:r[3]||(r[3]=r=>e.resetForm(e.ruleFormRef))},{default:(0,o.w5)((()=>[d])),_:1})])),_:1})])),_:1},8,["model","rules"])])])}function p(e,r,l){return r in e?Object.defineProperty(e,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[r]=l,e}class f{constructor(){p(this,"ruleForm",{username:"",password:""})}}var g=l(4870),w=l(6341);function b(e){return(0,w.Z)({url:"/api/admin/user/login",method:"POST",data:e})}var F=l(678),_=(0,o.aZ)({setup(){const e=(0,g.qj)(new f),r=(0,F.tv)(),l={username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:15,message:"用户名长度需要在3-15个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"密码长度需要在6-20个字符之间",trigger:"blur"}]},o=(0,g.iH)(),u=()=>{e.ruleForm.username="",e.ruleForm.password=""},a=l=>{l&&l.validate((async l=>{if(!l)return console.log("error submit!"),!1;{console.log(l,"validvalid");const o=await b(e.ruleForm);localStorage.setItem("token",o.item.token),localStorage.setItem("user",JSON.stringify(o.item.user)),r.push("/")}}))};return{...(0,g.BK)(e),rules:l,resetForm:u,submitForm:a,ruleFormRef:o}}}),v=l(89);const h=(0,v.Z)(_,[["render",c],["__scopeId","data-v-053f7a32"]]);var k=h}}]);
//# sourceMappingURL=login.88b8a4a5.js.map