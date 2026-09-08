URL: https://picktheodds.app/_next/static/chunks/7160-56e30eb4ca88f9c3.js\nSTATUS: 200\n\n!function(){try{var e="u">typeof window?window:"u">typeof global?global:"u">typeof globalThis?globalThis:"u">typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="78c61e84-7995-4a20-90bf-847811779a96",e._sentryDebugIdIdentifier="sentry-dbid-78c61e84-7995-4a20-90bf-847811779a96")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7160],{9098:(e,t,a)=>{a.d(t,{A:()=>o});var i=a(695155);a(212115);var r=a(904071),n=a(48022),l=a(450910);let o=function({text:e,typographyProps:t,...a}){let o=(0,l.c)("words");return(0,i.jsx)(r.A,{justifyContent:"center",alignItems:"center",display:"flex",height:"50vh",...a,children:(0,i.jsx)(n.A,{variant:"h1",...t,children:e||o("searching")})})}},33970:(e,t,a)=>{a.d(t,{Ay:()=>s,MV:()=>d,Tx:()=>l});var i,r=a(695155),n=a(212115),l=((i={}).PLAY_BY_PLAY="PLAY_BY_PLAY",i.BOX_SCORE="BOX_SCORE",i);let o=n.createContext(void 0),s=o;function d(e){let{children:t}=e,[a,i]=(0,n.useState)(),[l,s]=(0,n.useState)(),[d,c]=(0,n.useState)(!1),[p,m]=(0,n.useState)("BOX_SCORE"),[h,u]=(0,n.useState)(),x=(0,n.useCallback)(()=>{c(e=>!e)},[]),y=(0,n.useMemo)(()=>({toggleType:p,setToggleType:m,selectedTeam:h,setSelectedTeam:u,isOpen:d,setIsOpen:c,toggleisOpen:x,game:a,setGame:i,league:l,setLeague:s}),[p,h,d,x,a,l]);return(0,r.jsx)(o.Provider,{value:y,children:t})}},39174:(e,t,a)=>{a.d(t,{Y:()=>n});var i=a(212115),r=a(721422);function n(e,t){(0,i.useEffect)(()=>(0,r.i)((a,i)=>{e(e=>{if(!a)return e.filter(e=>e.trackerId!==i);let r=e.findIndex(e=>e.trackerId===i);if(-1===r)return t?[...e,a]:e;let n=[...e];return n[r]=a,n})}),[e,t])}},115559:(e,t,a)=>{a.d(t,{$i:()=>c,B3:()=>u,CN:()=>h,FW:()=>p,Kz:()=>d,Me:()=>m,S6:()=>l,_i:()=>s,mo:()=>o});var i,r=a(716763),n=a(672394);let l=(0,r.J1)`
  query GetBetMarketListingHistory(
    $betMarketHashCode: Int!
    $gameId: Guid!
    $league: LeagueEnum!
    $betSites: [BetMarketSiteEnumTypeTwo]
  ) {
    betMarketListingHistory(betMarketHashCode: $betMarketHashCode, gameId: $gameId, league: $league, betSites: $betSites) {
      siteId
      odds {
        timeStamp
        americanOdds
        liquidity
      }
    }
  }
`,o=(e,t,a)=>{if(!a)return e.trim();let i=Math.min(100,Math.max(0,a));return(0,n.Ob)((0,n.e$)(e.trim(),i/100*(t?.2:.8)))},s="AVERAGE_KEY",d=10,c=10,p=(e,t)=>`${e}##${t}`,m=e=>e.split("##")[0],h=e=>e.split("##")?.[1];var u=((i={}).FIFTEEN_MIN="15min",i.ONE_HOUR="1hr",i.TWENTY_FOUR_HOUR="24hr",i.ALL_TIME="all",i.LIVE="live",i)},154566:(e,t,a)=>{a.d(t,{A:()=>s});var i=a(695155),r=a(212115),n=a(423689),l=a(33970);let o=[n.i.label,{maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",display:"block",lineHeight:"22px"}],s=function(e){let{game:t}=e,{selectedTeam:a,setSelectedTeam:s}=(0,r.useContext)(l.Ay),d=[t.homeTeam.id,t.awayTeam.id],c=[{title:t.homeTeam.name,value:String(t.homeTeam.id)},{title:t.awayTeam.name,value:String(t.awayTeam.id)}];return(0,i.jsx)(n.A,{current:d.indexOf(a??-1),handleChange:e=>s(d[e]),labels:c,boxSx:n.i.box,sx:o,activeSx:n.i.active})}},156523:(e,t,a)=>{a.d(t,{A:()=>n});var i=a(695155);a(212115);var r=a(642772);let n=function(e){return(0,i.jsx)(r.A,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 86 62",...e,children:(0,i.jsx)("g",{transform:"translate(0,62) scale(0.1,-0.1)",fill:"grey",stroke:"none",children:(0,i.jsx)("path",{d:"M33 610 c-32 -13 -35 -43 -31 -327 2 -190 6 -255 16 -265 19 -19 805 -19 824 0 19 19 19 565 0 584 -10 10 -98 13 -400 15 -213 1 -397 -2 -409 -7z m367 -102 c0 -51 -2 -54 -37 -73 -100 -54 -100 -196 0 -250 35 -19 37 -22 37 -72 l0 -53 -170 0 c-144 0 -170 2 -170 15 0 8 7 15 15 15 9 0 32 9 53 19 140 72 168 258 55 362 -32 30 -85 59 -108 59 -8 0 -15 7 -15 15 0 13 26 15 170 15 l170 0 0 -52z m400 37 c0 -8 -7 -15 -15 -15 -23 0 -76 -29 -108 -59 -113 -104 -85 -290 55 -362 21 -10 44 -19 53 -19 8 0 15 -7 15 -15 0 -13 -26 -15 -170 -15 l-170 0 0 53 c0 50 2 53 37 72 100 54 100 196 0 250 -35 19 -37 22 -37 73 l0 52 170 0 c144 0 170 -2 170 -15z m-679 -88 c55 -37 79 -81 79 -147 0 -66 -24 -110 -79 -147 -61 -41 -61 -41 -61 147 0 188 0 188 61 147z m679 -147 c0 -188 0 -188 -61 -147 -55 37 -79 81 -79 147 0 66 24 110 79 147 61 41 61 41 61 -147z m-402 -47 l-3 -48 -27 27 c-22 21 -28 37 -28 68 0 31 6 47 28 68 l27 27 3 -47 c2 -27 2 -69 0 -95z m112 97 c23 -43 8 -110 -30 -130 -19 -10 -20 -7 -20 80 0 87 1 90 20 80 11 -6 24 -19 30 -30z"})})})}},156803:(e,t,a)=>{a.d(t,{U:()=>n,w:()=>i});let i=`
  fragment IceHockeyLiveDataTypeFragment on IceHockeyLiveDataType {
    gameId
    additionalData
    period
    gameTimeSeconds
    homeTeamHasPossession
    awayTeamGoalsByPeriod
    homeTeamGoalsByPeriod
    awayTeamPenalityMinuteByPeriod
    homeTeamPenalityMinuteByPeriod
    awayTeamPenalityCountByPeriod
    homeTeamPenalityCountByPeriod
    awayTeamPenalityShotByPeriod
    homeTeamPenalityShotByPeriod
    awayTeamShootoutResultsByAttempt
    homeTeamShootoutResultsByAttempt
    awayTeamEmptyNet
    homeTeamEmptyNet
    awayTeamPenaltySeconds
    homeTeamPenaltySeconds
    isAtTimeout

    players {
      playerId
      position
      forward {
        goals
        assists
        points
        shots
        plusMinus
        faceOffWinPct
        hits
        timeOnIce
        penaltyMinutes
        shifts
      }
      goalie {
        saves
        shotsAgainst
        goalsAgainst
        savesPct
        timeOnIce
      }
    }
    
  }
`;var r,n=((r={}).FORWARD="FORWARD",r.DEFENSEMAN="DEFENSEMAN",r.GOALIE="GOALIE",r)},191057:(e,t,a)=>{a.d(t,{BM:()=>c,DV:()=>o,NM:()=>l,ib:()=>d,j7:()=>s,lL:()=>n});var i=a(421567),r=a(844624);let n=(e,t,a,i)=>{let n=e.names||[],l=n.find(e=>e.league===t)?.displayName;if(l)return l;let o=n.find(e=>e.sport===a)?.displayName;return o||n.find(e=>!e.sport&&!e.league)?.displayName||e.displayName||(i?(0,r.A)(i):(0,r.A)(""))},l=(e,t,a,r,l)=>{if(!t?.length)return[];let o=function(e){if(!e)return{};let t={};return e.forEach(e=>{t[e.value]=e}),t}(t),s=t.filter(t=>t.groupValue===e&&(a?.includes(t.value)??!1)),d={};return s.forEach(e=>{let[t]=(0,i.d6)(e.value,e.groupValue),a=t.toUpperCase();d[a]||(d[a]=[]),d[a].push(e)}),Object.entries(d).map(([e,t])=>{let a=t[0],i=a;if(a.parentValue&&a.parentValue!==a.value){let e=o[a.parentValue];e&&(i=e)}let s=i.menuName||n(i,r,l);return{enum:e,label:s,popular:t.some(e=>!!(e.isPopular||e.popularSports&&e.popularSports.includes(l)||e.popularLeagues&&e.popularLeagues.includes(r))),skipSubDefault:t.some(e=>{if(e.skipSubMarketDefault?.includes(l))return!0;if(e.parentValue&&e.parentValue!==e.value){let t=o[e.parentValue];if(t?.skipSubMarketDefault?.includes(l))return!0}return!1})}})},o=(e,t,a,i,r,n)=>{let o=l(t,a,i,r,n);return e.sort((e,t)=>{let a=o.find(t=>t.enum===e.enum),i=o.find(e=>e.enum===t.enum),r=a?.popular??!1,n=i?.popular??!1;if(r&&!n)return -1;if(!r&&n)return 1;let l=a?.label||e.displayName,s=i?.label||t.displayName;return l.localeCompare(s)})},s=(e,t)=>e,d=(e,t,a,i,r,n)=>{if(!t.length)return;let o=l(e,a,i,r,n);return t.find(e=>{let t=o.find(t=>t.enum===e);return t&&!t.skipSubDefault})||t[0]},c=(e,t,a)=>{if(!e?.length)return;let i=e.find(e=>{let i=t?.find(t=>t.value===e.full);return!i?.skipPeriodDefault?.includes(a)});return i?.full||e[0].full}},225838:(e,t,a)=>{a.d(t,{A:()=>F});var i=a(695155),r=a(212115),n=a(417594),l=a(247970),o=a(84249),s=a(944498),d=a(299129),c=a(904071),p=a(915987),m=a(672394),h=a(962811),u=a(770982),x=a(48022),y=a(27374),g=a(688611),f=a.n(g),A=a(3043),b=a(902583),w=a(873673),v=a(154566),T=a(444238),k=a(475204),j=a(33970),S=a(398059),B=a(810379);let C=(0,d.Ay)(c.A)(({theme:e})=>`
    display: flex;
    flex-direction: column;
    background-color: ${e.palette.modal.background};
    border: 1px solid ${e.palette.alpha.eightpercent};
    backdrop-filter: blur(24px);
    border-radius: 12px;
    overflow: hidden;
  `),I=(0,d.Ay)(p.A)(({theme:e})=>`
    width: 100%;
    flex-shrink: 0;
    background-color: ${(0,m.X4)(e.palette.customBackground.cardHeader,1)};
    border-bottom: 1px solid ${e.palette.alpha.eightpercent};
    padding: ${e.spacing(1.25,1.5,1.5)};
    gap: ${e.spacing(1.25)};
  `),P=function(e){let{open:t,handleClose:a,gameLiveData:s}=e,d=(0,l.A)(),m=(0,h.A)(d.breakpoints.down("md")),{game:g,league:P,toggleType:F}=(0,r.useContext)(j.Ay),D=(0,n.GV)(e=>g&&e.gameLiveDataReducer[g.id])||s,{selectedTeam:R}=(0,r.useContext)(j.Ay),H=(0,r.useMemo)(()=>D&&"players"in D?D.players?.map(e=>e.playerId):null,[D]);if(!g||!P||!D||!H?.length)return null;let L=m?`${(0,B.R7)(g.awayTeam)} @ ${(0,B.R7)(g.homeTeam)}`:`${g.awayTeam.name} @ ${g.homeTeam.name}`;return(0,i.jsx)(u.A,{open:t,onClose:a,sx:{outline:0,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,i.jsxs)(C,{sx:{outline:0,position:"relative",width:m?"100%":"min(920px, 92%)",height:m?"100%":"fit-content",maxHeight:m?"100%":"90%",minHeight:m?"100%":"50%",borderRadius:m?0:"12px"},children:[H?.length&&(0,i.jsx)(k.A,{playerIds:H,league:P}),(0,i.jsxs)(I,{direction:"column",children:[(0,i.jsxs)(p.A,{direction:"row",alignItems:"center",justifyContent:"space-between",gap:1,children:[(0,i.jsx)(x.A,{noWrap:!0,sx:{fontFamily:f().style.fontFamily,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",color:d.palette.text.secondary},children:L}),(0,i.jsx)(o.A,{disableRipple:!0,disableTouchRipple:!0,onClick:a,id:"icon-btn-modal-close",sx:{width:30,height:30,padding:0,flexShrink:0,backgroundColor:d.palette.alpha.sixpercent,border:`1px solid ${d.palette.alpha.eightpercent}`,borderRadius:"8px",color:d.palette.text.tertiary,"&:hover":{backgroundColor:d.palette.alpha.tenpercent,color:d.palette.text.primary}},children:(0,i.jsx)(A.A,{sx:{fontSize:12}})})]}),(0,i.jsx)(w.A,{}),(0,i.jsx)(y.A,{sx:{width:"100%"}}),(0,i.jsx)(b.A,{}),F===j.Tx.BOX_SCORE&&(0,i.jsx)(v.A,{game:g})]}),(0,i.jsxs)(p.A,{direction:"column",width:"100%",alignItems:"center",flex:1,minHeight:0,overflow:"hidden",children:[F===j.Tx.BOX_SCORE&&(0,i.jsx)(c.A,{sx:{width:"100%",flex:1,minHeight:0,p:1.5},children:(0,i.jsx)(T.A,{league:P,gameLiveData:D,teamId:R,sx:{height:"100%"}})}),F===j.Tx.PLAY_BY_PLAY&&(0,i.jsx)(S.A,{league:P,gameId:g.id,open:t,height:"100%",width:"100%",sx:{overflow:"auto"}})]})]})})},F=function({isModal:e,onClick:t,game:a,league:d,gameLiveData:c,...p}){let m=(0,l.A)(),[h,u]=(0,r.useState)(!1),{setIsOpen:x,setGame:y,setLeague:g,setSelectedTeam:f}=(0,r.useContext)(j.Ay),A=(0,r.useCallback)(()=>{u(!0)},[]),b=(0,r.useCallback)(()=>{y(void 0),g(void 0),u(!1)},[y,g]),w=(0,r.useCallback)(()=>{x(!0)},[x]),v=(0,n.GV)(e=>a&&e.gameLiveDataReducer[a.id])||c;return a&&d&&v&&"players"in v&&v.players?.length?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.A,{disableRipple:!0,disableTouchRipple:!0,onClick:()=>{y(a),g(d),f(a.homeTeam.id),e?A():w(),t?.()},children:(0,i.jsx)(s.A,{fontSize:"small",sx:{fill:m.palette.text.primary,fontSize:16}})}),e&&(0,i.jsx)(P,{open:h,handleClose:b,gameLiveData:v,...p})]}):null}},226872:(e,t,a)=>{a.d(t,{A:()=>u});var i=a(695155),r=a(299129),n=a(904071),l=a(962811),o=a(770982),s=a(84249);a(212115);var d=a(579847),c=a(3043),p=a(534151),m=a(115559);let h=(0,r.Ay)(n.A)(({theme:e})=>`
    display: flex;
    justify-content: center;
    flex-direction: column;
     background-color: ${e.palette.chartColor};
    border: 1px solid ${e.palette.text.tertiary};
    backdrop-filter: blur(8px);
    border-radius: 24px;
     ${e.breakpoints.down("md")} {
    border-radius: 0px;
  }
  `),u=function(e){let{open:t,handleClose:a,children:r,hideCloseButton:n}=e,u=(0,d.DP)(),x=(0,l.A)(u.breakpoints.down("md")),y=(0,p.sR)(e=>e.graphFilter.graphBackground),g=(0,m.mo)(u.palette.chartColor,"light"===u.palette.mode,y);return(0,i.jsx)(o.A,{open:t,onClose:a,sx:{outline:0,display:"flex",alignItems:"center",justifyContent:"center"},slotProps:{backdrop:{sx:{backgroundColor:"rgba(0, 0, 0, 0.6)",backdropFilter:"blur(1.5px)",WebkitBackdropFilter:"blur(1.5px)"}}},children:(0,i.jsxs)(h,{sx:{backgroundColor:g,width:x?"100%":"80%",height:x?"100%":"fit-content",maxHeight:x?"100%":"92%",minHeight:x?"100%":"50%",border:x?"none":`1px solid ${u.palette.alpha.twelevepercent}`,outline:0,boxShadow:24,px:x?1:2,pt:x?1.5:3,pb:x?1:1.5,overflowY:"auto",position:"relative",justifyContent:x?"start":void 0,"&::-webkit-scrollbar":{width:"4px",height:"4px"},"&::-webkit-scrollbar-track":{background:"#1D2F41",borderRadius:u.borderRadius(1)},"&::-webkit-scrollbar-thumb":{background:u.palette.border.primary,borderRadius:u.borderRadius(1)}},children:[!(n&&!x)&&(0,i.jsx)(s.A,{disableRipple:!0,disableTouchRipple:!0,onClick:a,id:"icon-btn-modal-close",sx:{position:"absolute",top:x?"5px":u.spacing(1.5),right:x?u.spacing(1):u.spacing(1.5),p:0,zIndex:u.zIndex.tooltip,backgroundColor:u.palette.alpha.sixpercent,borderRadius:"8px",padding:u.spacing(1)},children:(0,i.jsx)(c.A,{sx:{fontSize:12}})}),r]})})}},286697:(e,t,a)=>{a.d(t,{A:()=>d});var i=a(212115),r=a(199807),n=a(417594),l=a(817681),o=a(368341),s=a(288410);let d=function(e){let t=(0,n.GV)(e=>e.gameDataCacheReducer.gameData),a=(0,r.m)(),d=(0,i.useRef)({}),[c,p]=(0,i.useState)({}),[m,h]=(0,i.useState)({}),u=(0,i.useMemo)(()=>{let a=new Set;return Object.values(t).forEach(t=>{t?.leagueEnum===e&&Array.isArray(t.betMarkets)&&t.betMarkets.forEach(e=>a.add(e))}),a.size?Array.from(a):void 0},[t,e]),x=m[e]||"idle",y=(0,i.useCallback)(async()=>{if(!d.current[e]){d.current[e]=!0,h(t=>({...t,[e]:"loading"}));try{let t=Math.floor(Date.now()/1e3),i=e===l.w.NCAAF?5:1,[r,n]=await Promise.all([a.query({query:s.Y,variables:{league:e,request:{take:i,orderBy:s.dX.DESC,beforeDateTime:t}},fetchPolicy:"no-cache"}),a.query({query:s.Y,variables:{league:e,request:{take:i,orderBy:s.dX.ASC,afterDateTime:t}},fetchPolicy:"no-cache"})]),o=r.data?.games||[],d=n.data?.games||[],c=o[0],m=new Set;if(c?.id)try{let t=await a.query({query:s.b,variables:{league:e,gameId:c.id},fetchPolicy:"no-cache"});(t.data?.completedBetMarkets||[]).forEach(e=>m.add(e))}catch{}[...o,...d].forEach(e=>{(e?.betMarkets||[]).forEach(e=>m.add(e))}),m.size&&p(t=>({...t,[e]:Array.from(m)}))}catch{}finally{h(t=>({...t,[e]:"done"}))}}},[a,e]);(0,i.useEffect)(()=>{let e=!1;return(null==u||0===u.length)&&"idle"===x&&Promise.resolve().then(()=>{e||y()}),()=>{e=!0}},[u,x,y]);let g=(0,i.useMemo)(()=>{let t=new Set(c[e]||[]);return u&&u.forEach(e=>t.add(e)),t.size?Array.from(t):void 0},[u,c,e]);return(0,i.useMemo)(()=>{if(!g||0===g.length){if("done"!==x)return;return[o.v.MONEY_LINE]}return g},[g,x])}},291568:(e,t,a)=>{a.d(t,{DD:()=>L,Hj:()=>f,Pn:()=>B,QQ:()=>P,T:()=>u,T0:()=>D,Xj:()=>F,cS:()=>j,dj:()=>R,hc:()=>y,j1:()=>k,js:()=>H,nA:()=>v,pA:()=>I,pT:()=>W,rT:()=>w,uk:()=>T,wk:()=>h,yD:()=>S,yK:()=>g});var i=a(695155),r=a(299129),n=a(429277),l=a(48022),o=a(387849),s=a(915987),d=a(904071),c=a(84249),p=a(175909),m=a(212115);let h=e=>`calc(${e}px * var(--odds-font-scale, 1))`,u="calc(var(--odds-odds-font-base, 14px) * var(--odds-font-scale, 1))",x={noHold:{twoWay:83,threeWay:123},hold:{twoWay:83,threeWay:123}},y=127,g=(0,r.Ay)(n.A,{shouldForwardProp:e=>"index"!==e})(e=>({display:"flex",flexDirection:"row",backgroundColor:e.theme.palette.customBackground.cards,width:"fit-content",minWidth:"100%",flexGrow:1,borderBottom:`1px solid ${e.theme.palette.alpha.sixpercent}`})),f=(0,r.Ay)(g,{shouldForwardProp:e=>"index"!==e&&"is3Way"!==e&&"showHoldForSportsBook"!==e&&"isCompleted"!==e})(e=>{var t,a;let i;return{background:(i=void 0!==e.index&&e.index%2==0,e.isCompleted?i?e.theme.palette.olderGame.lighter:e.theme.palette.olderGame.darker:i?e.theme.palette.primary.main:e.theme.palette.customBackground.cards),height:`${t=!!e.showHoldForSportsBook,a=!!e.is3Way,x[t?"hold":"noHold"][a?"threeWay":"twoWay"]}px`,flexGrow:1,borderBottom:`1px solid ${e.theme.palette.alpha.sixpercent}`,position:"relative","&:hover":{"&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:e.theme.palette.alpha.tenpercent,pointerEvents:"none",zIndex:10}}}}),A=(0,m.forwardRef)((e,t)=>(0,i.jsx)(n.A,{...e,ref:t})),b=p.P.create(A);(0,r.Ay)(b,{shouldForwardProp:e=>"index"!==e&&"is3Way"!==e&&"showHoldForSportsBook"!==e&&"sticky"!==e})(e=>({display:"flex",flexDirection:"row",background:void 0!==e.index&&e.index%2==0?e.theme.palette.primary.main:e.theme.palette.customBackground.cards,overflow:"visible",flexGrow:1,borderBottom:`1px solid ${e.theme.palette.divider}`}));let w=(0,r.Ay)(l.A)(e=>({fontSize:e.theme.typography.body2.fontSize,fontWeight:400,lineHeight:"24px",textAlign:"center",width:"100%",textOverflow:"ellipsis",color:e.theme.palette.text.secondary,textTransform:"uppercase"})),v=(0,r.Ay)(o.A,{shouldForwardProp:e=>"left"!==e&&"justifyContent"!==e})(e=>({justifyContent:e.justifyContent,display:"flex",background:"inherit",flexDirection:"column",alignItems:"center",position:"relative",padding:e.theme.spacing(1),gap:e.theme.spacing(1.5),overflow:"visible",textOverflow:"ellipsis",width:93,flexGrow:1,borderBottom:"none",borderRight:`1px solid ${e.theme.palette.alpha.sixpercent}`,[e.theme.breakpoints.up("sm")]:{width:93}})),T=(0,r.Ay)(s.A,{shouldForwardProp:e=>"index"!==e&&"isCompleted"!==e})(e=>{let t;return{flexDirection:"column",background:(t=void 0!==e.index&&e.index%2==0,e.isCompleted?t?"#111318":"#08090C":t?e.theme.palette.primary.main:e.theme.palette.customBackground.cards),width:"fit-content",minWidth:"100%",flexGrow:1}}),k=(0,r.Ay)(d.A,{shouldForwardProp:e=>"index"!==e})(e=>({display:"flex",flexDirection:"row",alignItems:"center",position:"relative",background:void 0!==e.index&&e.index%2==0?e.theme.palette.customBackground.cards:e.theme.palette.primary.main,borderBottom:`1px solid ${e.theme.palette.alpha.sixpercent}`})),j=(0,r.Ay)(d.A,{shouldForwardProp:e=>"isMiddle"!==e&&"showHoldForSportsBook"!==e&&"noBorder"!==e})(e=>({display:"flex",flexDirection:"column",alignItems:"center",padding:e.theme.spacing(1),gap:e.theme.spacing(1.5),overflow:"visible",textOverflow:"ellipsis",flexGrow:+!e.isMiddle,width:e.isMiddle?55:void 0,fontSize:e.theme.typography.body2.fontSize,borderRight:e.noBorder?"none":`1px solid ${e.theme.palette.alpha.sixpercent}`}));(0,r.Ay)(d.A)(({theme:e})=>({display:"flex",position:"relative",flexDirection:"column",alignItems:"center",padding:e.spacing(1),overflow:"hidden",textOverflow:"ellipsis",width:93,backgroundColor:"inherit",borderRight:`1px solid ${e.palette.alpha.sixpercent}`,[e.breakpoints.up("sm")]:{position:"sticky",left:160,top:0,zIndex:1,width:130}})),(0,r.Ay)(v)(e=>({width:124,flexDirection:"row",alignItems:"center",justifyItems:"center",gap:e.theme.spacing(0),[e.theme.breakpoints.up("sm")]:{width:124}})),(0,r.Ay)(v)(e=>({width:73,justifyContent:"center",[e.theme.breakpoints.up("sm")]:{width:93}}));let S=(0,r.Ay)(v)(e=>({width:"83px",minWidth:"83px",justifyContent:"center"}));(0,r.Ay)(v)(e=>({width:77,[e.theme.breakpoints.up("sm")]:{width:93},alignItems:"center",justifyContent:"center",textAlign:"center"}));let B=(0,r.Ay)(v,{shouldForwardProp:e=>"hasTeamColor"!==e})(e=>({width:93,position:"sticky",zIndex:1,left:0,cursor:"pointer",justifyContent:"center",backdropFilter:e.hasTeamColor?"blur(4px)":"none",WebkitBackdropFilter:e.hasTeamColor?"blur(4px)":"none",[e.theme.breakpoints.up("sm")]:{width:e.width||160,paddingLeft:15}}));(0,r.Ay)(v,{shouldForwardProp:e=>"hasTeamColor"!==e})(e=>({width:"fit-content",position:"sticky",zIndex:1,left:0,cursor:"pointer",justifyContent:"center",display:"flex",flexDirection:"row",backdropFilter:e.hasTeamColor?"blur(4px)":"none",WebkitBackdropFilter:e.hasTeamColor?"blur(4px)":"none",[e.theme.breakpoints.up("sm")]:{width:e.width||500,paddingLeft:15}})),(0,r.Ay)(v,{shouldForwardProp:e=>"hasTeamColor"!==e})(e=>({position:"sticky",zIndex:1,left:0,width:109,cursor:"pointer",backgroundColor:"inherit",backdropFilter:e.hasTeamColor?"blur(4px)":"none",WebkitBackdropFilter:e.hasTeamColor?"blur(4px)":"none",[e.theme.breakpoints.up("sm")]:{width:e.width||176,paddingLeft:15},alignItems:"center",justifyContent:"center",textAlign:"center"}));let C=(0,r.Ay)(v,{shouldForwardProp:e=>"hasSelectorColumn"!==e&&"betView"!==e&&"hasTeamColor"!==e})(e=>({width:e.betView?130:110,justifyContent:"center",[e.theme.breakpoints.up("sm")]:{width:e.betView?130:110,left:(()=>{if(e.left)return e.left;let t=!1!==e.hasSelectorColumn;return e.betView,t?383:290})(),position:"sticky",zIndex:1},backdropFilter:e.hasTeamColor?"blur(4px)":"none",WebkitBackdropFilter:e.hasTeamColor?"blur(4px)":"none"})),I=(0,r.Ay)(C)(e=>({flexDirection:"row",gap:e.theme.spacing(0),cursor:"pointer"})),P=(0,r.Ay)(s.A)(e=>({flexDirection:"column",minHeight:"100%",alignItems:"center",justifyContent:"center"})),F=(0,r.Ay)(v)(e=>({width:40,[e.theme.breakpoints.up("sm")]:{width:40}})),D=(0,r.Ay)(c.A)({width:24,height:24});function R(e,t){return!t||t<=20?e:t<=30?Number(e)-2:Number(e)-4}(0,r.Ay)(l.A)(e=>({width:77,height:24,borderRadius:e.theme.spacing(2),textAlign:"center",display:"flex",alignItems:"center",fontWeight:400,[e.theme.breakpoints.up("sm")]:{width:77}})),(0,r.Ay)(l.A,{shouldForwardProp:e=>"isMax"!==e})(e=>({position:"absolute",borderBottom:`1px solid ${e.isMax?e.theme.palette.profit:"transparent"}`,right:8,[e.theme.breakpoints.up("sm")]:{width:15}}));let H=(0,r.Ay)(l.A,{shouldForwardProp:e=>"length"!==e})(({length:e})=>({textOverflow:"ellipsis",display:"block",overflow:"hidden",whiteSpace:"nowrap",fontSize:R(14,e),textAlign:"left"})),L=(0,r.Ay)(d.A,{shouldForwardProp:e=>"showHighlight"!==e})(e=>({backgroundColor:e.showHighlight?e.theme.palette.alpha.tenpercent:"transparent",paddingLeft:e.theme.spacing(.5),paddingRight:e.theme.spacing(.5),borderRadius:e.theme.borderRadius(1),lineHeight:"1.1",width:"100%",textAlign:"start",display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"}));(0,r.Ay)(v)(e=>({backgroundColor:"inherit",width:"95px",justifyContent:"center",[e.theme.breakpoints.up("sm")]:{left:"290px",position:"sticky",zIndex:10}}));let W={border:"none !important",borderRadius:"5px",height:"45px !important",minWidth:0,width:"100% !important",padding:"2px 4px !important","&&":{backgroundColor:"var(--odds-selector-hover, transparent)"},"&.Mui-disabled":{opacity:1},"& .MuiTypography-root":{padding:"0 !important",margin:0,width:"auto !important",minWidth:"0 !important",display:"block"},"& .MuiSvgIcon-root":{fontSize:14,marginRight:0,marginLeft:"2px"}}},345904:(e,t,a)=>{a.d(t,{A:()=>i});let i={src:"/_next/static/media/P-Sad.40fc44a3.gif",height:500,width:500,blurWidth:0,blurHeight:0}},398059:(e,t,a)=>{a.d(t,{A:()=>U});var i=a(695155),r=a(403030),n=a(212115),l=a(48878),o=a(716763);let s=`
  fragment BasketballGameLivePlayByPlayTypeFragment on BasketballGameLivePlayByPlayType {
    gameId
    awayScore
    homeScore
    isAwayTeamBonus
    isHomeTeamBonus
    awayTimeoutsRemaining
    homeTimeoutsRemaining
    quarters {
      quarter
      description
      plays {
        clock 
        description 
        awayScore 
        homeScore 
        teamId 
      } 
    }
  }
`,d=`
  fragment FootBallGameLivePlayByPlayTypeFragment on FootballGameLivePlayByPlayType {
    gameId
    awayScore
    homeScore
    drives {
      teamId
      endingReason
      yards
      playYardString
      awayScore
      homeScore
      plays {
        period
        teamId
        location
        clock
        description
        yards
        startDateTime
        players {
          playerId
        }
        penalities {
          teamId
          playerId
          type
          outcome
          yards
          enforcementSpot
        }
      }
    }
  }
`,c=`
  fragment BaseballGameLivePlayByPlayTypeFragment on BaseballGameLivePlayByPlayType {
    gameId
    gameAwayScore: awayScore   
    gameHomeScore: homeScore    

    innings {
      number
      description
      inningAwayScore: awayScore  
      inningHomeScore: homeScore  
      isLive

      halfs {
        title
        isTopHalf
        halfAwayScore: awayScore   
        halfHomeScore: homeScore  

        events {
          title
          pitchCount
          hitterPlayerId
          balls
          strikes
          plays {
            title
            number
            type
            speed
          }
        }
      }
    }
  }
`,p=(0,o.J1)`
  subscription GetGameLivePlayByPlay($league: LeagueEnum!, $gameId: Guid!) {
    gameLivePlayByPlay(league: $league, gameId: $gameId) {
      ... on BasketballGameLivePlayByPlayType {
        ...BasketballGameLivePlayByPlayTypeFragment
      }
      ... on FootballGameLivePlayByPlayType {
        ...FootBallGameLivePlayByPlayTypeFragment
      }
      ... on BaseballGameLivePlayByPlayType {
        ...BaseballGameLivePlayByPlayTypeFragment
      }
    }
  }
  ${c}
  ${s}
  ${d}
`;function m(e,t){return t?.awayTeam.id===e?t.awayTeam.abbreviations.slice(0,4)||t.awayTeam.name.slice(0,3):t?.homeTeam.abbreviations.slice(0,4)||t?.homeTeam.name.slice(0,3)}var h=a(654079),u=a(417594),x=a(931246),y=a(247970),g=a(915987),f=a(48022),A=a(904071),b=a(811906),w=a(9098),v=a(189452),T=a(299129),k=a(678555),j=a(594610),S=a(417973),B=a(688611),C=a.n(B),I=a(58870),P=a.n(I);let F=(0,T.Ay)(v.A)(({theme:e,color:t})=>({color:t||e.palette.text.tertiary,backgroundColor:e.palette.alpha.sixpercent,padding:"3px",borderRadius:"5px",fontSize:"20px"})),D=(0,T.Ay)(g.A,{shouldForwardProp:e=>"header"!==e})(({theme:e,header:t})=>`
  border-bottom: ${t?void 0:`1px solid ${e.palette.alpha.sixpercent}`};
  padding: ${t?void 0:e.spacing(1,1.5)};
  gap: 10px;
  `),R=(0,T.Ay)(k.A)(()=>`
  background-color: inherit;
  background-image: unset;
  box-shadow: unset;
  margin: 0;

  &.Mui-expanded {
    margin: 0;
  }

  &.Mui-expanded::before {
    opacity: 1 !important;
  }
  `),H=(0,T.Ay)(j.A)(()=>`
    padding: 0;
  `),L=(0,T.Ay)(S.A,{shouldForwardProp:e=>"level"!==e})(({theme:e,level:t=1})=>`
    background-color: ${1===t?e.palette.customBackground.tableDateStrip:2===t?e.palette.alpha.sixpercent:e.palette.alpha.twopercent};
    border-bottom: 1px solid ${e.palette.alpha.eightpercent};
    max-height: 40px;
    min-height: 40px;
    padding: ${e.spacing(0,1)};

    &.Mui-expanded {
      min-height: 40px;
    }

    .MuiAccordionSummary-contentGutters {
      margin: 0;
      &.Mui-expanded {
        margin: 0;
      }
    }
  `),W={fontFamily:C().style.fontFamily,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px"},$={fontFamily:P().style.fontFamily,fontSize:10,fontWeight:500,color:"text.tertiary",width:42,flexShrink:0},E={fontFamily:C().style.fontFamily,fontSize:11,fontWeight:700,textTransform:"uppercase",color:"text.secondary",width:40,flexShrink:0},G={fontSize:12,lineHeight:1.35},M={fontFamily:P().style.fontFamily,fontSize:9.5,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.4px",color:"text.tertiary"},O={fontFamily:P().style.fontFamily,fontSize:11,fontWeight:600},_=function(e){let{data:t,gameId:a,...r}=e,l=(0,u.GV)(e=>e.gameDataCacheReducer.gameData[a]),o=(0,y.A)(),s=(0,n.useRef)(null),[d,c]=(0,n.useState)(!1),[p,h]=(0,n.useState)(null);(0,n.useEffect)(()=>{let e,a=t.quarters?.[0]?.plays?.[0],i=s.current?.quarters?.[0]?.plays?.[0],r=!1;return a&&i&&a.clock!==i.clock&&Promise.resolve().then(()=>{r||(h(a),c(!0),e=setTimeout(()=>{r||(c(!1),h(null))},500))}),s.current=t,()=>{r=!0,e&&clearTimeout(e)}},[t]);let v=l?.awayTeam.id?m(l.awayTeam.id,l):"",T=l?.homeTeam.id?m(l.homeTeam.id,l):"",k=(e,t,a)=>(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",justifyContent:"flex-end",minWidth:36,width:36,gap:"2px",children:[(0,i.jsx)(f.A,{sx:{...O,...a?{color:o.palette.profit,fontWeight:700}:{}},children:e}),t&&(0,i.jsx)(x.A,{sx:{fontSize:11,color:o.palette.profit}})]}),j=(e,t,a,r)=>(0,i.jsxs)(D,{direction:"row",alignItems:"center",children:[(0,i.jsx)(f.A,{sx:$,children:e.clock}),(0,i.jsx)(f.A,{sx:E,children:m(e.teamId,l)}),(0,i.jsx)(f.A,{sx:G,flexGrow:1,minWidth:0,children:e.description}),k(e.awayScore,t,t),k(e.homeScore,a,a)]},r);return t.quarters?.length?(0,i.jsxs)(g.A,{direction:"column",...r,children:[(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",justifyContent:"center",gap:1.5,py:.75,flexWrap:"wrap",children:[(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",gap:.75,children:[(0,i.jsx)(f.A,{sx:M,children:`${v} \xb7 TO LEFT ${t.awayTimeoutsRemaining??"-"}`}),t.isAwayTeamBonus&&(0,i.jsx)(f.A,{sx:{...M,color:o.palette.live.warningAccent},children:"BONUS"})]}),(0,i.jsx)(f.A,{sx:{...M,color:o.palette.text.disabled},children:"|"}),(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",gap:.75,children:[(0,i.jsx)(f.A,{sx:M,children:`${T} \xb7 TO LEFT ${t.homeTimeoutsRemaining??"-"}`}),t.isHomeTeamBonus&&(0,i.jsx)(f.A,{sx:{...M,color:o.palette.live.warningAccent},children:"BONUS"})]})]}),t.quarters?.map((e,t)=>(0,i.jsxs)(R,{defaultExpanded:0===t,children:[(0,i.jsx)(L,{expandIcon:(0,i.jsx)(F,{}),"aria-controls":"panel1-content",id:"panel1-header",children:(0,i.jsx)(D,{direction:"row",alignItems:"center",header:!0,flexGrow:1,pr:1,children:(0,i.jsx)(f.A,{sx:W,children:e.description||e.quarter||"Ongoing..."})})}),(0,i.jsxs)(H,{children:[(0,i.jsxs)(D,{direction:"row",alignItems:"center",sx:{py:.5},children:[(0,i.jsx)(A.A,{flexGrow:1}),(0,i.jsx)(f.A,{sx:{...M,minWidth:36,width:36,textAlign:"right"},children:v}),(0,i.jsx)(f.A,{sx:{...M,minWidth:36,width:36,textAlign:"right"},children:T})]}),d&&0===t&&p&&(0,i.jsx)(b.A,{direction:"right",in:d,mountOnEnter:!0,unmountOnExit:!0,timeout:500,children:(0,i.jsx)(A.A,{sx:{backgroundColor:o.palette.alpha.eightpercent},children:j(p,p.awayScore>(e?.plays?.[1]?.awayScore||0),p.homeScore>(e?.plays?.[1]?.homeScore||0),`new-play-${t}`)})}),e.plays?.map((e,a,i)=>{if(0===t&&0===a&&d&&p&&e.clock===p.clock)return null;let r=i[a+1],n=!!r&&!!e.awayScore&&e.awayScore>(r.awayScore||0),l=!!r&&!!e.homeScore&&e.homeScore>(r.homeScore||0);return j(e,n,l,`${a}-${t}`)})]})]},t))]}):(0,i.jsx)(w.A,{})};var z=a(672394),V=a(317389);let Y=function(e){let{data:t,gameId:a,...r}=e,l=(0,u.GV)(e=>e.gameDataCacheReducer.gameData[a]),o=(0,y.A)(),s=(0,n.useRef)(null),[d,c]=(0,n.useState)(!1),[p,h]=(0,n.useState)(null);(0,n.useEffect)(()=>{let e,a=t.drives?.[0]?.plays?.[0],i=s.current?.drives?.[0]?.plays?.[0],r=!1;return a&&i&&a.description!==i.description&&Promise.resolve().then(()=>{r||(h(a),c(!0),e=setTimeout(()=>{r||(c(!1),h(null))},2e3))}),s.current=t,()=>{r=!0,e&&clearTimeout(e)}},[t]);let x=(e,t)=>{let a=[e.period?`Q${e.period}`:"",e.location||"",null!=e.yards?`${e.yards>0?"+":""}${e.yards} YDS`:""].filter(Boolean);return(0,i.jsxs)(D,{direction:"row",alignItems:"flex-start",children:[(0,i.jsx)(f.A,{sx:{...$,pt:"2px"},children:e.clock}),(0,i.jsx)(f.A,{sx:{...E,pt:"1px"},children:m(e.teamId,l)}),(0,i.jsxs)(g.A,{direction:"column",flexGrow:1,minWidth:0,gap:"2px",children:[(0,i.jsx)(f.A,{sx:G,children:e.description}),a.length>0&&(0,i.jsx)(f.A,{sx:M,children:a.join(" \xb7 ")}),e.penalities?.map((e,t)=>(0,i.jsx)(f.A,{title:e.enforcementSpot||void 0,sx:{...M,alignSelf:"flex-start",color:o.palette.warning.main,backgroundColor:(0,z.X4)(o.palette.warning.main,.12),border:`1px solid ${(0,z.X4)(o.palette.warning.main,.25)}`,borderRadius:"3px",px:"5px",lineHeight:"15px"},children:["FLAG",e.type,null!=e.yards?`${e.yards} YDS`:"",e.outcome].filter(Boolean).join(" \xb7 ")},t))]})]},t)};return t.drives?.length?(0,i.jsx)(g.A,{direction:"column",...r,children:t.drives?.map((e,t,a)=>{let r=a[t+1],n=!!r&&!!e.awayScore&&e.awayScore>(r.awayScore||0),s=!!r&&!!e.homeScore&&e.homeScore>(r.homeScore||0);return(0,i.jsxs)(R,{defaultExpanded:0===t,children:[(0,i.jsx)(L,{expandIcon:(0,i.jsx)(F,{}),"aria-controls":"panel1-content",id:"panel1-header",children:(0,i.jsxs)(D,{direction:"row",alignItems:"center",header:!0,flexGrow:1,pr:1,children:[(0,i.jsxs)(g.A,{direction:"column",flexGrow:1,minWidth:0,gap:"1px",children:[(0,i.jsx)(f.A,{noWrap:!0,sx:W,children:e.endingReason||"Ongoing..."}),e.playYardString&&(0,i.jsx)(f.A,{noWrap:!0,sx:M,children:e.playYardString})]}),(0,i.jsxs)(g.A,{direction:"column",alignItems:"flex-end",minWidth:36,gap:"1px",children:[(0,i.jsx)(f.A,{sx:M,children:l?.awayTeam.id?m(l.awayTeam.id,l):""}),(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",gap:"2px",children:[(0,i.jsx)(f.A,{sx:{...O,...n?{color:o.palette.profit,fontWeight:700}:{}},children:e.awayScore??"-"}),n&&(0,i.jsx)(V.A,{sx:{fontSize:12,color:o.palette.profit}})]})]}),(0,i.jsxs)(g.A,{direction:"column",alignItems:"flex-end",minWidth:36,gap:"1px",children:[(0,i.jsx)(f.A,{sx:M,children:l?.homeTeam.id?m(l.homeTeam.id,l):""}),(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",gap:"2px",children:[(0,i.jsx)(f.A,{sx:{...O,...s?{color:o.palette.profit,fontWeight:700}:{}},children:e.homeScore??"-"}),s&&(0,i.jsx)(V.A,{sx:{fontSize:12,color:o.palette.profit}})]})]})]})}),(0,i.jsxs)(H,{children:[d&&0===t&&p&&(0,i.jsx)(b.A,{direction:"right",in:d,mountOnEnter:!0,unmountOnExit:!0,timeout:500,children:(0,i.jsx)(A.A,{sx:{backgroundColor:o.palette.alpha.eightpercent},children:x(p,`new-play-${t}`)})}),e.plays?.map((e,a)=>0===t&&0===a&&d&&p&&e.description===p.description?null:x(e,`${a}-${t}`))]})]},t)})}):(0,i.jsx)(w.A,{})};var N=a(936948),K=a(455943),q=a(690710);let Q=function(e){let{data:t,gameId:a,league:r,...l}=e,o=(0,u.GV)(e=>e.gameDataCacheReducer.gameData[a]),s=(0,u.GV)(e=>e.gameDataCacheReducer.playerData),d=(0,y.A)(),c=(0,n.useRef)(t),[p,m]=(0,n.useState)(!0),[h,x]=(0,n.useState)(null);(0,n.useEffect)(()=>{let e=!1;if(c.current.innings?.[0]?.number!==t.innings?.[0]?.number||c.current.innings?.[0]?.halfs?.[0]?.events?.[0]?.title!==t.innings?.[0]?.halfs?.[0]?.events?.[0]?.title){c.current=t;let a=t.innings?.[0]?.halfs?.[0]?.events?.[0]||null;Promise.resolve().then(()=>{e||(x(a),m(!1))})}return()=>{e=!0}},[t]),(0,n.useEffect)(()=>{let e;return p||(e=setTimeout(()=>{m(!0)},500)),()=>{e&&clearTimeout(e)}},[p]);let v=o?.awayTeam?.abbreviations?.[0]??"Away",T=o?.homeTeam?.abbreviations?.[0]??"Home",k=(e,t)=>(0,i.jsxs)(g.A,{direction:"row",alignItems:"center",gap:1.5,children:[(0,i.jsxs)(g.A,{alignItems:"flex-end",children:[(0,i.jsx)(f.A,{sx:M,children:v}),(0,i.jsx)(f.A,{sx:O,children:e})]}),(0,i.jsxs)(g.A,{alignItems:"flex-end",children:[(0,i.jsx)(f.A,{sx:M,children:T}),(0,i.jsx)(f.A,{sx:O,children:t})]})]}),j=e=>({width:5,height:5,borderRadius:"50%",backgroundColor:e?d.palette.text.primary:d.palette.alpha.twentyfourpercent}),S=(e,t,a)=>{let n=null!=e.hitterPlayerId?s[r]?.[e.hitterPlayerId]:void 0,l=n?(0,q.Ay)(n):"",o=(0,i.jsxs)(i.Fragment,{children:[null===e.pitchCount&&(0,i.jsx)(f.A,{sx:E,children:t}),(0,i.jsxs)(g.A,{direction:"column",flexGrow:1,minWidth:0,gap:"2px",children:[l&&(0,i.jsx)(f.A,{sx:{...M,color:d.palette.text.secondary},children:l}),(0,i.jsx)(f.A,{sx:G,dangerouslySetInnerHTML:{__html:e.title||""}}),null!=e.pitchCount&&(0,i.jsx)(f.A,{sx:M,children:`${e.pitchCount} PITCHES`})]}),null!=e.balls&&null!=e.strikes&&(0,i.jsxs)(g.A,{gap:"3px",flexShrink:0,mr:1,children:[(0,i.jsxs)(A.A,{display:"flex",flexDirection:"row",alignItems:"center",gap:.5,children:[(0,i.jsx)(f.A,{sx:{...M,minWidth:12},children:"B"}),Array.from({length:4}).map((t,a)=>(0,i.jsx)(A.A,{sx:j(a<e.balls)},`ball-${a}`))]}),(0,i.jsxs)(A.A,{display:"flex",alignItems:"center",gap:.5,children:[(0,i.jsx)(f.A,{sx:{...M,minWidth:12},children:"S"}),Array.from({length:3}).map((t,a)=>(0,i.jsx)(A.A,{sx:j(a<e.strikes)},`strike-${a}`))]})]})]});return e.plays?.length?(0,i.jsxs)(R,{children:[(0,i.jsx)(L,{expandIcon:(0,i.jsx)(F,{}),"aria-controls":`panel-plays-${a}-content`,id:`panel-plays-${a}-header`,level:3,sx:{borderBottom:`1px solid ${d.palette.alpha.sixpercent}`,maxHeight:"unset",minHeight:"unset","& .MuiAccordionSummary-content":{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px",width:"100%",m:0,py:1,pl:.5}},children:o}),(0,i.jsxs)(H,{children:[(0,i.jsxs)(D,{direction:"row",alignItems:"center",sx:{py:.5},children:[(0,i.jsx)(f.A,{sx:{...M,flex:1},children:"PITCH"}),(0,i.jsx)(f.A,{sx:{...M,flex:1,textAlign:"center"},children:"TYPE"}),(0,i.jsx)(f.A,{sx:{...M,flex:1,textAlign:"center"},children:"MPH"})]}),e.plays.map((e,t)=>(0,i.jsxs)(D,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,i.jsxs)(A.A,{sx:{flex:1,display:"flex",alignItems:"center",gap:1},children:[(0,i.jsx)(f.A,{sx:M,children:`#${e.number}`}),(0,i.jsx)(f.A,{sx:G,children:e.title})]}),(0,i.jsx)(f.A,{sx:{...G,flex:1,textAlign:"center"},children:e.type}),(0,i.jsx)(f.A,{sx:{...O,flex:1,textAlign:"center",fontWeight:500},children:e.speed})]},t))]})]},a):(0,i.jsx)(D,{direction:"row",alignItems:"center",width:"100%",children:o},a)};return t.innings?.length?(0,i.jsx)(g.A,{direction:"column",...l,children:t.innings.map((e,t)=>(0,i.jsxs)(R,{defaultExpanded:e.isLive,children:[(0,i.jsx)(L,{expandIcon:(0,i.jsx)(F,{}),"aria-controls":`panel-inning-${t}-content`,id:`panel-inning-${t}-header`,children:(0,i.jsxs)(D,{direction:"row",alignItems:"center",header:!0,width:"100%",justifyContent:"space-between",pl:1,pr:2,children:[(0,i.jsx)(f.A,{sx:W,children:e.description||` ${e.number} Inning`}),k(e.inningAwayScore,e.inningHomeScore)]})}),(0,i.jsx)(H,{children:e.halfs?.map((a,r)=>{var n,l,o;let s;return n=e.description,l=0===t,o=e.isLive,s=a.isTopHalf?v:T,(0,i.jsxs)(R,{defaultExpanded:o,children:[(0,i.jsx)(L,{expandIcon:(0,i.jsx)(F,{}),"aria-controls":`panel-half-${r}-content`,id:`panel-half-${r}-header`,level:2,children:(0,i.jsxs)(D,{direction:"row",alignItems:"center",header:!0,pl:1,pr:2,justifyContent:"space-between",width:"100%",children:[(0,i.jsxs)(g.A,{children:[(0,i.jsx)(f.A,{sx:W,children:a.title}),(0,i.jsx)(f.A,{sx:M,children:a.isTopHalf?`Top ${n.replace(/\s+Inning/i,"")}`:`Bottom ${n.replace(/\s+Inning/i,"")}`})]}),k(a.halfAwayScore,a.halfHomeScore)]})}),(0,i.jsxs)(H,{children:[l&&0===r&&!p&&h&&(0,i.jsx)(b.A,{direction:"right",in:!p,mountOnEnter:!0,unmountOnExit:!0,timeout:500,children:(0,i.jsx)(A.A,{sx:{backgroundColor:d.palette.alpha.eightpercent},children:S(h,s,"newest-event")})}),a.events?.map((e,t)=>l&&0===r&&0===t&&h&&e.title===h.title&&!p?null:S(e,s,t))]})]},r)})})]},t))}):(0,i.jsx)(w.A,{})};var X=a(938631);let U=function(e){let{league:t,gameId:a,open:o}=e,[s,d]=(0,n.useState)(!0),c=(0,n.useRef)(null),[m,u]=(0,n.useState)(0),x=(0,X.A)(),{data:y,loading:g,error:f,restart:A}=(0,r.R)(p,{variables:{league:t,gameId:a},skip:!o,onData:()=>{u(0)},onComplete:()=>{c.current&&clearTimeout(c.current),d(!0)},onError:e=>x(e,{league:t,gameId:a},A,u)});(0,n.useEffect)(()=>{c.current=setTimeout(()=>d(!1),3e3)},[]);let b={[h.c.BASKETBALL]:_,[h.c.FOOTBALL]:Y,[h.c.BASEBALL]:Q}[(0,l.A)(t)];return b?!s&&g?(0,i.jsx)(w.A,{text:"Sorry, There ia no Play by Play data for this game."}):g?(0,i.jsx)(K.A,{...e}):f?(0,i.jsx)(N.A,{message:f.message,consecutiveErrors:m,...e}):(0,i.jsx)(b,{data:y?.gameLivePlayByPlay,...e}):null}},421910:(e,t,a)=>{a.d(t,{$L:()=>b,Bs:()=>u,PC:()=>g,Z1:()=>x,cF:()=>y,m5:()=>f});var i=a(695155),r=a(212115),n=a(247970),l=a(904071),o=a(48022),s=a(672394),d=a(915987),c=a(688611),p=a.n(c),m=a(428722),h=a(291568);let u=(e,t=600)=>({fontSize:(0,h.wk)(e),fontWeight:t,lineHeight:1.35,textTransform:"uppercase",whiteSpace:"nowrap"});function x(e){let t=(0,n.A)();return({accent:t.palette.live.warningAccent,danger:t.palette.live.indicator,warning:t.palette.warning.main,neutral:t.palette.text.tertiary,success:t.palette.profit,info:t.palette.info.main})[e]||t.palette.text.primary}let y=/\b\d*OT\b|overtime|reg(?:ular|\.)?\s*time\s*over/i;function g({tag:e}){let t=(0,n.A)(),a=x(e.tone);return"card"===e.kind?(0,i.jsx)(l.A,{component:"span",title:e.title,sx:{width:6,height:8,borderRadius:"1.5px",backgroundColor:a,flex:"none"}}):"pigskin"===e.kind?(0,i.jsx)(l.A,{component:"span",title:e.title,sx:{width:9,height:6,borderRadius:"50%",backgroundColor:a,border:`1px solid ${t.palette.text.tertiary}`,boxSizing:"border-box",flex:"none"}}):(0,i.jsx)(l.A,{component:"span",title:e.title,sx:{width:5,height:5,borderRadius:"50%",backgroundColor:a,flex:"none"}})}function f({score:e,live:t,sx:a}){let r=(0,n.A)(),s=(0,m.E)(e,{live:!0===t});return void 0===e?null:(0,i.jsxs)(l.A,{component:"span",sx:{position:"relative",display:"inline-flex",flex:"none",mr:1},children:[(0,i.jsx)(o.A,{component:"span",sx:{...a,...s?{color:r.palette.profit}:{}},children:e}),s&&(0,i.jsx)(m.t,{flash:s})]})}function A({badge:e}){let t=x(e.tone),{persistent:a=!1}=e,[n,l]=r.useState(e.label);return(r.useEffect(()=>{let t=setTimeout(()=>l(e.label),0),i=a?void 0:setTimeout(()=>l(null),5e3);return()=>{clearTimeout(t),i&&clearTimeout(i)}},[e.label,a]),n!==e.label)?null:(0,i.jsx)(o.A,{noWrap:!0,title:e.title,sx:{fontFamily:p().style.fontFamily,fontWeight:700,fontSize:(0,h.wk)(9.5),textTransform:"uppercase",letterSpacing:"0.4px",color:t,backgroundColor:(0,s.X4)(t,.12),border:`1px solid ${(0,s.X4)(t,.25)}`,borderRadius:"3px",px:"5px",lineHeight:"15px",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis","@keyframes oddsBadgePulse":{"0%, 100%":{opacity:1},"50%":{opacity:.55}},animation:"oddsBadgePulse 1.6s ease-in-out 3"},children:e.label},e.label)}function b({line1:e,line1Color:t,line2:a,line2Title:r,line2Sx:l,badge:s}){let c=(0,n.A)();return(0,i.jsxs)(d.A,{alignItems:"center",justifyContent:"center",gap:"3px",sx:{minWidth:0},children:[(0,i.jsx)(o.A,{noWrap:!0,sx:{...u(11),color:t||c.palette.text.primary},children:e}),a&&(0,i.jsx)(o.A,{noWrap:!0,title:r,sx:{...u(10,500),color:c.palette.text.tertiary,...l},children:a}),s&&(0,i.jsx)(A,{badge:s})]})}},423689:(e,t,a)=>{a.d(t,{A:()=>m,i:()=>d});var i=a(695155),r=a(212115),n=a(299129),l=a(48022),o=a(904071),s=a(27374);let d={box:e=>({height:30,borderRadius:"8px",background:e.palette.alpha.sixpercent,border:"none",padding:"3px",gap:"3px",margin:0}),label:{fontSize:11,lineHeight:1,display:"flex",alignItems:"center",padding:"4px 10px",borderRadius:"5px",color:"text.tertiary",whiteSpace:"nowrap"},active:{fontWeight:700}},c=(0,n.Ay)(l.A,{shouldForwardProp:e=>"isActive"!==e})(({theme:e,isActive:t})=>({color:t?e.palette.secondary.contrastText:e.palette.text.secondary,backgroundColor:t?e.palette.secondary.main:"transparent",cursor:"pointer",padding:e.spacing(.5,2),borderRadius:"5px"})),p=(0,n.Ay)(o.A)(({theme:e})=>({display:"flex",flexDirection:"row",textAlign:"center",borderRadius:"8px",background:e.palette.alpha.twopercent,border:`1px solid ${e.palette.alpha.fourpercent}`,margin:"0 auto",textWrap:"nowrap",padding:e.spacing(.3),[e.breakpoints.down("md")]:{position:"sticky",top:0}})),m=function({current:e,handleChange:t,labels:a,sx:n,boxSx:l,activeSx:o}){let d=-1!==e;return(0,i.jsx)(p,{justifyContent:"center",sx:l,children:a.map((l,p)=>(0,i.jsxs)(r.Fragment,{children:[(0,i.jsx)(c,{variant:"label",onClick:e=>{e.stopPropagation(),t(p,l.value)},isActive:e===p,sx:e===p&&o?[n,o]:n,children:l.title}),!d&&p<a.length-1&&(0,i.jsx)(s.A,{orientation:"vertical",flexItem:!0})]},l.value))})}},444238:(e,t,a)=>{a.d(t,{A:()=>N});var i=a(695155),r=a(212115),n=a(48878),l=a(654079),o=a(388061),s=a(915987),d=a(128183),c=a(497053),p=a(450910),m=a(417594),h=a(690710),u=a(299129),x=a(429277),y=a(288750),g=a(905629),f=a(387849),A=a(672394),b=a(58870),w=a.n(b);let v=(0,u.Ay)(x.A,{shouldForwardProp:e=>"index"!==e})(()=>({height:40,position:"relative"})),T=(0,u.Ay)(y.A)(()=>({position:"sticky",top:0,zIndex:5})),k=(0,u.Ay)(g.A)(e=>({borderRadius:"8px",border:`1px solid ${e.theme.palette.alpha.eightpercent}`,height:"100%",maxHeight:"100vh",marginBottom:"auto"})),j=(0,u.Ay)(f.A)(e=>({textAlign:"center",fontFamily:w().style.fontFamily,fontSize:12,fontWeight:500,padding:"0 8px",borderBottom:`1px solid ${e.theme.palette.alpha.sixpercent}`})),S=(0,u.Ay)(j)(e=>({fontWeight:600,textTransform:"uppercase",fontSize:10,letterSpacing:"0.6px",color:e.theme.palette.text.secondary,backgroundColor:(0,A.X4)(e.theme.palette.customBackground.cardHeader,1),height:34})),B=(0,u.Ay)(S)(()=>({position:"sticky",left:0,zIndex:3,textAlign:"left",minWidth:128,maxWidth:128,width:128})),C=(0,u.Ay)(f.A)(e=>({position:"sticky",left:0,zIndex:1,textAlign:"left",minWidth:128,maxWidth:128,width:128,padding:"0 8px",backgroundColor:(0,A.X4)(e.theme.palette.customBackground.cards,1),borderBottom:`1px solid ${e.theme.palette.alpha.sixpercent}`,borderRight:`1px solid ${e.theme.palette.alpha.eightpercent}`,"& .MuiTypography-root":{fontSize:12.5,fontWeight:500}}));var I=a(156523),P=a(132927),F=a(9098),D=a(455943);let R=[{key:"minute_played",title:"MIN",minWidth:44,value:e=>e.minutePlayed},{key:"points",title:"PTS",minWidth:44,value:e=>e.points},{key:"field_goal_ma",title:"FG",minWidth:54,value:e=>`${e.fieldGoalMade}-${e.fieldGoalAttempted}`},{key:"three_pointer_ma",title:"3PT",minWidth:54,value:e=>`${e.threePointersMade}-${e.threePointersAttempted}`},{key:"free_throws_ma",title:"FT",minWidth:54,value:e=>`${e.freeThrowsMade}-${e.freeThrowsAttempted}`},{key:"rebounds",title:"REB",minWidth:40,value:e=>e.rebounds},{key:"assists",title:"AST",minWidth:40,value:e=>e.assists},{key:"steals",title:"STL",minWidth:40,value:e=>e.steals},{key:"blocks",title:"BLK",minWidth:40,value:e=>e.blocks},{key:"turnovers",title:"TO",minWidth:40,value:e=>e.turnovers},{key:"personal_fouls",title:"PF",minWidth:40,value:e=>e.personalFouls}],H=function(e){let{gameLiveData:t,league:a,teamId:n,...l}=e,u=(0,m.GV)(e=>e.gameDataCacheReducer.playerData),x=(0,p.c)("box_score"),y=(0,p.c)("box_score.BasketBallBoxScore"),g=(0,r.useMemo)(()=>t.players?.filter(e=>{let t=u[a]?.[e.playerId];return e.isStarter&&t&&(!n||t?.lastGameTeamId===n)}),[t.players,a,u,n]),f=(0,r.useMemo)(()=>t.players?.filter(e=>{let t=u[a]?.[e.playerId];return!e.isStarter&&t&&(!n||t?.lastGameTeamId===n)}),[t.players,a,u,n]),A=(0,r.useCallback)(e=>(0,i.jsx)(T,{children:(0,i.jsxs)(v,{children:[(0,i.jsx)(B,{children:e?y("starters"):y("bench")}),R.map(e=>(0,i.jsx)(o.A,{title:y(e.key),children:(0,i.jsx)(S,{style:{minWidth:e.minWidth},children:e.title})},e.key))]})}),[y]),b=(0,r.useCallback)((e,t,a)=>(0,i.jsxs)(v,{tabIndex:-1,index:a,children:[(0,i.jsx)(C,{children:(0,i.jsxs)(s.A,{direction:"row",alignItems:"center",justifyContent:"space-between",minWidth:0,width:"100%",children:[(0,i.jsx)(P.A,{textAlign:"left",children:(0,h.Ay)(e)}),t.isOnCourt&&(0,i.jsx)(I.A,{sx:{fontSize:12,ml:"6px",flexShrink:0}})]})}),R.map(e=>(0,i.jsx)(j,{children:e.value(t)},e.key))]},t.playerId),[]);return!(g?.length||f?.length)&&t.players?.length?(0,i.jsx)(D.A,{}):t.players?.length?(0,i.jsx)(k,{...l,children:(0,i.jsxs)(d.A,{stickyHeader:!0,"aria-label":"sticky table",children:[g?.length?(0,i.jsxs)(i.Fragment,{children:[A(!0),(0,i.jsx)(c.A,{children:g.map((e,t)=>{let i=u[a]?.[e.playerId];return i&&b(i,e,t)})})]}):null,f?.length?(0,i.jsxs)(i.Fragment,{children:[A(!1),(0,i.jsx)(c.A,{children:f.map((e,t)=>{let i=u[a]?.[e.playerId];return i&&b(i,e,t)})})]}):null]})}):(0,i.jsx)(F.A,{...l,text:x("no_data"),typographyProps:{variant:"body2"}})},L=[{labelKey:"passing",hasStats:e=>null!=e.passing,columns:[{key:"comp_att",title:"C/A",minWidth:52,value:e=>e.passing&&`${e.passing.completions}/${e.passing.attempts}`},{key:"yards",title:"YDS",minWidth:44,value:e=>e.passing?.yards},{key:"touchdowns",title:"TD",value:e=>e.passing?.touchdowns},{key:"interceptions",title:"INT",value:e=>e.passing?.interceptions},{key:"sacked",title:"SACK",minWidth:48,value:e=>e.passing?.sacked},{key:"longestYards",title:"LG",value:e=>e.passing?.longestYards}]},{labelKey:"rushing",hasStats:e=>null!=e.rushing,columns:[{key:"attempts",title:"CAR",value:e=>e.rushing?.attempts},{key:"yards",title:"YDS",minWidth:44,value:e=>e.rushing?.yards},{key:"touchdowns",title:"TD",value:e=>e.rushing?.touchdowns},{key:"longestYards",title:"LG",value:e=>e.rushing?.longestYards}]},{labelKey:"receiving",hasStats:e=>null!=e.receiving,columns:[{key:"receptions",title:"REC",value:e=>e.receiving?.receptions},{key:"targets",title:"TGT",value:e=>e.receiving?.targets},{key:"yards",title:"YDS",minWidth:44,value:e=>e.receiving?.yards},{key:"touchdowns",title:"TD",value:e=>e.receiving?.touchdowns},{key:"longestYards",title:"LG",value:e=>e.receiving?.longestYards}]},{labelKey:"kicking",hasStats:e=>null!=e.kicking,columns:[{key:"fg_ma",title:"FG",minWidth:52,value:e=>e.kicking&&`${e.kicking.fieldGoalMade}/${e.kicking.fieldGoalAttempts}`},{key:"xp_ma",title:"XP",minWidth:52,value:e=>e.kicking&&`${e.kicking.extraPointMade}/${e.kicking.extraPointAttempts}`},{key:"longestYards",title:"LG",value:e=>e.kicking?.longestYards}]},{labelKey:"defense",hasStats:e=>null!=e.defense,columns:[{key:"tackles",title:"TCK",value:e=>e.defense?.tackles},{key:"sacks",title:"SCK",value:e=>e.defense?.sacks},{key:"interceptions",title:"INT",value:e=>e.defense?.interceptions},{key:"forcedFumbles",title:"FF",value:e=>e.defense?.forcedFumbles},{key:"touchdowns",title:"TD",value:e=>e.defense?.touchdowns}]}],W=function(e){let{gameLiveData:t,league:a,teamId:n,...l}=e,s=(0,m.GV)(e=>e.gameDataCacheReducer.playerData),u=(0,p.c)("box_score.FootBallBoxScore"),x=(0,p.c)("box_score"),y=(0,r.useMemo)(()=>t.players?.filter(e=>{let t=s[a]?.[e.playerId];return t&&(!n||t?.lastGameTeamId===n)}),[t.players,a,s,n]);return!y?.length&&t.players?.length?(0,i.jsx)(D.A,{}):t.players?.length?(0,i.jsx)(k,{...l,children:(0,i.jsx)(d.A,{stickyHeader:!0,"aria-label":"sticky table",children:L.map(e=>{let t=y?.filter(e.hasStats);return t?.length?(0,i.jsxs)(r.Fragment,{children:[(0,i.jsx)(T,{children:(0,i.jsxs)(v,{children:[(0,i.jsx)(B,{children:u(e.labelKey)}),e.columns.map(e=>(0,i.jsx)(o.A,{title:u(e.key),children:(0,i.jsx)(S,{style:{minWidth:e.minWidth??40},children:e.title})},e.key))]})}),(0,i.jsx)(c.A,{children:t.map((t,r)=>{let n=s[a]?.[t.playerId];return n&&(0,i.jsxs)(v,{tabIndex:-1,index:r,children:[(0,i.jsx)(C,{children:(0,i.jsx)(P.A,{textAlign:"left",children:(0,h.Ay)(n)})}),e.columns.map(e=>(0,i.jsx)(j,{children:e.value(t)??"-"},e.key))]},t.playerId)})})]},e.labelKey):null})})}):(0,i.jsx)(F.A,{text:x("no_data"),typographyProps:{variant:"body2"},...l})};var $=a(810379),E=a(156803);let G=[{key:"timeOnIce",title:"TOI",minWidth:48,value:e=>e.forward?.timeOnIce},{key:"goals",title:"G",value:e=>e.forward?.goals},{key:"assists",title:"A",value:e=>e.forward?.assists},{key:"points",title:"P",value:e=>e.forward?.points},{key:"shots",title:"S",value:e=>e.forward?.shots},{key:"plusMinus",title:"+/-",value:e=>e.forward?.plusMinus},{key:"faceOffWinPct",title:"FO%",minWidth:44,value:e=>e.forward?.faceOffWinPct},{key:"hits",title:"HITS",minWidth:44,value:e=>e.forward?.hits},{key:"penaltyMinutes",title:"PIM",value:e=>e.forward?.penaltyMinutes},{key:"shifts",title:"SHF",value:e=>e.forward?.shifts}],M=[{key:"timeOnIce",title:"TOI",minWidth:48,value:e=>e.goalie?.timeOnIce},{key:"saves",title:"SV",value:e=>e.goalie?.saves},{key:"shotsAgainst",title:"SA",value:e=>e.goalie?.shotsAgainst},{key:"goalsAgainst",title:"GA",value:e=>e.goalie?.goalsAgainst},{key:"savesPct",title:"SV%",minWidth:48,value:e=>e.goalie?.savesPct}],O=function(e){let{gameLiveData:t,league:a,teamId:n,...l}=e,s=(0,m.GV)(e=>e.gameDataCacheReducer.playerData),u=(0,p.c)("box_score.IceHockeyBoxScore"),x=(0,p.c)("box_score"),y=(0,r.useMemo)(()=>t.players?.filter(e=>{let t=s[a]?.[e.playerId];return t&&(!n||t?.lastGameTeamId===n)}),[t.players,a,s,n]),g=(0,r.useMemo)(()=>y?.filter(e=>null==e.goalie),[y]),f=(0,r.useMemo)(()=>y?.filter(e=>null!=e.goalie),[y]);if(!y?.length&&t.players?.length)return(0,i.jsx)(D.A,{});let A=(e,t,r)=>r?.length?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(T,{children:(0,i.jsxs)(v,{children:[(0,i.jsx)(B,{children:e}),t.map(e=>(0,i.jsx)(o.A,{title:u(e.key),children:(0,i.jsx)(S,{style:{minWidth:e.minWidth??40},children:e.title})},e.key))]})}),(0,i.jsx)(c.A,{children:r.map((e,r)=>{let n=s[a]?.[e.playerId],l=(e=>{switch(e){case E.U.FORWARD:return"forward";case E.U.DEFENSEMAN:return"defenseman";case E.U.GOALIE:return"goalie"}return""})(e.position);return n&&(0,i.jsxs)(v,{tabIndex:-1,index:r,children:[(0,i.jsx)(C,{children:(0,i.jsxs)(P.A,{textAlign:"left",children:[(0,h.Ay)(n),l&&(0,i.jsx)($.PW,{text:u(l).slice(0,1),title:u(l)})]})}),t.map(t=>(0,i.jsx)(j,{children:t.value(e)??"-"},t.key))]},e.playerId)})})]}):null;return t.players?.length?(0,i.jsx)(k,{...l,children:(0,i.jsxs)(d.A,{stickyHeader:!0,"aria-label":"sticky table",children:[A(u("skaters"),G,g),A(u("goalies"),M,f)]})}):(0,i.jsx)(F.A,{text:x("no_data"),typographyProps:{variant:"body2"},...l})};var _=a(47447);let z=[{key:"atBats",title:"AB",value:e=>e.batter?.atBats},{key:"runs",title:"R",value:e=>e.batter?.runs},{key:"hits",title:"H",value:e=>e.batter?.hits},{key:"homeRuns",title:"HR",value:e=>e.batter?.homeRuns},{key:"runsBattedIn",title:"RBI",value:e=>e.batter?.runsBattedIn},{key:"walks",title:"BB",value:e=>e.batter?.walks},{key:"strikeouts",title:"SO",value:e=>e.batter?.strikeouts},{key:"battingAverage",title:"AVG",minWidth:48,value:e=>e.batter?.battingAverage},{key:"onBasePercentage",title:"OBP",minWidth:48,value:e=>e.batter?.onBasePercentage},{key:"sluggingPercentage",title:"SLG",minWidth:48,value:e=>e.batter?.sluggingPercentage}],V=[{key:"inningsPitched",title:"IP",minWidth:44,value:e=>e.pitcher?.inningsPitched},{key:"hitsAllowed",title:"H",value:e=>e.pitcher?.hitsAllowed},{key:"runsAllowed",title:"R",value:e=>e.pitcher?.runsAllowed},{key:"earnedRuns",title:"ER",value:e=>e.pitcher?.earnedRuns},{key:"walksAllowed",title:"BB",value:e=>e.pitcher?.walksAllowed},{key:"strikeouts",title:"K",value:e=>e.pitcher?.strikeouts},{key:"homeRunsAllowed",title:"HR",value:e=>e.pitcher?.homeRunsAllowed},{key:"earnedRunAverage",title:"ERA",minWidth:48,value:e=>e.pitcher?.earnedRunAverage},{key:"pitchesStrikes",title:"P-S",minWidth:52,value:e=>e.pitcher?.pitchesStrikes}],Y=function(e){let{gameLiveData:t,league:a,teamId:n,...l}=e,u=(0,m.GV)(e=>e.gameDataCacheReducer.playerData),x=(0,p.c)("box_score.BaseballBoxScore"),y=(0,p.c)("box_score"),g=(0,r.useMemo)(()=>t.players?.filter(e=>{let t=u[a]?.[e.playerId];return t&&(!n||t?.lastGameTeamId===n)}),[t.players,a,u,n]),f=(0,r.useMemo)(()=>g?.filter(e=>null!=e.batter),[g]),A=(0,r.useMemo)(()=>g?.filter(e=>null!=e.pitcher),[g]);if(!f?.length&&!A?.length&&t.players?.length)return(0,i.jsx)(D.A,{});if(!t.players?.length)return(0,i.jsx)(F.A,{text:y("no_data"),typographyProps:{variant:"body2"},...l});let b=(e,t,r,n,l)=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(T,{children:(0,i.jsxs)(v,{children:[(0,i.jsx)(B,{children:e}),t.map(e=>(0,i.jsx)(o.A,{title:x(e.key),children:(0,i.jsx)(S,{style:{minWidth:e.minWidth??40},children:e.title})},e.key))]})}),(0,i.jsx)(c.A,{children:r?.map((e,r)=>{let o=u[a]?.[e.playerId];return o&&(0,i.jsxs)(v,{tabIndex:-1,index:r,children:[(0,i.jsx)(C,{children:(0,i.jsxs)(s.A,{direction:"row",alignItems:"center",justifyContent:"space-between",minWidth:0,width:"100%",children:[(0,i.jsxs)(P.A,{textAlign:"left",children:[(0,h.Ay)(o),(0,i.jsx)($.PW,{text:(e=>{switch(e){case _.Dc.PITCHER:return"P";case _.Dc.DESIGNATED_HITTER:return"DH";case _.Dc.FIRST_BASE:return"1B";case _.Dc.SECOND_BASE:return"2B";case _.Dc.THIRD_BASE:return"3B";case _.Dc.SHORT_STOP:return"SS";case _.Dc.LEFT_FIELD:return"LF";case _.Dc.CENTER_FIELD:return"CF";case _.Dc.RIGHT_FIELD:return"RF";default:return""}})(e.baseballPosition),title:x("position")})]}),n(e)&&(0,i.jsx)($.Wn,{title:l})]})}),t.map(t=>(0,i.jsx)(j,{children:t.value(e)??"-"},t.key))]},e.playerId)})})]});return t.players?.length?(0,i.jsx)(k,{...l,children:(0,i.jsxs)(d.A,{stickyHeader:!0,"aria-label":"sticky table",children:[b(x("batters_name"),z,f,e=>e.batter?.isActive,x("at_bat_now")),b(x("pitcher_name"),V,A,e=>e.pitcher?.isActive,x("pitching_now"))]})}):(0,i.jsx)(F.A,{text:y("no_data"),typographyProps:{variant:"body2"},...l})},N=function(e){let{league:t}=e,a={[l.c.BASKETBALL]:H,[l.c.FOOTBALL]:W,[l.c.ICE_HOCKEY]:O,[l.c.BASEBALL]:Y}[(0,n.A)(t)];return a?(0,i.jsx)(a,{...e}):null}},521849:(e,t,a)=>{a.d(t,{X:()=>n});var i=a(716763),r=a(202946);let n=(0,i.J1)`
  query GetTrackers($date: Long!) {
    user {
      dashboard {
        trackers(date: $date) {
          trackerId
          userId
          gameId
          leagueEnum
          trackerCondition {
            ...BetMarketConditionTypeFragment
          }
          betMarketHashCode
          americanOdds
          amountWagered
          currentBetValue
          position
        }
      }
    }
  }
  ${r.sN}
`},621841:(e,t,a)=>{a.d(t,{A:()=>h,z:()=>m});var i=a(695155),r=a(212115),n=a(577451),l=a(247970),o=a(904071),s=a(915987),d=a(48022),c=a(421910),p=a(291568);function m(e){let{awayTeamScoreByInning:t,homeTeamScoreByInning:a}=e;return{awayScoreText:String((0,n.R)(t)),homeScoreText:String((0,n.R)(a))}}let h=r.memo(function({liveData:e}){let t=(0,l.A)(),{period:a="",isHomeTeamBatting:r=!1,currentBalls:n=0,currentStrikes:m=0,awayTeamCurrentBases:h,homeTeamCurrentBases:u,awayTeamOutsByInning:x,homeTeamOutsByInning:y}=e,g=Number.parseInt(a,10),f=Number.isNaN(g)?null:g,A=(r?u:h)||[!1,!1,!1],b=(r?y:x)||[],w=b[b.length-1]||0,v=`${n}-${m}`,T=(e,a,i)=>({position:"absolute",left:a,top:i,width:7,height:7,transform:"rotate(45deg)",borderRadius:"1px",boxSizing:"border-box",...e?{backgroundColor:t.palette.live.warningAccent}:{border:`1px solid ${t.palette.text.disabled}`}}),k=["1st","2nd","3rd"].filter((e,t)=>A[t]),j=`${3===k.length?"Bases loaded":k.length?`Runner on ${k.join(" & ")}`:"Bases empty"} \xb7 ${w} out${1===w?"":"s"} \xb7 count ${v}`,S=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.A,{component:"span",sx:{fontSize:(0,p.wk)(8),lineHeight:1,mr:"3px"},children:r?"▼":"▲"}),f??""]});return(0,i.jsxs)(s.A,{direction:"row",alignItems:"center",justifyContent:"center",gap:"7px",sx:{width:"100%"},children:[(0,i.jsx)(c.$L,{line1:S}),(0,i.jsxs)(s.A,{alignItems:"center",gap:"4px",flex:"none",title:j,children:[(0,i.jsxs)(o.A,{sx:{position:"relative",width:26,height:16},children:[(0,i.jsx)(o.A,{component:"span",sx:T(!!A[1],9,0)}),(0,i.jsx)(o.A,{component:"span",sx:T(!!A[2],1,7)}),(0,i.jsx)(o.A,{component:"span",sx:T(!!A[0],17,7)})]}),(0,i.jsx)(s.A,{direction:"row",gap:"3px",alignItems:"center",children:[1,2,3].map(e=>(0,i.jsx)(o.A,{component:"span",sx:{width:5,height:5,borderRadius:"50%",boxSizing:"border-box",...w>=e?{backgroundColor:t.palette.live.indicator}:{border:`1px solid ${t.palette.text.disabled}`}}},e))}),(0,i.jsx)(d.A,{sx:{...(0,c.Bs)(11,500),textTransform:"none",letterSpacing:"0.06em",color:t.palette.live.teamName},children:v})]})]})})},631593:(e,t,a)=>{a.d(t,{t:()=>u});var i=a(716763),r=a(403030),n=a(417594);let l=`
  fragment TennisLiveDataTypeFragment on TennisLiveDataType {
    gameId
    additionalData
    period
    bestOf
    surfaceType
    isPlayer1Serving
    player1Points
    player2Points
    player1GamesBySet
    player2GamesBySet
    player1AcesBySet
    player2AcesBySet
    player1BreaksBySet
    player2BreaksBySet
    player1DoubleFaultsBySet
    player2DoubleFaultsBySet
    player1TieBreaksBySet
    player2TieBreaksBySet
    player1PointsBySet
    player2PointsBySet
  isAtTimeout
  }
`;var o=a(47447);let s=`
  fragment BasketballLiveDataTypeFragment on BasketballLiveDataType {
    gameId
    additionalData
    period
    gameTimeSeconds
    homeTeamHasPossession
    #isClockRunning
    awayTeamFoulsByQuarter
    homeTeamFoulsByQuarter
    awayTeamFreeThrowsMissedByQuarter
    homeTeamFreeThrowsMissedByQuarter
    awayTeamFreeThrowsPendingByQuarter
    homeTeamFreeThrowsPendingByQuarter
    awayTeamFreeThrowsScoredByQuarter
    homeTeamFreeThrowsScoredByQuarter
    awayTeamThreePointersByQuarter
    homeTeamThreePointersByQuarter
    awayTeamTotalPointsByQuarter
    homeTeamTotalPointsByQuarter
    awayTeamTwoPointersByQuarter
    homeTeamTwoPointersByQuarter
    isAtTimeout
    awayTeamCurrentFreeThrows
    homeTeamCurrentFreeThrows
    awayTeamBonus
    homeTeamBonus
    awayTeamTimeoutsRemaining
    homeTeamTimeoutsRemaining

    players {
      playerId
      minutePlayed
      points
      isStarter
      isOnCourt
      fieldGoalAttempted
      fieldGoalMade
      threePointersAttempted
      threePointersMade
      freeThrowsAttempted
      freeThrowsMade
      rebounds
      assists
      turnovers
      steals
      blocks
      personalFouls
    }
  }
`,d=`
  fragment FootballLiveDataTypeFragment on FootballLiveDataType {
  gameId
  additionalData
  period
  gameTimeSeconds
  homeTeamHasPossession
  activeDown
  yardsToNextDown
  yardsDistance
  awayTeamDrives
  homeTeamDrives
  awayTeamPasses
  homeTeamPasses
  awayTeamTurnovers
  homeTeamTurnovers
  awayTeamPenalties
  homeTeamPenalties
  awayTeamOnePointConversions
  homeTeamOnePointConversions
  awayTeamTwoPointConversions
  homeTeamTwoPointConversions
  awayTeamSafeties
  homeTeamSafeties
  awayTeamFieldGoals
  homeTeamFieldGoals
  awayTeamCoachChallenges
  homeTeamCoachChallenges
  awayTeamTotalPoints
  homeTeamTotalPoints
  awayTeamTouchdowns
  homeTeamTouchdowns
  awayTeamTimeouts
  homeTeamTimeouts
  isAtTimeout
  
  players {
  playerId
  passing {
    attempts
    completions
    yards
    longestYards
    touchdowns
    interceptions
    sacked
  }
  rushing {
    attempts
    yards
    touchdowns
    longestYards
  }
  receiving {
    receptions
    targets
    yards
    touchdowns
    longestYards
  }
  kicking {
    fieldGoalAttempts
    fieldGoalMade
    longestYards
    extraPointAttempts
    extraPointMade
  }
  defense {
    tackles
  sacks
  interceptions
  forcedFumbles
  touchdowns
  }
  }
  }
`;var c=a(156803);let p=`
  fragment SoccerLiveDataTypeFragment on SoccerLiveDataType {
    gameId
    additionalData
    period
    gameTimeSeconds
    homeTeamHasPossession
    awayTeamScoreByHalf
    homeTeamScoreByHalf
    awayTeamCornersByHalf
    homeTeamCornersByHalf
    awayTeamFoulsByHalf
    homeTeamFoulsByHalf
    awayTeamFreeKicksByHalf
    homeTeamFreeKicksByHalf
    awayTeamGoalKicksByHalf
    homeTeamGoalKicksByHalf
    awayTeamOffsidesByHalf
    homeTeamOffsidesByHalf
    awayTeamPenaltiesByHalf
    homeTeamPenaltiesByHalf
    awayTeamRedCardsByHalf
    homeTeamRedCardsByHalf
    awayTeamSubsByHalf
    homeTeamSubsByHalf
    awayTeamThrowInsByHalf
    homeTeamThrowInsByHalf
    awayTeamYellowCardsByHalf
    homeTeamYellowCardsByHalf
    isAtTimeout
    # isClockRunning
    events {
      eventId
      eventType
      detail
      createdAtUtc
      updatedAtUtc
      isCanceled
    }
  }
`;var m=a(184349);let h=(0,i.J1)`
  subscription GetGameLiveData( $gameId: Guid!) {
    gameLiveData(gameId: $gameId) {
      ... on TennisLiveDataType {
        ...TennisLiveDataTypeFragment
      }
      ... on SoccerLiveDataType {
        ...SoccerLiveDataTypeFragment
      }
      ... on IceHockeyLiveDataType {
        ...IceHockeyLiveDataTypeFragment
      }
      ... on FootballLiveDataType {
        ...FootballLiveDataTypeFragment
      }
      ... on BasketballLiveDataType {
        ...BasketballLiveDataTypeFragment
      }
      ... on BaseballLiveDataType {
        ...BaseballLiveDataTypeFragment
      }
    }
  }
  ${l}
  ${p}
  ${c.w}
  ${d}
  ${s}
  ${o.PE}
`;function u({variables:e,skip:t=!1}){return!function(e,t=!1){let a=(0,n.jL)(),{data:i,loading:l,error:o}=(0,r.R)(h,{variables:e,skip:t,onData:({data:e})=>{let t=e.data?.gameLiveData;t&&a(m.f.setGameLiveData(t))},onComplete:()=>{a(m.f.clearGameLiveData(e.gameId))}})}(e,t),null}},807310:(e,t,a)=>{a.d(t,{A:()=>S});var i=a(695155),r=a(212115),n=a(337206),l=a(417594),o=a(226872),s=a(962811),d=a(904071),c=a(579847),p=a(426021);let m=function(){let e=(0,c.DP)(),t=(0,s.A)(e.breakpoints.down("md"));return(0,i.jsx)(d.A,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:t?"100%":"calc(70vh + 192px)"},children:(0,i.jsx)(p.A,{})})};var h=a(992858),u=a(48878),x=a(286697),y=a(48022),g=a(915987),f=a(604258),A=a(191057),b=a(421567),w=a(844624),v=a(737381),T=a(539921);let k=(0,n.default)(()=>Promise.all([a.e(5647),a.e(8426),a.e(6076),a.e(3845),a.e(4807),a.e(826),a.e(1844),a.e(7674),a.e(2118),a.e(4644),a.e(2762),a.e(6812),a.e(7225),a.e(520),a.e(8234),a.e(3326),a.e(2967)]).then(a.bind(a,294310)),{loadableGenerated:{webpack:()=>[294310]},ssr:!1,loading:()=>(0,i.jsx)(m,{})});function j(e){let{betGroup:t,time:a,league:n}=e,{gameId:s,betValue:d,betValues:c,playerId:p,hashCode:m,toggleHeads:j,hashCodes:S,shouldKeep:B,awayHashCodeMap:C,homeHashCodeMap:I,siteId:P,league:F,valueOne:D}=(0,l.GV)(e=>e.betCacheReducer.graphTeamData),R=(0,l.jL)(),H=F||n,L=(0,r.useMemo)(()=>(0,u.A)(H),[H]),{betMarketInfo:W}=(0,l.GV)(e=>e.constantsReducer),$=(0,l.GV)(e=>e.gameLiveDataReducer[s]),E=(0,l.GV)(e=>p?e.gameDataCacheReducer.playerData[H]?.[p]:void 0),G=(0,x.A)(H),M=(0,r.useMemo)(()=>(function({betGroup:e,time:t,betMarketInfo:a,betCacheData:r,effectiveLeague:n,currentSport:l,playerData:o,valueOne:s}){let d=[];if(t&&a?.length){let[o]=(0,b.d6)(t,e),c=a.find(e=>e.value===t),p=c?.type===v.j.MULTI,m=(0,A.NM)(e,a,r,n,l).find(e=>e.enum===o.toUpperCase()),h=m?.label||(0,w.A)(o);if(h&&d.push((0,i.jsx)(y.A,{component:"span",sx:{textTransform:"uppercase",color:"text.primary",fontWeight:600,fontSize:{xs:"14px",sm:"14px",md:"16px"}},children:h},"submarket")),p&&void 0!==s){let e=(0,T.ED)(a,t,s,"VALUE_ONE");e&&d.push((0,i.jsx)(y.A,{component:"span",sx:{color:"text.primary",opacity:.72,fontSize:{xs:"14px",sm:"14px",md:"16px"}},children:e},"enumvalue"))}let u=(0,b.ai)(t,e,l);u&&"Game"!==u&&d.push((0,i.jsx)(y.A,{component:"span",sx:{color:"text.primary",opacity:.72,fontSize:{xs:"14px",sm:"14px",md:"16px"}},children:u},"timeperiod"))}return(e===f._b.PLAYER_PROP&&o?.name&&d.push((0,i.jsx)(y.A,{component:"span",sx:{color:"text.primary",opacity:.72,fontSize:{xs:"14px",sm:"14px",md:"16px"}},children:o.name},"player")),0===d.length)?null:(0,i.jsx)(g.A,{direction:"row",gap:1,component:"span",children:d})})({betGroup:t,time:a,betMarketInfo:W,betCacheData:G,effectiveLeague:H,currentSport:L,playerData:E,valueOne:D}),[t,W,E,a,G,H,L,D]),O=()=>{R(h.Zg.setGraphData(void 0))};return(0,i.jsx)(o.A,{open:!!m,handleClose:O,hideCloseButton:!0,children:(0,i.jsx)(k,{betMarketType:a,gameId:s,subHeader:M,league:H,betMarketHashCodes:S,selectedHashCode:m,toggleHeads:j,betValue:d||void 0,shouldKeep:B,betValues:c,awayHashCodeMap:C,homeHashCodeMap:I,siteId:P,betGroup:t,playerId:p,liveGame:!!$,handleClose:O})})}function S(e){return(0,l.GV)(e=>e.betCacheReducer.graphTeamData)?(0,i.jsx)(j,{...e}):null}},810379:(e,t,a)=>{a.d(t,{PW:()=>o,R7:()=>l,Wn:()=>s});var i=a(695155);a(212115);var r=a(247970),n=a(904071);function l(e){return e?e.abbreviations?.[0]||e.name.slice(0,3).toUpperCase():""}function o({text:e,title:t}){let a=(0,r.A)();return e?(0,i.jsx)("span",{title:t,style:{marginLeft:6,fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.4px",color:a.palette.text.tertiary},children:e}):null}function s({title:e}){let t=(0,r.A)();return(0,i.jsx)(n.A,{component:"span",title:e,sx:{display:"inline-block",width:5,height:5,borderRadius:"50%",backgroundColor:t.palette.live.warningAccent,marginLeft:"6px",marginBottom:"1px",flex:"none"}})}},867242:(e,t,a)=>{a.d(t,{A:()=>n});var i=a(695155);a(212115);var r=a(642772);let n=function(e){return(0,i.jsxs)(r.A,{width:24,height:24,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,i.jsx)("path",{d:"M15 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V1H2V14H15V15Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M6 8H5V13H6V8Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M4.5 11H3.5V13H4.5V11Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M14 4H13V13H14V4Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M12.5 7H11.5V13H12.5V7Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M7.5 13H8.5V6H7.5V13Z",fill:"currentColor",fillOpacity:"0.72"}),(0,i.jsx)("path",{d:"M9 13H10V9H9V13Z",fill:"currentColor",fillOpacity:"0.72"})]})}},873673:(e,t,a)=>{a.d(t,{A:()=>d});var i=a(695155),r=a(450910),n=a(212115),l=a(423689),o=a(33970);let s=[o.Tx.PLAY_BY_PLAY,o.Tx.BOX_SCORE],d=function(){let{toggleType:e,setToggleType:t}=(0,n.useContext)(o.Ay),a=(0,r.c)("common"),d=[{title:a("playByPlay"),value:o.Tx.PLAY_BY_PLAY},{title:a("boxScore"),value:o.Tx.BOX_SCORE}];return(0,i.jsx)(l.A,{current:s.indexOf(e),handleChange:(e,a)=>t(a),labels:d,boxSx:l.i.box,sx:l.i.label,activeSx:l.i.active})}},902583:(e,t,a)=>{a.d(t,{A:()=>w});var i=a(695155),r=a(247970),n=a(915987),l=a(48022),o=a(904071),s=a(212115),d=a(238687),c=a(417594),p=a(48878),m=a(58870),h=a.n(m),u=a(688611),x=a.n(u),y=a(517780),g=a(33970),f=a(621841),A=a(810379),b=a(654079);let w=function(){let{game:e,league:t}=(0,s.useContext)(g.Ay),a=(0,c.GV)(t=>e&&t.gameLiveDataReducer[e.id]),m=(0,r.A)();if(!e||!a||!t)return null;let u=(0,p.A)(t),[w,v]=(0,y.dw)(a,u),T=(0,y.PV)(a.period),k=u===b.c.BASKETBALL?(0,y.eO)(a.period,a.additionalData,t):(0,y.dH)(a.period,a.additionalData,t),j="gameTimeSeconds"in a&&a.gameTimeSeconds?(0,d.A)(a.gameTimeSeconds):"",S=T&&(w??0)>(v??0),B=T&&(v??0)>(w??0),C=(e,t)=>({fontFamily:h().style.fontFamily,fontSize:22,fontWeight:700,lineHeight:1.1,color:e?m.palette.winner:t?m.palette.text.disabled:m.palette.text.primary}),I={fontFamily:x().style.fontFamily,fontSize:13,fontWeight:700,textTransform:"uppercase",color:m.palette.text.secondary};return(0,i.jsxs)(n.A,{direction:"row",alignItems:"center",justifyContent:"center",gap:2,width:"100%",children:[(0,i.jsxs)(n.A,{direction:"row",alignItems:"center",gap:1.25,children:[(0,i.jsx)(l.A,{sx:I,children:(0,A.R7)(e.awayTeam)}),(0,i.jsx)(l.A,{sx:C(S,B),children:w??"-"})]}),(0,i.jsx)(o.A,{sx:{minWidth:64,display:"flex",justifyContent:"center"},children:!T&&u===b.c.BASEBALL&&"isHomeTeamBatting"in a&&"homeTeamCurrentBases"in a&&"awayTeamCurrentBases"in a?(0,i.jsx)(f.A,{liveData:a}):(0,i.jsxs)(n.A,{direction:"column",alignItems:"center",gap:"2px",children:[(0,i.jsx)(l.A,{sx:{fontFamily:h().style.fontFamily,fontSize:11,fontWeight:600,textTransform:"uppercase",color:T?m.palette.live.quarterHeader:m.palette.text.primary},children:T?"FINAL":k}),!T&&j&&(0,i.jsx)(l.A,{sx:{fontFamily:h().style.fontFamily,fontSize:10,fontWeight:500,color:m.palette.text.tertiary},children:j})]})}),(0,i.jsxs)(n.A,{direction:"row",alignItems:"center",gap:1.25,children:[(0,i.jsx)(l.A,{sx:C(B,S),children:v??"-"}),(0,i.jsx)(l.A,{sx:I,children:(0,A.R7)(e.homeTeam)})]})]})}},936948:(e,t,a)=>{a.d(t,{A:()=>c});var i=a(695155);a(212115);var r=a(680141),n=a(732748),l=a(48022),o=a(450910),s=a(455943),d=a(418750);let c=function(e){let t=(0,o.c)("error"),a="One Connection Max"===e.message?t("one_connection_max"):e.message,c=(0,d.Jd)();return"string"==typeof e.message&&e.message.includes("PTO_WS_ABORT")?e.message.includes("user inactive")?null:(0,i.jsx)(s.A,{}):("string"==typeof a&&(a.includes("4429")||a.includes("Too many connections"))&&(a=c?.isLoggedIn?"Too many connections from this device. Please close other tabs or windows and try again":"Too many connections from this device. Please close other tabs or windows and try again. Login in your account to increase your connection limit"),"One Connection Max"===e.message&&void 0!==e.consecutiveErrors&&e.consecutiveErrors<=3)?(0,i.jsx)(s.A,{}):(0,i.jsxs)(r.A,{severity:"error",children:[(0,i.jsx)(n.A,{children:(0,i.jsx)(l.A,{variant:"h2",children:"Something Went Wrong"})}),(0,i.jsx)(l.A,{variant:"body1",children:a})]})}},944498:(e,t,a)=>{a.d(t,{A:()=>n});var i=a(695155);a(212115);var r=a(642772);let n=function(e){return(0,i.jsx)(r.A,{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{d:"M12.048 24A12 12 0 0 1 7.344 23.064a12 12 0 0 1 -3.84 -2.568 12 12 0 0 1 -2.592 -3.816A12 12 0 0 1 0 12 12 12 0 0 1 0.936 7.32 12 12 0 0 1 3.528 3.504 12 12 0 0 1 7.344 0.936 12 12 0 0 1 12.048 0Q14.64 0 16.992 1.08a12 12 0 0 1 4.104 2.976v-3.6h1.512v6.24H16.344V5.184h3.744A12 12 0 0 0 16.464 2.472 9.6 9.6 0 0 0 12.072 1.488q-4.416 0 -7.488 3.048T1.512 12t3.072 7.44 7.464 3.048Q16.008 22.488 18.936 19.92T22.488 13.488H24Q23.472 18.024 20.064 21T12.048 24M16.8 17.784 11.304 12.312V4.512h1.512v7.176l5.064 5.04z",fill:"currentColor",fillOpacity:"0.72"})})}}}]);