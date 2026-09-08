URL: https://picktheodds.app/_next/static/chunks/9701-63c8ace82587872d.js\nSTATUS: 200\n\n!function(){try{var e="u">typeof window?window:"u">typeof global?global:"u">typeof globalThis?globalThis:"u">typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="67053d67-7c6e-4a5e-9ae7-efa20f9522e4",e._sentryDebugIdIdentifier="sentry-dbid-67053d67-7c6e-4a5e-9ae7-efa20f9522e4")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9701],{15074:(e,t,a)=>{a.d(t,{G:()=>r});function r(e){return{id:e.id,awayTeam:{id:e.awayTeam?.id,name:e.awayTeam?.name??"",abbreviations:[e.awayTeam?.abbreviations?.[0]??""],city:e.awayTeam?.city??""},homeTeam:{id:e.homeTeam?.id,name:e.homeTeam?.name??"",abbreviations:[e.homeTeam?.abbreviations?.[0]??""],city:e.homeTeam?.city??""},startDateTime:e.startDateTime,...void 0!==e.awayScore&&{awayScore:e.awayScore},...void 0!==e.homeScore&&{homeScore:e.homeScore},...e.awayPitcherId&&{awayPitcherId:e.awayPitcherId},...e.homePitcherId&&{homePitcherId:e.homePitcherId},...e.competition&&{competition:e.competition},...e.leagueEnum&&{leagueEnum:e.leagueEnum},...e.actualStartDateTime&&{actualStartDateTime:e.actualStartDateTime},...e.isCompleted&&{isCompleted:e.isCompleted},...e.isCancelled&&{isCancelled:e.isCancelled},...e.isPostponed&&{isPostponed:e.isPostponed},...Array.isArray(e.weather)&&{weather:e.weather},...Array.isArray(e.betMarkets)&&{betMarkets:e.betMarkets}}}},142806:(e,t,a)=>{a.d(t,{I:()=>n,n:()=>i});var r,n=((r={}).OVER="OVER",r.UNDER="UNDER",r.BETWEEN="BETWEEN",r.EXACTLY="EXACTLY",r);let i=e=>`
  fragment ToolsSubscriptionFragment${e} on ${e} {
    id 
    americanOdds
    betValues
    foundDateTime
    league
    betMarketId
    overOrUnder
    urlBets
    playerId
    gameId
    teamIds
    betMarketSiteIds
    valueOne
    valueTwo
    betMarketHashCodes
    startingLineupConfirmed
    requestHash
    maxWagers
  }
`},202946:(e,t,a)=>{a.d(t,{$4:()=>o,$A:()=>T,Gh:()=>d,IA:()=>y,Wr:()=>c,Yi:()=>g,eG:()=>m,h$:()=>u,ky:()=>l,ns:()=>E,q0:()=>h,sN:()=>s,tq:()=>p,yZ:()=>f});var r=a(716763),n=a(787178),i=a(604258);let l=(0,r.J1)`
  query generateOneClick(
    $betMarketHashCode: Int!
    $betSite: BetMarketSiteEnumTypeTwo!
    $country: String
    $gameId: Guid!
    $league: LeagueEnum!
    $state: String
  ) {
    generateOneClick(
      betMarketHashCode: $betMarketHashCode
      betSite: $betSite
      country: $country
      gameId: $gameId
      league: $league
      state: $state
    )
  }
`,s=(0,r.J1)`
  fragment BetMarketConditionTypeFragment on BetMarketConditionType {
    teamId
    playerId
    overUnder
    betValue
    isTie
    marketType
    betValueMax
    isGameBet
    valueOne
    valueTwo
  }
`,u=(0,r.J1)`
  fragment BetMarketTypeFragment on BetMarketType {
    hashCode
    conditions {
      ...BetMarketConditionTypeFragment
    }
    listings {
      siteId
      americanOdds
      maxWager
      additionalLevels {
        americanOdds
        liquidity
      }
    }
    isWinner
    isVoided
    isPush
  }
  ${s}
`,o=(0,r.J1)`
  subscription BetCacheSubscription($request: InputBetCacheSubscriptionRequestType) {
    betCache(request: $request) {
      ...BetMarketTypeFragment
    }
  }
  ${u}
`,d=(0,r.J1)`
  query BetCacheQuery($league: LeagueEnum!, $gameId: Guid!, $betMarketTypeEnum: BetMarketTypeEnumTypeTwo!) {
    completedBetMarket(league: $league, gameId: $gameId, betMarketTypeEnum: $betMarketTypeEnum) {
      ...BetMarketTypeFragment
    }
  }
  ${u}
`;(0,r.J1)`
  query BetCacheCategories($league: LeagueEnum!) {
    betCacheCategories(league: $league)
  }
`;let c={id:0,name:"All Competitions"},m="ALL",p="All Conferences",y=[{value:i._b.MONEYLINE,label:"MoneyLine"},{value:i._b.SPREAD,label:"Spread"},{value:i._b.TOTALS,label:"Totals"},{value:i._b.TEAM,label:"Team"},{value:i._b.PLAYER_PROP,label:"Player Prop"}],g=e=>e[0]?.map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>null!==e).reduce((e,t)=>(e[t.key]=t.value,e),{}),h=e=>e.startsWith("SPREAD")||e.startsWith("TOTALS")||e.startsWith("PLAYER_PROP")||e.startsWith("RACE_TO")||e.startsWith("GAME"),T=e=>e?.toString()??"DEFAULT",f=(e,t)=>{let a="DEFAULT";return(0,n.A)(e)||(a=void 0!==t?`${e*(t?1:-1)}`:`${e}`),a.toString()},E=(e,t)=>{let a="DEFAULT";return(0,n.A)(e)||(a=`${e*(t?1:-1)}`),a.toString()}},288410:(e,t,a)=>{a.d(t,{A0:()=>s,K3:()=>u,Lz:()=>m,R5:()=>c,TI:()=>o,Y:()=>p,b:()=>d,dX:()=>y});var r,n=a(716763),i=a(993010),l=a(292825);let s=(0,n.J1)`
  query GetTeams($ids: [UShort]!, $league: LeagueEnum!) {
    teams(ids: $ids, league: $league) {
      ...ITeamTypeFragment
    }
  }
  ${i.P}
`,u=(0,n.J1)`
  query GetPlayers($ids: [UInt]!, $league: LeagueEnum!) {
    players(ids: $ids, league: $league) {
      id
      name
      firstName
      lastName
      lastGameTeamId
      duplicatePlayerIdWarning
    }
  }
`;(0,n.J1)`
  query GetActiveGames($league: LeagueEnum!) {
    gamesActive(league: $league)
  }
`;let o=(0,n.J1)`
  query GetBetCacheCategories($league: LeagueEnum!, $gameId: Guid) {
    betCacheCategories(league: $league, gameId: $gameId)
  }
`,d=(0,n.J1)`
  query GetCompletedBetMarkets($league: LeagueEnum!, $gameId: Guid!) {
    completedBetMarkets(league: $league, gameId: $gameId)
  }
`,c=(0,n.J1)`
  query GetCompetitionsActive($league: LeagueEnum!) {
    competitionsActive(league: $league)
  }
`,m=(0,n.J1)`
  query GetCompetitionsByIds($competitionIds: [UInt]!, $league: LeagueEnum!) {
    competitions(ids: $competitionIds, league: $league) {
      ... on TennisCompetitionType {
        name
        id
        isMen
        type
      }
      ... on GolfCompetitionType {
        id
        name
        eventType
        status
        courseTimezone
        network
        startDateTime
        endDateTime
      }
    }
  }
`,p=(0,n.J1)`
  query GetGamesWithRequest($league: LeagueEnum!, $request: InputGameRequestType) {
    games(league: $league, request: $request) {
      ...IGameTypeFragment
    }
  }
  ${l.wo}
`;var y=((r={}).ASC="ASC",r.DESC="DESC",r)},292825:(e,t,a)=>{a.d(t,{R7:()=>n,ZX:()=>u,wo:()=>s});var r,n=((r={}).BasketballGameType="BasketballGameType",r.FootballGameType="FootballGameType",r.IceHockeyGameType="IceHockeyGameType",r.SoccerGameType="SoccerGameType",r.FightingGameType="FightingGameType",r.TennisGameType="TennisGameType",r.GolfGameType="GolfGameType",r.BaseballGameType="BaseballGameType",r);let i=`
  fragment IGameTypeWeatherFragment on GameWeatherType {
    time
    tempF
    condition
    windMPH
    windDirection
    feelsLikeTempF
    chanceOfRain
    precipInches
  }
`,l=(e,t)=>`
  fragment IGameType${e}${t?.fragmentSuffix??""}Fragment on ${e} {
    id

    ${"GolfGameType"!==e?`
    awayTeam {
      id
      name
      ${"FightingGameType"!==e?"abbreviations":""}
      ${"TennisGameType"!==e&&"FightingGameType"!==e?"city":""}
    }
    homeTeam {
      id
      name
      ${"FightingGameType"!==e?"abbreviations":""}
      ${"TennisGameType"!==e&&"FightingGameType"!==e?"city":""}
    }
    awayScore
    homeScore
    isCancelled
      actualStartDateTime
      isCompleted
leagueEnum
    `:""}

    startDateTime
  
    ${(e=>{switch(e){case"TennisGameType":case"FootballGameType":case"SoccerGameType":case"BaseballGameType":return!0;default:return!1}})(e)?`
    weather {
      ...IGameTypeWeatherFragment
    }`:""}

    ${"TennisGameType"===e?`
    competitonId
    competition {
      id
      name
      type
      isMen
    }`:""}

     ${"BaseballGameType"===e?`
    awayPitcherId
    homePitcherId`:""}

    ${"GolfGameType"===e?`
    competitionName
    competitionId
    isCompleted
    betSiteUrl
    competition {
      id
      name
      purse
      winningShare
      currency
      points
      courseTimezone
      network
      eventType
      status
      startDateTime
      endDateTime
      }
    `:""}

    ${t?.excludeBetMarkets?"":"betMarkets"}
  }
  ${i}
`,s=`
  fragment IGameTypeFragment on IGameType {
    ${Object.values(n).map(e=>`
        ... on ${e} {
          ...IGameType${e}Fragment
        }
      `)}
  }
  ${Object.values(n).map(e=>l(e))}
`,u=`
  fragment IGameTypeSubscriptionFragment on IGameType {
    ${Object.values(n).map(e=>`
        ... on ${e} {
          ...IGameType${e}SubscriptionFragment
        }
      `)}
  }
  ${Object.values(n).map(e=>l(e,{excludeBetMarkets:!0,fragmentSuffix:"Subscription"}))}
`},374420:(e,t,a)=>{a.d(t,{T:()=>i});var r=a(212115);function n(e){return document.addEventListener("visibilitychange",e),()=>{document.removeEventListener("visibilitychange",e)}}function i(){return(0,r.useSyncExternalStore)(n,()=>!document.hidden,()=>!0)}},504746:(e,t,a)=>{a.d(t,{A:()=>r});function r(e,t){return e?e.city&&e.name!==e.city?`${e.city} ${e.name}`:e.name:""}},529489:(e,t,a)=>{a.d(t,{R:()=>c,o:()=>d});var r=a(212115),n=a(199807),i=a(417594),l=a(372375),s=a(15074),u=a(288410),o=a(671126);let d=(e,t,a=!1)=>{let{gameData:d,playerData:c}=t,m=(0,i.jL)(),p=(0,n.m)(),{gameIds:y}=(0,r.useMemo)(()=>{let t=[],a=[];return e?.length&&(t=Object.values(e).reduce((e,t)=>{let a=t?.league,r=t?.gameId,n=e.find(e=>e?.league===a);return n?n.ids.includes(r)||n.ids.push(r):e.push({league:a,ids:[r]}),e},[]),d&&Object.keys(d).length>0&&(a=Object.keys(d).filter(e=>e in d).map(e=>d[e].id),t=t.map(e=>({league:e.league,ids:e.ids.filter(e=>!a.includes(e))})).filter(e=>e?.ids?.length>0))),{gameIds:t}},[e,d]),g=JSON.stringify(y);(0,r.useEffect)(()=>{y.length>0&&(async()=>{let e=await Promise.all(y.map(async e=>{try{let t=await p.query({query:u.Y,variables:{league:e?.league,request:{gameIds:e?.ids}},fetchPolicy:"no-cache"});return{league:e.league,games:t.data?.games??[]}}catch{return{league:e.league,games:[]}}})),t={};e.forEach(({league:e,games:a})=>{a.forEach(a=>{a.awayPitcherId&&(t[e]||=[],t[e]?.push(a.awayPitcherId)),a.homePitcherId&&(t[e]||=[],t[e]?.push(a.homePitcherId))})}),await Promise.all(Object.entries(t).map(async([e,t])=>{let a=Array.from(new Set(t));if(!a.length)return;let r=await p.query({query:u.K3,variables:{league:e,ids:a},fetchPolicy:"no-cache"});r.data?.players?.length&&m(l.HB.setPlayerData({league:e,players:r.data.players}))}));let a=[];e.forEach(({games:e})=>{e.forEach(e=>{a.push((0,s.G)(e))})}),a.length>0&&m(l.HB.setGamesData(a))})()},[m,g,p]);let h=(0,r.useMemo)(()=>{let t=e?.reduce((e,t)=>{let a=c[t.league]?Object.keys(c[t.league]).map(e=>Number(e)):[];return!t.playerId||a.includes(t.playerId)||l.pH[t.league]?.has(t.playerId)||(t.league in e||(e[t.league]=[]),e[t.league].includes(t.playerId)||e[t.league].push(t.playerId)),e},{});return t?Object.keys(t).map(e=>({league:e,playerIds:t[e]})):[]},[e,c]),T=JSON.stringify(h);(0,r.useEffect)(()=>{h&&h.length>0&&(async()=>{await Promise.all(h.map(async e=>{if(a)return(0,o.no)(p,e.league,e.playerIds);try{let t=await p.query({query:u.K3,variables:{league:e?.league,ids:e.playerIds},fetchPolicy:"no-cache"});t.data?.players?.length&&m(l.HB.setPlayerData({league:e.league,players:t.data.players}))}catch{}}))})()},[m,p,T,a])},c=(e,t)=>{let a=(0,i.GV)(e=>e.gameDataCacheReducer.playerData),s=(0,n.m)(),o=(0,i.jL)(),d=(0,r.useMemo)(()=>{let r=a[t]?Object.keys(a[t]).map(e=>Number(e)):[];return e?.filter(e=>!r.includes(e))||[]},[e,a,t]),c=JSON.stringify(d);(0,r.useEffect)(()=>{d&&d.length>0&&(async()=>{try{let e=await s.query({query:u.K3,variables:{league:t,ids:d}});e.data?.players.length&&o(l.HB.setPlayerData({league:t,players:e.data.players}))}catch{}})()},[o,s,t,c])}},539921:(e,t,a)=>{a.d(t,{Af:()=>p,ED:()=>f,T6:()=>g,_K:()=>$,fi:()=>b,hI:()=>T,ir:()=>v,lw:()=>h,ob:()=>y,uj:()=>E,wE:()=>A});var r,n=a(695155),i=a(299129),l=a(915987),s=a(904071),u=a(672394),o=a(594773),d=a(690710),c=a(605437),m=a(132927);let p=(e,t,a)=>e>=50?t:e>=20?(0,u.e$)(t,.15):e>=10?(0,u.e$)(t,.3):e>=5?(0,u.e$)(t,.45):e>=2?(0,u.e$)(t,.6):a?(0,u.X4)(t,.4):(0,u.X4)(t,.2),y=(0,i.Ay)(l.A)(({theme:e})=>({padding:`${e.spacing(1)} ${e.spacing(2)}`,justifyContent:"center",height:"100%",[e.breakpoints.down("md")]:{padding:`${e.spacing(1)} ${e.spacing(1)}`}}));var g=((r={}).ARBITRAGE="ARBITRAGE",r.MIDDLE="MIDDLE",r.FREE_BET="FREE_BET",r.LOW_HOLD="LOW_HOLD",r.EXPECTED_VALUE="EXPECTED_VALUE",r);function h(e,t){if(t?.some(e=>void 0===e))return{profit:void 0,profitPercent:void 0};let a=t&&t.length>0?t[0]*(0,o.bR)(e[0])-t.reduce((e,t)=>e+t,0):void 0,r=a&&t&&a/t.reduce((e,t)=>e+t,0);return{profit:a,profitPercent:r}}function T(e,t,a,r){let n=void 0===r?(0,c.Mq)(e,t):(0,c.NK)(e,r,t),i=-1/0,l=[],s=[];return(function(e){let t=[];for(let a=0;a<2**e;a+=1){let r={};for(let t=0;t<e;t+=1)r[(t+1)%2]=!!(a>>t&1);t.push(r)}return t})(t.length).forEach(e=>{let r=n.map((t,r)=>e[r]?Math.floor(t/a)*a:Math.ceil(t/a)*a),u=r?.some(e=>void 0===e)?[]:t.map((e,t)=>{let a=r?.length?(0,c.Tl)(r[t],e):void 0,n=a&&r?.length&&a-r[t===r.length-1?0:t+1];return n&&n/r.reduce((e,t)=>e+t,0)||0}),o=u.length?u.reduce((e,t)=>e+t,0)/u.length:0;o>i&&(i=o,l=r,s=u)}),{bestRoundedBets:l,bestProfitPercents:s}}function f(e,t,a,r){if(!e||!t)return a.toString();let n=e.find(e=>e.value===t);if(!n)return a.toString();let i=n.enumValueOptions&&n.enumValueOptions.find(e=>e.id===a),l=i?i.displayName:a.toString();if(!n.templateString)return l;let s=r?`%${r}%`:"%ENUM_VALUE%";if(!n.templateString.includes(s))return l;let u=RegExp(`([\\w\\s]+)${s.replace(/%/g,"\\%")}`),o=n.templateString.match(u);return o&&o[1]?`${o[1].trim()} ${l}`:l}let E=(e,t,a)=>{let r=t?.displayName||"";if(t?.templateString){let{templateString:a}=t;a=(a=a.replace("%VALUE_ONE%",e.valueOne?.toString()||"")).replace("%VALUE_TWO%",e.valueTwo?.toString()||""),r+=`- ${a}`}return{baseDisplay:r,playerName:a?(0,d.Ay)({firstName:a.firstName,lastName:a.lastName}):void 0}},b=(e,t,a)=>{let r=t?.displayName;if(t?.templateString){let{templateString:a}=t;a=(a=a.replace("%VALUE_ONE%",e.valueOne?.toString()||"")).replace("%VALUE_TWO%",e.valueTwo?.toString()||""),r+=`- ${a}`}let n=a?(0,d.Ay)({firstName:a.firstName,lastName:a.lastName}):void 0;return n?r?.concat(" - ",n):r},I=(0,i.Ay)(m.A,{shouldForwardProp:e=>"isBetValid"!==e})(({theme:e,isBetValid:t})=>({color:t?e.palette.text.secondary:e.palette.text.primary,transition:t?"filter 1s ease-in-out, color 1s ease-in-out":"none"})),$=(e,t,a)=>t?(0,n.jsxs)(l.A,{direction:"column",textAlign:"start",flexGrow:1,sx:{maxWidth:"24vw"},children:[e[0]&&(0,n.jsx)(I,{variant:"label",isBetValid:a,minHeight:15,children:e[0]}),(0,n.jsx)(I,{variant:"label",isBetValid:a,minHeight:15,children:e[1]}),!e[0]&&(0,n.jsx)(s.A,{minHeight:15})]}):(0,n.jsxs)(l.A,{direction:"column",textAlign:"start",flexGrow:1,sx:{maxWidth:"13vw"},children:[e[0]&&(0,n.jsx)(I,{variant:"body3",isBetValid:a,minHeight:20,children:e[0]}),(0,n.jsx)(I,{variant:"body3",isBetValid:a,minHeight:20,children:e[1]}),!e[0]&&(0,n.jsx)(s.A,{minHeight:20})]});function A(e,t){return t?.homeTeam?.id===e?t.homeTeam:t?.awayTeam?.id===e?t.awayTeam:null}function v(e="row"){return"column"===e?{"& > :first-of-type":{borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"2px",borderBottomRightRadius:"2px"},"& > :last-of-type":{borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",borderTopLeftRadius:"2px",borderTopRightRadius:"2px"},"& > *:only-child":{borderRadius:"8px"},"& > :not(:first-of-type):not(:last-of-type)":{borderRadius:"2px"}}:{"& > :first-of-type":{borderTopLeftRadius:"8px",borderBottomLeftRadius:"8px",borderTopRightRadius:"2px",borderBottomRightRadius:"2px"},"& > :last-of-type":{borderTopRightRadius:"8px",borderBottomRightRadius:"8px",borderTopLeftRadius:"2px",borderBottomLeftRadius:"2px"},"& > *:only-child":{borderRadius:"8px"},"& > :not(:first-of-type):not(:last-of-type)":{borderRadius:"2px"}}}},604258:(e,t,a)=>{a.d(t,{Ri:()=>l,Yf:()=>s,_b:()=>n,cr:()=>i});var r,n=((r={}).UNKNOWN="UNKNOWN",r.MONEYLINE="MONEYLINE",r.SPREAD="SPREAD",r.TOTALS="TOTALS",r.PLAYER_PROP="PLAYER_PROP",r.TEAM="TEAM",r.RACE_TO="RACE_TO",r.GAME="GAME",r);let i={MONEYLINE:"MONEY_LINE",SPREAD:"SPREAD",TEAM:"TEAM",TOTALS:"TOTAL",PLAYER_PROP:"PLAYER_PROP",GAME:"GAME"},l=["MONEYLINE","SPREAD","TOTALS","TEAM","PLAYER_PROP","GAME","RACE_TO","UNKNOWN"],s={UNKNOWN:"Miscellaneous",MONEYLINE:"Moneyline",SPREAD:"Spread",TOTALS:"Totals",PLAYER_PROP:"Player Prop",TEAM:"Team",RACE_TO:"Race To",GAME:"Game"}},605437:(e,t,a)=>{a.d(t,{Ag:()=>o,G5:()=>c,Mq:()=>l,NK:()=>s,Tl:()=>u,gS:()=>d,ug:()=>i});var r=a(716763),n=a(142806);let i=(0,r.J1)`
  subscription ($filters: [InputFilterBaseRequestType]) {
    arbitrages(filters: $filters) {
      ...ToolsSubscriptionFragmentArbitrageType
      rOI
      isExpectedValueSide
    }
  }
  ${(0,n.n)("ArbitrageType")}
`;function l(e,t){let a=t.map(e=>e>0?e/100+1:1-100/e).map(e=>1/e),r=a.reduce((e,t)=>e+t,0);return a.map(t=>parseFloat((e*t/r).toFixed(2)))}function s(e,t,a){let r=a.map(e=>e>0?100/(e+100):-e/(-e+100)),n=r[t];return r.map((a,r)=>r!==t?parseFloat((e*a/n).toFixed(2)):e)}function u(e,t){return t>0?e*t/100:e/(-t/100)}let o=(e,t)=>l(t,e),d=(e,t,a,r)=>a?.[e]||r?.[e]||t,c=(e,t,a)=>e.map((e,r)=>d(r,e,t,a))},671126:(e,t,a)=>{a.d(t,{h9:()=>R,no:()=>w});var r=a(427866),n=a.n(r),i=a(212115),l=a(716763),s=a(743597),u=a(199807),o=a(403030),d=a(417594),c=a(992858),m=a(202946),p=a(372375),y=a(887494),g=a(15074),h=a(374420),T=a(288410),f=a(938631);let E=new Map,b=new Map,I=new Map,$=new Map;function A(e){let t=[];for(let a=0;a<e.length;a+=100){let r=e.slice(a,a+100);t.push(r)}return t}let v=new Map;async function S(e,t){let a=v.get(t);if(!a)return;v.delete(t);let r=Array.from(a.ids);try{let a=await Promise.all(A(r).map(async a=>{try{let r=await e.query({query:T.K3,variables:{ids:a,league:t},fetchPolicy:"no-cache"});return r.data?.players??[]}catch{return[]}}));d.M_.dispatch(p.HB.setPlayerData({league:t,players:a.flat()}))}catch(e){console.error("Failed to fetch player data:",e)}finally{let e=p.pH[t];r.forEach(t=>e?.delete(t)),a.waiters.forEach(e=>e())}}function w(e,t,a){let r=p.pH[t]||=new Set;a.forEach(e=>r.add(e));let n=v.get(t);return n||(n={ids:new Set,waiters:[]},v.set(t,n),setTimeout(()=>S(e,t),250)),a.forEach(e=>n.ids.add(e)),new Promise(e=>n.waiters.push(e))}let R=(e,t,a,r,v,S,R,M,C,P,O=!1)=>{let G=(0,d.GV)(e=>e.betCacheReducer.conditionValuePairs),k=(0,h.T)(),L=O||!a,N=(0,f.A)(),[,B]=(0,i.useState)(0),x=S&&a?`${e}:${v}:${a}`:null,[_,D]=(0,i.useState)(null);(0,i.useEffect)(()=>{if(!x)return;let e=setTimeout(()=>D(x),600);return()=>clearTimeout(e)},[x]);let q=null!==x&&_===x,F=(0,u.m)(),j=!!S&&!L&&q,[V,H]=(0,i.useState)(()=>{if(!x)return null;let e=E.get(x);return e?{key:x,data:e}:null});(0,i.useEffect)(()=>{if(!j||!x||!a)return;let t=!1;return(function(e,t,a,r){let n=`${t}:${a}:${r}`,i=E.get(n);if(i)return Promise.resolve(i);let s=b.get(n);if(s)return s;let u=`${t}:${r}`,o=I.get(u);o||(o={league:t,betMarketTypeEnum:r,games:new Map},I.set(u,o),setTimeout(()=>(function(e,t){let a=I.get(t);if(!a)return;I.delete(t);let r=Array.from(a.games.entries());for(let t=0;t<r.length;t+=10){let n=r.slice(t,t+10),i={league:a.league,betMarketTypeEnum:a.betMarketTypeEnum};n.forEach(([e],t)=>{i[`g${t}`]=e}),e.query({query:function(e){let t=$.get(e);if(!t){let a=Array.from({length:e},(e,t)=>t),r=a.map(e=>`$g${e}: Guid!`).join(", "),n=a.map(e=>`g${e}: completedBetMarket(league: $league, gameId: $g${e}, betMarketTypeEnum: $betMarketTypeEnum) { ...BetMarketTypeFragment }`).join("\n");t=(0,l.J1)`
      query BetCacheBatchQuery($league: LeagueEnum!, $betMarketTypeEnum: BetMarketTypeEnumTypeTwo!, ${r}) {
        ${n}
      }
      ${m.h$}
    `,$.set(e,t)}return t}(n.length),variables:i,fetchPolicy:"no-cache"}).then(e=>{n.forEach(([,t],a)=>{let r=e.data?.[`g${a}`]??[];var n=t.key;for(E.set(n,r);E.size>60;){let e=E.keys().next().value;if(void 0===e)break;E.delete(e)}t.resolve(r)})}).catch(e=>{n.forEach(([,t])=>t.reject(e))})}})(e,u),250));let d=new Promise((e,t)=>{o.games.set(a,{key:n,resolve:e,reject:t})}).finally(()=>{b.delete(n)});return b.set(n,d),d})(F,e,v,a).then(e=>{t||H({key:x,data:e})}).catch(()=>{t||H({key:x,data:[]})}),()=>{t=!0}},[j,x,F,e,v,a]);let W=V&&V.key===x?V.data:void 0,{data:U,loading:J,restart:Y}=(0,o.R)(m.$4,{variables:{request:{league:e,betMarketType:a,gameId:v}},context:{removeTypename:!0},onData:()=>{B(0)},skip:L||S,onError:t=>N(t,{request:{league:e,betMarketType:a,gameId:v}},Y,B)}),K=S?W:U?.betCache,Z=S?!q||void 0===W:J;return((e,t,a,r,l,o,m,h,f,E,b)=>{let[I]=(0,i.useState)(()=>{let{gameData:t,playerData:a}=d.M_.getState().gameDataCacheReducer;return{gameIds:Object.keys(t),playerIds:a[e]?Object.values(a[e]).map(e=>e.id):[]}}),$=(0,i.useRef)(I.gameIds),v=(0,i.useRef)(I.playerIds),S=(0,d.GV)(e=>e.betCacheReducer.selectedValueOne),R=(0,d.GV)(e=>e.betCacheReducer.selectedValueTwo),M=(0,i.useRef)({}),C=(0,i.useRef)({}),[P]=(0,s._)(T.Y,{fetchPolicy:"no-cache"}),O=(0,u.m)(),G=(0,d.jL)(),k=(0,i.useCallback)(()=>{let{gameData:t,playerData:a}=d.M_.getState().gameDataCacheReducer;$.current=Object.keys(t),v.current=a[e]?Object.values(a[e]).map(e=>e.id):[],M.current={},C.current={}},[e]);(0,i.useEffect)(()=>{M.current={},C.current={}},[e,t,a]),(0,i.useEffect)(()=>{let e=setInterval(()=>k(),(0,y.T)(10));return()=>{e&&clearInterval(e)}},[k]);let L=(0,i.useCallback)(t=>t.length?w(O,e,t):Promise.resolve(),[O,e]),N=(0,i.useCallback)(async t=>{let a=A(t);try{let t=(await Promise.all(a.map(async t=>{try{let a=await P({variables:{league:e,request:{gameIds:t}}});return a.data?.games??[]}catch{return[]}}))).flat(),r=[];t.forEach(e=>{e.awayPitcherId&&!v.current.includes(e.awayPitcherId)&&(r.push(e.awayPitcherId),v.current.push(e.awayPitcherId)),e.homePitcherId&&!v.current.includes(e.homePitcherId)&&(r.push(e.homePitcherId),v.current.push(e.homePitcherId))}),r.length&&await L(r);let i=t.reduce((e,t)=>(t&&n()().subtract(5,"hours").second()<=t.startDateTime&&e.push((0,g.G)(t)),e),[]);i.length&&G(p.HB.setGamesData(i))}catch(e){console.error("Failed to fetch game data:",e)}},[G,P,L,e]);(0,i.useEffect)(()=>{if(h||!l)return;let t=[],a=[],r=[],n={},i={};if(l.forEach(e=>{if(t?.includes(o)||t.push(o),$.current?.includes(o)||a?.includes(o)||a.push(o),e.conditions.length<1)return;let l=e.conditions[0];o&&null!==l.playerId&&(v.current?.includes(l.playerId)||r?.includes(l.playerId)||r.push(l.playerId),M.current[o]?.includes(l.playerId)||n[o]?.includes(l.playerId)||(o in n||(n[o]=[]),n[o].push(l.playerId),o in M.current||(M.current[o]=[]),M.current[o].push(l.playerId))),o&&null!==l.teamId&&e.listings&&e.listings.length>0&&!C.current[o]?.includes(l.teamId)&&!i[o]?.includes(l.teamId)&&(o in i||(i[o]=[]),i[o].push(l.teamId),o in C.current||(C.current[o]=[]),C.current[o].push(l.teamId))}),t.length&&G(c.Zg.setGameWithBetCache({data:t,type:"update"})),a.length&&(N(a),$.current=$.current.concat(a)),r.length){let t=p.pH[e],a=t?r.filter(e=>!t.has(e)):r;a.length&&L(a),v.current=v.current.concat(r)}Object.keys(n).length>0&&G(c.Zg.setPlayerByGames(n)),Object.keys(i).length>0&&G(c.Zg.setTeamByGames(i))},[l,G,N,L,o,e,h]);let B=(0,d.GV)(e=>e.constantsReducer.betSiteMap);(0,i.useEffect)(()=>{if(h||m)return;let e=l?.map(e=>({gameId:o,...e}));G(c.Zg.setOdds({marketTypes:e??[],betGroup:t,marketType:a,allSportbooksMap:B,selectedSportbooks:r,gameData:d.M_.getState().gameDataCacheReducer.gameData,minMaxWager:f,liquiditySumMode:E,includeAllValues:b})),G(c.Zg.setBetCache(e))},[t,G,a,B,l,r,m,h,f,E,b,S,R,o])})(e,t,a,r,K,v,Z,R||!k,M,C,P),{betCache:K??[],loading:Z,conditionValuePairs:G}}},690710:(e,t,a)=>{function r(e){let t=e?.trim();return t&&"null"!==t&&"undefined"!==t?t:""}function n(e,t){if(!e)return"";let a=r(e.firstName),n=r(e.lastName),i="";if(n&&a)i=`${n}, ${a.charAt(0)}`;else if(n)i=n;else{if(!a)return"";i=a}return t&&(i+=` (${t})`),i}function i(e){return e?[r(e.firstName),r(e.lastName)].filter(Boolean).join(" "):""}function l(e,t){return e.map((e,a)=>n(e,t?.[a]||null))}a.d(t,{$V:()=>i,Ay:()=>n,lh:()=>l})},737381:(e,t,a)=>{a.d(t,{j:()=>n});var r,n=((r={}).HOME_AWAY="HOME_AWAY",r.OVER_UNDER="OVER_UNDER",r.ODD_EVEN="ODD_EVEN",r.YES_NO="YES_NO",r.MULTI="MULTI",r.SPREAD="SPREAD",r.RACE_TO="RACE_TO",r)},737626:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(695155);a(212115);var n=a(642772);let i=function(e){return(0,r.jsxs)(n.A,{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,r.jsx)("path",{d:"M9.97061 5.98228C10.5213 5.98228 10.9677 6.42868 10.9677 6.97933V8.97343H12.9618C13.5124 8.97343 13.9588 9.41982 13.9588 9.97047C13.9588 10.5211 13.5124 10.9675 12.9618 10.9675H10.9677V12.9616C10.9677 13.5123 10.5213 13.9587 9.97061 13.9587C9.41996 13.9587 8.97356 13.5123 8.97356 12.9616V10.9675H6.97947C6.42882 10.9675 5.98242 10.5211 5.98242 9.97047C5.98242 9.41982 6.42882 8.97343 6.97947 8.97343H8.97356V6.97933C8.97356 6.42868 9.41996 5.98228 9.97061 5.98228Z"}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.97048 0C15.477 0 19.941 4.46393 19.941 9.97047C19.941 12.5444 18.9648 14.8898 17.3636 16.6587L18.7579 18.053C19.5225 17.6016 20.5225 17.703 21.1795 18.3597L22.5903 19.7696C23.369 20.5483 23.3691 21.8116 22.5903 22.5903C21.8603 23.3204 20.7047 23.3655 19.9215 22.7266L19.7696 22.5903L18.3597 21.1795C17.703 20.5225 17.6016 19.5225 18.053 18.7579L16.6587 17.3636C14.8898 18.9648 12.5444 19.9409 9.97048 19.9409C4.46393 19.9409 0 15.477 0 9.97047C0 4.46393 4.46393 0 9.97048 0ZM20.4745 19.0646C20.0851 18.6756 19.4539 18.6754 19.0646 19.0646C18.6754 19.4539 18.6756 20.0851 19.0646 20.4745L20.4745 21.8854C20.8639 22.2747 21.496 22.2747 21.8854 21.8854C22.2747 21.496 22.2747 20.8639 21.8854 20.4745L20.4745 19.0646ZM9.97048 0.997047C5.01459 0.997047 0.997048 5.01459 0.997048 9.97047C0.997048 14.9264 5.01459 18.9439 9.97048 18.9439C14.9264 18.9439 18.9439 14.9264 18.9439 9.97047C18.9439 5.01459 14.9264 0.997047 9.97048 0.997047Z"})]})}},938631:(e,t,a)=>{a.d(t,{A:()=>T});var r=a(396616),n=a(621123),i=a(7602),l=a(810507);function s(e,t,a){!e||!e.message||(e.message.includes("Hacking Attempted")||e.message.includes("IsRestricted required for advanced filter")||e.message.includes("sent goes beyond your package level"))&&(0,r.v4)(r=>{r.setExtra("userId",a),r.setExtra("variables",JSON.stringify(t)),r.setExtra("Error",e),r.setExtra("API Token",(0,i.SU)());let s=(0,l.wO)(e);s&&r.setExtra("graphQLErrors",s);{let e=window.__LAST_WS_PARAMS;e&&r.setExtra("wsInitParams",JSON.stringify(e,null,2))}(0,n.Cp)(e)})}var u=a(212115),o=a(527944),d=a(602834),c=a(709793),m=a(450910),p=a(777465);let y=function(){let e=(0,m.c)("common"),t=(0,o.sL)(e=>e.filterState),a=(0,p.A)(),r=(0,d.wA)();return(0,u.useCallback)(n=>{let i=n.message.match(/Unable to convert '(.*?)' to 'BetMarketTypeEnumTypeTwo/);i&&(a({betMarketInfo:t.betMarketInfo?.filter(e=>e!==i[1])},void 0,!0),r(c.b.showErrorPopup(e("removedBetMarketError"))),setTimeout(()=>{c.b.showErrorPopup(void 0),window.location.reload()},3e3))},[r,t.betMarketInfo,e,a])};var g=a(418750);function h(e,t,a){(0,r.v4)(r=>{r.setExtra("userId",a),r.setExtra("variables",JSON.stringify(t)),r.setTag("ws_error_retries_exhausted","true");{let e=window.__LAST_WS_PARAMS;e&&r.setExtra("wsInitParams",JSON.stringify(e,null,2))}(0,n.Cp)(e)})}let T=function(){let e=y(),t=(0,g.Jd)();return function(a,r={},n,i){if(a?.message==="One Connection Max"&&(i?i?.(e=>{let t=e+1;return t<=3&&setTimeout(()=>n(),1e3),t}):setTimeout(()=>n(),1e3)),a?.message=="Invalid or expired token"||(0,l.isJwtError)(a?.message)){i&&i?.(e=>{let a=e+1;return a<=3&&setTimeout(()=>t.refreshUserToken().then(n),1e3),a});return}i?i(i=>{let l=i+1;return l<=5?setTimeout(()=>n(),Math.min(1e3*2**(l-1),3e4)):(e(a),s(a,r,t.data?.userId),h(a,r,t.data?.userId)),l}):(e(a),s(a,r,t.data?.userId),h(a,r,t.data?.userId))}}},993010:(e,t,a)=>{a.d(t,{P:()=>i});var r,n=((r={}).BasketballTeamType="BasketballTeamType",r.FootballTeamType="FootballTeamType",r.IceHockeyTeamType="IceHockeyTeamType",r.SoccerTeamType="SoccerTeamType",r.TennisTeamType="TennisTeamType",r.BaseballTeamType="BaseballTeamType",r);let i=`
  fragment ITeamTypeFragment on ITeamType {
    ${Object.values(n).map(e=>`
        ... on ${e} {
          id
          name
          abbreviations
          ${"TennisTeamType"!==e?"city":""}
        }
      `)}
  }
`}}]);