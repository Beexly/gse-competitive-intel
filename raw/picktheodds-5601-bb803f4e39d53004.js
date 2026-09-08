URL: https://picktheodds.app/_next/static/chunks/5601-bb803f4e39d53004.js\nSTATUS: 200\n\n!function(){try{var e="u">typeof window?window:"u">typeof global?global:"u">typeof globalThis?globalThis:"u">typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="90b3ddbe-3d1a-4634-a866-b176b610f694",e._sentryDebugIdIdentifier="sentry-dbid-90b3ddbe-3d1a-4634-a866-b176b610f694")}catch(e){}}(),(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5601],{132927:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(299129),o=r(48022);let i=(0,n.Ay)(o.A,{shouldForwardProp:e=>"lineClamp"!==e})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: ${e=>e.lineClamp||1};
`},198079:(e,t,r)=>{"use strict";r.d(t,{BF:()=>m,Bj:()=>f,H_:()=>p,IC:()=>u,OV:()=>x,Tv:()=>g,aX:()=>A,gZ:()=>y,hH:()=>h,mr:()=>d});var n=r(299129),o=r(915987),i=r(315568),a=r(242908),s=r(37721),l=r(48022),c=r(84249);let d=(0,n.Ay)(o.A)(({theme:e})=>({backgroundColor:e.palette.customBackground.cards,border:`1px solid ${e.palette.alpha.twelevepercent}`,borderRadius:"16px",padding:16,gap:16,position:"relative",[e.breakpoints.down("md")]:{padding:16}})),p=(0,n.Ay)(i.A)(({theme:e})=>`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    display: none;
  }
  background: ${e.palette.alpha.twelevepercent};
  border-radius: 8px;
  width: 100%;
  input {
    height: 32px;
    font-size: 14px;
    
    &::placeholder {
      font-size: 14px;
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`),u=(0,n.Ay)(a.A)(({theme:e,active:t})=>`
  text-transform: none;
  width: 100%;
  padding: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${e.palette.text.secondary};
  border-radius: 5px !important;
  white-space: nowrap;

  ${e.breakpoints.down("md")} {
    font-size: 12px;
  }
  
  &.MuiToggleButton-root.Mui-disabled{
    border: none;
  }
  [data-active="true"] {
    color: ${e.palette.text.primary};
  }
`),x=(0,n.Ay)(s.A)(({theme:e})=>`
  text-transform: none;
  width: fit-content;
  padding: 6px;
  border-radius: 8px;
  border: none;
  transition: none;
  background-color: ${e.palette.alpha.sixpercent};
 :hover {
 background-color: ${e.palette.alpha.sixpercent};
 transform: none;
}
  '
`),h=(0,n.Ay)(l.A,{shouldForwardProp:e=>"selected"!==e})(({theme:e,selected:t})=>`
  text-transform: none;
  color: ${!t?e.palette.text.secondary:"inherit"};
  text-wrap: nowrap;
`),g=(0,n.Ay)(i.A,{shouldForwardProp:e=>"warning"!==e&&"error"!==e})(({warning:e,error:t,theme:r})=>`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    display: none;
  }
  .MuiInputBase-root {
    border: ${e?`1px solid ${r.palette.warning.light}`:void 0};
    border: ${t?`1px solid ${r.palette.error.main}`:void 0};
  }
  input {
    caret-color: ${e?"transparent":void 0};
      height: 32px;
      font-size: 14px;
  }
  background: ${r.palette.alpha.twelevepercent};
  border-radius: 8px;
    .MuiOutlinedInput-input{
    width:auto;
    }
      & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`),m=(0,n.Ay)(s.A,{shouldForwardProp:e=>"textColor"!==e})(({theme:e,textColor:t})=>`
  height: 44px;
  font-size: ${e.typography.caption.fontSize};
  font-weight: bold;
  width: 180px;
   padding: ${e.spacing(0)};
  ${e.breakpoints.down("md")} {
    padding: ${e.spacing(0)};
    width: 140px;
  }
  &.Mui-disabled {
    color: ${t||e.palette.text.primary};
  }
`),f=(0,n.Ay)(c.A)(({theme:e})=>`
    position: absolute;
    background-color: ${e.palette.alpha.sixpercent};
    top: ${e.spacing(2)};
    right: ${e.spacing(2)};
  `),y=e=>{e("")},A=(e,t,r)=>{""===e&&r(t??"")}},200692:(e,t,r)=>{"use strict";r.d(t,{s:()=>o});var n=r(716763);let o=(0,n.J1)`
  mutation VerifyAuthenticator($hashCode: String!, $code: String!) {
    user {
      authenticator {
        verify(hashCode: $hashCode, code: $code) {
          userId
          accessToken
          refreshToken
          isNewUser
        }
      }
    }
  }
`},228482:(e,t,r)=>{"use strict";r.d(t,{c:()=>o});var n=r(478823);function o(e){return(0,n.r)(`/betsites/icons/${e}.webp?v=0.3.4`)}},293016:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(695155);r(212115);var o=r(642772);let i=function(e){return(0,n.jsxs)(o.A,{width:21,height:28,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,n.jsx)("path",{d:"M3.33337 15.8333V4.16667C3.33337 3.24619 4.07957 2.5 5.00004 2.5H16.1667C16.4429 2.5 16.6667 2.72386 16.6667 3V13.9286",stroke:"currentColor",strokeLinecap:"round",fill:"none"}),(0,n.jsx)("path",{d:"M5 14.1667H16.6667",stroke:"currentColor",strokeLinecap:"round",fill:"none"}),(0,n.jsx)("path",{d:"M5 17.5H16.6667",stroke:"currentColor",strokeLinecap:"round",fill:"none"}),(0,n.jsx)("path",{d:"M5.00004 17.5001C4.07957 17.5001 3.33337 16.7539 3.33337 15.8334C3.33337 14.9129 4.07957 14.1667 5.00004 14.1667",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"}),(0,n.jsx)("path",{d:"M7.5 5.83325H12.5",stroke:"currentColor",strokeLinecap:"round",fill:"none"})]})}},298251:(e,t,r)=>{"use strict";r.d(t,{A:()=>d});var n=r(695155);r(212115);var o=r(247970),i=r(962811),a=r(356459),s=r(915987),l=r(198079),c=r(450910);let d=function({isAnnual:e,onChange:t,isHomePage:r}){let d=(0,o.A)(),p=(0,i.A)(d.breakpoints.down("md")),u=(0,c.c)("plans");return(0,n.jsxs)(a.A,{value:e?"annual":"monthly",exclusive:!0,onChange:(e,r)=>{r&&t(r)},"aria-label":"billing cycle",sx:{background:r?d.palette.customBackground.cards:d.palette.alpha.twopercent,border:`1px solid ${d.palette.alpha.fourpercent}`,borderRadius:"5px",p:"2px",width:p?"100%":400,height:56},children:[(0,n.jsx)(l.IC,{value:"annual","aria-label":"annual billing",sx:{flexGrow:1},children:(0,n.jsxs)(s.A,{direction:"column",gap:0,alignItems:"center",justifyContent:"center",children:[(0,n.jsx)(l.hH,{variant:"body3",selected:e,sx:{textTransform:"capitalize",lineHeight:1,fontWeight:"bold"},children:u("annual_plan")}),(0,n.jsx)(l.hH,{variant:"body3",selected:e,sx:{color:d.palette.profit,textTransform:"capitalize",lineHeight:1,fontWeight:"bold"},children:"(Save 12.5%)"})]})}),(0,n.jsx)(l.IC,{value:"monthly","aria-label":"monthly billing",sx:{flexGrow:1},children:(0,n.jsx)(l.hH,{variant:"body3",selected:!e,sx:{textTransform:"capitalize"},children:u("monthly_plan")})})]})}},318784:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(695155);r(212115);var o=r(642772);let i=function({strokeColor:e="#4EBF5D",...t}){return(0,n.jsxs)(o.A,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",style:{width:"20px",height:"20px",background:"#FFFFFF0F",border:"1px solid #FFFFFF1F",borderRadius:"5px"},...t,children:[(0,n.jsx)("line",{x1:"6",y1:"6",x2:"14",y2:"14",stroke:e,strokeWidth:"1",strokeLinecap:"round"}),(0,n.jsx)("line",{x1:"14",y1:"6",x2:"6",y2:"14",stroke:e,strokeWidth:"1",strokeLinecap:"round"})]})}},329029:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>x,Rs:()=>p});var n=r(695155),o=r(212115),i=r(299129),a=r(37721),s=r(48022),l=r(450910),c=r(690594),d=r(450104);let p=(0,i.Ay)(a.A)`
  text-transform: none;
  width: 100%;
  font-weight: bold;
`,u=(0,i.Ay)(a.A)(({theme:e})=>`
    padding: 0;
    padding-left: ${e.spacing(2)};
    padding-right: ${e.spacing(2)};
    background-color: ${e.palette.button.common};
    color: ${e.palette.button.activeText};
    text-transform: none;
    &:hover {
      background-color: ${e.palette.button.common};
      color: ${e.palette.button.activeText};
    }
    
    ${e.breakpoints.down("md")} {
      border-radius: ${e.spacing(3)};
    }
  `);function x(e){let{onClick:t,applyBtnVariant:r="LONG",children:i,...a}=e,x=(0,l.c)("filters"),{menuState:h,variant:g,disabled:m}=(0,o.useContext)(c.A);return g===d.V.BOX?null:(0,n.jsx)("LONG"===r?p:u,{variant:"contained",sx:{borderRadius:0,minHeight:50},onClick:e=>{t&&t(e),e.defaultPrevented||h.onClose()},disabled:m,...a,children:i||(0,n.jsx)(s.A,{variant:"body1Bold",children:x("apply_filters")})})}},374110:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});var n=r(418750),o=r(716763),i=r(743597);let a=(0,o.J1)`
  query FetchUserPaymentPortal {
    user {
      paymentPortal
    }
  }
`,s=function(e){let t=(0,n.Jd)(),[r,{loading:o}]=(0,i._)(a,{fetchPolicy:"no-cache"});return{redirectUserToPaymentPortal:()=>{t.isLoggedIn&&r().then(t=>{let r=t.data?.user.paymentPortal;r?(window.location.href=r,e?.(null)):e?.(Error("Invalid payment portal url"))}).catch(t=>{e?.(t)})},loading:o}}},388574:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(695155),o=r(212115),i=r(5772),a=r(478823),s=r(228482);let l=o.memo(function(e){let{src:t,betSiteEnum:r,...o}=e;return r?(0,n.jsx)(i.default,{src:(0,s.c)(r),...o,unoptimized:!0}):t?"string"!=typeof t?(0,n.jsx)(i.default,{src:t,...e}):(0,n.jsx)(i.default,{...o,src:(0,a.r)(t),unoptimized:!0}):(0,n.jsx)(i.default,{src:(0,a.r)("default.webp"),...e,unoptimized:!0})})},394079:(e,t,r)=>{"use strict";r.d(t,{YZ:()=>a,_j:()=>l,l4:()=>s});var n=r(670074),o=r(844624),i=r(716763);let a=(0,i.J1)`
  mutation GetPaymentUrl($packageType: PackageTypeEnum!, $isAnnual: Boolean) {
    user {
      purchase(packageType: $packageType, isAnnual: $isAnnual)
    }
  }
`,s=`
	fragment FetchAllAvailablePlansConstantsTypeFragment on ConstantsType {
		restrictions {
			package
			monthlyPrice
			annualPrice
      trialDays
			restrictions {
				leagueLimit
				maxResult
				rOILimit
				sportbookLimit
				toolEnum
			}
		}
	}
`;(0,i.J1)`
  query GetAllAvailablePlans {
    constants {
      restrictions {
        package
        monthlyPrice
        annualPrice
        trialDays
        restrictions {
          leagueLimit
          maxResult
          rOILimit
          sportbookLimit
          toolEnum
        }
      }
    }
  }
`;let l=e=>e&&e!==n.GT.ANONYMOUS&&e!==n.GT.LOGGED_IN?(0,o.A)(e):"Free"},426021:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(695155),o=r(515116),i=r(247970),a=r(904071),s=r(388574);r(212115);let l=function({size:e=54,fullOverlay:t,sx:r,...l}){let c=(0,i.A)(),d=c.palette.text.primary,p=c.palette.primary.main;return(0,n.jsxs)(a.A,{sx:[{display:"flex",alignItems:"center",justifyContent:"center",position:t?"absolute":"relative"},t&&{top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",zIndex:1e3,backdropFilter:"blur(3px)",backgroundColor:c.palette.mode===o.A.Dark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"},...Array.isArray(r)?r:[r]],...l,children:[(0,n.jsx)(a.A,{sx:{position:"absolute",width:`calc(${e}px - 10px)`,height:`calc(${e}px - 10px)`,top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:p,borderRadius:"50%",overflow:"hidden",zIndex:2},children:(0,n.jsx)(s.A,{src:c.palette.mode===o.A.Dark?"/P-Loader.gif":"/P-logo-circle-light.png",alt:"Pick The Odds",fill:!0,style:{objectFit:"contain"},sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"})}),(0,n.jsx)(a.A,{sx:{transform:"translate(-50%, -50%)",height:e,width:e,boxSizing:"border-box",background:`conic-gradient(
            from 90deg at 50% 50%,
            rgba(39, 174, 96, 0) 0deg,
            rgba(31, 144, 255, 0) 0.04deg,
            ${d} 360deg
          )`,borderRadius:"50%",animation:"rotate 1s infinite linear","&::before":{content:'""',position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",height:`calc(${e}px - 16px)`,width:`calc(${e}px - 16px)`,background:"transparent",borderRadius:"50%"},"&::after":{content:'""',position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",height:`calc(${e}px - 48px)`,width:`calc(${e}px - 48px)`,background:d,borderRadius:"50%"},"@keyframes rotate":{"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}}})]})}},436839:(e,t,r)=>{"use strict";r.d(t,{A:()=>d});var n=r(695155),o=r(299129),i=r(37721),a=r(42194),s=r(370184),l=r(212115);let c=(0,o.Ay)(i.A)(()=>({backgroundColor:"black",color:"white",position:"absolute",top:8,right:8,minWidth:32,height:32})),d=function({src:e}){let[t,r]=(0,l.useState)(!1),o=async()=>{try{var t;let n,o,i,a;await navigator.clipboard.writeText((t=e||"",i=(o=(n=new URL(t)).pathname.split("/"))[o.length-1],a=n.search,`https://picktheodds.app/video/${i}${a}`)),r(!0)}catch(e){r(!1),console.error("Failed to copy:",e)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c,{variant:"contained",size:"small",onClick:o,children:(0,n.jsx)(s.A,{sx:{fontSize:18}})}),(0,n.jsx)(a.A,{open:t,autoHideDuration:2e3,onClose:()=>r(!1),message:"Copied to clipboard!"})]})}},441161:(e,t,r)=>{"use strict";r.d(t,{N_:()=>n,a8:()=>i,rd:()=>a});let{Link:n,redirect:o,usePathname:i,useRouter:a}=(0,r(171281).A)({locales:["en","fr"]})},450104:(e,t,r)=>{"use strict";r.d(t,{V:()=>o});var n,o=((n={}).POPPER="popper",n.BOX="box",n.MODAL="modal",n.OVERLAY="overlay",n)},455943:(e,t,r)=>{"use strict";r.d(t,{A:()=>n.A});var n=r(659151)},478823:(e,t,r)=>{"use strict";function n(e){return e.startsWith("https://")||e.startsWith("http://")?e:"https://cdn.picktheodds.app".concat("/assets",e)}r.d(t,{r:()=>n})},547695:(e,t,r)=>{"use strict";r.d(t,{A:()=>I});var n=r(695155),o=r(299129),i=r(770982),a=r(904071),s=r(915987),l=r(37721),c=r(247970),d=r(48022),p=r(212115),u=r(450910),x=r(670074),h=r(388574),g=r(598500),m=r.n(g),f=r(55467),y=r(770504),A=r(737661);let b={type:"page",children:[{type:"image",content:"/images/learn/using_paid_unpaid_sportsbooks.png"},{type:"video",content:"https://player.vimeo.com/video/1115902569?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"}]};var j=r(436839),v=r(293016);let w=(0,o.Ay)(i.A)(({theme:e})=>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 16px 16px 32px 16px;
  
  ${e.breakpoints.down("md")} {
    align-items: flex-start;
    padding-top: 32px;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`),k=(0,o.Ay)(a.A)(({theme:e})=>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: ${e.palette.modal.background};
    border: 1px solid ${e.palette.border.primary};
    backdrop-filter: blur(4px); 
    border-radius:30px;
    padding: ${e.spacing(2)} ${e.spacing(6)};
    max-width: 600px;
    width: 100%;
    margin: 16px auto;
    min-height: fit-content;
    
    ${e.breakpoints.down("md")} {
      max-width: 95vw;
      padding: ${e.spacing(2)} ${e.spacing(3)};
      margin: 8px auto;
    }
  `),C=(0,o.Ay)(s.A)(({theme:e})=>({backgroundColor:e.palette.alpha.fourpercent,borderRadius:"16px",maxWidth:420,paddingLeft:e.spacing(4),paddingRight:e.spacing(4),paddingTop:e.spacing(1.5),paddingBottom:e.spacing(1.5),gap:e.spacing(3),margin:"0 auto",flexDirection:"row",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"background-color 0.2s ease","&:hover":{backgroundColor:e.palette.alpha.twelevepercent},[e.breakpoints.down("md")]:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),gap:e.spacing(2),maxWidth:"100%"}})),_=(0,o.Ay)(l.A,{shouldForwardProp:e=>"textColor"!==e})(({theme:e,textColor:t})=>`
  height: 36px;
  width: fit-content;
  font-size: ${e.typography.body2.fontSize};
  font-weight: bold;
  align-self: center;
  margin: ${e.spacing(2)};
  padding: ${e.spacing(1.5)};
  ${e.breakpoints.down("md")} {
      padding: ${e.spacing(.5)};
  }
`),T=(0,o.Ay)(a.A)(()=>({position:"relative",width:"100%",paddingBottom:"40%",height:0,overflow:"hidden",margin:"0 auto",flex:"1 !important"})),S=(0,o.Ay)(a.A)(()=>({position:"relative",width:"100%",paddingBottom:"40%",height:0,overflow:"hidden",cursor:"pointer",margin:"0 auto",flex:"1 !important"})),$=(0,o.Ay)(a.A)(()=>({position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:"white",fontSize:"64px"})),I=function({activePackageType:e,onClose:t,...r}){let o=(0,c.A)(),[i,a]=(0,p.useState)(!0),[g,I]=(0,p.useState)(!1),E=(0,p.useRef)(null),z=(0,u.c)("verification"),L=()=>{I(!0),setTimeout(()=>{E.current?.contentWindow?.postMessage({method:"play"},"*")},100)};return(0,n.jsx)(w,{open:!!i,onClose:()=>{a(!1),t?.()},children:(0,n.jsxs)(k,{...r,children:[(0,n.jsx)(s.A,{justifyContent:"center",alignItems:"center",p:1,children:(0,n.jsx)(h.A,{src:"/images/logo_name_dark.png",alt:"Logo",width:100,height:55})}),(0,n.jsxs)(s.A,{children:[(0,n.jsx)(d.A,{variant:"header",fontSize:30,textAlign:"left",my:1,sx:{fontSize:{xs:"24px",md:"30px"}},children:z("success_message_title")}),(e===x.GT.STARTER||e===x.GT.INTERMEDIATE)&&(0,n.jsxs)(s.A,{direction:{xs:"column",md:"row"},alignItems:"center",gap:2,children:[(0,n.jsxs)(d.A,{variant:"caption",textAlign:"left",my:1,flex:1,children:[z("success_popup_message_asc")," ",(0,n.jsx)(l.A,{onClick:L,variant:"text",size:"small",sx:{padding:0,minWidth:"auto",textTransform:"none"},"aria-label":"Watch video tutorial",children:(0,n.jsx)(d.A,{variant:"caption",textAlign:"left",my:1,color:"text.primary",sx:{textDecoration:"underline",m:0},children:z("watchVideoText")})})," ",z("success_popup_message_desc")]}),g?(0,n.jsxs)(T,{flex:1,sx:{minHeight:{xs:"200px",md:"auto"}},children:[(0,n.jsx)("iframe",{ref:E,src:b.children?.find(e=>"video"===e.type)?.content,title:"Success Popup Video",width:"100%",height:"100%",allow:"autoplay; encrypted-media",allowFullScreen:!0,style:{border:0,top:0,left:0,position:"absolute",padding:30,flex:1}}),(0,n.jsx)(j.A,{src:b.children?.find(e=>"video"===e.type)?.content})]}):(0,n.jsxs)(S,{onClick:L,sx:{minHeight:{xs:"200px",md:"auto"}},children:[(0,n.jsx)(h.A,{src:b.children?.find(e=>"image"===e.type)?.content||"/default-image.png",alt:"Success Popup",fill:!0,style:{padding:30,objectFit:"contain"}}),(0,n.jsx)($,{children:(0,n.jsx)(f.A,{fontSize:"inherit"})})]})]}),(0,n.jsxs)(s.A,{width:"100%",gap:1,children:[(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",my:1,children:"A few important things to check out before you jump right in!"}),(0,n.jsx)(m(),{href:"/en/resources",passHref:!0,style:{textDecoration:"none"},children:(0,n.jsxs)(C,{children:[(0,n.jsx)(v.A,{sx:{fontSize:"42px",color:o.palette.text.primary}}),(0,n.jsxs)(s.A,{direction:"column",children:[(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",children:"Learn"}),(0,n.jsx)(d.A,{variant:"body2",color:"secondary",textAlign:"left",children:"Found in the main menu, here you can learn the tools, betting strategy and more."})]})]})}),(0,n.jsx)(m(),{href:"/en/resources",passHref:!0,style:{textDecoration:"none"},children:(0,n.jsxs)(C,{children:[(0,n.jsx)(y.A,{sx:{fontSize:"42px",color:o.palette.text.primary}}),(0,n.jsxs)(s.A,{direction:"column",children:[(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",children:"Video Links"}),(0,n.jsx)(d.A,{variant:"body2",color:"secondary",textAlign:"left",children:"You’ll see this icon around the site. Click and it will give you a quick explainer on that area."})]})]})}),(0,n.jsx)(m(),{href:"https://discord.gg/9dsyWsbnRx",passHref:!0,style:{textDecoration:"none"},children:(0,n.jsxs)(C,{children:[(0,n.jsx)(A.A,{sx:{fontSize:"42px",color:o.palette.text.primary}}),(0,n.jsxs)(s.A,{direction:"column",children:[(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",children:"Discord"}),(0,n.jsx)(d.A,{variant:"body2",color:"secondary",textAlign:"left",children:"Join our Discord to talk strategy/plays, give product feedback, share success and more."})]})]})}),(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",my:1,children:"If you ever have any problems, please reach out to us on Discord or at support@picktheodds.app"})]}),(0,n.jsx)(d.A,{variant:"body2",textAlign:"left",my:1,children:z("enjoy")})]}),(0,n.jsx)(_,{variant:"contained",color:"secondary",size:"small",href:"/arbitrages",children:z("action_button")})]})})}},549662:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(695155);r(212115);var o=r(642772);let i=function(e){return(0,n.jsx)(o.A,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",style:{width:"20px",height:"20px",background:"#FFFFFF0F",border:"1px solid #FFFFFF1F",borderRadius:"5px"},...e})}},650477:()=>{},659151:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});var n=r(695155);r(212115);var o=r(904071),i=r(450910),a=r(426021);let s=function({text:e,hideText:t,...r}){let s=(0,i.c)("words");return(0,n.jsxs)(o.A,{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column",height:"50vh",...r,children:[(0,n.jsx)(a.A,{}),!t&&(0,n.jsxs)(n.Fragment,{children:["\xa0\xa0\xa0",e||s("searching")]})]})}},681216:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(695155);r(212115);var o=r(642772);let i=function(e){return(0,n.jsx)(o.A,{width:24,height:40.848,viewBox:"0 0 24 40.848",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,n.jsx)("path",{d:"M10.104 25.152 5.88 20.856l1.44 -1.44 2.784 2.856 7.104 -7.248 1.44 1.44zm-6.864 15.696q-1.392 0 -2.304 -0.936T0 37.584V3.312Q0 1.92 0.936 0.936 1.848 0 3.24 0h17.544q1.392 0 2.28 0.936Q24 1.872 24 3.312v34.272q0 1.392 -0.936 2.376 -0.936 0.936 -2.304 0.936zm-1.248 -7.152h19.992V7.128H1.992z"})})}},690594:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=r(212115).createContext(void 0)},737661:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(695155);r(212115);var o=r(642772);let i=function(e){return(0,n.jsx)(o.A,{...e,children:(0,n.jsx)("path",{d:"M20.317,3.987C18.787,3.25 17.147,2.708 15.432,2.397C15.401,2.391 15.37,2.406 15.353,2.436C15.142,2.83 14.909,3.343 14.745,3.747C12.9,3.457 11.065,3.457 9.258,3.747C9.095,3.334 8.852,2.83 8.641,2.436C8.624,2.407 8.593,2.392 8.562,2.397C6.848,2.707 5.208,3.249 3.677,3.987C3.664,3.993 3.652,4.003 3.645,4.015C0.533,8.891 -0.319,13.647 0.099,18.343C0.101,18.366 0.113,18.388 0.13,18.402C2.183,19.984 4.172,20.943 6.123,21.58C6.155,21.59 6.188,21.578 6.207,21.551C6.669,20.89 7.081,20.192 7.433,19.459C7.454,19.416 7.434,19.365 7.392,19.348C6.739,19.089 6.118,18.772 5.52,18.412C5.472,18.383 5.469,18.312 5.512,18.278C5.638,18.18 5.764,18.077 5.884,17.973C5.906,17.954 5.936,17.95 5.962,17.962C9.889,19.843 14.142,19.843 18.023,17.962C18.049,17.949 18.079,17.953 18.102,17.972C18.222,18.076 18.348,18.18 18.474,18.278C18.518,18.312 18.515,18.383 18.468,18.412C17.87,18.779 17.248,19.089 16.595,19.347C16.552,19.364 16.533,19.416 16.554,19.459C16.914,20.191 17.326,20.888 17.779,21.55C17.798,21.578 17.832,21.59 17.863,21.58C19.824,20.943 21.813,19.984 23.865,18.402C23.883,18.388 23.895,18.367 23.897,18.344C24.397,12.914 23.059,8.198 20.348,4.016C20.342,4.003 20.33,3.993 20.317,3.987ZM8.02,15.483C6.838,15.483 5.863,14.345 5.863,12.946C5.863,11.548 6.819,10.409 8.02,10.409C9.231,10.409 10.196,11.558 10.177,12.946C10.177,14.345 9.221,15.483 8.02,15.483ZM15.995,15.483C14.812,15.483 13.838,14.345 13.838,12.946C13.838,11.548 14.793,10.409 15.995,10.409C17.206,10.409 18.171,11.558 18.152,12.946C18.152,14.345 17.206,15.483 15.995,15.483Z"})})}},764930:(e,t,r)=>{"use strict";r.d(t,{A:()=>m});var n=r(695155),o=r(441161),i=r(247970),a=r(904071),s=r(48022),l=r(268459),c=r(162768);r(212115);var d=r(450910),p=r(559841),u=r(318784),x=r(549662);let h=e=>(0,n.jsx)("strong",{children:e}),g=e=>(0,n.jsx)(o.N_,{href:"/terms-of-service",style:{textDecoration:"underline",color:"inherit"},children:e}),m=function({open:e,billingCycle:t,agreed:r,showAgreementError:o,onAgreedChange:m,onClose:f,onConfirm:y,secondaryButtonText:A}){let b=(0,d.c)("plans"),j=(0,i.A)(),v="annual"===t;return(0,n.jsx)(p.A,{open:e,onClose:f,onConfirm:y,showCloseButton:!0,variant:"info",title:b(v?"annual_plan_confirmation":"monthly_plan_confirmation"),buttonText:b(v?"buy_annual_plan":"buy_monthly_plan"),disabled:!r,secondaryButton:{text:A,onClick:f,variant:"outlined"},message:(0,n.jsxs)(a.A,{display:"flex",flexDirection:"column",gap:2,children:[(0,n.jsx)(s.A,{variant:"body3",textAlign:"left",color:"text.primary",children:v?b.rich("annual_plan_message_1",{b:h,link:g}):b.rich("monthly_plan_message_1",{b:h,link:g})}),(0,n.jsx)(s.A,{variant:"body3",textAlign:"left",color:"text.primary",children:b(v?"annual_plan_message_2":"monthly_plan_message_2")}),(0,n.jsxs)(a.A,{display:"flex",flexDirection:"column",gap:.5,mt:1,children:[(0,n.jsx)(l.A,{control:(0,n.jsx)(c.A,{checked:r,onChange:e=>m(e.target.checked),icon:(0,n.jsx)(x.A,{sx:{fontSize:20}}),checkedIcon:(0,n.jsx)(u.A,{strokeColor:j.palette.text.secondary})}),label:(0,n.jsx)(s.A,{variant:"label",color:"text.primary",children:v?b.rich("annual_plan_checkbox",{b:h}):b.rich("monthly_plan_checkbox",{b:h})}),sx:{alignItems:"flex-start",margin:0,px:2}}),o&&(0,n.jsx)(s.A,{variant:"label",color:"error.main",sx:{ml:4},children:b("plan_confirmation_error")})]})]})})}},774745:(e,t,r)=>{"use strict";r.d(t,{Gb:()=>l,I_:()=>c,d$:()=>d,ls:()=>p});var n,o,i=r(716763),a=r(307351),s=r.n(a),l=((n={}).SIGN_UP="SIGN_UP",n.LOG_IN="LOG_IN",n),c=((o={}).EMAIL="EMAIL",o.AUTHENTICATOR="AUTHENTICATOR",o);let d=(0,i.J1)`
  mutation UserSignup(
    $email: String!
    $cfTurnstileToken: String!
    $hashCode: String!
    $forcedMethod: LoginAuthenticationMethodEnum
  ) {
    user {
      signup(email: $email, cfTurnstileToken: $cfTurnstileToken, hashCode: $hashCode, forcedMethod: $forcedMethod)
    }
  }
`;function p(){let e=Math.random().toString(36).substring(2);return s().SHA256(e).toString(s().enc.Hex).substring(0,20)}},787178:(e,t,r)=>{"use strict";function n(e){return null==e}r.d(t,{A:()=>n})},812717:(e,t,r)=>{"use strict";r.d(t,{A:()=>e_});var n=r(695155),o=r(299129),i=r(770982),a=r(904071),s=r(247970),l=r(962811),c=r(915987),d=r(48022),p=r(716335),u=r(212115),x=r(388574),h=r(450910),g=r(678555),m=r(417973),f=r(37721),y=r(672394),A=r(594610),b=r(887741),j=r(834080),v=r(189452),w=r(317389),k=r(417594),C=r(787178),_=r(274611),T=r(66879),S=r(418750),$=r(93787),I=r(670074),E=r(441161),z=r(374110),L=r(298251),P=r(394079),R=r(286639),F=r(132927),D=r(547695),O=r(764930);let N=(0,o.Ay)(c.A,{shouldForwardProp:e=>"isCurrentPlan"!==e})(({theme:e,isCurrentPlan:t})=>({position:"relative",border:`1px solid ${e.palette.alpha.twelevepercent}`,background:e.palette.customBackground.cards,borderRadius:"16px",boxShadow:"none",marginBottom:"16px",width:282,height:"fit-content"})),M=(0,o.Ay)(c.A,{shouldForwardProp:e=>"isCurrentPlan"!==e})(({theme:e,isCurrentPlan:t})=>({justifyContent:"space-between",borderRadius:"16px",width:"100%",margin:"0px",gap:"24px"})),G=(0,o.Ay)(a.A)(({theme:e})=>`
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: ${e.palette.modal.background};
      border: 1px solid ${e.palette.alpha.twelevepercent};
      border-radius: ${e.spacing(2)};
      padding: ${e.spacing(3)} ${e.spacing(2)};
      gap: ${e.spacing(2)};
      margin: auto;
      position: relative;
      width: 1200px;
      overflow: auto;
    height: 90vh;

      ${e.breakpoints.down("md")} {
      height: fit-content;
        flex-direction: column;
        max-width: 425px;
        width: calc(100% - ${e.spacing(3)});
        padding: ${e.spacing(1.5)} ${e.spacing(2)};
      }
    `),B=(0,o.Ay)(g.A)(({theme:e})=>({border:`1px solid ${e.palette.alpha.twelevepercent}`,background:e.palette.customBackground.cards,borderRadius:"16px",boxShadow:"none",marginBottom:"16px",overflow:"auto"})),W=(0,o.Ay)(m.A)(({theme:e})=>({position:"relative",paddingLeft:0,paddingRight:0,display:"flex",flexDirection:"column",justifyContent:"space-between",borderRadius:"16px",backgroundClip:"padding-box",".MuiAccordionSummary-content":{flexDirection:"column",width:"100%",margin:"0px",padding:"16px 16px 0px 16px",gap:"24px"}})),U=(0,o.Ay)(f.A,{shouldForwardProp:e=>"textColor"!==e})(({theme:e,textColor:t})=>`
    height: 52px;
    font-size: ${e.typography.body2.fontSize};
    font-weight: bold;
    width: 100%;
    border-radius: 6px;
    &.Mui-disabled {
      color: ${t||e.palette.text.primary};
    }
  `);function H(e,t,r){return(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:"text.secondary"}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:r}),(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[e,t&&"%"]})]})}let V=(e,t,r)=>null===t.monthlyPrice?"Indefinite":r||(0,C.A)(t.trialDays)?"None":e("n_days",{value:t.trialDays??0}),Z=function({...e}){let t=(0,S.Jd)(),r=(0,s.A)(),o=(0,l.A)(r.breakpoints.down("md")),i=(0,k.GV)(e=>e.constantsReducer),[p,x]=(0,u.useState)(!1),[g,m]=(0,u.useState)(!1),[f,Z]=(0,u.useState)(!1),[Y,J]=(0,u.useState)(),[q,X]=(0,u.useState)("monthly"),[Q,K]=(0,u.useState)(!1),[ee,et]=(0,u.useState)(!1),er=(0,E.rd)(),en=i?.restrictions?.filter(e=>"LOGGED_IN"!==e.package),[eo,{loading:ei}]=(0,j.n)(P.YZ),ea=(0,C.A)(t.data?.activePackageType)||t.data?.activePackageType===I.GT.ANONYMOUS||t.data?.activePackageType===I.GT.LOGGED_IN,{loading:es}=(0,z.A)(),el=()=>{Z(!1),J(void 0),X("monthly"),K(!1),et(!1)},ec=e=>{if(e===I.GT.ANONYMOUS)x(!0);else{var t;if(ea)return void(t=g?"annual":"monthly",J(e),X(t),Z(!0),K(!1),et(!1));ea&&eo({variables:{packageType:e,isAnnual:g}}).then(e=>{let t=e.data?.user.purchase;t&&er.push(t)}).catch(e=>(0,n.jsx)(R.A,{message:e.message}))}},ed=()=>{Q?Y&&eo({variables:{packageType:Y,isAnnual:"annual"===q}}).then(e=>{let t=e.data?.user.purchase;t&&(el(),er.push(t))}).catch(e=>(0,n.jsx)(R.A,{message:e.message})):et(!0)},[ep,eu]=u.useState();(0,u.useEffect)(()=>{let e=!1,r=en?.findIndex(e=>(t.data?.activePackageType||I.GT.ANONYMOUS)===e.package);return void 0!==r&&void 0===ep&&Promise.resolve().then(()=>{e||eu(`panel${r}`)}),()=>{e=!0}},[ep,en,eu,t.data?.activePackageType]);let ex=(0,h.c)("plans"),eh=(0,h.c)("words"),eg=(0,h.k)(),em=e=>e?Math.round(e/12):0;return o?p?(0,n.jsx)(D.A,{}):(0,n.jsxs)(G,{children:[(0,n.jsx)(c.A,{justifyContent:"center",pb:1,children:(0,n.jsx)(F.A,{variant:"sofiaSansHeader",textAlign:"center",fontSize:28,children:ex("Pick_Your_plan")})}),(0,n.jsx)(L.A,{isAnnual:g,onChange:e=>m("annual"===e)}),en?.map((e,o)=>{let i,s=e.package===I.GT.ANONYMOUS||e.package===I.GT.LOGGED_IN,l=(t.data?.activePackageType||I.GT.ANONYMOUS)===e.package,p={[I.GT.STARTER]:{current:30,future:40},[I.GT.INTERMEDIATE]:{current:80,future:100},[I.GT.ADVANCED]:{current:120,future:150}}[e.package];return(0,n.jsxs)(B,{expanded:ep===`panel${o}`,onChange:(i=`panel${o}`,(e,t)=>{eu(!!t&&i)}),disableGutters:!0,children:[(0,n.jsxs)(W,{"aria-controls":`panel${o}d-content`,id:`panel${o}d-header`,children:[(0,n.jsxs)(c.A,{direction:"row",justifyContent:"space-between",width:"100%",children:[(0,n.jsx)(F.A,{variant:"sofiaSansHeader",fontSize:20,sx:{backgroundColor:r.palette.alpha.sixpercent,borderRadius:"8px",padding:"8px",alignSelf:"baseline"},textAlign:"center",children:(0,P._j)(e.package)}),l&&(0,n.jsx)(c.A,{sx:{background:r.palette.alpha.twelevepercent,borderRadius:"5px",padding:"2px 4px",width:"fit-content"},children:(0,n.jsx)(d.A,{fontSize:12,sx:{color:r.palette.profit,fontWeight:"bold"},children:ex("active_plan")})}),(0,n.jsx)(U,{fullWidth:!0,variant:"outlined",color:"secondary",size:"small",sx:{width:"140px"},disabled:ei||es,onClick:()=>ec(e.package),children:(0,n.jsx)(d.A,{variant:"label",color:"secondary",children:ex("choose_plan")})})]}),(0,n.jsxs)(c.A,{children:[(0,n.jsxs)(c.A,{direction:"row",alignItems:"baseline",gap:1,pb:1,marginRight:"auto",sx:{borderBottom:`1px solid ${r.palette.alpha.twelevepercent}`,width:"100%"},children:[g&&!s?(0,n.jsxs)(c.A,{direction:"row",alignItems:"baseline",gap:1,children:[(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,sx:{textDecoration:"line-through",textDecorationThickness:"1px",color:"text.secondary",opacity:.6},children:["$",eg.number(e.monthlyPrice??0,{currency:"USD",maximumFractionDigits:0})]}),(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,color:"profit",children:["$",eg.number(em(e.annualPrice),{currency:"USD",maximumFractionDigits:0})]})]}):(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,children:["$",eg.number(e.monthlyPrice??0,{currency:"USD",maximumFractionDigits:0})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.secondary",children:ex("month")}),(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.secondary",fontWeight:700,children:ex("usd")})]})]}),(0,n.jsx)(a.A,{sx:{display:"flex",borderRadius:"8px",backgroundColor:!s&&p?(0,y.X4)(r.palette.profit,.1):"transparent",padding:"4px 10px",mt:1},children:(0,n.jsx)(d.A,{variant:"label",sx:{marginRight:"auto",fontWeight:"bold",minHeight:20,color:r.palette.profit},children:!s&&p?`Get a cheap month before ${(0,P._j)(e.package)} goes up to $${p.future} on November 2nd!`:""})}),ep!==`panel${o}`&&(0,n.jsxs)(c.A,{direction:"row",justifyContent:"center",p:1,alignItems:"center",children:[(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:"See Benefits"}),(0,n.jsx)(v.A,{color:"secondary"})]})]})]}),(0,n.jsxs)(A.A,{children:[(0,n.jsxs)(c.A,{pb:1,children:[(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("free_bet_converter")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("pre_live_odds")}),(0,n.jsx)(b.A,{color:"error",sx:{backgroundColor:r.palette.alpha.sixpercent,borderRadius:"8px"},children:(0,n.jsx)(_.A,{sx:{width:"20px"}})}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("Live_data")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("portable_filters")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("trial_included"),":"]}),(0,n.jsx)(d.A,{variant:"body2",color:"text.primary",fontWeight:"bold",children:V(ex,e,g)})]},o)]}),$.V6.map((t,i)=>{if(t===$.s8.FREE_BET_CONVERTER)return null;if(t===$.s8.ODDS_SCREEN)return(0,n.jsxs)(c.A,{flexDirection:"column",gap:.5,pt:1.5,pb:2.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:$.xO[t]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),0===o?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("refresh_time"),":"]}),(0,n.jsx)(d.A,{variant:"body2",fontWeight:"bold",color:"text.primary",children:ex("15_Second_Refresh")})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("refresh_time"),":"]}),(0,n.jsx)(d.A,{variant:"body2",fontWeight:"bold",color:"text.primary",children:ex("2_4_Second_Refresh")})]})]})]},i);let a=e.restrictions.find(e=>e.toolEnum===t);return(0,n.jsxs)(c.A,{flexDirection:"column",gap:.5,pb:2.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:$.xO[t]}),H(a?.rOILimit,!0,ex("roi_limit")),H(a?.maxResult,!1,ex("max_results")),H(a?.sportbookLimit,!1,ex("sportsbook_limit")),H(a?.leagueLimit,!1,ex("leagues_limit"))]},i)}),(0,n.jsxs)(c.A,{gap:1,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:ex("device_limit")}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("device_limit"),":"]}),(0,n.jsx)(d.A,{variant:"body2",color:"text.primary",fontWeight:"bold",children:"1"})]})]}),(0,n.jsx)(c.A,{width:"100%",p:2,children:(0,n.jsx)(U,{fullWidth:!0,variant:"outlined",color:l?"error":"secondary",size:"small",sx:{width:"100%",height:"36px"},disabled:ei||es,onClick:()=>ec(e.package),children:(0,n.jsx)(d.A,{variant:"body1",color:l?"error":"secondary",children:"Choose plan"})})}),(0,n.jsxs)(c.A,{direction:"row",justifyContent:"center",p:1,alignItems:"center",onClick:()=>eu(ep!==`panel${o}`&&`panel${o}`),sx:{borderTop:`1px solid ${r.palette.alpha.twelevepercent}`},children:[(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:"Close Benefits"}),(0,n.jsx)(w.A,{color:"secondary"})]})]})]},o)}),(0,n.jsx)(O.A,{open:f,billingCycle:q,agreed:Q,showAgreementError:ee,onAgreedChange:e=>{K(e),e&&et(!1)},onClose:el,onConfirm:ed,secondaryButtonText:"annual"===q?ex("try_monthly"):eh("close")})]}):p?(0,n.jsx)(D.A,{}):(0,n.jsxs)(G,{children:[(0,n.jsx)(c.A,{pb:ep?void 0:1,children:(0,n.jsx)(F.A,{variant:"sofiaSansHeader",textAlign:"center",fontSize:28,children:ex("Pick_Your_plan")})}),(0,n.jsx)(L.A,{isAnnual:g,onChange:e=>m("annual"===e)}),(0,n.jsx)(c.A,{direction:"row",justifyContent:"center",gap:2,pb:2,overflow:"auto",children:en?.map((e,o)=>{let i=e.package===I.GT.ANONYMOUS||e.package===I.GT.LOGGED_IN,a=t?.isLoggedIn&&(t.data?.activePackageType||I.GT.ANONYMOUS)===e.package;return(0,n.jsxs)(N,{p:2,isCurrentPlan:a,children:[(0,n.jsxs)(M,{isCurrentPlan:a,children:[(0,n.jsxs)(c.A,{direction:"row",justifyContent:"space-between",alignItems:"center",width:"100%",children:[(0,n.jsx)(F.A,{variant:"sofiaSansHeader",fontSize:20,sx:{backgroundColor:r.palette.alpha.sixpercent,borderRadius:"8px",padding:"8px",alignSelf:"baseline"},textAlign:"center",children:(0,P._j)(e.package)}),a&&t?.isLoggedIn&&(0,n.jsx)(c.A,{sx:{background:r.palette.alpha.twelevepercent,borderRadius:"5px",padding:"2px 4px",width:"fit-content"},children:(0,n.jsx)(d.A,{fontSize:12,sx:{color:r.palette.profit,fontWeight:"bold"},children:ex("active_plan")})})]}),(0,n.jsxs)(c.A,{gap:2,children:[(0,n.jsxs)(c.A,{direction:"row",alignItems:"baseline",gap:1,pb:2,marginRight:"auto",sx:{borderBottom:`1px solid ${r.palette.alpha.twelevepercent}`,width:"100%"},children:[g&&!i?(0,n.jsxs)(c.A,{direction:"row",alignItems:"baseline",gap:1,children:[(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,sx:{textDecoration:"line-through",textDecorationThickness:"1px",color:"text.secondary",opacity:.6},children:["$",eg.number(e.monthlyPrice??0,{currency:"USD",maximumFractionDigits:0})]}),(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,color:"profit",children:["$",eg.number(em(e.annualPrice),{currency:"USD",maximumFractionDigits:0})]})]}):(0,n.jsxs)(d.A,{variant:"body1Bold",fontSize:32,children:["$",eg.number(e.monthlyPrice??0,{currency:"USD",maximumFractionDigits:0})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.secondary",children:ex("month")}),(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.secondary",fontWeight:700,children:ex("usd")})]})]}),(0,n.jsx)(U,{fullWidth:!0,variant:"outlined",color:a?"error":"secondary",size:"small",disabled:ei||es,onClick:()=>ec(e.package),children:(0,n.jsx)(d.A,{variant:"body1",color:a?"error":"secondary",children:ex("choose_plan")})})]})]}),(0,n.jsxs)(c.A,{py:1.5,gap:1,children:[(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("free_bet_converter")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:.5,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",ml:.5,children:ex("pre_live_odds")}),(0,n.jsx)(b.A,{color:"error",sx:{backgroundColor:r.palette.alpha.sixpercent,borderRadius:"8px"},children:(0,n.jsx)(_.A,{sx:{width:"20px",mb:"4px"}})}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("Live_data")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",children:ex("portable_filters")})]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("trial_included"),":"]}),(0,n.jsx)(d.A,{variant:"body2",color:"text.primary",fontWeight:"bold",children:V(ex,e,g)})]},o)]}),$.V6.map((t,i)=>{if(t===$.s8.FREE_BET_CONVERTER)return null;if(t===$.s8.ODDS_SCREEN)return(0,n.jsxs)(c.A,{flexDirection:"column",gap:.5,pb:1.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:$.xO[t]}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),0===o?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("refresh_time"),":"]}),(0,n.jsx)(d.A,{variant:"body2",fontWeight:"bold",color:"text.primary",children:ex("15_Second_Refresh")})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("refresh_time"),":"]}),(0,n.jsx)(d.A,{variant:"body2",fontWeight:"bold",color:"text.primary",children:ex("2_4_Second_Refresh")})]})]})]},i);let a=e.restrictions.find(e=>e.toolEnum===t);return(0,n.jsxs)(c.A,{flexDirection:"column",gap:.5,pb:1.5,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:$.xO[t]}),H(a?.rOILimit,!0,ex("roi_limit")),H(a?.maxResult,!1,ex("max_results")),H(a?.sportbookLimit,!1,ex("sportsbook_limit")),H(a?.leagueLimit,!1,ex("leagues_limit"))]},i)}),(0,n.jsxs)(c.A,{gap:1,children:[(0,n.jsx)(d.A,{variant:"label",textTransform:"uppercase",color:"text.primary",children:ex("device_limit")}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",gap:1,children:[(0,n.jsx)(T.A,{sx:{fontSize:16,color:r.palette.text.secondary}}),(0,n.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:[ex("device_limit"),":"]}),(0,n.jsx)(d.A,{variant:"body2",color:"text.primary",fontWeight:"bold",children:"1"})]})]}),(0,n.jsx)(U,{fullWidth:!0,variant:"outlined",color:a?"error":"secondary",size:"small",sx:{mt:2},disabled:ei||es,onClick:()=>ec(e.package),children:(0,n.jsx)(d.A,{variant:"body1",color:a?"error":"secondary",children:"Choose Plan"})})]},o)})}),(0,n.jsx)(O.A,{open:f,billingCycle:q,agreed:Q,showAgreementError:ee,onAgreedChange:e=>{K(e),e&&et(!1)},onClose:el,onConfirm:ed,secondaryButtonText:"annual"===q?ex("try_monthly"):eh("close")})]})};var Y=r(774745),J=r(396616),q=r(621123),X=r(509306),Q=r(329029),K=r(315568),ee=r(162768),et=r(600631),er=r(547576),en=r(426021),eo=r(642772);let ei=function(e){return(0,n.jsx)(eo.A,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",...e,children:(0,n.jsx)("rect",{x:"0.5",y:"0.5",width:"23",height:"23",rx:"4.5",stroke:"currentColor",fill:"none"})})};var ea=r(322110),es=r(740566),el=r.n(es),ec=r(455943),ed=r(681216),ep=r(200692),eu=r(961723),ex=r(579847),eh=r(602834),eg=r(379248),em=r(101195),ef=r(716763);let ey=(0,ef.J1)`
  mutation VerifyEmail($hashCode: String!, $code: String!) {
    user {
      email {
        verify(hashCode: $hashCode, code: $code) {
          userId
          accessToken
          refreshToken
          isNewUser
        }
      }
    }
  }
`;var eA=r(115893);let eb=(0,o.Ay)(eu.Xs)`
  iframe {
    width: 100% !important;
    display: hidden;
  }
`;(0,o.Ay)(a.A)(({theme:e})=>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: ${e.palette.background.default};
    border: 1px solid ${e.palette.text.primary};
    border-radius: ${e.spacing(1)};
    padding: ${e.spacing(3)} ${e.spacing(2)};
    height: max-content;
    margin: auto;
    position: relative;
    width: 425px;

    ${e.breakpoints.down("md")} {
      max-width: 425px;
      width: calc(100% - ${e.spacing(3)});
      padding: ${e.spacing(1.5)} ${e.spacing(2)};
    }

  `);let ej=(0,o.Ay)("div")(({theme:e})=>({"& .vi__character":{height:"100%",flexGrow:1,flexBasis:0,borderRadius:"8px",border:"none",color:e.palette.text.primary,fontWeight:600,backgroundColor:e.palette.alpha.sixpercent}})),ev=function(e){let{emailAddress:t,hashCode:r,onClose:o,setShowPlansModal:i,verificationType:s}=e,x=(0,ex.DP)(),[g,m]=(0,u.useState)(null),[f,y]=(0,u.useState)(),[A,b]=(0,u.useState)(s),[v,w]=(0,u.useState)(!1),k=(0,u.useRef)(null),C=(0,eh.wA)(),_=(e,t)=>{t(),y(void 0),m(e)},T=e=>{let{refreshToken:t,userId:r,isNewUser:n}=e;t&&r&&((0,I.mW)({refreshToken:{token:t},userId:r}),eg.M.broadcastChannel.postMessage({type:"disposeEntireWebSocket"}),n?(o?.(),i(!0)):(o?.(),C(em.a.clearAllFilters()),setTimeout(()=>window.location.reload(),2e3)))},S=(0,u.useRef)(null);(0,u.useEffect)(()=>{let e=()=>{S.current&&S.current.scrollIntoView({behavior:"smooth",block:"center"})},t=()=>{S.current&&S.current.scrollIntoView({behavior:"smooth",block:"center"})},r=S.current;return r&&(r.addEventListener("focus",e),window.addEventListener("resize",t)),()=>{r&&r.removeEventListener("focus",e),window.removeEventListener("resize",t)}},[]);let[$,{loading:E,reset:z}]=(0,j.n)(ey,{onError:e=>{_(e,z)},onCompleted:async e=>{T(e.user.email.verify)}}),[L,{loading:P,reset:F}]=(0,j.n)(ep.s,{onError:e=>{_(e,F)},onCompleted:async e=>{T(e.user.authenticator.verify)}}),[D,{loading:O}]=(0,j.n)(Y.d$,{onError:e=>{_(e,z),k.current?.reset()}}),N=(0,l.A)(x.breakpoints.down("md")),M=(0,h.c)("verification");return(0,n.jsxs)(c.A,{direction:"column",pb:3,gap:N?4:8,children:[(0,n.jsxs)(c.A,{direction:"column",gap:2,alignItems:"center",justifyContent:"center",children:[A===Y.I_.EMAIL?(0,n.jsx)(p.A,{sx:{fontSize:N?24:33,color:"text.primary"}}):(0,n.jsx)(ed.A,{sx:{fontSize:N?24:33,color:"text.primary"}}),(0,n.jsx)(d.A,{variant:"body1Bold",color:"text.primary",fontSize:N?20:30,mb:3,mt:2,children:A===Y.I_.EMAIL?M("verification_email_sent",{emailAddress:t}):M("verification_authenticator")})]}),(0,n.jsxs)(c.A,{children:[E||P||O?(0,n.jsx)(ec.A,{text:"",height:"auto"}):(0,n.jsx)(ej,{children:(0,n.jsx)(el(),{value:f,ref:S,onComplete:e=>{let t={variables:{hashCode:r,code:e.toUpperCase()}};A===Y.I_.EMAIL?$(t):L(t)},length:6,autoFocus:!0,onChange:e=>y(e.toUpperCase()),classNames:{container:ea.A.input},containerProps:{style:{alignSelf:"center",margin:"0 auto"}}})}),A===Y.I_.AUTHENTICATOR&&(0,n.jsx)(d.A,{onClick:()=>w(!0),variant:"smallText",mt:1,color:"text.secondary",sx:{cursor:"pointer"},children:M("send_email_instead")}),v&&(0,n.jsx)(a.A,{height:65,my:2,children:(0,n.jsx)(eb,{ref:k,siteKey:"0x4AAAAAAAQ2cu9YjE4N590s",options:{theme:x.palette.mode,retry:"never"},style:{width:"100%"},onSuccess:e=>{X.Z({category:"log",message:`[Turnstile][VerifCode] onSuccess — new token issued (length:${e.length})`,level:"log"}),(0,eA.logger)(`[Turnstile][VerifCode] onSuccess — new token issued (length:${e.length})`),D({variables:{email:t,cfTurnstileToken:e,hashCode:r,forcedMethod:Y.I_.EMAIL}}),b(Y.I_.EMAIL)},onError:()=>{X.Z({category:"log",message:"[Turnstile][VerifCode] Widget error — resetting.",level:"log"}),(0,eA.logger)("[Turnstile][VerifCode] Widget error — resetting."),k.current?.reset()},onExpire:()=>{X.Z({category:"warn",message:"[Turnstile][VerifCode] Token expired — resetting.",level:"log"}),(0,eA.logger)("[Turnstile][VerifCode] Token expired — resetting."),k.current?.reset()}})})]}),g&&(0,n.jsx)(R.A,{message:g.message,onClose:()=>{m(null),z(),F(),y(void 0)}})]})},ew=function({loginType:e,onClose:t,setSucess:r,email:o,setShowPlansModal:i}){let[x,g]=(0,u.useState)(o||""),[m,f]=(0,u.useState)(!1),[y,A]=(0,u.useState)(),b=(0,u.useRef)(0),v=(0,u.useRef)(null),w=(0,u.useRef)(null),[k,C]=(0,u.useState)(0),[_,T]=(0,u.useState)(""),[S,$]=(0,u.useState)(!1),I=(0,u.useRef)(null),E=(0,u.useRef)(null),z=(0,s.A)(),L=(0,l.A)(z.breakpoints.down("md")),[P,R]=(0,u.useState)(),[F,D]=(0,u.useState)(!1),O=(0,u.useRef)(!1),N=(0,u.useRef)(0),M=(0,u.useRef)(""),G=(0,u.useRef)(""),[B,{loading:W,error:U,data:H,reset:V}]=(0,j.n)(Y.d$,{onCompleted:async e=>{R(e.user.signup),r(!0)},onError:e=>{let t=(0,et.A)(e.message)?.[0],r="0003"===t;J.v4(n=>{n.setExtra("email",G.current||x),n.setExtra("error_msg",e.message),n.setExtra("error_code",t),n.setExtra("is_turnstile_error",r),n.setExtra("error string",JSON.stringify(e)),q.Cp(Error("[Turnstile][LoginPopup] Signup mutation failed"))}),w.current&&(clearTimeout(w.current),w.current=null),v.current=null,b.current=0,(0,eA.logger)("[Turnstile][LoginPopup] Signup mutation failed:",{error:e.message,errorCode:t,isTurnstileError:r}),A(void 0),E.current?.reset(),r&&(N.current<2?(O.current=!0,(0,eA.logger)("[Turnstile][LoginPopup] Scheduling auto-retry after Turnstile rejection",{retryAttempt:N.current+1}),X.Z({category:"turnstile",message:`[Turnstile] Auto-retry scheduled (attempt ${N.current+1} of 2)`,level:"info",data:{retryAttempt:N.current+1,email:G.current}})):(J.v4(r=>{r.setExtra("email",G.current),r.setExtra("retries_attempted",N.current),r.setExtra("last_error",e.message),r.setExtra("last_error_code",t),r.setTag("turnstile_retry_exhausted","true"),q.Cp(Error("[Turnstile][LoginPopup] All auto-retries exhausted — user sees error message"))}),(0,eA.logger)("[Turnstile][LoginPopup] All auto-retries exhausted, showing error to user",{retriesAttempted:N.current,email:G.current}),D(!0),O.current=!1,N.current=0))}});(0,u.useEffect)(()=>{let e=!1,t=localStorage.getItem("savedEmail");t&&Promise.resolve().then(()=>{e||(g(t),$(!0))});let r=()=>{I.current&&I.current.scrollIntoView({behavior:"smooth",block:"center"})},n=I.current;return n&&(n.addEventListener("focus",r),n.focus(),n.blur()),()=>{e=!0,n&&n.removeEventListener("focus",r)}},[]),(0,u.useEffect)(()=>()=>{w.current&&clearTimeout(w.current)},[]);let Z=0===x.trim().length||m||!y||W,eo=(0,h.c)("Login.LoginPopup");return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("form",{autoComplete:"on",style:{display:"none"},children:(0,n.jsx)("input",{type:"email",name:"email",autoComplete:"email"})}),!H&&(0,n.jsxs)(n.Fragment,{children:[F?(0,n.jsx)(d.A,{variant:"body2",color:"warning.main",mb:2,mt:2,children:"Verification check failed — please complete the security check again and try again."}):U?(0,n.jsx)(d.A,{variant:"body2",color:"error",mb:2,mt:2,children:(0,et.A)(U.message)?.[1]}):(0,n.jsxs)(c.A,{direction:"column",gap:L?2:8,children:[(0,n.jsx)(d.A,{variant:"body1Bold",color:"text.primary",fontSize:30,children:eo("welcome")}),(0,n.jsx)(d.A,{variant:"body2",fontSize:20,mb:2,mt:2,color:"text.primary",children:eo("login_or_signup")})]}),(0,n.jsx)(K.A,{inputRef:I,fullWidth:!0,error:m,placeholder:"Email Address",onChange:e=>{let t=e.target.value.trim();g(t),m&&(/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(t)?f(!1):f(!0))},disabled:W,size:"small",autoComplete:"on",type:"email",sx:{input:{pt:1.5,pb:1.5,fontSize:z.typography.body3.fontSize},".MuiOutlinedInput-notchedOutline":{border:"none",backgroundColor:z.palette.alpha.sixpercent}},InputProps:{inputProps:{maxLength:200},startAdornment:(0,n.jsx)(p.A,{sx:{fontSize:20,color:"text.secondary",mr:1}})},value:x,variant:"outlined"}),(0,n.jsxs)(c.A,{direction:"row",alignItems:"center",mt:.5,ml:.5,children:[(0,n.jsx)(ee.A,{checked:S,onChange:e=>{$(e.target.checked)},disableTouchRipple:!0,disableFocusRipple:!0,disableRipple:!0,icon:(0,n.jsx)(ei,{sx:{fontSize:16,m:.5,color:z.palette.text.primary}}),sx:{":checked":{fontSize:16}}}),(0,n.jsx)(d.A,{variant:"label",children:"Save my email"})]}),(0,n.jsx)(a.A,{height:48,my:2,border:"none",children:(0,n.jsx)(eb,{ref:E,siteKey:"0x4AAAAAAAQ2cu9YjE4N590s",options:{theme:z.palette.mode,retry:"never",action:"login",size:"flexible"},sx:{width:"100%",border:"none"},onSuccess:e=>{let t=!!v.current;X.Z({category:"turnstile",message:`[Turnstile][LoginPopup] onSuccess — token issued (length:${e.length}) | replacing:${t} | settling 1500ms`,level:"info"}),(0,eA.logger)(`[Turnstile][LoginPopup] onSuccess — token issued (length:${e.length}), settling...`),V(),D(!1),w.current&&(clearTimeout(w.current),w.current=null),v.current=e,A(void 0),w.current=setTimeout(()=>{let e=v.current;if(e){if(b.current=Date.now(),v.current=null,O.current&&N.current<2){O.current=!1,N.current+=1,(0,eA.logger)("[Turnstile][LoginPopup] Auto-retrying with settled token",{attempt:N.current}),X.Z({category:"turnstile",message:`[Turnstile] Auto-retry submitting (attempt ${N.current} of 2)`,level:"info",data:{retryAttempt:N.current,email:G.current}}),B({variables:{email:G.current,cfTurnstileToken:e,hashCode:M.current}});return}A(e),(0,eA.logger)("[Turnstile][LoginPopup] Token settled and committed after PAT window.")}},1500)},onError:()=>{X.Z({category:"turnstile",message:"[Turnstile][LoginPopup] Widget error — clearing token and resetting widget.",level:"warning"}),(0,eA.logger)("[Turnstile][LoginPopup] Widget error — clearing token and resetting widget."),w.current&&(clearTimeout(w.current),w.current=null),v.current=null,A(void 0),b.current=0,C(e=>e+1),setTimeout(()=>{E.current?.reset()},2e3)},onExpire:()=>{X.Z({category:"turnstile",message:"[Turnstile][LoginPopup] Token expired — clearing and resetting widget.",level:"info"}),(0,eA.logger)("[Turnstile][LoginPopup] Token expired — clearing and resetting widget."),w.current&&(clearTimeout(w.current),w.current=null),v.current=null,b.current=0,A(void 0),E.current?.reset()}})}),k>0&&!y&&(0,n.jsx)(d.A,{variant:"body2",color:"text.secondary",textAlign:"center",mt:1,children:"Security check is having trouble loading. Please wait a moment — it will retry automatically."}),(0,n.jsx)(Q.Rs,{color:"secondary",variant:"contained",disabled:Z,onClick:()=>{if(!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(x))return void f(!0);if(X.Z({category:"turnstile",message:`[Turnstile][LoginPopup] signInClicked — captchaToken present:${!!y} | email:${x}`,level:"info"}),(0,eA.logger)(`[Turnstile][LoginPopup] signInClicked — captchaToken present:${!!y} | email:${x}`),!y){X.Z({category:"turnstile",message:"[Turnstile][LoginPopup] RACE CONDITION — captchaToken is undefined at click time. Aborting.",level:"warning"}),(0,eA.logger)("[Turnstile][LoginPopup] RACE CONDITION — captchaToken is undefined at click time. Aborting to prevent invalid-input-response.");return}let e=Date.now()-b.current;if(e>24e4){(0,eA.logger)(`[Turnstile][LoginPopup] Token too old (${Math.round(e/1e3)}s) — resetting widget before submit.`),A(void 0),b.current=0,E.current?.reset();return}let t=(0,Y.ls)();T(t),G.current=x,M.current=t,N.current=0,B({variables:{email:x,cfTurnstileToken:y,hashCode:t}}),S?localStorage.setItem("savedEmail",x):localStorage.removeItem("savedEmail")},size:"large",sx:{height:56,mt:3},children:W?(0,n.jsx)(en.A,{}):H?(0,n.jsx)(er.A,{}):eo(e===Y.Gb.LOG_IN?"login":"sign_up")}),m&&(0,n.jsxs)(c.A,{mt:2,sx:{backgroundColor:z.palette.error.dark,borderRadius:"8px",padding:"12px",justifyContent:"center"},children:[(0,n.jsx)(d.A,{variant:"body2",color:"error",children:eo("invalid_email")}),(0,n.jsx)(d.A,{variant:"label",color:"error",children:eo("invalid_email_des")})]})]}),H&&(0,n.jsx)(ev,{hashCode:_,emailAddress:x,onClose:t,setShowPlansModal:i,verificationType:P})]})},ek=(0,o.Ay)(i.A)`
  display: flex;
  backdrop-filter: blur(4px);
`,eC=(0,o.Ay)(a.A)(({theme:e})=>`
    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: ${e.palette.modal.background};
    border: 1px solid ${e.palette.alpha.twelevepercent};
    border-radius: ${e.spacing(6)};
    height: max-content;
    margin: auto;
    position: relative;
    width: 918px;
    height: 700px;
    overflow: hidden;
    ${e.breakpoints.down("md")} {
      max-width: 425px;
       height: 550px;
      width: calc(100% - ${e.spacing(3)});
      padding: ${e.spacing(1.5)} ${e.spacing(2)};
    }
  `),e_=function({onClose:e,loginType:t=Y.Gb.LOG_IN,email:r,...o}){let[i,g]=(0,u.useState)(!1),[m,f]=(0,u.useState)(!1),y=(0,s.A)(),A=(0,l.A)(y.breakpoints.down("md")),b=(0,h.c)("Login.LoginPopup");return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(ek,{onClose:()=>{e?.()},...o,children:(0,n.jsxs)(eC,{alignSelf:"center",children:[!A&&(0,n.jsx)(c.A,{direction:"row",alignItems:"center",justifyContent:"center",position:"relative",flex:1,children:(0,n.jsx)(a.A,{position:"absolute",top:0,left:0,sx:{borderRadius:"30px",width:"100%",height:"100%",overflow:"hidden"},children:(0,n.jsx)(x.A,{src:"/images/login_modal_image.jpeg",alt:"login-popup-bg",layout:"fill",objectFit:"cover"})})}),(0,n.jsxs)(a.A,{display:"flex",flexDirection:"column",position:"relative",flex:1,py:A?2:10,px:A?2:6,children:[(0,n.jsx)(ew,{loginType:Y.Gb.LOG_IN,onClose:e,setSucess:g,email:r,setShowPlansModal:f}),(0,n.jsxs)(a.A,{position:"absolute",pr:A?2:7,pb:2*!A,bottom:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",children:[(0,n.jsx)(p.A,{sx:{fontSize:20,color:"text.secondary",mr:1}}),(0,n.jsx)(d.A,{variant:"label",color:"text.secondary",children:b("support_email")})]})]})]})}),m&&(0,n.jsx)(ek,{open:m,onClose:()=>{f(!1),window.location.reload()},children:(0,n.jsx)(Z,{})})]})}},844624:(e,t,r)=>{"use strict";function n(e){return e.length<=2?e:e?.split("_").map(e=>e.charAt(0).toUpperCase().concat(e.slice(1).toLowerCase())).join(" ").split(/(?=[A-Z])/).join(" ")}r.d(t,{A:()=>n})}}]);