(this["webpackJsonpstocks-app"]=this["webpackJsonpstocks-app"]||[]).push([[0],{63:function(e,t,c){},64:function(e,t,c){},73:function(e,t,c){"use strict";c.r(t);var r=c(5),n=c(0),a=c.n(n),i=c(46),o=c.n(i),s=(c(63),c(8)),l=(c(64),c(47)),u=c.n(l),d=c(91),b=c(86),j=c(87),p=c(88),h=c(89),g=c(90),O=c(94),f=c(76),m=c(92);function x(){var e=Object(f.b)(),t=e.colorMode,c=e.toggleColorMode;return Object(r.jsx)(m.a,{colorScheme:"teal",variant:"outline",size:"sm",onClick:c,children:"".concat("dark"===t?"Light":"Dark"," Mode")})}var v,C=c(14),w=c(55),k=c(85),M=Object(C.a)(Object(C.a)({},w.b),{},{colors:Object(C.a)(Object(C.a)({},w.b.colors),{},{bgColorMain:"#fff",priceIncrease:w.b.colors.green,priceDecrease:w.b.colors.red,black:"gray.600"}),styles:{global:function(e){return{"html, body":{bg:Object(k.a)("white","gray.600")(e),color:Object(k.a)("black","white")(e)}}}}}),y=c(93),S=function(e){var t=e.name,c=e.price,n=e.priceChange,a=e.priceChangePercent,i=Object(f.c)("green.100","green.300"),o=Object(f.c)("red.100","red.300"),s="increase"===n?i:o;return Object(r.jsxs)(y.a,{minWidth:["2.5rem","2rem"],margin:"0.5em",padding:"1em",borderRadius:["0.5em","1em"],boxShadow:"xl",bg:n?s:"",children:[Object(r.jsx)(y.d,{children:t}),Object(r.jsx)(y.e,{fontSize:["md","2xl"],children:c}),Object(r.jsxs)(y.c,{fontSize:["xs","md"],children:[Object(r.jsx)(y.b,{boxSize:["2","3"],type:n}),"".concat(a||0,"%")]})]})},P=c(26),I=c.n(P);!function(e){e.Increase="increase",e.Decrease="decrease",e.NoChange="priceDefault"}(v||(v={}));var D=function(e,t){switch(t.type){case"update":var c=function(e,t){return t?(null===e||void 0===e||e.forEach((function(c,r){if(null===t||void 0===t?void 0:t.has(r)){var n=t.get(r)||{price:0},a=e.get(r)||{price:0},i=a.price-n.price,o=i/n.price*100,s={};s.priceChangePercent=Math.abs(Math.round(100*o)/100),s.price=a.price,s.prevPrice=n.price,(s=Object(C.a)(Object(C.a)({},c),s)).lastUpdateTime=I()(),s.priceChange=i>0?v.Increase:i<0?v.Decrease:v.NoChange,0!==i&&t.set(r,s)}else t.set(r,Object(C.a)(Object(C.a)({},c),{},{priceChange:v.NoChange,prevPrice:0,priceChangePercent:0}))})),t):e}((r=t.data,JSON.parse(r.data).reduce((function(e,t){var c=Object(s.a)(t,2),r=c[0],n=c[1],a={price:Math.round(100*n)/100,lastUpdateTime:I()()};return e.set(r,a),e}),new Map)),e);return c?new Map(c):e;default:return e}var r};var z=function(){var e=Object(n.useReducer)(D,null),t=Object(s.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(0),o=Object(s.a)(i,2),l=o[0],f=o[1],m=u()("ws://stocks.mnet.website").lastMessage;Object(n.useEffect)((function(){if(m){var e={type:"update",data:m};f(l+1),a(e)}}),[m]);var v=[];return null===c||void 0===c||c.forEach((function(e,t){var c=t.split("").reduce((function(e,t){return e+t.charCodeAt(0)}),0),r={ticker:t,value:e,id:c};v.push(r)})),v.sort((function(e,t){return e&&t?e.id-t.id:0})),Object(r.jsxs)(d.a,{theme:M,children:[Object(r.jsx)(b.a,{}),Object(r.jsxs)(j.a,{alignItems:"center",direction:["column","column","column","row"],justifyContent:["flex-start","flex-start","flex-start","space-around"],minHeight:"100vh",children:[Object(r.jsxs)(j.a,{direction:["row","row","row","column"],width:["100%","100%","100%","40%"],alignItems:"center",justifyContent:"space-around",children:[Object(r.jsx)(p.a,{p:"1rem 2rem",children:Object(r.jsx)(h.a,{children:"Stock App"})}),Object(r.jsx)(g.a,{}),Object(r.jsx)(p.a,{p:"1rem 2rem",children:Object(r.jsx)(x,{})})]}),Object(r.jsx)(O.a,{columns:[3,5],spacing:1,children:v.map((function(e){return e?Object(r.jsx)(S,{name:e.ticker,price:e.value.price,priceChange:e.value.priceChange,priceChangePercent:e.value.priceChangePercent}):null}))})]})]})},E=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,95)).then((function(t){var c=t.getCLS,r=t.getFID,n=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),r(e),n(e),a(e),i(e)}))},F=c(54),N=c.n(F);I.a.extend(N.a),o.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(z,{})}),document.getElementById("root")),E()}},[[73,1,2]]]);
//# sourceMappingURL=main.3b6cb775.chunk.js.map