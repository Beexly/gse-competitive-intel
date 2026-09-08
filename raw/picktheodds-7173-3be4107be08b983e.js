URL: https://picktheodds.app/_next/static/chunks/7173-3be4107be08b983e.js\nSTATUS: 200\n\n!function(){try{var e="u">typeof window?window:"u">typeof global?global:"u">typeof globalThis?globalThis:"u">typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="f8c97cf3-8b4f-4153-b5a4-55915c851398",e._sentryDebugIdIdentifier="sentry-dbid-f8c97cf3-8b4f-4153-b5a4-55915c851398")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7173],{37173:(e,t,i)=>{i.d(t,{O:()=>X,A:()=>Y});var n=i(695155),r=i(212115),a=i(299129),s=i(915987),o=i(904071),l=i(37721),d=i(247970),p=i(962811),c=i(48022),x=i(532163),h=i(84249),g=i(387454),u=i(58870),m=i.n(u),f=i(388574),b=i(450910),A=i(716335),j=i(445911),y=i(763018),v=i(573321),w=i(817780),k=i(374420),S=i(812717),z=i(774745),I=i(293016),C=i(556698),$=i(417594),T=i(965728),W=i(317496);let E=(0,a.Ay)(l.A)(({theme:e})=>`
  height: 40px;
  display: flex;
  align-items: center;
  padding-inline: ${e.spacing(2)};
  font-weight: 800;
  gap: ${e.spacing(1)};
  background-color: ${e.palette.text.primary};
  color: ${e.palette.primary.main};
  text-transform: none;
  ${e.breakpoints.down("md")} {
    height: 44px;
  }
`);function H({text:e="Check Our Current Sportsbook Coverage",variant:t="contained",size:i="small",color:a="secondary",sx:s,...o}){let l=(0,d.A)(),x=(0,p.A)(l.breakpoints.down("md")),[h,g]=(0,r.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(E,{variant:t,size:i,color:a,onClick:()=>g(!0),sx:s,...o,children:[(0,n.jsx)(W.A,{fontSize:"small"}),(0,n.jsx)(c.A,{fontSize:x?12:14,variant:"label",fontWeight:600,children:e})]}),(0,n.jsx)(T.A,{open:h,onClose:()=>g(!1)})]})}let _=(0,a.Ay)("div")(({theme:e})=>({alignItems:"flex-start","& .rfm-marquee":{minWidth:"unset"}})),F=(0,a.Ay)(o.A)(({theme:e})=>({display:"flex",flexDirection:"row",marginTop:e.spacing(4),position:"relative"})),R=(0,a.Ay)(f.A)(({theme:e})=>({width:e.spacing(6),height:e.spacing(6),marginLeft:e.spacing(6),borderRadius:5}));function L({description:e}){let t=(0,d.A)(),i=(0,p.A)(t.breakpoints.down("md")),a=(0,$.GV)(e=>e.constantsReducer.betSites),s=(0,r.useRef)(null),l=(0,w.A)(s,"300px"),x=(0,k.T)(),h=l&&x,g=(0,r.useMemo)(()=>Array.from({length:3},()=>a.slice().sort(()=>Math.random()-.5)),[a]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c.A,{variant:"sofiaSansHeader",fontSize:i?25:35,fontWeight:500,sx:{textTransform:"uppercase"},children:e.split(/(\d+)/).map((e,i)=>/\d+/.test(e)?(0,n.jsx)("span",{style:{color:t.palette.highlightText},children:e},i):e)}),(0,n.jsx)(_,{ref:s,children:(0,n.jsx)(o.A,{children:g.map((e,t)=>(0,n.jsx)(C.A,{direction:t%2==0?"right":"left",play:h,children:(0,n.jsx)(F,{children:e.map(e=>(0,n.jsx)(R,{alt:e.name,width:48,height:48,betSiteEnum:e.enumValue},`${t}_${e.enumValue}`))})},t))})}),(0,n.jsx)(H,{sx:{marginTop:t.spacing(6),[t.breakpoints.down("md")]:{marginTop:"24px"}}})]})}let B=(0,a.Ay)(s.A)(({theme:e})=>`
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  width: 100%;
  position: relative;
  scroll-snap-type: y mandatory;
  overflow-x: clip;
  padding-top: ${e.spacing(10)};
  padding-left: ${e.spacing(8)};
  padding-right: ${e.spacing(8)};
  padding-bottom: ${e.spacing(8)};
  @media (max-width: ${e.breakpoints.values.md}px) {
    padding-top: ${e.spacing(8)};
    padding-bottom: ${e.spacing(5)};
     padding-left: ${e.spacing(5.5)};
  padding-right: ${e.spacing(5.5)};
  }
`),V=(0,a.Ay)(s.A)(({theme:e})=>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 48px;
  height: 100vh;
    scroll-snap-align: start;
  min-height: 1000px;
  @media (max-width: ${e.breakpoints.values.md}px) {
    gap: ${e.spacing(2)};
    flex-direction: column-reverse;
      height: 850px;
      min-height: 850px;
  }
`),O=(0,a.Ay)(s.A)(({theme:e})=>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
  height: 100vh;
  scroll-snap-align: start;
  min-height: 1000px;
  @media (max-width: ${e.breakpoints.values.md}px) {
    gap: ${e.spacing(2)};
    flex-direction: column;
    height: 850px;
    min-height: 850px;
  }
`),P=(0,a.Ay)(o.A)(({theme:e})=>`
  position: relative;
  width: 550px;
  height: 700px;
  z-index: 50;
 
  @media (max-width: ${e.breakpoints.values.md}px) {
   width:480px;
   height: 300px;
  }
`),M=(0,a.Ay)(o.A)(({theme:e})=>`
  position: relative;
  width: 700px;
  height: 500px;
  z-index: 50;
  @media (max-width: ${e.breakpoints.values.md}px) {
   width:480px;
   height: 300px;
  }
`),D=(0,a.Ay)(o.A)(({theme:e})=>`
  position: relative;
  width: 1095px;
  height:680px;
  z-index: 50;
  margin-right: -500px;
     @media (min-width: 1450px) {
      margin-right: 0px;
  }

  @media (max-width: ${e.breakpoints.values.md}px) {
   width:380px;
   height: 300px;
   margin-right: 0;
  }
`),N=(0,a.Ay)(l.A)(({theme:e})=>`
  height: 40px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${e.palette.text.primary};
  padding-inline: ${e.spacing(2)};
  font-weight: 800;
  gap: ${e.spacing(1)};
  color: ${e.palette.primary.main};
  text-transform: none;
  margin-top: ${e.spacing(6)};
  @media (max-width: ${e.breakpoints.values.md}px) {
    height: 44px;
      margin-top: 24px;
  }
`);function U({isMobileView:e=!1}){let[t,i]=(0,r.useState)(0),a=(0,r.useRef)(null),s=(0,w.A)(a,"200px"),l=(0,k.T)(),d=s&&l,p=[{src:"/images/OddsScreen1.png",alt:"Odds Screen 1"},{src:"/images/OddsScreen2.png",alt:"Odds Screen 2"}];return(0,r.useEffect)(()=>{if(!d)return;let e=setInterval(()=>{i(e=>+(0===e))},1500);return()=>clearInterval(e)},[d]),(0,n.jsx)(o.A,{ref:a,sx:{position:"relative",width:"100%",height:"100%"},children:(0,n.jsx)(f.A,{src:p[t].src,alt:p[t].alt,fill:!0,sizes:"(max-width: 768px) 480px, 1095px",style:{objectFit:e?"cover":"contain",...e?{maxWidth:"none",objectPosition:"left center"}:{}}})})}function G(e){return(0,n.jsx)("span",{style:{textDecoration:"underline",textDecorationThickness:"4px",textUnderlineOffset:"8px"},children:e})}function q(e){return(0,n.jsx)("i",{children:e})}j.Ay.registerPlugin(y.u);let X=(e,t)=>(e.match(/[^.]+\.?/g)||[e]).map((e,i)=>(0,n.jsxs)("span",{style:{color:i%2==0?t.palette.highlightText:void 0},children:[e.trim()," "]},i)),Y=function(){let e=(0,d.A)(),t=(0,b.c)("Home"),i=(0,r.useRef)(null),a=(0,p.A)(e.breakpoints.down("md")),u=(0,p.A)(e.breakpoints.up(1450)),w=(0,p.A)(e.breakpoints.down("md")),k=u||w,[C,$]=(0,r.useState)(!1),[T,W]=(0,r.useState)(""),E=(0,v.useRouter)(),H=(0,r.useRef)(null),_=(0,r.useRef)(null),F=(0,r.useRef)(null),R=(0,r.useRef)(null);(0,r.useLayoutEffect)(()=>([H.current,_.current,F.current,R.current].forEach(e=>{e&&j.Ay.fromTo(e,{opacity:.3,y:20},{opacity:1,y:0,scrollTrigger:{trigger:e,start:"top 85%",end:"top center",toggleActions:"play none none reverse",scrub:.5}})}),document.querySelectorAll("[data-heading]").forEach(e=>{let t="right"===e.getAttribute("data-heading");j.Ay.fromTo(e,{x:t?50:-50,opacity:.5},{x:0,opacity:1,scrollTrigger:{trigger:e,start:"top 75%",end:"top center",toggleActions:"play none none reverse",scrub:.8}})}),()=>{y.u.getAll().forEach(e=>e.kill())}),[]);let Y=(0,r.useCallback)(()=>{$(!0)},[]),Z=(0,r.useCallback)(()=>{$(!1)},[]);return(0,n.jsx)(o.A,{children:(0,n.jsxs)(B,{ref:i,children:[(0,n.jsxs)(V,{children:[(0,n.jsxs)(s.A,{justifyContent:"center",alignItems:"center",children:[(0,n.jsxs)(s.A,{sx:{textAlign:"left",maxWidth:580,gap:3},children:[(0,n.jsx)(c.A,{fontSize:a?50:80,variant:"sofiaSansHeader","data-heading":"left",lineHeight:a?"60px":"80px",sx:{textTransform:"uppercase"},children:t.rich("arbitrage_title",{u:G})}),(0,n.jsx)(c.A,{fontSize:a?25:35,variant:"sofiaSansHeader",ref:_,lineHeight:"35px",fontWeight:500,sx:{textTransform:"uppercase"},children:X(t("arbitrage_info"),e)})]}),(0,n.jsxs)(N,{variant:"contained",size:"small",fullWidth:!1,color:"secondary",onClick:()=>E.push("/en/resources"),children:[(0,n.jsx)(I.A,{sx:{fontSize:18}}),(0,n.jsx)(c.A,{fontSize:a?12:14,variant:"label",fontWeight:600,children:t("arbitrage_helper")})]})]}),(0,n.jsxs)(P,{children:[(0,n.jsx)(o.A,{sx:{background:"linear-gradient(180deg, #6176A3 0%, rgba(123, 255, 242, 0.46) 100%)",WebkitBackgroundImage:"linear-gradient(180deg, #6176A3 0%, rgba(123, 255, 242, 0.46) 100%)",width:a?"310px":"560px",height:a?"310px":"560px",opacity:.4,position:"absolute",top:"50%",left:"50%",borderRadius:"50%",transform:"translate(-50%, -50%) rotate(-75deg)",WebkitTransform:"translate(-50%, -50%) rotate(-75deg)",filter:"blur(80px)",WebkitFilter:"blur(80px)",zIndex:0}}),(0,n.jsx)(f.A,{src:"/images/Arb_Home.png",alt:"Arb Home Image",fill:!0,sizes:"(max-width: 768px) 480px, 550px",style:{objectFit:"contain"}})]})]}),(0,n.jsxs)(O,{children:[(0,n.jsxs)(D,{sx:{ml:k?"0":"-500px",mr:0},children:[(0,n.jsx)(o.A,{sx:{background:"linear-gradient(180deg, #7BFFF2 0%, rgba(47, 242, 64, 0.46) 100%)",WebkitBackgroundImage:"linear-gradient(180deg, #7BFFF2 0%, rgba(47, 242, 64, 0.46) 100%)",width:a?"310px":"720px",height:a?"410px":"720px",opacity:.4,position:"absolute",top:"50%",left:"50%",borderRadius:"50%",transform:"translate(-50%, -50%) rotate(0deg)",WebkitTransform:"translate(-50%, -50%) rotate(0deg)",filter:"blur(70px)",WebkitFilter:"blur(70px)",zIndex:0}}),k?(0,n.jsx)(f.A,{src:"/images/Ev_Home.png",alt:"EV Home Image",fill:!0,sizes:"(max-width: 768px) 380px, 1095px",style:{objectFit:"contain"}}):(0,n.jsx)(f.A,{src:"/images/Ev_Home.png",alt:"EV Home Image",fill:!0,sizes:"(max-width: 768px) 380px, 1095px",style:{objectFit:"cover",maxWidth:"none",objectPosition:"right center"}})]}),(0,n.jsxs)(s.A,{justifyContent:"center",alignItems:"center",children:[(0,n.jsxs)(s.A,{sx:{textAlign:"left",maxWidth:580,gap:3},children:[(0,n.jsx)(c.A,{fontSize:a?50:80,"data-heading":"right",variant:"sofiaSansHeader",lineHeight:a?"60px":"80px",sx:{textTransform:"uppercase"},children:t.rich("postive_ev_title",{u:G})}),(0,n.jsx)(c.A,{fontSize:a?25:35,variant:"sofiaSansHeader",ref:F,lineHeight:"35px",fontWeight:500,sx:{textTransform:"uppercase"},children:X(t("postive_ev_info"),e)})]}),(0,n.jsx)(N,{variant:"contained",size:"small",fullWidth:!1,color:"secondary",onClick:()=>E.push("/en/expectedvalue"),children:(0,n.jsx)(c.A,{fontSize:a?12:14,variant:"label",fontWeight:600,children:t("ev_helper")})})]})]}),(0,n.jsxs)(V,{children:[(0,n.jsxs)(s.A,{justifyContent:"center",alignItems:"center",children:[(0,n.jsxs)(s.A,{sx:{textAlign:"left",maxWidth:590,gap:3},children:[(0,n.jsx)(c.A,{fontSize:a?50:80,"data-heading":"left",variant:"sofiaSansHeader",lineHeight:a?"60px":"80px",sx:{textTransform:"uppercase"},children:t.rich("odds_screen_title",{u:G,i:q})}),(0,n.jsx)(c.A,{ref:H,fontSize:a?25:35,variant:"sofiaSansHeader",lineHeight:"35px",fontWeight:500,sx:{textTransform:"uppercase"},children:X(t("odds_screen_info"),e)})]}),(0,n.jsx)(N,{variant:"contained",size:"small",fullWidth:!1,color:"secondary",onClick:()=>E.push("/en/odds-screen"),children:(0,n.jsx)(c.A,{fontSize:a?12:14,variant:"label",fontWeight:600,children:t("odds_screen_helper")})})]}),(0,n.jsxs)(D,{children:[(0,n.jsx)(o.A,{sx:{background:"linear-gradient(180deg, #7BFFF2 0%, rgba(47, 242, 64, 0.46) 100%)",WebkitBackgroundImage:"linear-gradient(180deg, #7BFFF2 0%, rgba(47, 242, 64, 0.46) 100%)",width:a?"310px":"720px",height:a?"410px":"720px",opacity:.4,position:"absolute",top:"50%",left:"50%",borderRadius:"50%",transform:"translate(-50%, -50%) rotate(0deg)",WebkitTransform:"translate(-50%, -50%) rotate(0deg)",filter:"blur(70px)",WebkitFilter:"blur(70px)",zIndex:0}}),k?(0,n.jsx)(U,{}):(0,n.jsx)(U,{isMobileView:!0})]})]}),(0,n.jsxs)(O,{children:[(0,n.jsxs)(M,{children:[(0,n.jsx)(o.A,{sx:{background:"linear-gradient(180deg, #6176A3 0%, rgba(123, 255, 242, 0.46) 100%)",WebkitBackgroundImage:"linear-gradient(180deg, #6176A3 0%, rgba(123, 255, 242, 0.46) 100%)",width:a?"310px":"560px",height:a?"310px":"560px",opacity:.4,position:"absolute",top:"50%",left:"50%",borderRadius:"50%",transform:"translate(-50%, -50%) rotate(-75deg)",WebkitTransform:"translate(-50%, -50%) rotate(-75deg)",filter:"blur(80px)",WebkitFilter:"blur(80px)",zIndex:0}}),(0,n.jsx)(f.A,{src:"/images/Tools_Home.png",alt:"tools Home Image",fill:!0,sizes:"(max-width: 768px) 480px, 700px",style:{objectFit:"contain"}})]}),(0,n.jsxs)(s.A,{sx:{textAlign:"left",maxWidth:580,gap:3},children:[(0,n.jsx)(c.A,{fontSize:a?50:80,"data-heading":"right",variant:"sofiaSansHeader",lineHeight:a?"60px":"80px",sx:{textTransform:"uppercase"},children:t.rich("Tools_title",{u:G})}),(0,n.jsx)(c.A,{fontSize:a?25:35,variant:"sofiaSansHeader",ref:R,lineHeight:"35px",fontWeight:500,sx:{textTransform:"uppercase"},children:X(t("Tools_info"),e)})]})]}),(0,n.jsxs)(x.A,{component:"form",sx:{display:"flex",alignItems:"center",width:a?343:450,backgroundColor:"#7E7E7E1F",borderRadius:"12px",mb:a?" 50px":"150px",mt:a?0:"-100px"},elevation:0,children:[(0,n.jsx)(h.A,{sx:{p:"10px"},"aria-label":"menu",children:(0,n.jsx)(A.A,{})}),(0,n.jsx)(g.Ay,{sx:{flex:1},placeholder:"Email Address",value:T,onChange:e=>{W(e.target.value.trim())},inputProps:{"aria-label":"email address"}}),(0,n.jsx)(l.A,{variant:"contained",size:"large",fullWidth:!1,color:"secondary",onClick:Y,disableElevation:!0,sx:{height:50,width:"fit-content",background:e.palette.text.primary,px:2,borderRadius:"12px",fontWeight:600,color:e.palette.basicReverse,textTransform:"none"},children:(0,n.jsxs)("span",{className:m().className,children:[" ",t("explore_btn")]})}),(0,n.jsx)(S.A,{open:C,onClose:Z,email:T,loginType:z.Gb.SIGN_UP})]}),(0,n.jsx)(L,{description:t("explore_desc")})]})})}},374420:(e,t,i)=>{i.d(t,{T:()=>a});var n=i(212115);function r(e){return document.addEventListener("visibilitychange",e),()=>{document.removeEventListener("visibilitychange",e)}}function a(){return(0,n.useSyncExternalStore)(r,()=>!document.hidden,()=>!0)}},817780:(e,t,i)=>{i.d(t,{A:()=>a});var n=i(212115);let r=new Map,a=(e,t="0px")=>{let[i,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let i=e?.current;if(!i)return;let{observer:n,callbacks:s}=function(e){let t=r.get(e);if(!t){let i=new Map;t={observer:new IntersectionObserver(e=>{e.forEach(e=>{i.get(e.target)?.(e.isIntersecting)})},{rootMargin:e}),callbacks:i},r.set(e,t)}return t}(t);return s.set(i,a),n.observe(i),()=>{s.delete(i),n.unobserve(i)}},[e,t]),i}},965728:(e,t,i)=>{i.d(t,{A:()=>L});var n=i(695155),r=i(212115),a=i(299129),s=i(770982),o=i(904071),l=i(905629),d=i(429277),p=i(247970),c=i(962811),x=i(84249),h=i(315568),g=i(3185),u=i(128183),m=i(497053),f=i(387849),b=i(48022),A=i(37721),j=i(915987),y=i(27374),v=i(388061),w=i(450372),k=i(908055),S=i(451600),z=i(404757),I=i(388574),C=i(417594),$=i(966352),T=i(903334),W=i(36860);let E=(0,a.Ay)(s.A)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`,H=(0,a.Ay)(o.A)(({theme:e})=>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${e.palette.customBackground.modal};
  border: 1px solid ${e.palette.modal.border};
  border-radius: 30px;
  max-width: 80vw;
  min-width: 80vw;
  height: 80vh;
  padding: ${e.spacing(4)};
  margin: auto;
  ${e.breakpoints.down("md")} {
    max-width: 95vw;
    min-width: 95vw;
    padding: ${e.spacing(2)};
  }
`),_=(0,a.Ay)("div")(({theme:e})=>({position:"relative",overflowX:"auto","&::after":{content:'""',position:"absolute",top:0,right:"6px",width:"150px",height:"100%",pointerEvents:"none",background:"linear-gradient(270deg, #111318 0%, rgba(17,19,24,0) 100%)",zIndex:34},"&::before":{content:'""',position:"absolute",left:0,bottom:"8px",width:"100%",height:"80px",pointerEvents:"none",background:"linear-gradient(180deg, rgba(17,19,24,0) 0%, #111318 100%)",zIndex:12},[e.breakpoints.down("md")]:{"&::after":{width:"60px"},"&::before":{height:"40px"}}})),F=(0,a.Ay)(l.A)(({theme:e})=>({position:"relative",overflowY:"auto",maxHeight:"100%",borderRadius:"16px",paddingBottom:"50px","& td":{borderBottom:"none",padding:e.spacing(1,2),textAlign:"center"},"& td:first-of-type":{position:"sticky",left:0,zIndex:4,textAlign:"right",width:"180px !important",backdropFilter:"blur(10px)",backgroundColor:e.palette.customBackground.cardHeader,[e.breakpoints.down("md")]:{width:"120px !important",padding:e.spacing(.5,1)}},"& td:nth-child(even)":{background:e.palette.alpha.twelevepercent},"& td:nth-child(odd)":{background:e.palette.alpha.sixpercent},"&::-webkit-scrollbar":{height:"8px"},"&::-webkit-scrollbar-track":{background:e.palette.alpha.sixpercent,borderRadius:"4px",marginLeft:"180px",[e.breakpoints.down("md")]:{marginLeft:"120px"}},"&::-webkit-scrollbar-thumb":{background:e.palette.alpha.twentyfourpercent,borderRadius:"4px"},"&::-webkit-scrollbar-corner":{background:"transparent"}})),R=(0,a.Ay)(d.A)(({theme:e})=>({position:"sticky",top:0,zIndex:20,backgroundColor:e.palette.customBackground.cardHeader}));function L({open:e,onClose:t}){let i=(0,p.A)(),a=(0,c.A)(i.breakpoints.down("md")),[s,l]=(0,r.useState)(""),B=(0,C.GV)(e=>e.constantsReducer),V=(B?.betSites||[]).filter(e=>e.active),O=B?.sports||[],P=V.filter(e=>(e.name||e.enumValue).toLowerCase().includes(s.toLowerCase())),M=e=>{if(!e.isSisterSite||!B?.betSitesParent)return e;let t=B.betSitesParent[e.enumValue];return t&&B.betSiteMap[t]?B.betSiteMap[t]:e},D=(a?120:180)+P.length*(a?100:125);return(0,n.jsx)(E,{open:e,onClose:t,children:(0,n.jsxs)(H,{children:[(0,n.jsx)(x.A,{onClick:t,"aria-label":"Close modal",sx:{position:"absolute",top:16,right:16,zIndex:5,backgroundColor:i.palette.alpha.sixpercent,p:.5},children:(0,n.jsx)(w.A,{fontSize:"small"})}),(0,n.jsx)(o.A,{sx:{mb:2,display:"flex",alignItems:"center",width:"100%"},children:(0,n.jsx)(h.A,{size:"small",variant:"standard",placeholder:"Search for books",value:s,onChange:e=>l(e.target.value),InputProps:{startAdornment:(0,n.jsx)(g.A,{position:"start",sx:{color:"text.secondary",pl:1},children:(0,n.jsx)(W.A,{sx:{width:18}})}),endAdornment:(0,n.jsx)(g.A,{position:"end",children:(0,n.jsx)(x.A,{onClick:()=>l(""),sx:{width:24,height:24},"aria-label":"Clear search",children:(0,n.jsx)(z.A,{sx:{fontSize:16,display:s?"block":"none"}})})}),disableUnderline:!0},sx:{transition:"width 0.3s ease-in-out",backgroundColor:i.palette.alpha.sixpercent,borderRadius:i.borderRadius(2),"& .MuiInputBase-input":{fontSize:14,width:a?"100%":330,py:1}}})}),(0,n.jsx)(_,{children:(0,n.jsx)(F,{children:(0,n.jsx)(u.A,{sx:{width:`${D}px`},children:(0,n.jsxs)(m.A,{children:[(0,n.jsxs)(R,{children:[(0,n.jsx)(f.A,{}),P.map(e=>(0,n.jsx)(f.A,{children:(0,n.jsxs)(o.A,{sx:{display:"flex",flexDirection:"column",alignItems:"center",pt:2,gap:1,height:120},children:[e.enumValue&&(0,n.jsx)(I.A,{alt:e.name||e.enumValue,width:48,height:48,style:{borderRadius:8},betSiteEnum:e.enumValue}),(0,n.jsx)(b.A,{variant:"label",noWrap:!0,fontWeight:700,children:e.name||e.enumValue}),e.referralUrl&&(0,n.jsx)(A.A,{variant:"outlined",size:"small",color:"secondary",onClick:()=>{var t;return t=e.referralUrl,void window.location.assign(t)},sx:{fontSize:10,padding:"2px 4px",textTransform:"none",borderRadius:1},children:"Sign Up"})]})},e.id))]}),(0,n.jsxs)(d.A,{children:[(0,n.jsx)(f.A,{children:(0,n.jsx)(o.A,{sx:{display:"flex",justifyContent:"end",height:40},children:(0,n.jsxs)(j.A,{direction:"row",alignItems:"center",gap:.5,children:[(0,n.jsx)(b.A,{variant:"body2",sx:{fontSize:a?"10px":void 0},children:"Pre-Game"}),(0,n.jsx)(b.A,{variant:"body2",color:"text.secondary",children:"|"}),(0,n.jsx)(b.A,{variant:"body2",sx:{fontSize:a?"10px":void 0},children:"Live"})]})})}),P.map(e=>(0,n.jsx)(f.A,{children:(0,n.jsxs)(o.A,{sx:{display:"flex",justifyContent:"center",gap:.5},children:[M(e).supportsPregame?(0,n.jsx)(S.A,{color:"success"}):(0,n.jsx)(z.A,{color:"error"}),(0,n.jsx)(y.A,{orientation:"vertical",flexItem:!0,sx:{backgroundColor:i.palette.alpha.twentyfourpercent,borderColor:i.palette.alpha.twentyfourpercent,height:18,mt:.6}}),M(e).supportsLive?(0,n.jsx)(S.A,{color:"success"}):(0,n.jsx)(z.A,{color:"error"})]})},`pl-${e.id}`))]}),(0,n.jsxs)(d.A,{children:[(0,n.jsx)(f.A,{children:(0,n.jsxs)(o.A,{sx:{display:"flex",justifyContent:"end",alignItems:"center",gap:.7,pb:2},children:[(0,n.jsx)(v.A,{title:"Odds are updated at instant or near-instant frequency.",children:(0,n.jsxs)(j.A,{direction:"row",alignItems:"center",children:[(0,n.jsx)($.A,{fontSize:"small",sx:{fontSize:a?14:void 0}}),(0,n.jsx)(b.A,{variant:"body2",sx:{whiteSpace:"nowrap",fontSize:a?"9px":void 0},children:"High-Speed"})]})}),(0,n.jsx)(b.A,{variant:"body2",color:"text.secondary",children:"|"}),(0,n.jsx)(v.A,{title:"Odds are updated on regular timed intervals. Some sportsbooks are Timed as they do not support High-Speed odds.",children:(0,n.jsxs)(j.A,{direction:"row",alignItems:"center",children:[(0,n.jsx)(k.A,{fontSize:"small",sx:{fontSize:a?14:void 0}}),(0,n.jsx)(b.A,{variant:"body2",sx:{fontSize:a?"9px":void 0},children:"Timed"})]})})]})}),P.map(e=>(0,n.jsx)(f.A,{children:(0,n.jsx)(o.A,{sx:{display:"flex",justifyContent:"center",gap:.5,pb:2},children:M(e).updateRateEnum?.toLowerCase()==="polling"?(0,n.jsx)(v.A,{title:"Odds are updated on regular timed intervals. Some sportsbooks are Timed as they do not support High-Speed odds.",arrow:!0,children:(0,n.jsx)("span",{style:{display:"flex"},children:(0,n.jsx)(k.A,{fontSize:"small",color:"action"})})}):(0,n.jsx)(v.A,{title:"Odds are updated at instant or near-instant frequency.",children:(0,n.jsx)("span",{style:{display:"flex"},children:(0,n.jsx)($.A,{fontSize:"small",color:"action"})})})})},`ur-${e.id}`))]}),O.map(e=>(0,n.jsxs)(r.Fragment,{children:[(0,n.jsxs)(d.A,{children:[(0,n.jsx)(f.A,{sx:{borderBottom:`1px solid ${i.palette.divider}`,pl:1},children:(0,n.jsx)(o.A,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:.4},children:(0,n.jsxs)(o.A,{sx:{display:"flex",alignItems:"center",gap:.4,borderBottom:"1px solid currentColor",paddingBottom:"0px"},children:[(0,n.jsx)(T.A,{sx:{fontSize:a?10:12},sportType:e.sportEnum}),(0,n.jsx)(b.A,{variant:"body2",lineHeight:1,sx:{fontSize:a?"10px":void 0},children:e.displayName})]})})}),P.map(t=>(0,n.jsx)(f.A,{},`hdr-${e.sportEnum}-${t.id}`))]}),(e.leagues||[]).map(e=>(0,n.jsxs)(d.A,{children:[(0,n.jsx)(f.A,{children:(0,n.jsx)(b.A,{variant:"label",textAlign:"right",sx:{fontSize:a?"10px":void 0},children:e.displayName})}),P.map(t=>{let i;return(0,n.jsx)(f.A,{children:(i=e.leagueEnum,M(t).supportedLeagues?.includes(i))?(0,n.jsx)(S.A,{color:"success"}):(0,n.jsx)(z.A,{color:"error"})},`${t.id}-${e.leagueEnum}`)})]},e.leagueEnum))]},e.sportEnum))]})})})})]})})}},966352:(e,t,i)=>{i.d(t,{A:()=>a});var n=i(695155);i(212115);var r=i(642772);let a=function(e){return(0,n.jsx)(r.A,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 12 16",...e,children:(0,n.jsx)("path",{d:"M7 6.5L11 1L2 6.5L5 9.5L1 15L10 9.5L7 6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})})}}}]);