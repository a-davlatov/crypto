import{K as s,M as e}from"./index-C6MU9puj.js";const o=r=>s.get(`${e.API_URL}/coins?currency=USD`,{headers:e.headers,params:r}),n=r=>s.get(`${e.API_URL}/coins/${r}?currency=USD`,{headers:e.headers}),c=(r,t)=>s.get(`${e.API_URL}/coins/${r}/charts?period=${t}`,{headers:e.headers});export{n as a,c as b,o as g};