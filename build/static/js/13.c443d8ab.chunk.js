(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{542:function(e,t,n){e.exports=n.p+"static/media/password.863830fb.png"},545:function(e,t,n){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"a",(function(){return a}))},550:function(e,t,n){e.exports={container:"comercio__container__2AIyv"}},587:function(e,t,n){"use strict";n.r(t);var a=n(545),r=n(6),o=n(0),i=n.n(o),l=n(184),c=n(19),s=n(183),m=n(8),f=n(18),u=(n(546),n(580)),p=n(590),y=n(581),d=n(582),g=n(591),x=n(5),E=(n(25),n(185),n(550)),b=n.n(E),h=(n(59),n(537)),w=n.n(h),A=(n(535),n(538)),j=n.n(A),C=n(539),T=n.n(C),v=(n(540),n(541),n(542),n(543),n(544),n(549),n(547),n(548),n(28));t.default=Object(c.b)((function(e){return{userType:e.auth.userType,userToken:e.auth.userToken,showUserInfo:e.al.showUserInfo}}),(function(e){return{onGetAllTransactionsForUser:function(t){return e(f.q({type:m.s,data:{in_Token:t}}))}}}))(Object(l.a)((function(e){var t=Object(o.useState)([]),n=Object(r.a)(t,2),l=n[0],c=n[1];e.userType,e.userId;return Object(o.useEffect)((function(){console.log("------Client_Operaciones--------------------------------------"),console.log(e),e.onGetAllTransactionsForUser(e.userToken).then((function(e){console.log("-----onGetAllTransactionsForUser--------------"),console.log(e),"200"===e.status&&c(Object(a.a)(e.data.result))}))}),[]),i.a.createElement("div",{className:b.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"10px",marginRight:"10px",marginTop:"48px"}},i.a.createElement("div",{className:b.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},i.a.createElement(v.BrowserView,null,i.a.createElement("p",null,"UNDER CONSTRUCTION"),"    "),i.a.createElement(v.MobileView,null,i.a.createElement("div",{className:b.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",marginTop:"2%"}},i.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}},i.a.createElement("div",{style:{marginBottom:"4%",borderLeft:"5px solid ".concat(x.b.alcanceOrange),display:"flex",flex:1,flexDirection:"column",justifyContent:"flex-start",alignContent:"center"}},i.a.createElement("label",{style:{fontSize:"1.4rem",color:x.b.alcanceOrange,marginLeft:"10px"}},"Operaciones recientes")),i.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"left",marginTop:"20px"}},i.a.createElement(u.a,{dense:!0,style:{minWidth:"99%"}},l&&l.length?l.map((function(e,t){return i.a.createElement(p.a,{key:t,button:!0,style:{display:"flex",width:"100%"}},i.a.createElement("img",{alt:"Avatar n\xb0".concat(t+1),src:+e.Amount>0?T.a:j.a,style:{width:"10px",height:"10px",marginRight:"2px",resize:"contain",justifyContent:"center",transform:"rotate(180deg)"}}),i.a.createElement("div",{style:{display:"flex",flexDirection:"column",width:"100%"}},i.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"row",lineHeight:"1.1"}},i.a.createElement(y.a,{id:t+"3",primary:+e.Amount>0?"Recibiste":"Enviaste",style:{color:+e.Amount>0?"green":"red",fontWeight:"900",paddingLeft:"5px",marginBottom:0}}),i.a.createElement(y.a,{id:t+"2",primary:"$"+e.Amount,style:{color:+e.Amount>0?"green":"red",fontWeight:"900",display:"flex",justifyContent:"center"}}),e.ComercioID&&i.a.createElement(y.a,{id:t+"13",primary:+e.Amount>0?"de ":"a "+e.ComercioID,style:{color:+e.Amount>0?"green":"red",display:"flex",justifyContent:"center"}}),e.ControlID&&i.a.createElement(y.a,{id:t+"13",primary:+e.Amount>0?"de ":"a "+e.ControlID,style:{color:+e.Amount>0?"green":"red",display:"flex",justifyContent:"center"}}),e.PassportNumber&&i.a.createElement(y.a,{id:t+"1",primary:"("+e.PassportNumber+")",style:{color:"blue",fontWeight:"900",display:"flex",justifyContent:"center"}})),i.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"row",alignItems:"left"}},i.a.createElement(y.a,{id:t+"1",primary:" in "+e.Date,style:{color:"darkGray",paddingLeft:"5px",display:"flex",marginTop:0}}))))})):i.a.createElement(p.a,{key:1,button:!0},i.a.createElement(d.a,null,i.a.createElement(g.a,{alt:"Avatar n\xb01",src:w.a})),i.a.createElement(y.a,{id:1,primary:"No tienes operaciones recientes",style:{color:"black",fontWeight:"900",paddingTop:"30px",paddingBottom:"30px"}})))))))))}),s.a))}}]);
//# sourceMappingURL=13.c443d8ab.chunk.js.map