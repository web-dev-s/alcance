(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{505:function(e,t,n){e.exports={container:"comercio__container__1bUVt"}},563:function(e,t,n){"use strict";n.r(t);var a=n(19),i=n(2),l=n(4),o=n(0),r=n.n(o),c=n(168),s=n(17),f=n(167),u=n(7),m=n(15),d=(n(503),n(5)),p=n(21),g=n(505),x=n.n(g),y=n(67),b=n(515),h=n.n(b),j=n(22),w=n(533),S=n.n(w),O=n(97),C=n(100),E=n.n(C);t.default=Object(s.b)((function(e){return{userType:e.auth.userType,userToken:e.auth.userToken,showUserInfo:e.al.showUserInfo}}),(function(e){return{onRequestPayment:function(t,n,a,i){return e(m.k({type:u.y,data:{in_Token:t,in_Amount:n,in_Currency:a,in_ClientCode:i}}))}}}))(Object(c.a)((function(e){var t=Object(O.a)(),n=t.height,c=t.width,s=Object(o.useState)("environment"),f=Object(l.a)(s,2),u=f[0],m=(f[1],Object(o.useState)(!0)),g=Object(l.a)(m,2),b=g[0],w=g[1],C=Object(o.useState)(null),v=Object(l.a)(C,2),T=v[0],I=v[1],k=Object(o.useState)(!0),D=Object(l.a)(k,2),A=D[0],B=D[1],R=Object(o.useState)(""),_=Object(l.a)(R,2),z=_[0],L=_[1],N=Object(o.useState)({currency:"BS",amount:"",client:""}),U=Object(l.a)(N,2),M=U[0],q=U[1],H=Object(o.useState)(""),V=Object(l.a)(H,2),F=V[0],J=V[1];e.userType,e.userToken;return r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",alignSelf:"center",paddingLeft:"5%",paddingRight:"5%"}},r.a.createElement(j.MobileView,{style:{width:c,height:n,marginTop:"48px",marginBottom:"58px",position:"relative"}},r.a.createElement("div",{className:x.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",overflowY:"scroll"}},r.a.createElement("div",{style:{marginBottom:"4px",borderLeft:"5px solid ".concat(d.b.alcanceOrange),display:"flex",flexDirection:"column",justifyContent:"flex-start",alignContent:"center"}},r.a.createElement("label",{style:{fontSize:"1.4rem",color:d.b.alcanceOrange,marginLeft:"10px"}},"Solicitar pago")),r.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"left",marginTop:"10px"}},b?r.a.createElement("div",{style:{width:"98%"}},A?r.a.createElement("div",{style:{display:"flex",padding:"2%"}},r.a.createElement(S.a,{delay:300,onError:function(e){J(e)},onScan:function(e){e&&(console.log(" handleScan read:"),console.log(e),e&&(I(e),B(!1),q(Object(i.a)({},M,{client:e})),J("")))},facingMode:u.toString(),style:{width:"100%",height:"100%",backgroundColor:"yellow"}})):r.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"left",marginTop:"20px",marginBottom:"20px"}},r.a.createElement(h.a,{value:T,style:{width:"100px",height:"100px"}})),r.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",textAlign:"center",width:"100%"}},r.a.createElement(y.a,{label:"Monto:",labelStyle:{color:d.b.alcanceOrange,textAlign:"left",fontSize:"12px"},containerStyle:{borderBottom:"2px solid #ccc",marginTop:"20px",display:"flex",flex:1,flexDirection:"column",justifyContent:"flex-start",alignContent:"center",width:"100%",paddingTop:"2px",minHeight:"50px",fontSize:"12px",marginRight:"5px",marginLeft:"5px"},middleContainerStyle:{border:"none"},inputStyle:{minHeight:"50px",border:"none",fontSize:"14px",outline:"none"},elementType:"input",elementConfig:{type:"number",placeholder:"monto"},value:z,changed:function(e){L(e.currentTarget.value)},onFocus:function(e){J("")}}),F&&F.length>2&&r.a.createElement("div",{style:{marginTop:"15px",marginBottom:"15px",display:"flex",flex:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}},r.a.createElement("img",{src:E.a,alt:"error",style:{width:"25px",height:"25px",resizeMode:"contain",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:"0px"}}),r.a.createElement("label",{style:{paddingLeft:"5px",color:d.b.red,fontSize:"12px"}},F)),r.a.createElement("div",{style:{marginTop:"12px",marginBottom:"12px",fontSize:" bold",textAlign:" center",display:"flex",justifyContent:"center",fontFamily:"AvenirBlack",width:"70%",height:"60%"}},r.a.createElement(p.a,{clicked:function(t){!function(){if(J(""),isNaN(+z)||null==z||+z<1)return J("no payment amount requested");e.onRequestPayment(e.userToken,z,M.currency,M.client).then((function(t){t&&(t.data&&"200"==t.data.status?(w(!1),B(!0),e.history.push("/comercio")):t.message&&(console.log(t.data),J(t.message)))}))}()},label:"SOLICITAR",style:Object(a.a)({color:"white",alignSelf:"center",backgroundColor:"#f8bb48",borderRadius:"2px",minHeight:"40px",fontWeight:"bold",textAlign:" center",display:"flex",flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"},"alignSelf","center")})))):r.a.createElement("div",{style:{width:"98%"}})))),r.a.createElement(j.BrowserView,null,r.a.createElement("p",null,"UNDER CONSTRUCTION")))}),f.a))}}]);
//# sourceMappingURL=15.ab8ca702.chunk.js.map