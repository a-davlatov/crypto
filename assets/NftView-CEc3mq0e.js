import{K as A,M as I,d as M,r as h,o as E,a as i,e as _,w as n,f as y,u as s,b as c,g as r,t as u,h as f,c as N,T as W,_ as L,S as O,i as g,A as D,j as R,W as z,L as K}from"./index-DYXwBPv-.js";import{u as P}from"./useUcFirst-BjGD1EYs.js";import{u as q}from"./useErrorImage-CZMx-GP2.js";import{T as G}from"./index-Wnoy3SwI.js";import{P as $}from"./Paragraph-hvQK1FVH.js";import{_ as H}from"./index-CTHAILOD.js";const J=k=>A.get(`${I.API_URL}/nft/trending`,{headers:I.headers,params:k}),Q={style:{width:"44px",height:"44px",overflow:"hidden"}},X=["src","alt"],Y={key:1},Z={key:3},ee=M({__name:"NftTable",setup(k){const C=h([]),w=h(1),d=h(100),v=h(1),p=h(!1),x=q(["js.jpg","antd.png","vue.jpg"]),U=[{title:"#",dataIndex:"Id",key:"Id",width:80,customRender:({index:e})=>(v.value-1)*d.value+(e+1)},{title:"Name",dataIndex:"name",key:"name",sorter:(e,t)=>e.name.localeCompare(t.name)},{title:"floor Price",dataIndex:"floorPriceMc",key:"floorPriceMc",width:180,sorter:(e,t)=>e.floorPriceMc-t.floorPriceMc},{title:"24h %",dataIndex:"floorPriceChange24h",key:"floorPriceChange24h",width:160,sorter:(e,t)=>e.floorPriceChange24h-t.floorPriceChange24h},{title:"Volume 24h",dataIndex:"volumeMc24h",key:"volumeMc24h",width:180,sorter:(e,t)=>e.volumeMc24h-t.volumeMc24h},{title:"Owners Count",dataIndex:"ownersCount",key:"ownersCount",width:180,sorter:(e,t)=>e.ownersCount-t.ownersCount}],b=async(e,t)=>{try{p.value=!0;const{data:l}=await J({limit:t||100,page:e||1});C.value=l.data,w.value=l.meta.itemCount,t&&(d.value=t),e&&(v.value=e)}catch(l){throw l}finally{p.value=!1}};return E(()=>b()),(e,t)=>{const l=W,F=G,S=L,T=$,V=O,j=H;return i(),_(j,{sticky:"",pagination:{pageSize:d.value,total:w.value,showTotal:(a,o)=>`${o[0]}-${o[1]} of ${a} items`,onChange:(a,o)=>{b(a,o)}},columns:U,"data-source":C.value,loading:p.value,scroll:{x:"1100px"}},{bodyCell:n(({text:a,record:o,column:m})=>[m.key==="name"?(i(),_(S,{key:0,gap:"small",align:"center",horizontal:""},{default:n(()=>[y("div",Q,[y("img",{src:o.img||"fake-url.jpg",alt:o.name,width:"44",height:"44",style:{"border-radius":"8px"},onError:t[0]||(t[0]=(...B)=>s(x)&&s(x)(...B))},null,40,X)]),y("div",null,[c(l,{style:{display:"block",marginBottom:"3px"},strong:""},{default:n(()=>[r(u(s(P)(o.name)),1)]),_:2},1024),c(F,{bordered:!1,style:{fontWeight:"500",color:"#64748b"}},{default:n(()=>[r(u(s(P)(o.blockchain)),1)]),_:2},1024)])]),_:2},1024)):f("",!0),m.key==="floorPriceMc"&&a!=null?(i(),N("div",Y,[c(l,{strong:""},{default:n(()=>[r(u(`${s(g)(a.toFixed(2))}
             ${o.mainCurrencyId?o.mainCurrencyId.slice(0,3).toUpperCase():o.blockchain.slice(0,3).toUpperCase()}`),1)]),_:2},1024),c(T,{type:"secondary",strong:""},{default:n(()=>[r(" $"+u(s(g)(o.floorPriceUsd.toFixed(2))),1)]),_:2},1024)])):f("",!0),m.key==="floorPriceChange24h"&&a!=null?(i(),_(V,{key:2,value:Math.abs(a),precision:2,suffix:"%","value-style":{color:a>=0?"#3f8600":"#cf1322",fontSize:"16px",fontWeight:"500"}},{prefix:n(()=>[a>=0?(i(),_(s(D),{key:0})):(i(),_(s(R),{key:1}))]),_:2},1032,["value","value-style"])):f("",!0),m.key==="volumeMc24h"&&a!=null?(i(),N("div",Z,[c(l,{strong:""},{default:n(()=>[r(u(`${s(g)(a.toFixed(2))}
             ${o.mainCurrencyId?o.mainCurrencyId.slice(0,3).toUpperCase():o.blockchain.slice(0,3).toUpperCase()}`),1)]),_:2},1024),c(T,{type:"secondary",strong:""},{default:n(()=>[r(" $"+u(s(g)(o.volumeUsd24h.toFixed(2))),1)]),_:2},1024)])):f("",!0),m.key==="ownersCount"&&a!=null?(i(),_(l,{key:4,strong:""},{default:n(()=>[r(u(s(g)(a)),1)]),_:2},1024)):f("",!0)]),_:1},8,["pagination","data-source","loading"])}}}),te={class:"container"},oe=y("br",null,null,-1),ue=M({__name:"NftView",setup(k){return(C,w)=>{const d=z,v=$,p=K;return i(),_(p,null,{default:n(()=>[y("div",te,[c(d,{level:2,style:{marginTop:"0"}},{default:n(()=>[r(" Nft Trending ")]),_:1}),c(v,{style:{margin:"20px 0"},type:"secondary"},{default:n(()=>[r(" This page allows you to retrieve a list of trending Non-Fungible Tokens (NFTs) in the marketplace. Trending NFTs typically represent the most popular "),oe,r("or highly sought-after digital assets based on sales volume ")]),_:1}),c(ee)])]),_:1})}}});export{ue as default};
