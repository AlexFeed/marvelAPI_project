"use strict";(self.webpackChunkmarvel=self.webpackChunkmarvel||[]).push([[748],{421:function(t,e,n){n.d(e,{Z:function(){return s}});var r=n(5387),c=n(4415),a=n(184),s=function(){return(0,a.jsxs)("div",{className:"app__banner",children:[(0,a.jsx)("img",{src:r,alt:"Avengers"}),(0,a.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",(0,a.jsx)("br",{}),"Stay tuned!"]}),(0,a.jsx)("img",{src:c,alt:"Avengers logo"})]})}},7341:function(t,e,n){var r=n(7853),c=n(4531),a=n(1020),s=n(804),i=n(2791),o=n(7734),u=n(184),l=function(t){(0,a.Z)(n,t);var e=(0,s.Z)(n);function n(){var t;(0,r.Z)(this,n);for(var c=arguments.length,a=new Array(c),s=0;s<c;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).state={error:!1},t}return(0,c.Z)(n,[{key:"componentDidCatch",value:function(t,e){console.log(t,e),this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?(0,u.jsx)(o.Z,{}):this.props.children}}]),n}(i.Component);e.Z=l},7734:function(t,e,n){n.d(e,{Z:function(){return a}});var r=n(4271),c=n(184),a=function(){return(0,c.jsxs)("div",{className:"errorBlock",children:[(0,c.jsx)("h1",{className:"errorTitle",children:"Something went wrong, please try it later:("}),(0,c.jsx)("img",{className:"errorImg",src:r,alt:"Error"})]})}},1748:function(t,e,n){n.r(e),n.d(e,{default:function(){return x}});var r=n(4270),c=n(5531),a=n(3430),s=n(2791),i=n(3504),o=n(9295),u=n(255),l=n(5681),p=n(3394),m=n(7734),d=n(184),f=function(t){var e=t.thumbnail,n=t.title,r=t.price,c=t.id;return(0,d.jsx)("li",{className:"comics__item",children:(0,d.jsxs)(i.OL,{to:"".concat(c),children:[(0,d.jsx)("img",{src:e,alt:n,className:"comics__item-img"}),(0,d.jsx)("div",{className:"comics__item-name",children:n}),(0,d.jsx)("div",{className:"comics__item-price",children:r})]})})},h=function(){var t=(0,l.Z)(),e=t.loading,n=t.error,r=t.getComicsList,i=t.clearError,h=(0,s.useState)([]),v=(0,a.Z)(h,2),g=v[0],x=v[1],b=(0,s.useState)(!1),j=(0,a.Z)(b,2),Z=j[0],_=j[1],w=(0,s.useState)(!1),k=(0,a.Z)(w,2),y=k[0],C=k[1],N=(0,s.useState)(210),E=(0,a.Z)(N,2),S=E[0],T=E[1],A=function(t){t.length<8&&_(!0),x([].concat((0,c.Z)(g),(0,c.Z)(t))),C(!1),T((function(t){return t+8}))},L=function(t,e){i(),C(!e),r(t).then(A)};(0,s.useEffect)((function(){L(S,!0)}),[]);var q=g.map((function(t,e){return(0,d.jsx)(o.Z,{timeout:500,classNames:"comics__item-transition",className:"comics__item",children:(0,d.jsx)(f,{thumbnail:t.thumbnail,title:t.title,price:t.price,id:t.id})},e)})),G=e&&!y?(0,d.jsx)(p.Z,{}):null,I=n?(0,d.jsx)(m.Z,{}):null,O={display:Z?"none":"block"};return(0,d.jsxs)("div",{className:"comics__list",children:[G,I,(0,d.jsx)("ul",{className:"comics__grid",children:(0,d.jsx)(u.Z,{className:"comics__transitionGroup comics__grid",children:q})}),(0,d.jsx)("button",{style:O,disabled:y,onClick:function(){return L(S,!1)},className:"button button__main button__long",children:(0,d.jsx)("div",{className:"inner",children:"load more"})})]})},v=n(7341),g=n(421),x=function(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(r.q,{children:[(0,d.jsx)("meta",{name:"description",content:"Page of Marvel comics list"}),(0,d.jsx)("title",{children:"Comics page"})]}),(0,d.jsx)(g.Z,{}),(0,d.jsx)(v.Z,{children:(0,d.jsx)(h,{})})]})}},5681:function(t,e,n){n.d(e,{Z:function(){return o}});var r=n(3032),c=n(4322),a=n.n(c),s=n(3430),i=n(2791),o=function(){var t=function(){var t=(0,i.useState)(!1),e=(0,s.Z)(t,2),n=e[0],c=e[1],o=(0,i.useState)(null),u=(0,s.Z)(o,2),l=u[0],p=u[1],m=function(){var t=(0,r.Z)(a().mark((function t(e){var n,r,s,i,o=arguments;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:"GET",r=o.length>2&&void 0!==o[2]?o[2]:null,s=o.length>3&&void 0!==o[3]?o[3]:{"Content-Type":"application/json"},c(!0),t.prev=4,t.next=7,fetch(e,{method:n,body:r,headers:s});case 7:if((i=t.sent).ok){t.next=12;break}throw new Error("Couldn't get resource'".concat(e,", status ").concat(i.status));case 12:return c(!1),t.abrupt("return",i.json());case 14:t.next=21;break;case 16:throw t.prev=16,t.t0=t.catch(4),c(!1),p(t.t0.message),t.t0;case 21:case"end":return t.stop()}}),t,null,[[4,16]])})));return function(e){return t.apply(this,arguments)}}(),d=(0,i.useCallback)(function(){var t=(0,r.Z)(a().mark((function t(e){var n,r,c,s=arguments;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:"GET",r=s.length>2&&void 0!==s[2]?s[2]:null,c=s.length>3&&void 0!==s[3]?s[3]:{"Content-Type":"application/json"},t.next=5,m(e,n,r,c);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[]);return{loading:n,request:d,error:l,clearError:(0,i.useCallback)((function(){p(null)}),[])}}(),e=t.loading,n=t.request,c=t.error,o=t.clearError,u="https://gateway.marvel.com:443/v1/public/",l="&apikey=94cd8f145a0551e6b7ef67f3edad94c9",p=210,m=function(t){return{id:t.id,name:t.name.length>50?"".concat(t.name.slice(0,50),"..."):t.name,description:t.description?"".concat(t.description.slice(0,210),"..."):"There is no description for this character",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,homepage:t.urls[0].url,wiki:t.urls[1].url,comics:t.comics.items}},d=function(){var t=(0,r.Z)(a().mark((function t(){var e,r,c=arguments;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c.length>0&&void 0!==c[0]?c[0]:p,t.next=3,n("".concat(u,"characters?limit=9&offset=").concat(e).concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(m));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),f=function(){var t=(0,r.Z)(a().mark((function t(e){var r;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"characters/").concat(e,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",m(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(){var t=(0,r.Z)(a().mark((function t(e){var r;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"characters?name=").concat(e,"&").concat(l));case 2:return r=t.sent,t.abrupt("return",r.data.results.map(m));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(t){return{id:t.id,title:t.title,description:t.description||"There is no description",pageCount:t.pageCount||"There is no information about the number of pages",language:t.textObjects.length>0?t.textObjects[0].language:"en-us",price:t.prices[0].price||"Not available",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension}},g=function(){var t=(0,r.Z)(a().mark((function t(){var e,r,c=arguments;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c.length>0&&void 0!==c[0]?c[0]:p,t.next=3,n("".concat(u,"comics?limit=8&offset=").concat(e).concat(l));case 3:return r=t.sent,t.abrupt("return",r.data.results.map(v));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=(0,r.Z)(a().mark((function t(e){var r;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat(u,"comics/").concat(e,"?").concat(l));case 2:return r=t.sent,t.abrupt("return",v(r.data.results[0]));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return{loading:e,error:c,getCharactersList:d,getCharacterInfo:f,getComicsList:g,getComicInfo:x,getCharacterByName:h,clearError:o}}},4271:function(t,e,n){t.exports=n.p+"static/media/error.e7d729c873321c6991b2.png"},5387:function(t,e,n){t.exports=n.p+"static/media/Avengers.4065c8f9c94e3d8b039a.png"},4415:function(t,e,n){t.exports=n.p+"static/media/Avengers_logo.9eaf219344d83362e830.png"}}]);
//# sourceMappingURL=748.6f8851a3.chunk.js.map