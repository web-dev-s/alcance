(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{546:function(e,t,n){e.exports={container:"client__container__3PLxi"}},568:function(e,t,n){"use strict";var o=n(569).CopyToClipboard;o.CopyToClipboard=o,e.exports=o},569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var o=r(n(0)),a=r(n(570));function r(e){return e&&e.__esModule?e:{default:e}}function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?d(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(){var e,n;s(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return m(d(n=p(this,(e=u(t)).call.apply(e,[this].concat(l)))),"onClick",(function(e){var t=n.props,r=t.text,l=t.onCopy,i=t.children,c=t.options,s=o.default.Children.only(i),f=(0,a.default)(r,c);l&&l(r,f),s&&s.props&&"function"===typeof s.props.onClick&&s.props.onClick(e)})),n}var n,r,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,e),n=t,(r=[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=c(e,["text","onCopy","options","children"]),a=o.default.Children.only(t);return o.default.cloneElement(a,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(n,!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{onClick:this.onClick}))}}])&&f(n.prototype,r),l&&f(n,l),t}(o.default.PureComponent);t.CopyToClipboard=y,m(y,"defaultProps",{onCopy:void 0,options:void 0})},570:function(e,t,n){"use strict";var o=n(571),a={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,r,l,i,c,s,f=!1;t||(t={}),n=t.debug||!1;try{if(l=o(),i=document.createRange(),c=document.getSelection(),(s=document.createElement("span")).textContent=e,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",(function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),"undefined"===typeof o.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var r=a[t.format]||a.default;window.clipboardData.setData(r,e)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,e);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))})),document.body.appendChild(s),i.selectNodeContents(s),c.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");f=!0}catch(p){n&&console.error("unable to copy using execCommand: ",p),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),f=!0}catch(p){n&&console.error("unable to copy using clipboardData: ",p),n&&console.error("falling back to prompt"),r=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(r,e)}}finally{c&&("function"==typeof c.removeRange?c.removeRange(i):c.removeAllRanges()),s&&document.body.removeChild(s),l()}return f}},571:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],o=0;o<e.rangeCount;o++)n.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},572:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGKSURBVHgBrVRdTsJAEJ7ZNlQSH7gBPUKf+YlFKq/iCSw38AbgTfAG+KogJBRegRuUG/BgIi10x1lEogldfsLXdHfSfv26O/PNImzx+VZwDMNwQAdJYfYuGOgoqIav91ILEZpwBPiDjuUFD6nv437BkYmYcLxAoI5OjEC4PNoosG7dDl/3ccxEGg4LqXhgeaOGTjDqlZpE0AIilZq9gmK3VKAFHIBMcL7hEoVpHAEnIFsbti2UdsYbvaRxTJ0A9d1cBOtHlJD7fRbDZuv/eCgozFR+fmJqxWQy4fTaBHpQgrDslvwrL6ikCi5lUudc2UwPEbGtFSR44sll+7mpggIor1amxKxq8KwTjHplm4h8Ayl/UlGOganaSdmfAOuc7PBvgs+B2PamunPKtOy1NvUKeTgTmy2r6pDEBvdzi3PnY3U8hzOxK4oyLVwAFy/KhQRp10mpPjQQp2uuEl9+1C3aoJNjU6s5ljRDHXHZLfL5iPdwBFRBVQPgIeLqo3xDiLaOE6/Ws+vaeKrib5WKnJSfA3RZAAAAAElFTkSuQmCC"},573:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgB1ZRRSgMxEIZnsqtS8GGPkBtsH6VbcatQ8BjeoEfQm3gObQ1SEd/qDdwbuA/Fbl2TMVGzWLqls6V96A8Jw/DnC8lMAsDQVHXaM3UiOV7BgYVGKNThZHrXaa/zIwcGBNFfKv8ypnfcf35tDKyBAQdae+SZSqWHIcJ1tftvHIVCqFXHrwXq8jMCwtwBji6ebnzexX6DQJscNlUx7JIbHO/aKjfV7oDFKBnY8cbpNS9XvGLUff+4TwZLQAQR20LIQ4ExcGV06johQIiXgNvS1oEhx0QGrwJhWG3DArb641tgaq/ukDI3G/tW58Mk5Sy2l/rjQxTVu66+L1JpNNd6YiMJjUQZlbrXunzJFoBe5cPpGSFKBgmQKDs4Hz/+z30DK2x0St4Ief0AAAAASUVORK5CYII="},582:function(e,t,n){"use strict";n.r(t);var o=n(32),a=n(7),r=n(0),l=n.n(r),i=n(180),c=n(19),s=n(179),f=n(9),p=n(18),u=(n(568),n(547),n(5)),d=n(28),g=n(546),m=n.n(g),y=n(76),x=n(572),b=n.n(x),A=n(573),C=n.n(A),w=n(132),h=n.n(w),S=n(26);t.default=Object(c.b)((function(e){return{userType:e.auth.userType,userToken:e.auth.userToken,showUserInfo:e.al.showUserInfo}}),(function(e){return{onGenerateTransferCode:function(t,n,o){return e(p.o({type:f.q,data:{in_Token:t,in_Amount:n,in_Currency:o}}))}}}))(Object(i.a)((function(e){var t,n=Object(r.useState)(),i=Object(a.a)(n,2),c=i[0],s=i[1],f=Object(r.useState)("US"),p=Object(a.a)(f,2),g=p[0],x=p[1],A=Object(r.useState)(+e.showUserInfo.BalanceUSD),w=Object(a.a)(A,2),v=w[0],E=w[1],O=Object(r.useState)(""),j=Object(a.a)(O,2),D=j[0],B=j[1],T=Object(r.useState)(""),R=Object(a.a)(T,2),U=R[0],I=R[1];Object(r.useEffect)((function(){var t=e.showUserInfo,n=t.BalanceUSD,o=t.BalanceMXN,a=t.BalanceBS;switch(g){case"US":E(+n);case"MXN":E(+o);case"BS":E(+a);default:x("US"),E(+n)}}),[]),Object(r.useEffect)((function(){var t=e.showUserInfo,n=t.BalanceUSD,o=t.BalanceMXN,a=t.BalanceBS;switch(g){case"US":E(+n);case"MXN":E(+o);case"BS":E(+a);default:x("US"),E(+n)}}),[g]);return l.a.createElement("div",{className:m.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"10px",marginRight:"10px"}},l.a.createElement("div",{className:m.a.container,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},l.a.createElement(S.BrowserView,null,l.a.createElement("p",null,"UNDER CONSTRUCTION")),l.a.createElement(S.MobileView,null,l.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",marginTop:"8%"}},l.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}},l.a.createElement("div",{style:{marginBottom:"4%",borderLeft:"5px solid ".concat(u.b.alcanceOrange),display:"flex",flex:1,flexDirection:"column",justifyContent:"flex-start",alignContent:"center"}},l.a.createElement("label",{style:{fontSize:"1.4rem",color:u.b.alcanceOrange,marginLeft:"10px"}},"Generar  c\xf3digo")),l.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"100%",textAlign:"left",marginTop:"20px"}},l.a.createElement("p",{style:{fontSize:"12px"}}," ","Introduzca el monto para generar el codigo:"),l.a.createElement(y.a,{key:1,label:"Monto:",labelStyle:{color:u.b.alcanceOrange,textAlign:"left",fontSize:"12px"},containerStyle:{borderBottom:"2px solid #ccc",display:"flex",flex:1,flexDirection:"column",justifyContent:"flex-start",alignContent:"center",width:"100%",paddingTop:"2px",minHeight:"50px",fontSize:"12px",marginRight:"5px",marginLeft:"5px"},middleContainerStyle:{border:"none"},inputStyle:{minHeight:"50px",border:"none",fontSize:"14px",outline:"none"},elementType:"input",elementConfig:{type:"number",placeholder:"monto"},value:c,changed:function(e){s(e.target.value)},onFocus:function(e){I("")}}),l.a.createElement(y.a,{key:"someRandom",label:"Moneda:",labelStyle:{color:u.b.alcanceOrange,textAlign:"left",fontSize:"12px"},containerStyle:{borderBottom:"2px solid #ccc",outline:"none",display:"flex",flex:1,flexDirection:"column",justifyContent:"flex-start",alignContent:"center",width:"100%",paddingTop:"2px",minHeight:"50px",fontSize:"12px",marginRight:"5px",marginLeft:"5px",marginTop:"20px"},middleContainerStyle:{border:"none",outline:"none"},inputStyle:{minHeight:"50px",outline:"none",fontSize:"14px",border:0,boxShadow:"none"},elementType:"select",elementConfig:{options:[{value:"US",displayValue:"US"},{value:"MXN",displayValue:"MXN"},{value:"BS",displayValue:"BS"}]},optionStyle:{outline:"none",border:"none",display:"flex",justifyContent:"center",alignItems:"center"},value:g,changed:function(e){return x(e.currentTarget.value)},onFocus:function(){I("")}}),l.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",alignItems:"stretch",alignSelf:"flex-start",marginTop:"20px",width:"100%"}},l.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"row",justifyContent:"flex-start",alignContent:"center",marginTop:"5px"}},l.a.createElement("label",{style:{fontSize:"12px",marginRight:"10px"}},"Disponible: "),l.a.createElement("label",{style:{fontSize:"12px",color:u.b.alcanceOrange,marginLeft:"10px"}},c>0?+(v-c):v,"  ",g)),l.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"row",justifyContent:"space-between",alignContent:"center",marginTop:"5px"}},l.a.createElement("div",{style:{display:"flex",flex:3,flexDirection:"row",justifyContent:"flex-start",alignContent:"center",marginTop:"5px",alignSelf:"flex-start",wordWrap:"wrap"}},l.a.createElement("label",{style:{fontSize:"12px",marginRight:"10px"}},"C\xd3DIGO: "),l.a.createElement("label",{style:{fontSize:"12px",color:u.b.alcanceOrange,marginLeft:"10px",marginRight:"10px",maxWidth:"140px"}}," ",D," ")),l.a.createElement("div",{style:(t={display:"flex",flex:1,flexDirection:"row",justifyContent:"center",alignContent:"center",alignSelf:"stretch",paddingLeft:"5px",marginLeft:"20px"},Object(o.a)(t,"paddingLeft","10px"),Object(o.a)(t,"paddingRight","0px"),Object(o.a)(t,"marginRight","0px"),t)},l.a.createElement(d.a,{clicked:function(e){!function(){var e=document.createElement("textarea");e.innerText=D,document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}()},clickableImage:!0,image:b.a}),l.a.createElement(d.a,{clicked:function(e){alert("Download list")},clickableImage:!0,image:C.a}))))),U&&U.length>2&&l.a.createElement("div",{style:{marginTop:"15px",marginBottom:"15px",display:"flex",flex:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center"}},l.a.createElement("img",{src:h.a,alt:"error",style:{width:"25px",height:"25px",resizeMode:"contain",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:"0px"}}),l.a.createElement("label",{style:{paddingLeft:"5px",color:u.b.red,fontSize:"12px"}},U)),l.a.createElement("div",{style:{marginTop:"12px",marginBottom:"12px",fontSize:" bold",textAlign:" center",display:"flex",justifyContent:"center",fontFamily:"AvenirBlack",width:"120px",height:"30%",alignSelf:"center"}},l.a.createElement(d.a,{clicked:function(t){!+c>0?I("Monto no puede ser inferior a 1"):g.length>1?g.length>1&&g.length>1&&(console.log("-------------------------------------------------------------"),console.log(e),console.log(c),console.log(g),e.onGenerateTransferCode(e.userToken,c,g).then((function(e){200==e.status&&e.data&&e.data.result&&B(e.data.result[0].Code),501==e.status&&I(e.message)}))):I("Seleccione el tipo de moneda")},label:"GENERAR",style:{color:"white",alignSelf:"center",backgroundColor:"#f8bb48",borderRadius:"2px",minHeight:"40px",fontWeight:"bold",textAlign:" center"}})))))))}),s.a))}}]);
//# sourceMappingURL=14.5f23b0e7.chunk.js.map