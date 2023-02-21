(function(){"use strict";var e={7094:function(e,t,n){var o=n(9242),r=n(3396);function i(e,t){const n=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(n)}var a=n(89);const u={},l=(0,a.Z)(u,[["render",i]]);var c=l,s=n(9706),f=n(8654);n(4415);const d=(0,o.ri)(c);d.use(s.Z),d.use(f.Z),d.mount("#app")},9706:function(e,t,n){n.d(t,{Z:function(){return N}});n(6699);var o=n(678),r=n(3396);const i={class:"common-layout"},a={class:"main-container"},u={style:{flex:"1"}};function l(e,t,n,o,l,c){const s=(0,r.up)("TopNavBar"),f=(0,r.up)("LeftSideBar"),d=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(s),(0,r._)("div",a,[(0,r.Wm)(f,{menu_list:e.need_list},null,8,["menu_list"]),(0,r._)("div",u,[(0,r.Wm)(d)])])])}var c=n(6949);const s=e=>((0,r.dD)("data-v-e4dd1fb2"),e=e(),(0,r.Cn)(),e),f=s((()=>(0,r._)("div",{class:"logo",index:"0"},[(0,r._)("img",{src:c,alt:"",style:{width:"7vw"}}),(0,r._)("h2",null,"直播小程序后台")],-1))),d=s((()=>(0,r._)("div",{class:"flex-grow"},null,-1))),m={style:{"line-height":"58px","margin-right":"10px"}},p=(0,r.Uk)(" 退出登录 ");function h(e,t,n,o,i,a){const u=(0,r.up)("el-button"),l=(0,r.up)("el-popconfirm"),c=(0,r.up)("el-menu");return(0,r.wg)(),(0,r.j4)(c,{class:"el-menu-demo",mode:"horizontal",ellipsis:!1,"background-color":"#fff1","text-color":"#e89015","active-text-color":"#e89015"},{default:(0,r.w5)((()=>[f,d,(0,r._)("span",m,[(0,r.Wm)(l,{title:"确定要退出?",confirmButtonText:"退出",cancelButtonText:"取消",onConfirm:e.handleExit},{reference:(0,r.w5)((()=>[(0,r.Wm)(u,{type:"primary",link:""},{default:(0,r.w5)((()=>[p])),_:1})])),_:1},8,["onConfirm"])])])),_:1})}var v=(0,r.aZ)({setup(){const e=()=>{localStorage.removeItem("token"),N.push("/login")};return{handleExit:e}}}),g=n(89);const b=(0,g.Z)(v,[["render",h],["__scopeId","data-v-e4dd1fb2"]]);var w=b,_=n(7139);function y(e,t,n,o,i,a){const u=(0,r.up)("el-menu-item"),l=(0,r.up)("el-menu");return(0,r.wg)(),(0,r.j4)(l,{"background-color":"#fff",class:"el-menu-vertical-demo","default-active":e.active_menu,style:{width:"220px",height:"calc(100vh - 61px)"},router:""},{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.menus,(e=>((0,r.wg)(),(0,r.j4)(u,{index:e.path,key:e.path},{default:(0,r.w5)((()=>[(0,r._)("span",null,(0,_.zw)(e.meta.title),1)])),_:2},1032,["index"])))),128))])),_:1},8,["default-active"])}var S=n(4870),O=(0,r.aZ)({props:["menu_list"],setup(e){let t=(0,S.iH)(e.menu_list);const n=(0,o.yj)();return{menus:t,active_menu:n.path}}});const k=(0,g.Z)(O,[["render",y],["__scopeId","data-v-6d5e099e"]]);var x=k,E=(0,r.aZ)({components:{TopNavBar:w,LeftSideBar:x},setup(){const e=(0,o.tv)(),t=JSON.parse(localStorage.getItem("user")).role,n=e.getRoutes().filter((e=>{if(e.meta.isShowRole&&"/login"!==e.path)return e.meta.isShowRole.includes(t)}));return console.log(n),{need_list:n}}});const j=(0,g.Z)(E,[["render",l]]);var C=j;const R=[{path:"/",name:"home",component:C,redirect:"orderslist",children:[{path:"orderslist",name:"orderslist",meta:{isShowRole:["ROLE_SUB","ROLE_ADMIN"],title:"订单列表"},component:()=>Promise.all([n.e(341),n.e(45)]).then(n.bind(n,9045))},{path:"user",name:"UserView",meta:{isShowRole:["ROLE_ADMIN"],title:"子用户列表"},component:()=>Promise.all([n.e(341),n.e(790)]).then(n.bind(n,790))},{path:"place",name:"PlaceView",meta:{isShowRole:["ROLE_ADMIN","ROLE_SUB"],title:"场地列表"},component:()=>Promise.all([n.e(341),n.e(620)]).then(n.bind(n,5620))},{path:"edit",name:"EditView",meta:{title:"价格管理"},component:()=>Promise.all([n.e(341),n.e(801)]).then(n.bind(n,8801))}]},{path:"/login",name:"LoginView",meta:{isShowRole:["ROLE_SUB","ROLE_ADMIN"],title:"登录界面"},component:()=>Promise.all([n.e(341),n.e(535)]).then(n.bind(n,3330))}],L=(0,o.p7)({history:(0,o.PO)(""),routes:R});L.beforeEach(((e,t,n)=>{const o=localStorage.getItem("token"),r=JSON.parse(localStorage.getItem("user")).role;e.meta.isShowRole.includes(r)&&(console.log(e.meta.isShowRole,"???"),o||"/login"===e.path?n():n("/login"))}));var N=L},6949:function(e,t,n){e.exports=n.p+"static/img/logo.2514f147.png"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(s=0;s<e.length;s++){o=e[s][0],r=e[s][1],i=e[s][2];for(var u=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(u=!1,i<a&&(a=i));if(u){e.splice(s--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"static/js/"+(535===e?"login":e)+"."+{45:"70d20f1e",341:"0edd13ad",535:"88b8a4a5",620:"1280b784",790:"293e9280",801:"3ffd781c"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"static/css/"+(535===e?"login":e)+"."+{45:"d0e2705b",535:"7d2c4a65",620:"22fd45dc",790:"3674dc3b",801:"38f92e86"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-ts-mall-demo:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var u,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var f=c[s];if(f.getAttribute("src")==o||f.getAttribute("data-webpack")==t+i){u=f;break}}u||(l=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+i),u.src=o),e[o]=[r];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(m);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),l&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e=function(e,t,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(i){if(r.onerror=r.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),u=i&&i.target&&i.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=u,r.parentNode.removeChild(r),o(l)}};return r.onerror=r.onload=i,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),u=n.p+a;if(t(a,u))return r();e(o,u,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={45:1,535:1,620:1,790:1,801:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),u=new Error,l=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}};n.l(a,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],u=o[1],l=o[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(l)var s=l(n)}for(t&&t(o);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(s)},o=self["webpackChunkvue_ts_mall_demo"]=self["webpackChunkvue_ts_mall_demo"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(7094)}));o=n.O(o)})();
//# sourceMappingURL=app.07902406.js.map