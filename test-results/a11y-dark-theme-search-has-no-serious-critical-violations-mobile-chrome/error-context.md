# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> search has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 1 axe violation(s) on dark theme > search:

[SERIOUS] document-title: Ensure each HTML document contains a non-empty <title> element
  Help: https://dequeuniversity.com/rules/axe/4.10/document-title?application=playwright
  Nodes (1):
    - <html class="dark" style="color-scheme: light;" id="__next_error__">
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - region "Search Creators" [ref=e2]:
    - generic [ref=e3]:
      - heading "Search Creators" [level=1] [ref=e4]
      - paragraph [ref=e5]: Find creators by name, category, or tag.
    - generic [ref=e6]:
      - generic [ref=e8]:
        - img [ref=e9]
        - searchbox "Search" [active] [ref=e12]
      - button "Toggle filters" [ref=e13]:
        - img [ref=e14]
        - text: Filters
    - paragraph [ref=e16]: 25 creators found
    - generic [ref=e19]:
      - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e21] [cursor=pointer]:
        - /url: /creator/nft-creator
        - img [ref=e24]
        - generic [ref=e26]:
          - generic [ref=e28]: NC
          - generic [ref=e29]:
            - paragraph [ref=e30]: art
            - heading "NFT Creator" [level=3] [ref=e31]
            - paragraph [ref=e32]: "@nft-creator"
          - paragraph [ref=e33]: Minting experiences that transcend the digital realm.
          - generic [ref=e34]:
            - img [ref=e35]
            - text: Sydney, AU
          - generic [ref=e38]:
            - generic [ref=e39]:
              - paragraph [ref=e40]: 4,200
              - paragraph [ref=e41]: Followers
            - generic [ref=e42]:
              - paragraph [ref=e43]: $15,000
              - paragraph [ref=e44]: Earnings
      - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e46] [cursor=pointer]:
        - /url: /creator/protocol-dev
        - img [ref=e49]
        - generic [ref=e51]:
          - generic [ref=e53]: PD
          - generic [ref=e54]:
            - paragraph [ref=e55]: tech
            - heading "Protocol Dev" [level=3] [ref=e56]
            - paragraph [ref=e57]: "@protocol-dev"
          - paragraph [ref=e58]: Optimizing the core protocols for maximum efficiency.
          - generic [ref=e59]:
            - img [ref=e60]
            - text: Chicago, US
          - generic [ref=e63]:
            - generic [ref=e64]:
              - paragraph [ref=e65]: 4,100
              - paragraph [ref=e66]: Followers
            - generic [ref=e67]:
              - paragraph [ref=e68]: $16,000
              - paragraph [ref=e69]: Earnings
      - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e71] [cursor=pointer]:
        - /url: /creator/solidity-dev
        - img [ref=e74]
        - generic [ref=e76]:
          - generic [ref=e78]: SD
          - generic [ref=e79]:
            - paragraph [ref=e80]: tech
            - heading "Solidity Dev" [level=3] [ref=e81]
            - paragraph [ref=e82]: "@solidity-dev"
          - paragraph [ref=e83]: Forging bulletproof smart contracts for the world's applications.
          - generic [ref=e84]:
            - img [ref=e85]
            - text: San Francisco, US
          - generic [ref=e88]:
            - generic [ref=e89]:
              - paragraph [ref=e90]: 3,900
              - paragraph [ref=e91]: Followers
            - generic [ref=e92]:
              - paragraph [ref=e93]: $14,500
              - paragraph [ref=e94]: Earnings
      - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e96] [cursor=pointer]:
        - /url: /creator/smart-contract-dev
        - img [ref=e99]
        - generic [ref=e101]:
          - generic [ref=e103]: SC
          - generic [ref=e104]:
            - paragraph [ref=e105]: tech
            - heading "Smart Contract Dev" [level=3] [ref=e106]
            - paragraph [ref=e107]: "@smart-contract-dev"
          - paragraph [ref=e108]: Writing secure, efficient code for the on-chain economy.
          - generic [ref=e109]:
            - img [ref=e110]
            - text: Boston, US
          - generic [ref=e113]:
            - generic [ref=e114]:
              - paragraph [ref=e115]: 3,800
              - paragraph [ref=e116]: Followers
            - generic [ref=e117]:
              - paragraph [ref=e118]: $14,000
              - paragraph [ref=e119]: Earnings
      - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e121] [cursor=pointer]:
        - /url: /creator/crypto-educator
        - img [ref=e124]
        - generic [ref=e126]:
          - generic [ref=e128]: CE
          - generic [ref=e129]:
            - paragraph [ref=e130]: education
            - heading "Crypto Educator" [level=3] [ref=e131]
            - paragraph [ref=e132]: "@crypto-educator"
          - paragraph [ref=e133]: Helping the world understand the power of crypto.
          - generic [ref=e134]:
            - img [ref=e135]
            - text: Austin, US
          - generic [ref=e138]:
            - generic [ref=e139]:
              - paragraph [ref=e140]: 3,500
              - paragraph [ref=e141]: Followers
            - generic [ref=e142]:
              - paragraph [ref=e143]: $10,500
              - paragraph [ref=e144]: Earnings
      - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e146] [cursor=pointer]:
        - /url: /creator/stellar-dev
        - img [ref=e149]
        - generic [ref=e151]:
          - generic [ref=e153]: SD
          - generic [ref=e154]:
            - paragraph [ref=e155]: tech
            - heading "Stellar Dev" [level=3] [ref=e156]
            - paragraph [ref=e157]: "@stellar-dev"
          - paragraph [ref=e158]: Building the future of open finance on Stellar.
          - generic [ref=e159]:
            - img [ref=e160]
            - text: San Francisco, US
          - generic [ref=e163]:
            - generic [ref=e164]:
              - paragraph [ref=e165]: 3,400
              - paragraph [ref=e166]: Followers
            - generic [ref=e167]:
              - paragraph [ref=e168]: $12,000
              - paragraph [ref=e169]: Earnings
      - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e171] [cursor=pointer]:
        - /url: /creator/gamefi-dev
        - img [ref=e174]
        - generic [ref=e176]:
          - generic [ref=e178]: GD
          - generic [ref=e179]:
            - paragraph [ref=e180]: tech
            - heading "GameFi Dev" [level=3] [ref=e181]
            - paragraph [ref=e182]: "@gamefi-dev"
          - paragraph [ref=e183]: Where gaming meets finance, we're building the future.
          - generic [ref=e184]:
            - img [ref=e185]
            - text: Los Angeles, US
          - generic [ref=e188]:
            - generic [ref=e189]:
              - paragraph [ref=e190]: 3,300
              - paragraph [ref=e191]: Followers
            - generic [ref=e192]:
              - paragraph [ref=e193]: $13,000
              - paragraph [ref=e194]: Earnings
      - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e196] [cursor=pointer]:
        - /url: /creator/defi-expert
        - generic [ref=e197]:
          - generic [ref=e199]: DE
          - generic [ref=e200]:
            - paragraph [ref=e201]: tech
            - heading "DeFi Expert" [level=3] [ref=e202]
            - paragraph [ref=e203]: "@defi-expert"
          - paragraph [ref=e204]: Navigating the deep waters of decentralized finance.
          - generic [ref=e205]:
            - img [ref=e206]
            - text: Singapore, SG
          - generic [ref=e209]:
            - generic [ref=e210]:
              - paragraph [ref=e211]: 3,100
              - paragraph [ref=e212]: Followers
            - generic [ref=e213]:
              - paragraph [ref=e214]: $11,000
              - paragraph [ref=e215]: Earnings
      - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e217] [cursor=pointer]:
        - /url: /creator/blockchain-edu
        - img [ref=e220]
        - generic [ref=e222]:
          - generic [ref=e224]: BE
          - generic [ref=e225]:
            - paragraph [ref=e226]: education
            - heading "Blockchain Edu" [level=3] [ref=e227]
            - paragraph [ref=e228]: "@blockchain-edu"
          - paragraph [ref=e229]: Simplifying blockchain for the next generation of builders.
          - generic [ref=e230]:
            - img [ref=e231]
            - text: New York, US
          - generic [ref=e234]:
            - generic [ref=e235]:
              - paragraph [ref=e236]: 2,900
              - paragraph [ref=e237]: Followers
            - generic [ref=e238]:
              - paragraph [ref=e239]: $8,900
              - paragraph [ref=e240]: Earnings
      - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e242] [cursor=pointer]:
        - /url: /creator/metaverse-architect
        - img [ref=e245]
        - generic [ref=e247]:
          - generic [ref=e249]: MA
          - generic [ref=e250]:
            - paragraph [ref=e251]: tech
            - heading "Metaverse Architect" [level=3] [ref=e252]
            - paragraph [ref=e253]: "@metaverse-architect"
          - paragraph [ref=e254]: Building the spaces where we'll live and play tomorrow.
          - generic [ref=e255]:
            - img [ref=e256]
            - text: Seoul, KR
          - generic [ref=e259]:
            - generic [ref=e260]:
              - paragraph [ref=e261]: 2,800
              - paragraph [ref=e262]: Followers
            - generic [ref=e263]:
              - paragraph [ref=e264]: $9,200
              - paragraph [ref=e265]: Earnings
      - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e267] [cursor=pointer]:
        - /url: /creator/web3-builder
        - img [ref=e270]
        - generic [ref=e272]:
          - generic [ref=e274]: WB
          - generic [ref=e275]:
            - paragraph [ref=e276]: tech
            - heading "Web3 Builder" [level=3] [ref=e277]
            - paragraph [ref=e278]: "@web3-builder"
          - paragraph [ref=e279]: Architecting the infrastructure for a more open web.
          - generic [ref=e280]:
            - img [ref=e281]
            - text: Toronto, CA
          - generic [ref=e284]:
            - generic [ref=e285]:
              - paragraph [ref=e286]: 2,700
              - paragraph [ref=e287]: Followers
            - generic [ref=e288]:
              - paragraph [ref=e289]: $9,500
              - paragraph [ref=e290]: Earnings
      - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e292] [cursor=pointer]:
        - /url: /creator/generative-artist
        - img [ref=e295]
        - generic [ref=e297]:
          - generic [ref=e299]: GA
          - generic [ref=e300]:
            - paragraph [ref=e301]: art
            - heading "Generative Artist" [level=3] [ref=e302]
            - paragraph [ref=e303]: "@generative-artist"
          - paragraph [ref=e304]: Letting the algorithms paint the portrait of tomorrow.
          - generic [ref=e305]:
            - img [ref=e306]
            - text: Copenhagen, DK
          - generic [ref=e309]:
            - generic [ref=e310]:
              - paragraph [ref=e311]: 2,600
              - paragraph [ref=e312]: Followers
            - generic [ref=e313]:
              - paragraph [ref=e314]: $8,200
              - paragraph [ref=e315]: Earnings
      - link "education Blockchain Analyst @blockchain-analyst Decoding the data to reveal the truth behind the blocks. Lisbon, PT 2,400 Followers $7,300 Earnings" [ref=e317] [cursor=pointer]:
        - /url: /creator/blockchain-analyst
        - img [ref=e320]
        - generic [ref=e322]:
          - generic [ref=e324]: BA
          - generic [ref=e325]:
            - paragraph [ref=e326]: education
            - heading "Blockchain Analyst" [level=3] [ref=e327]
            - paragraph [ref=e328]: "@blockchain-analyst"
          - paragraph [ref=e329]: Decoding the data to reveal the truth behind the blocks.
          - generic [ref=e330]:
            - img [ref=e331]
            - text: Lisbon, PT
          - generic [ref=e334]:
            - generic [ref=e335]:
              - paragraph [ref=e336]: 2,400
              - paragraph [ref=e337]: Followers
            - generic [ref=e338]:
              - paragraph [ref=e339]: $7,300
              - paragraph [ref=e340]: Earnings
      - link "art Digital Artist @digital-artist Exploring colors and forms in a digital canvas. Barcelona, ES 2,300 Followers $4,100 Earnings" [ref=e342] [cursor=pointer]:
        - /url: /creator/digital-artist
        - generic [ref=e343]:
          - generic [ref=e345]: DA
          - generic [ref=e346]:
            - paragraph [ref=e347]: art
            - heading "Digital Artist" [level=3] [ref=e348]
            - paragraph [ref=e349]: "@digital-artist"
          - paragraph [ref=e350]: Exploring colors and forms in a digital canvas.
          - generic [ref=e351]:
            - img [ref=e352]
            - text: Barcelona, ES
          - generic [ref=e355]:
            - generic [ref=e356]:
              - paragraph [ref=e357]: 2,300
              - paragraph [ref=e358]: Followers
            - generic [ref=e359]:
              - paragraph [ref=e360]: $4,100
              - paragraph [ref=e361]: Earnings
      - link "art 3D Artist @3d-artist Giving depth and life to digital dreams. Milan, IT 2,200 Followers $3,800 Earnings" [ref=e363] [cursor=pointer]:
        - /url: /creator/3d-artist
        - generic [ref=e364]:
          - generic [ref=e366]: 3A
          - generic [ref=e367]:
            - paragraph [ref=e368]: art
            - heading "3D Artist" [level=3] [ref=e369]
            - paragraph [ref=e370]: "@3d-artist"
          - paragraph [ref=e371]: Giving depth and life to digital dreams.
          - generic [ref=e372]:
            - img [ref=e373]
            - text: Milan, IT
          - generic [ref=e376]:
            - generic [ref=e377]:
              - paragraph [ref=e378]: 2,200
              - paragraph [ref=e379]: Followers
            - generic [ref=e380]:
              - paragraph [ref=e381]: $3,800
              - paragraph [ref=e382]: Earnings
      - link "community Community Lab @community-lab Empowering decentralized communities through collaboration. London, UK 2,100 Followers $6,700 Earnings" [ref=e384] [cursor=pointer]:
        - /url: /creator/community-lab
        - img [ref=e387]
        - generic [ref=e389]:
          - generic [ref=e391]: CL
          - generic [ref=e392]:
            - paragraph [ref=e393]: community
            - heading "Community Lab" [level=3] [ref=e394]
            - paragraph [ref=e395]: "@community-lab"
          - paragraph [ref=e396]: Empowering decentralized communities through collaboration.
          - generic [ref=e397]:
            - img [ref=e398]
            - text: London, UK
          - generic [ref=e401]:
            - generic [ref=e402]:
              - paragraph [ref=e403]: 2,100
              - paragraph [ref=e404]: Followers
            - generic [ref=e405]:
              - paragraph [ref=e406]: $6,700
              - paragraph [ref=e407]: Earnings
      - link "education Web3 Educator @web3-educator Onboarding the world to the decentralized web. Mexico City, MX 2,100 Followers $4,600 Earnings" [ref=e409] [cursor=pointer]:
        - /url: /creator/web3-educator
        - generic [ref=e410]:
          - generic [ref=e412]: WE
          - generic [ref=e413]:
            - paragraph [ref=e414]: education
            - heading "Web3 Educator" [level=3] [ref=e415]
            - paragraph [ref=e416]: "@web3-educator"
          - paragraph [ref=e417]: Onboarding the world to the decentralized web.
          - generic [ref=e418]:
            - img [ref=e419]
            - text: Mexico City, MX
          - generic [ref=e422]:
            - generic [ref=e423]:
              - paragraph [ref=e424]: 2,100
              - paragraph [ref=e425]: Followers
            - generic [ref=e426]:
              - paragraph [ref=e427]: $4,600
              - paragraph [ref=e428]: Earnings
      - link "community DAO Organizer @dao-organizer Designing governance systems for collective action. Amsterdam, NL 1,950 Followers $5,800 Earnings" [ref=e430] [cursor=pointer]:
        - /url: /creator/dao-organizer
        - img [ref=e433]
        - generic [ref=e435]:
          - generic [ref=e437]: DO
          - generic [ref=e438]:
            - paragraph [ref=e439]: community
            - heading "DAO Organizer" [level=3] [ref=e440]
            - paragraph [ref=e441]: "@dao-organizer"
          - paragraph [ref=e442]: Designing governance systems for collective action.
          - generic [ref=e443]:
            - img [ref=e444]
            - text: Amsterdam, NL
          - generic [ref=e447]:
            - generic [ref=e448]:
              - paragraph [ref=e449]: 1,950
              - paragraph [ref=e450]: Followers
            - generic [ref=e451]:
              - paragraph [ref=e452]: $5,800
              - paragraph [ref=e453]: Earnings
      - link "education Crypto Writer @crypto-writer Telling the stories that define the crypto era. Dublin, IE 1,900 Followers $5,500 Earnings" [ref=e455] [cursor=pointer]:
        - /url: /creator/crypto-writer
        - img [ref=e458]
        - generic [ref=e460]:
          - generic [ref=e462]: CW
          - generic [ref=e463]:
            - paragraph [ref=e464]: education
            - heading "Crypto Writer" [level=3] [ref=e465]
            - paragraph [ref=e466]: "@crypto-writer"
          - paragraph [ref=e467]: Telling the stories that define the crypto era.
          - generic [ref=e468]:
            - img [ref=e469]
            - text: Dublin, IE
          - generic [ref=e472]:
            - generic [ref=e473]:
              - paragraph [ref=e474]: 1,900
              - paragraph [ref=e475]: Followers
            - generic [ref=e476]:
              - paragraph [ref=e477]: $5,500
              - paragraph [ref=e478]: Earnings
      - link "art Crypto Artist @crypto-artist Bridging the gap between traditional art and blockchain. Paris, FR 1,800 Followers $5,200 Earnings" [ref=e480] [cursor=pointer]:
        - /url: /creator/crypto-artist
        - img [ref=e483]
        - generic [ref=e485]:
          - generic [ref=e487]: CA
          - generic [ref=e488]:
            - paragraph [ref=e489]: art
            - heading "Crypto Artist" [level=3] [ref=e490]
            - paragraph [ref=e491]: "@crypto-artist"
          - paragraph [ref=e492]: Bridging the gap between traditional art and blockchain.
          - generic [ref=e493]:
            - img [ref=e494]
            - text: Paris, FR
          - generic [ref=e497]:
            - generic [ref=e498]:
              - paragraph [ref=e499]: 1,800
              - paragraph [ref=e500]: Followers
            - generic [ref=e501]:
              - paragraph [ref=e502]: $5,200
              - paragraph [ref=e503]: Earnings
      - link "community Community Manager @community-manager Nurturing vibrant, inclusive communities for everyone. Stockholm, SE 1,750 Followers $4,900 Earnings" [ref=e505] [cursor=pointer]:
        - /url: /creator/community-manager
        - img [ref=e508]
        - generic [ref=e510]:
          - generic [ref=e512]: CM
          - generic [ref=e513]:
            - paragraph [ref=e514]: community
            - heading "Community Manager" [level=3] [ref=e515]
            - paragraph [ref=e516]: "@community-manager"
          - paragraph [ref=e517]: Nurturing vibrant, inclusive communities for everyone.
          - generic [ref=e518]:
            - img [ref=e519]
            - text: Stockholm, SE
          - generic [ref=e522]:
            - generic [ref=e523]:
              - paragraph [ref=e524]: 1,750
              - paragraph [ref=e525]: Followers
            - generic [ref=e526]:
              - paragraph [ref=e527]: $4,900
              - paragraph [ref=e528]: Earnings
      - link "art Token Designer @token-designer Crafting sustainable tokens with purpose and style. Zurich, CH 1,600 Followers $3,400 Earnings" [ref=e530] [cursor=pointer]:
        - /url: /creator/token-designer
        - generic [ref=e531]:
          - generic [ref=e533]: TD
          - generic [ref=e534]:
            - paragraph [ref=e535]: art
            - heading "Token Designer" [level=3] [ref=e536]
            - paragraph [ref=e537]: "@token-designer"
          - paragraph [ref=e538]: Crafting sustainable tokens with purpose and style.
          - generic [ref=e539]:
            - img [ref=e540]
            - text: Zurich, CH
          - generic [ref=e543]:
            - generic [ref=e544]:
              - paragraph [ref=e545]: 1,600
              - paragraph [ref=e546]: Followers
            - generic [ref=e547]:
              - paragraph [ref=e548]: $3,400
              - paragraph [ref=e549]: Earnings
      - link "community NFT Collector @nft-collector Curating the finest digital assets in the metaverse. Singapore, SG 1,400 Followers $2,900 Earnings" [ref=e551] [cursor=pointer]:
        - /url: /creator/nft-collector
        - img [ref=e554]
        - generic [ref=e556]:
          - generic [ref=e558]: NC
          - generic [ref=e559]:
            - paragraph [ref=e560]: community
            - heading "NFT Collector" [level=3] [ref=e561]
            - paragraph [ref=e562]: "@nft-collector"
          - paragraph [ref=e563]: Curating the finest digital assets in the metaverse.
          - generic [ref=e564]:
            - img [ref=e565]
            - text: Singapore, SG
          - generic [ref=e568]:
            - generic [ref=e569]:
              - paragraph [ref=e570]: 1,400
              - paragraph [ref=e571]: Followers
            - generic [ref=e572]:
              - paragraph [ref=e573]: $2,900
              - paragraph [ref=e574]: Earnings
      - link "art Alice @alice Digital artist exploring the intersection of nature and code. Berlin, DE 1,250 Followers $4,500 Earnings" [ref=e576] [cursor=pointer]:
        - /url: /creator/alice
        - img [ref=e579]
        - generic [ref=e581]:
          - generic [ref=e583]: A
          - generic [ref=e584]:
            - paragraph [ref=e585]: art
            - heading "Alice" [level=3] [ref=e586]
            - paragraph [ref=e587]: "@alice"
          - paragraph [ref=e588]: Digital artist exploring the intersection of nature and code.
          - generic [ref=e589]:
            - img [ref=e590]
            - text: Berlin, DE
          - generic [ref=e593]:
            - generic [ref=e594]:
              - paragraph [ref=e595]: 1,250
              - paragraph [ref=e596]: Followers
            - generic [ref=e597]:
              - paragraph [ref=e598]: $4,500
              - paragraph [ref=e599]: Earnings
      - link "art Pixel Maker @pixelmaker Pixel by pixel, I bring worlds to life. Tokyo, JP 890 Followers $2,300 Earnings" [ref=e601] [cursor=pointer]:
        - /url: /creator/pixelmaker
        - generic [ref=e602]:
          - generic [ref=e604]: PM
          - generic [ref=e605]:
            - paragraph [ref=e606]: art
            - heading "Pixel Maker" [level=3] [ref=e607]
            - paragraph [ref=e608]: "@pixelmaker"
          - paragraph [ref=e609]: Pixel by pixel, I bring worlds to life.
          - generic [ref=e610]:
            - img [ref=e611]
            - text: Tokyo, JP
          - generic [ref=e614]:
            - generic [ref=e615]:
              - paragraph [ref=e616]: "890"
              - paragraph [ref=e617]: Followers
            - generic [ref=e618]:
              - paragraph [ref=e619]: $2,300
              - paragraph [ref=e620]: Earnings
  - generic [ref=e621]:
    - img [ref=e623]
    - button "Open Tanstack query devtools" [ref=e671] [cursor=pointer]:
      - img [ref=e672]
  - alert [ref=e720]
```

# Test source

```ts
  1   | /**
  2   |  * Accessibility testing helpers for @axe-core/playwright.
  3   |  *
  4   |  * Usage:
  5   |  *   import { runAxe, forceTheme } from '../helpers/a11y';
  6   |  *   await forceTheme(page, 'dark');
  7   |  *   const violations = await runAxe(page);
  8   |  */
  9   | 
  10  | import AxeBuilder from '@axe-core/playwright';
  11  | import type { Page } from '@playwright/test';
  12  | import { expect } from '@playwright/test';
  13  | 
  14  | /** ImpactValue from axe-core */
  15  | type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical';
  16  | 
  17  | /**
  18  |  * Rules that produce known third-party / browser-default violations that we
  19  |  * cannot fix in our codebase.  Each entry MUST include an inline justification.
  20  |  */
  21  | const EXCLUDED_RULES: { id: string; reason: string }[] = [
  22  |   // next-themes injects a <script> tag before <head> content; axe flags it
  23  |   // as an html-has-lang timing issue during hydration — not fixable from app code.
  24  |   { id: 'html-has-lang', reason: 'Covered by locale layout; false-positive during SSR hydration in tests.' },
  25  | ];
  26  | 
  27  | /**
  28  |  * Run axe-core on the current page state and return violations.
  29  |  * Gated to serious + critical impact by default.
  30  |  *
  31  |  * @param page        Playwright Page
  32  |  * @param minImpact   Minimum violation impact level to include (default: 'serious')
  33  |  * @param include     Optional CSS selector to scope the scan to a subtree
  34  |  */
  35  | export async function runAxe(
  36  |   page: Page,
  37  |   minImpact: ImpactValue = 'serious',
  38  |   include?: string,
  39  | ): Promise<import('axe-core').Result[]> {
  40  |   const impactOrder: ImpactValue[] = ['minor', 'moderate', 'serious', 'critical'];
  41  |   const minIndex = impactOrder.indexOf(minImpact);
  42  | 
  43  |   let builder = new AxeBuilder({ page });
  44  | 
  45  |   EXCLUDED_RULES.forEach(({ id }) => builder = builder.disableRules([id]));
  46  | 
  47  |   if (include) {
  48  |     builder = builder.include(include);
  49  |   }
  50  | 
  51  |   const { violations } = await builder.analyze();
  52  | 
  53  |   return violations.filter(
  54  |     (v) => v.impact && impactOrder.indexOf(v.impact as ImpactValue) >= minIndex,
  55  |   );
  56  | }
  57  | 
  58  | /**
  59  |  * Assert zero serious/critical violations.  Prints a descriptive failure
  60  |  * message with each violation's help URL on failure.
  61  |  */
  62  | export async function expectNoViolations(
  63  |   page: Page,
  64  |   context = 'page',
  65  |   include?: string,
  66  | ): Promise<void> {
  67  |   const violations = await runAxe(page, 'serious', include);
  68  | 
  69  |   if (violations.length > 0) {
  70  |     const report = violations
  71  |       .map(
  72  |         (v) =>
  73  |           `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
  74  |           `  Help: ${v.helpUrl}\n` +
  75  |           `  Nodes (${v.nodes.length}):\n` +
  76  |           v.nodes
  77  |             .slice(0, 3)
  78  |             .map((n) => `    - ${n.html}`)
  79  |             .join('\n'),
  80  |       )
  81  |       .join('\n\n');
  82  | 
> 83  |     throw new Error(
      |           ^ Error: 1 axe violation(s) on dark theme > search:
  84  |       `${violations.length} axe violation(s) on ${context}:\n\n${report}`,
  85  |     );
  86  |   }
  87  | 
  88  |   expect(violations).toHaveLength(0);
  89  | }
  90  | 
  91  | /**
  92  |  * Force a specific theme on the page by setting the class on <html> and
  93  |  * writing to localStorage so next-themes picks it up on reload.
  94  |  */
  95  | export async function forceTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  96  |   await page.evaluate((t) => {
  97  |     // next-themes stores the value under this key by default
  98  |     localStorage.setItem('theme', t);
  99  |     document.documentElement.classList.toggle('dark', t === 'dark');
  100 |     document.documentElement.classList.toggle('light', t === 'light');
  101 |   }, theme);
  102 | }
  103 | 
  104 | /**
  105 |  * Navigate and wait for the page to fully settle (no network activity,
  106 |  * no pending animations) before running axe.
  107 |  */
  108 | export async function gotoAndSettle(page: Page, path: string): Promise<void> {
  109 |   await page.goto(path);
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```