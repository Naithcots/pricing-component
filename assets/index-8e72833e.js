(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const g=document.querySelector("#slider"),f=document.querySelector("#pageviews"),h=document.querySelector("#price"),w=document.querySelector("#switch"),x=document.querySelector("#discount-mobile"),S=document.querySelector("#discount-desktop"),V=document.querySelector("#button"),d=document.querySelector("#modal"),C=document.querySelector("#modal-close"),P=document.querySelector("#plan"),b=document.querySelector("#monthly-cost"),q=document.querySelector("#total-cost"),a=[{id:0,pageViews:1e4,pageViewsText:"10k",pricePerMonth:8},{id:1,pageViews:5e4,pageViewsText:"50k",pricePerMonth:12},{id:2,pageViews:1e5,pageViewsText:"100k",pricePerMonth:16},{id:3,pageViews:5e5,pageViewsText:"500k",pricePerMonth:24},{id:4,pageViews:1e6,pageViewsText:"1m",pricePerMonth:36}];let s=a[2],r="monthly";const u=.25,p=()=>r==="yearly"?(1-u)*s.pricePerMonth:s.pricePerMonth,m=()=>{f.textContent=`${s.pageViewsText} pageviews`;const e=p();h.textContent=`${e.toFixed(2)}$`},y=e=>{s=a[e],m()},v=e=>{const t=e.target.value;y(Number(t))},E=(e,t,c)=>{const l=t.length;e.min="0",e.max=(l-1).toString(),e.step="1",e.defaultValue=String(c),e.addEventListener("input",v)},L=e=>{e.target.checked?r="yearly":r="monthly",m()},M=(e,t)=>{r=t,t==="yearly"&&(e.checked=!0),e.addEventListener("change",L)},k=(e,t)=>{e.forEach(c=>{const o=c.textContent.replace("x",(t*100).toString());c.textContent=o})},O=()=>{!s||!r||(console.log(s,r,u),$())},T=e=>e.addEventListener("click",O),$=()=>{P.textContent=`${s.pageViewsText} Pageviews`;const e=p();b.textContent=`${e.toFixed(2)}$`,q.textContent=`Total: ${(e*12).toFixed(2)}$ /yr`,document.body.classList.add("no-scroll"),d.classList.add("open")},F=(e,t,c)=>{y(t.id),E(g,e,t.id),M(w,c),k([x,S],u),T(V),C.addEventListener("click",()=>{d.classList.remove("open"),document.body.classList.remove("no-scroll")})};F(a,s,r);