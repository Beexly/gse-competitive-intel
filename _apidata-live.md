[Skip Navigation to Main Content](https://www.fantasypros.com/api-data/#main-container)

Coach

Search

ctrl + K

## Notifications

![bell icon](https://cdn.fantasypros.com/assets/images/notifications/no-notifications-graphic@3x.png)

### No notifications

You don't currently have any notifications

[premium upgrade link](https://www.fantasypros.com/premium/plans/) [Get Started](https://www.fantasypros.com/accounts/signin/ "")

[![FP Icon](https://images.fantasypros.com/images/branding/fantasypros-icon-fullcolor-dark-bg.svg)](https://www.fantasypros.com/)

- [**Home**](https://www.fantasypros.com/)
- [**Draft**](https://draftwizard.fantasypros.com/)
- [**Playbook**](https://www.fantasypros.com/nfl/myplaybook/)
- [**Rankings**](https://www.fantasypros.com/nfl/discover/rankings/)
- [**Research**](https://www.fantasypros.com/nfl/discover/research/)
- [**DFS**](https://www.fantasypros.com/nfl/discover/dfs/)
- [**More**](https://www.fantasypros.com/nfl/discover/more/)
- Favorites

# The fantasy data layer, as an API.

Expert consensus rankings, projections, player news, injuries and more, all from the same data powering millions of FantasyPros decisions, in one clean REST API across NFL, MLB, NBA & NHL.

[Get an API key](https://secure.fantasypros.com/api-keys/request/) [Read the docs](https://api.fantasypros.com/public/v2/docs)

✓ 4 sports covered✓ 130+ experts aggregated✓ JSON over HTTPS

rankings.sh

\# Consensus RB rankings (PPR) in one request

curl"https://api.fantasypros.com/public/v2/json\

/nfl/2026/consensus-rankings\

?position=RB&scoring=PPR" \

-H"x-api-key: YOUR\_API\_KEY"

\# → { "players": \[\
\
\# { "rank\_ecr": 1, "player\_name": "Bijan Robinson",\
\
\# "player\_team\_id": "ATL", "tier": 1 }, … \] }

What's in the API

## Everything behind FantasyPros, in one API

One base URL, one API key, predictable JSON. Pull exactly the datasets your product needs: rankings, projections, players, news, injuries and scoring, across every major sport.

Coverage

NFLMLBNBANHL

Less scraping. More shipping.

### Expert Consensus Rankings

ECR and ADP aggregated from 130+ ranked experts, with tiers and the spread of opinion (best, worst, std-dev). Includes types like Redraft, Dynasty and Rookies.

GET /{sport}/{season}/consensus-rankings

### Projections

Weekly & rest-of-season player projections with full stat lines for NFL, MLB and NBA.

GET /nfl/{season}/projections

### Players & Metadata

Canonical FantasyPros player IDs, teams, positions and external-ID cross-references.

GET /{sport}/players

### News & Injuries

Breaking player news and notes by category, plus injury designations and practice-report status.

GET /{sport}/news

### NFL Fantasy Points

Scored fantasy points accumulated by NFL players across any week range.

GET /nfl/{season}/player-points

### MLB Lineups

Confirmed and projected MLB game lineups with probable starters.

GET /mlb/lineups

Sample responses

## Explore the API right here

Select an endpoint to preview the output each FantasyPros API returns. This is the same JSON response shape you'll get in production once you have an API key.

Reference

## Every endpoint, one place

All requests go to `https://api.fantasypros.com/public/v2/json` over HTTPS and authenticate with your API key sent in the `x-api-key` header. Full parameters and response schemas live in the [API docs ↗](https://api.fantasypros.com/public/v2/docs).

Players, news & metadata

### Players

Player list and metadata, with external IDs and optional positional rankings.

GET /{sport}/players

### News

Player news and notes, filterable by category, player and recency.

GET /{sport}/news

### Injuries

Injury statuses by season/week, with optional practice-report probabilities.

GET /{sport}/injuries

### Compare Players

Compare 2–4 players head-to-head across expert rankings.

GET /{sport}/compare-players

Rankings

### Rankings

Per-expert and aggregate rankings with optional rank range and stats.

GET /{sport}/{season}/rankings

### Consensus Rankings

Detailed consensus rankings and ADP by position, scoring and week, across types like Redraft and Dynasty.

GET /{sport}/{season}/consensus-rankings

### Ranking Experts

Expert profiles and their underlying ranking details.

GET /{sport}/{season}/rankings/experts

Projections & scoring

### NFL Projections

Weekly, preseason and rest-of-season NFL projections by position.

GET /nfl/{season}/projections

### MLB Projections

Rest-of-season, daily and weekly MLB projections.

GET /mlb/{season}/projections

### NBA Projections

NBA player projections across season periods.

GET /nba/{season}/projections

### Player Points

Fantasy points accumulated by NFL players across a week range.

GET /nfl/{season}/player-points

MLB

### MLB Lineups

Game lineups and probable starters, confirmed or projected.

GET /mlb/lineups

[Full API reference & parameters](https://api.fantasypros.com/public/v2/docs)

Pricing

## Free to build. Priced to scale.

Prototype with a free key, get production access bundled with a FantasyPros MVP or HOF subscription, and move to Commercial for paid applications and high-volume use.

FANTASYPROS MVP


Already a FantasyPros MVP?

FantasyPros MVP and HOF subscriptions include personal production API keys for rankings, projections, players & news. Upgrade your membership, then activate access here.

[Activate member access](https://secure.fantasypros.com/api-keys/request/)

Free

$0 / mo

Build, test, and prototype against the API.

[Request a key](https://secure.fantasypros.com/api-keys/request/)

- All endpoints, sample data
- Generous daily call limit
- Live explorer & full docs
- Non-production use

MOST POPULAR

Premium

$5.99 / mo

Bundled with FantasyPros MVP or HOF (from $5.99/mo annual). Personal & non-commercial apps.

[Upgrade](https://secure.fantasypros.com/api-keys/request/)

- Production keys for personal apps
- Rankings, projections, players, news & injuries
- All four sports, higher rate limits
- Personal-use license & community support

Commercial

Custom

Commercial apps, sportsbooks, media & high-volume platforms.

[Talk to sales](mailto:support@fantasypros.com)

- Commercial license & redistribution rights
- Highest rate limits & custom SLA
- Historical data & bulk access
- Solutions engineer & priority support

How do I get an API key?

Request a key at [secure.fantasypros.com/api-keys/request](https://secure.fantasypros.com/api-keys/request/). Send it on every request in the `x-api-key` header.

How does Premium work with my FantasyPros MVP or HOF subscription?

Every MVP or HOF member can activate personal production API keys at no extra cost: the full set of read endpoints (rankings, projections, players, news, injuries) for personal and non-commercial apps.

When do I need a Commercial plan?

Move to **Commercial** when you need a commercial license, redistribution rights, historical/bulk access, the highest rate limits, or a custom SLA. A fit for sportsbooks, media networks, and high-volume platforms.

What sports are supported?

NFL, MLB, NBA and NHL. Most endpoints take the sport as a path parameter, e.g. `/nfl/2026/consensus-rankings`. A few are sport-specific, like `/mlb/lineups`.

## Build on the data fantasy runs on.

Get an API key and make your first call in minutes.

[Get an API key](https://secure.fantasypros.com/api-keys/request/) [Read the docs](https://api.fantasypros.com/public/v2/docs)

## Footer

### Sections of the Site

- [NFL](https://www.fantasypros.com/nfl/)
- [MLB](https://www.fantasypros.com/mlb/)
- [NBA](https://www.fantasypros.com/nba/)
- [NHL](https://www.fantasypros.com/nhl/)
- [AdvertisersAdvertise With Us](https://www.fantasypros.com/advertise/)
- [AffiliatesAffiliate Application](https://www.fantasypros.com/affiliate/)
- [Expert Platform](https://ep.fantasypros.com/contribute-advice/)
- [Gift Cards](https://secure.fantasypros.com/gift-cards/)
- [Mobile Apps](https://www.fantasypros.com/fantasy-mobile-apps/)
- [News Desk](https://ep.fantasypros.com/contribute-advice/ "Apply to be a News Desk correspondent")
- [Shop](https://shop.fantasypros.com/ "Visit the FantasyPros Shop powered by Shopify.com")
- [Sports Betting](https://www.bettingpros.com/?distinct_id=$device:db311162-05e0-4c53-ac9b-5676f0164ae2&referred_by=https%3A%2F%2Fwww.fantasypros.com%2Fapi-data%2F)

### Bottom Menu

#### Utility Links

[![FantasyPros](https://images.fantasypros.com/images/branding/fantasypros-fullcolor-light-bg.svg)](https://www.fantasypros.com/)

- [FantasyPros on YouTube](https://www.youtube.com/FantasyPros)
- [FantasyPros on Twitter](https://twitter.com/FantasyPros)
- [FantasyPros on Instagram](https://www.instagram.com/fantasypros/)
- [FantasyPros on Facebook](https://www.facebook.com/FantasyPros)

- [Privacy](https://www.fantasypros.com/about/privacy/)
- [Do Not Sell](https://www.fantasypros.com/api-data/#do_not_sell_modal)
- [Terms](https://www.fantasypros.com/about/legal/)
- [Accessibility](https://www.fantasypros.com/about/accessibility/)
- [Company](https://www.fantasypros.com/about/)
- [Blog](https://blog.fantasypros.com/)
- [Jobs](https://www.fantasypros.com/careers/)
- [Contact](https://www.fantasypros.com/about/contact/)
- [API](https://www.fantasypros.com/api-data/)
- [Help](https://support.fantasypros.com/)
- [Premium](https://secure.fantasypros.com/plans/)
- [Sign In](https://www.fantasypros.com/accounts/signin/?next=https://www.fantasypros.com/api-data/)

© 2010-2026FantasyPros.com. All rights reserved.

FantasyPros® and the FantasyPros logo are registered trademarks of Marzen Media LLC

Do Not Sell My Personal Information

Do Not Sell

Are you looking to contact Customer Support about a subscription or account related question?

[Yes](https://secure.fantasypros.com/support-request/)

[No, I'm a California resident looking for the California Consumer Privacy Act form](https://www.fantasypros.com/about/privacy/ccpa-data-subject-request-opt-out/)