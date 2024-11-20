import{k as E,m as L,bv as O,bw as j,l as B,n as X,d as z,s as F,J as S,a1 as D,b as d,D as b,a5 as U,a9 as J,bx as V,by as q,R as G,bz as K,P,bA as Q,bB as Y}from"./index-DYXwBPv-.js";const v=(o,t,l)=>{const a=O(l);return{[`${o.componentCls}-${t}`]:{color:o[`color${l}`],background:o[`color${a}Bg`],borderColor:o[`color${a}Border`],[`&${o.componentCls}-borderless`]:{borderColor:"transparent"}}}},Z=o=>j(o,(t,l)=>{let{textColor:a,lightBorderColor:r,lightColor:e,darkColor:c}=l;return{[`${o.componentCls}-${t}`]:{color:a,background:e,borderColor:r,"&-inverse":{color:o.colorTextLightSolid,background:c,borderColor:c},[`&${o.componentCls}-borderless`]:{borderColor:"transparent"}}}}),oo=o=>{const{paddingXXS:t,lineWidth:l,tagPaddingHorizontal:a,componentCls:r}=o,e=a-l,c=t-l;return{[r]:B(B({},X(o)),{display:"inline-block",height:"auto",marginInlineEnd:o.marginXS,paddingInline:e,fontSize:o.tagFontSize,lineHeight:`${o.tagLineHeight}px`,whiteSpace:"nowrap",background:o.tagDefaultBg,border:`${o.lineWidth}px ${o.lineType} ${o.colorBorder}`,borderRadius:o.borderRadiusSM,opacity:1,transition:`all ${o.motionDurationMid}`,textAlign:"start",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:o.tagDefaultColor},[`${r}-close-icon`]:{marginInlineStart:c,color:o.colorTextDescription,fontSize:o.tagIconSize,cursor:"pointer",transition:`all ${o.motionDurationMid}`,"&:hover":{color:o.colorTextHeading}},[`&${r}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${o.iconCls}-close, ${o.iconCls}-close:hover`]:{color:o.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:o.colorPrimary,backgroundColor:o.colorFillSecondary},"&:active, &-checked":{color:o.colorTextLightSolid},"&-checked":{backgroundColor:o.colorPrimary,"&:hover":{backgroundColor:o.colorPrimaryHover}},"&:active":{backgroundColor:o.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${o.iconCls} + span, > span + ${o.iconCls}`]:{marginInlineStart:e}}),[`${r}-borderless`]:{borderColor:"transparent",background:o.tagBorderlessBg}}},H=E("Tag",o=>{const{fontSize:t,lineHeight:l,lineWidth:a,fontSizeIcon:r}=o,e=Math.round(t*l),c=o.fontSizeSM,g=e-a*2,C=o.colorFillAlter,i=o.colorText,n=L(o,{tagFontSize:c,tagLineHeight:g,tagDefaultBg:C,tagDefaultColor:i,tagIconSize:r-2*a,tagPaddingHorizontal:8,tagBorderlessBg:o.colorFillTertiary});return[oo(n),Z(n),v(n,"success","Success"),v(n,"processing","Info"),v(n,"error","Error"),v(n,"warning","Warning")]}),eo=()=>({prefixCls:String,checked:{type:Boolean,default:void 0},onChange:{type:Function},onClick:{type:Function},"onUpdate:checked":Function}),m=z({compatConfig:{MODE:3},name:"ACheckableTag",inheritAttrs:!1,props:eo(),setup(o,t){let{slots:l,emit:a,attrs:r}=t;const{prefixCls:e}=F("tag",o),[c,g]=H(e),C=n=>{const{checked:u}=o;a("update:checked",!u),a("change",!u),a("click",n)},i=S(()=>D(e.value,g.value,{[`${e.value}-checkable`]:!0,[`${e.value}-checkable-checked`]:o.checked}));return()=>{var n;return c(d("span",b(b({},r),{},{class:[i.value,r.class],onClick:C}),[(n=l.default)===null||n===void 0?void 0:n.call(l)]))}}}),lo=()=>({prefixCls:String,color:{type:String},closable:{type:Boolean,default:!1},closeIcon:P.any,visible:{type:Boolean,default:void 0},onClose:{type:Function},onClick:Q(),"onUpdate:visible":Function,icon:P.any,bordered:{type:Boolean,default:!0}}),h=z({compatConfig:{MODE:3},name:"ATag",inheritAttrs:!1,props:lo(),slots:Object,setup(o,t){let{slots:l,emit:a,attrs:r}=t;const{prefixCls:e,direction:c}=F("tag",o),[g,C]=H(e),i=U(!0);J(()=>{o.visible!==void 0&&(i.value=o.visible)});const n=s=>{s.stopPropagation(),a("update:visible",!1),a("close",s),!s.defaultPrevented&&o.visible===void 0&&(i.value=!1)},u=S(()=>V(o.color)||q(o.color)),w=S(()=>D(e.value,C.value,{[`${e.value}-${o.color}`]:u.value,[`${e.value}-has-color`]:o.color&&!u.value,[`${e.value}-hidden`]:!i.value,[`${e.value}-rtl`]:c.value==="rtl",[`${e.value}-borderless`]:!o.bordered})),A=s=>{a("click",s)};return()=>{var s,p,f;const{icon:M=(s=l.icon)===null||s===void 0?void 0:s.call(l),color:$,closeIcon:y=(p=l.closeIcon)===null||p===void 0?void 0:p.call(l),closable:k=!1}=o,N=()=>k?y?d("span",{class:`${e.value}-close-icon`,onClick:n},[y]):d(Y,{class:`${e.value}-close-icon`,onClick:n},null):null,R={backgroundColor:$&&!u.value?$:void 0},T=M||null,x=(f=l.default)===null||f===void 0?void 0:f.call(l),W=T?d(G,null,[T,d("span",null,[x])]):x,_=o.onClick!==void 0,I=d("span",b(b({},r),{},{onClick:A,class:[w.value,r.class],style:[R,r.style]}),[W,N()]);return g(_?d(K,null,{default:()=>[I]}):I)}}});h.CheckableTag=m;h.install=function(o){return o.component(h.name,h),o.component(m.name,m),o};export{h as T};
