import{k as ve,m as _e,l as f,n as xe,p as P,q as pe,d as A,s as Z,v as D,x as Se,b as o,y as Ce,z as we,B as Te,C as ue,D as le,P as z,E as se,F as Be,G as De,H as F,I as V,J as ze,K as Me,M as de,r as X,o as He,N as Le,O as Re,a as M,c as ce,w as u,g as x,Q as Ge,u as H,R as Pe,U as Ae,e as q,V as Ie,W as Ee,X as We,_ as Ne,f as J,t as Q,T as je}from"./index-DYXwBPv-.js";import{u as Oe}from"./useErrorImage-CZMx-GP2.js";import{_ as Ke,a as Ue}from"./index-C8ixjve7.js";import{P as Fe}from"./Paragraph-hvQK1FVH.js";const Ve=e=>{const{antCls:t,componentCls:a,cardHeadHeight:n,cardPaddingBase:r,cardHeadTabsMarginBottom:i}=e;return f(f({display:"flex",justifyContent:"center",flexDirection:"column",minHeight:n,marginBottom:-1,padding:`0 ${r}px`,color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,background:"transparent",borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorderSecondary}`,borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`},P()),{"&-wrapper":{width:"100%",display:"flex",alignItems:"center"},"&-title":f(f({display:"inline-block",flex:1},pe),{[`
          > ${a}-typography,
          > ${a}-typography-edit-content
        `]:{insetInlineStart:0,marginTop:0,marginBottom:0}}),[`${t}-tabs-top`]:{clear:"both",marginBottom:i,color:e.colorText,fontWeight:"normal",fontSize:e.fontSize,"&-bar":{borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorderSecondary}`}}})},Xe=e=>{const{cardPaddingBase:t,colorBorderSecondary:a,cardShadow:n,lineWidth:r}=e;return{width:"33.33%",padding:t,border:0,borderRadius:0,boxShadow:`
      ${r}px 0 0 0 ${a},
      0 ${r}px 0 0 ${a},
      ${r}px ${r}px 0 0 ${a},
      ${r}px 0 0 0 ${a} inset,
      0 ${r}px 0 0 ${a} inset;
    `,transition:`all ${e.motionDurationMid}`,"&-hoverable:hover":{position:"relative",zIndex:1,boxShadow:n}}},qe=e=>{const{componentCls:t,iconCls:a,cardActionsLiMargin:n,cardActionsIconSize:r,colorBorderSecondary:i}=e;return f(f({margin:0,padding:0,listStyle:"none",background:e.colorBgContainer,borderTop:`${e.lineWidth}px ${e.lineType} ${i}`,display:"flex",borderRadius:`0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px `},P()),{"& > li":{margin:n,color:e.colorTextDescription,textAlign:"center","> span":{position:"relative",display:"block",minWidth:e.cardActionsIconSize*2,fontSize:e.fontSize,lineHeight:e.lineHeight,cursor:"pointer","&:hover":{color:e.colorPrimary,transition:`color ${e.motionDurationMid}`},[`a:not(${t}-btn), > ${a}`]:{display:"inline-block",width:"100%",color:e.colorTextDescription,lineHeight:`${e.fontSize*e.lineHeight}px`,transition:`color ${e.motionDurationMid}`,"&:hover":{color:e.colorPrimary}},[`> ${a}`]:{fontSize:r,lineHeight:`${r*e.lineHeight}px`}},"&:not(:last-child)":{borderInlineEnd:`${e.lineWidth}px ${e.lineType} ${i}`}}})},Je=e=>f(f({margin:`-${e.marginXXS}px 0`,display:"flex"},P()),{"&-avatar":{paddingInlineEnd:e.padding},"&-detail":{overflow:"hidden",flex:1,"> div:not(:last-child)":{marginBottom:e.marginXS}},"&-title":f({color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG},pe),"&-description":{color:e.colorTextDescription}}),Qe=e=>{const{componentCls:t,cardPaddingBase:a,colorFillAlter:n}=e;return{[`${t}-head`]:{padding:`0 ${a}px`,background:n,"&-title":{fontSize:e.fontSize}},[`${t}-body`]:{padding:`${e.padding}px ${a}px`}}},Ye=e=>{const{componentCls:t}=e;return{overflow:"hidden",[`${t}-body`]:{userSelect:"none"}}},Ze=e=>{const{componentCls:t,cardShadow:a,cardHeadPadding:n,colorBorderSecondary:r,boxShadow:i,cardPaddingBase:s}=e;return{[t]:f(f({},xe(e)),{position:"relative",background:e.colorBgContainer,borderRadius:e.borderRadiusLG,[`&:not(${t}-bordered)`]:{boxShadow:i},[`${t}-head`]:Ve(e),[`${t}-extra`]:{marginInlineStart:"auto",color:"",fontWeight:"normal",fontSize:e.fontSize},[`${t}-body`]:f({padding:s,borderRadius:` 0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`},P()),[`${t}-grid`]:Xe(e),[`${t}-cover`]:{"> *":{display:"block",width:"100%"},img:{borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`}},[`${t}-actions`]:qe(e),[`${t}-meta`]:Je(e)}),[`${t}-bordered`]:{border:`${e.lineWidth}px ${e.lineType} ${r}`,[`${t}-cover`]:{marginTop:-1,marginInlineStart:-1,marginInlineEnd:-1}},[`${t}-hoverable`]:{cursor:"pointer",transition:`box-shadow ${e.motionDurationMid}, border-color ${e.motionDurationMid}`,"&:hover":{borderColor:"transparent",boxShadow:a}},[`${t}-contain-grid`]:{[`${t}-body`]:{display:"flex",flexWrap:"wrap"},[`&:not(${t}-loading) ${t}-body`]:{marginBlockStart:-e.lineWidth,marginInlineStart:-e.lineWidth,padding:0}},[`${t}-contain-tabs`]:{[`> ${t}-head`]:{[`${t}-head-title, ${t}-extra`]:{paddingTop:n}}},[`${t}-type-inner`]:Qe(e),[`${t}-loading`]:Ye(e),[`${t}-rtl`]:{direction:"rtl"}}},ke=e=>{const{componentCls:t,cardPaddingSM:a,cardHeadHeightSM:n}=e;return{[`${t}-small`]:{[`> ${t}-head`]:{minHeight:n,padding:`0 ${a}px`,fontSize:e.fontSize,[`> ${t}-head-wrapper`]:{[`> ${t}-extra`]:{fontSize:e.fontSize}}},[`> ${t}-body`]:{padding:a}},[`${t}-small${t}-contain-tabs`]:{[`> ${t}-head`]:{[`${t}-head-title, ${t}-extra`]:{minHeight:n,paddingTop:0,display:"flex",alignItems:"center"}}}}},et=ve("Card",e=>{const t=_e(e,{cardShadow:e.boxShadowCard,cardHeadHeight:e.fontSizeLG*e.lineHeightLG+e.padding*2,cardHeadHeightSM:e.fontSize*e.lineHeight+e.paddingXS*2,cardHeadPadding:e.padding,cardPaddingBase:e.paddingLG,cardHeadTabsMarginBottom:-e.padding-e.lineWidth,cardActionsLiMargin:`${e.paddingSM}px 0`,cardActionsIconSize:e.fontSize,cardPaddingSM:12});return[Ze(t),ke(t)]}),{TabPane:tt}=ue,at=()=>({prefixCls:String,title:z.any,extra:z.any,bordered:{type:Boolean,default:!0},bodyStyle:{type:Object,default:void 0},headStyle:{type:Object,default:void 0},loading:{type:Boolean,default:!1},hoverable:{type:Boolean,default:!1},type:{type:String},size:{type:String},actions:z.any,tabList:{type:Array},tabBarExtraContent:z.any,activeTabKey:String,defaultActiveTabKey:String,cover:z.any,onTabChange:{type:Function}}),S=A({compatConfig:{MODE:3},name:"ACard",inheritAttrs:!1,props:at(),slots:Object,setup(e,t){let{slots:a,attrs:n}=t;const{prefixCls:r,direction:i,size:s}=Z("card",e),[y,_]=et(r),$=g=>g.map((c,b)=>se(c)&&!Be(c)||!se(c)?o("li",{style:{width:`${100/g.length}%`},key:`action-${b}`},[o("span",null,[c])]):null),m=g=>{var d;(d=e.onTabChange)===null||d===void 0||d.call(e,g)},p=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],d;return g.forEach(c=>{c&&De(c.type)&&c.type.__ANT_CARD_GRID&&(d=!0)}),d};return()=>{var g,d,c,b,C,w;const{headStyle:I={},bodyStyle:E={},loading:L,bordered:W=!0,type:h,tabList:v,hoverable:N,activeTabKey:k,defaultActiveTabKey:ge,tabBarExtraContent:ee=D((g=a.tabBarExtraContent)===null||g===void 0?void 0:g.call(a)),title:j=D((d=a.title)===null||d===void 0?void 0:d.call(a)),extra:O=D((c=a.extra)===null||c===void 0?void 0:c.call(a)),actions:K=D((b=a.actions)===null||b===void 0?void 0:b.call(a)),cover:te=D((C=a.cover)===null||C===void 0?void 0:C.call(a))}=e,T=Se((w=a.default)===null||w===void 0?void 0:w.call(a)),l=r.value,he={[`${l}`]:!0,[_.value]:!0,[`${l}-loading`]:L,[`${l}-bordered`]:W,[`${l}-hoverable`]:!!N,[`${l}-contain-grid`]:p(T),[`${l}-contain-tabs`]:v&&v.length,[`${l}-${s.value}`]:s.value,[`${l}-type-${h}`]:!!h,[`${l}-rtl`]:i.value==="rtl"},fe=o(Ce,{loading:!0,active:!0,paragraph:{rows:4},title:!1},{default:()=>[T]}),ae=k!==void 0,me={size:"large",[ae?"activeKey":"defaultActiveKey"]:ae?k:ge,onChange:m,class:`${l}-head-tabs`};let ne;const re=v&&v.length?o(ue,me,{default:()=>[v.map(B=>{const{tab:oe,slots:R}=B,ie=R==null?void 0:R.tab;we(!R,"Card","tabList slots is deprecated, Please use `customTab` instead.");let U=oe!==void 0?oe:a[ie]?a[ie](B):null;return U=Te(a,"customTab",B,()=>[U]),o(tt,{tab:U,key:B.key,disabled:B.disabled},null)})],rightExtra:ee?()=>ee:null}):null;(j||O||re)&&(ne=o("div",{class:`${l}-head`,style:I},[o("div",{class:`${l}-head-wrapper`},[j&&o("div",{class:`${l}-head-title`},[j]),O&&o("div",{class:`${l}-extra`},[O])]),re]));const ye=te?o("div",{class:`${l}-cover`},[te]):null,$e=o("div",{class:`${l}-body`,style:E},[L?fe:T]),be=K&&K.length?o("ul",{class:`${l}-actions`},[$(K)]):null;return y(o("div",le(le({ref:"cardContainerRef"},n),{},{class:[he,n.class]}),[ne,ye,T&&T.length?$e:null,be]))}}}),nt=()=>({prefixCls:String,title:V(),description:V(),avatar:V()}),G=A({compatConfig:{MODE:3},name:"ACardMeta",props:nt(),slots:Object,setup(e,t){let{slots:a}=t;const{prefixCls:n}=Z("card",e);return()=>{const r={[`${n.value}-meta`]:!0},i=F(a,e,"avatar"),s=F(a,e,"title"),y=F(a,e,"description"),_=i?o("div",{class:`${n.value}-meta-avatar`},[i]):null,$=s?o("div",{class:`${n.value}-meta-title`},[s]):null,m=y?o("div",{class:`${n.value}-meta-description`},[y]):null,p=$||m?o("div",{class:`${n.value}-meta-detail`},[$,m]):null;return o("div",{class:r},[_,p])}}}),rt=()=>({prefixCls:String,hoverable:{type:Boolean,default:!0}}),Y=A({compatConfig:{MODE:3},name:"ACardGrid",__ANT_CARD_GRID:!0,props:rt(),setup(e,t){let{slots:a}=t;const{prefixCls:n}=Z("card",e),r=ze(()=>({[`${n.value}-grid`]:!0,[`${n.value}-grid-hoverable`]:e.hoverable}));return()=>{var i;return o("div",{class:r.value},[(i=a.default)===null||i===void 0?void 0:i.call(a)])}}});S.Meta=G;S.Grid=Y;S.install=function(e){return e.component(S.name,S),e.component(G.name,G),e.component(Y.name,Y),e};const ot=e=>Me.get(`${de.API_URL}/news`,{headers:de.headers,params:e}),it=e=>{let t=new Date(e);const n=Math.abs(+new Date-+t),r=Math.floor(n/(60*1e3)),i=Math.floor(n/(60*60*1e3)),s=Math.floor(n/(24*60*60*1e3));return s>0?`${s} days ago`:i>0?`${i} hours ago`:`${r} minutes ago`},lt={class:"container"},st=["href"],dt={style:{height:"170px"}},ct=["src","alt"],ft=A({__name:"CoinsNews",props:{limit:{},page:{},name:{}},setup(e){const t=Ie(),{page:a,limit:n}=e,r=X([]);for(let m=0;m<n;m++)r.value.push({source:"",title:"",imgUrl:"",link:"",feedDate:1234567});const i=["cryptocurrency.webp","cryptocurrencies-1.webp","cryptocurrencies-2.webp","cryptocurrencies-3.webp","cryptocurrencies-4.webp","cryptocurrencies-5.webp"],s=X(!1),y=X(a),_=Oe(i),$=async m=>{try{s.value=!0;const{data:p}=await ot({page:m,limit:n});if(m===1){r.value=p.result;return}r.value=r.value.concat(p.result)}catch(p){throw p}finally{s.value=!1}};return He(()=>$(y.value)),Le(y,()=>{$(y.value)}),(m,p)=>{const g=Ee,d=je,c=Fe,b=G,C=S,w=Ue,I=Ke,E=We,L=Re("router-link"),W=Ne;return M(),ce("div",lt,[o(g,{level:2,style:Ge(H(t).path==="/news"?{margin:"0 0 25px"}:{margin:"40px 0 25px"})},{default:u(()=>[x(" Latest Crypto News ")]),_:1},8,["style"]),o(I,{gutter:[16,16]},{default:u(()=>[(M(!0),ce(Pe,null,Ae(r.value,(h,v)=>(M(),q(w,{key:v,xs:24,sm:12,md:8,lg:6},{default:u(()=>[J("a",{href:h.link,target:"_blank"},[o(C,{hoverable:"",style:{width:"100%",height:"100%",display:"flex","flex-direction":"column"},loading:y.value===1?s.value:!1},{cover:u(()=>[J("div",dt,[J("img",{src:h.imgUrl,alt:h.title,style:{height:"100%",width:"100%"},onError:p[0]||(p[0]=(...N)=>H(_)&&H(_)(...N))},null,40,ct)])]),default:u(()=>[o(b,null,{title:u(()=>[o(d,{style:{"white-space":"pre-wrap","font-size":"16px","line-height":"1"}},{default:u(()=>[x(Q(h.title.length>55?`${h.title.slice(0,55)}...`:h.title),1)]),_:2},1024)]),description:u(()=>[o(c,{strong:"",style:{"line-height":"1.2",margin:"15px 0 5px"}},{default:u(()=>[x(Q(h.source),1)]),_:2},1024),o(d,{type:"secondary",strong:""},{default:u(()=>[x(Q(H(it)(h.feedDate)),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["loading"])],8,st)]),_:2},1024))),128))]),_:1}),o(W,{justify:"center",style:{"margin-top":"20px"}},{default:u(()=>[H(t).path==="/news"?(M(),q(E,{key:0,type:"primary",loading:s.value,onClick:p[1]||(p[1]=h=>y.value++),ghost:""},{default:u(()=>[x(" More News ")]),_:1},8,["loading"])):(M(),q(L,{key:1,to:"/news",class:"btn btn-primary-outlined"},{default:u(()=>[x(" See More News ")]),_:1}))]),_:1})])}}});export{ft as _};