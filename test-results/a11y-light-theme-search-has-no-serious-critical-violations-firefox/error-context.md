# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> light theme >> search has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 1 axe violation(s) on light theme > search:

[SERIOUS] document-title: Ensure each HTML document contains a non-empty <title> element
  Help: https://dequeuniversity.com/rules/axe/4.10/document-title?application=playwright
  Nodes (1):
    - <html class="light" style="color-scheme: light;" id="__next_error__">
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Search Creators" [ref=e2]:
    - generic [ref=e3]:
      - heading "Search Creators" [level=1] [ref=e4]
      - paragraph [ref=e5]: Find creators by name, category, or tag.
    - generic [ref=e6]:
      - generic [ref=e8]:
        - img [ref=e9]
        - searchbox "Search" [ref=e12]
      - button "Toggle filters" [ref=e13]:
        - img [ref=e14]
        - text: Filters
    - paragraph [ref=e25]: 25 creators found
    - generic [ref=e28]:
      - link "art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e30] [cursor=pointer]:
        - /url: /creator/nft-creator
        - img [ref=e33]
        - generic [ref=e35]:
          - generic [ref=e37]: NC
          - generic [ref=e38]:
            - paragraph [ref=e39]: art
            - heading "NFT Creator" [level=3] [ref=e40]
            - paragraph [ref=e41]: "@nft-creator"
          - paragraph [ref=e42]: Minting experiences that transcend the digital realm.
          - generic [ref=e43]:
            - img [ref=e44]
            - text: Sydney, AU
          - generic [ref=e47]:
            - generic [ref=e48]:
              - paragraph [ref=e49]: 4,200
              - paragraph [ref=e50]: Followers
            - generic [ref=e51]:
              - paragraph [ref=e52]: $15,000
              - paragraph [ref=e53]: Earnings
      - link "tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e55] [cursor=pointer]:
        - /url: /creator/protocol-dev
        - img [ref=e58]
        - generic [ref=e60]:
          - generic [ref=e62]: PD
          - generic [ref=e63]:
            - paragraph [ref=e64]: tech
            - heading "Protocol Dev" [level=3] [ref=e65]
            - paragraph [ref=e66]: "@protocol-dev"
          - paragraph [ref=e67]: Optimizing the core protocols for maximum efficiency.
          - generic [ref=e68]:
            - img [ref=e69]
            - text: Chicago, US
          - generic [ref=e72]:
            - generic [ref=e73]:
              - paragraph [ref=e74]: 4,100
              - paragraph [ref=e75]: Followers
            - generic [ref=e76]:
              - paragraph [ref=e77]: $16,000
              - paragraph [ref=e78]: Earnings
      - link "tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e80] [cursor=pointer]:
        - /url: /creator/solidity-dev
        - img [ref=e83]
        - generic [ref=e85]:
          - generic [ref=e87]: SD
          - generic [ref=e88]:
            - paragraph [ref=e89]: tech
            - heading "Solidity Dev" [level=3] [ref=e90]
            - paragraph [ref=e91]: "@solidity-dev"
          - paragraph [ref=e92]: Forging bulletproof smart contracts for the world's applications.
          - generic [ref=e93]:
            - img [ref=e94]
            - text: San Francisco, US
          - generic [ref=e97]:
            - generic [ref=e98]:
              - paragraph [ref=e99]: 3,900
              - paragraph [ref=e100]: Followers
            - generic [ref=e101]:
              - paragraph [ref=e102]: $14,500
              - paragraph [ref=e103]: Earnings
      - link "tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e105] [cursor=pointer]:
        - /url: /creator/smart-contract-dev
        - img [ref=e108]
        - generic [ref=e110]:
          - generic [ref=e112]: SC
          - generic [ref=e113]:
            - paragraph [ref=e114]: tech
            - heading "Smart Contract Dev" [level=3] [ref=e115]
            - paragraph [ref=e116]: "@smart-contract-dev"
          - paragraph [ref=e117]: Writing secure, efficient code for the on-chain economy.
          - generic [ref=e118]:
            - img [ref=e119]
            - text: Boston, US
          - generic [ref=e122]:
            - generic [ref=e123]:
              - paragraph [ref=e124]: 3,800
              - paragraph [ref=e125]: Followers
            - generic [ref=e126]:
              - paragraph [ref=e127]: $14,000
              - paragraph [ref=e128]: Earnings
      - link "education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e130] [cursor=pointer]:
        - /url: /creator/crypto-educator
        - img [ref=e133]
        - generic [ref=e135]:
          - generic [ref=e137]: CE
          - generic [ref=e138]:
            - paragraph [ref=e139]: education
            - heading "Crypto Educator" [level=3] [ref=e140]
            - paragraph [ref=e141]: "@crypto-educator"
          - paragraph [ref=e142]: Helping the world understand the power of crypto.
          - generic [ref=e143]:
            - img [ref=e144]
            - text: Austin, US
          - generic [ref=e147]:
            - generic [ref=e148]:
              - paragraph [ref=e149]: 3,500
              - paragraph [ref=e150]: Followers
            - generic [ref=e151]:
              - paragraph [ref=e152]: $10,500
              - paragraph [ref=e153]: Earnings
      - link "tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e155] [cursor=pointer]:
        - /url: /creator/stellar-dev
        - img [ref=e158]
        - generic [ref=e160]:
          - generic [ref=e162]: SD
          - generic [ref=e163]:
            - paragraph [ref=e164]: tech
            - heading "Stellar Dev" [level=3] [ref=e165]
            - paragraph [ref=e166]: "@stellar-dev"
          - paragraph [ref=e167]: Building the future of open finance on Stellar.
          - generic [ref=e168]:
            - img [ref=e169]
            - text: San Francisco, US
          - generic [ref=e172]:
            - generic [ref=e173]:
              - paragraph [ref=e174]: 3,400
              - paragraph [ref=e175]: Followers
            - generic [ref=e176]:
              - paragraph [ref=e177]: $12,000
              - paragraph [ref=e178]: Earnings
      - link "tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e180] [cursor=pointer]:
        - /url: /creator/gamefi-dev
        - img [ref=e183]
        - generic [ref=e185]:
          - generic [ref=e187]: GD
          - generic [ref=e188]:
            - paragraph [ref=e189]: tech
            - heading "GameFi Dev" [level=3] [ref=e190]
            - paragraph [ref=e191]: "@gamefi-dev"
          - paragraph [ref=e192]: Where gaming meets finance, we're building the future.
          - generic [ref=e193]:
            - img [ref=e194]
            - text: Los Angeles, US
          - generic [ref=e197]:
            - generic [ref=e198]:
              - paragraph [ref=e199]: 3,300
              - paragraph [ref=e200]: Followers
            - generic [ref=e201]:
              - paragraph [ref=e202]: $13,000
              - paragraph [ref=e203]: Earnings
      - link "tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e205] [cursor=pointer]:
        - /url: /creator/defi-expert
        - generic [ref=e206]:
          - generic [ref=e208]: DE
          - generic [ref=e209]:
            - paragraph [ref=e210]: tech
            - heading "DeFi Expert" [level=3] [ref=e211]
            - paragraph [ref=e212]: "@defi-expert"
          - paragraph [ref=e213]: Navigating the deep waters of decentralized finance.
          - generic [ref=e214]:
            - img [ref=e215]
            - text: Singapore, SG
          - generic [ref=e218]:
            - generic [ref=e219]:
              - paragraph [ref=e220]: 3,100
              - paragraph [ref=e221]: Followers
            - generic [ref=e222]:
              - paragraph [ref=e223]: $11,000
              - paragraph [ref=e224]: Earnings
      - link "education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e226] [cursor=pointer]:
        - /url: /creator/blockchain-edu
        - img [ref=e229]
        - generic [ref=e231]:
          - generic [ref=e233]: BE
          - generic [ref=e234]:
            - paragraph [ref=e235]: education
            - heading "Blockchain Edu" [level=3] [ref=e236]
            - paragraph [ref=e237]: "@blockchain-edu"
          - paragraph [ref=e238]: Simplifying blockchain for the next generation of builders.
          - generic [ref=e239]:
            - img [ref=e240]
            - text: New York, US
          - generic [ref=e243]:
            - generic [ref=e244]:
              - paragraph [ref=e245]: 2,900
              - paragraph [ref=e246]: Followers
            - generic [ref=e247]:
              - paragraph [ref=e248]: $8,900
              - paragraph [ref=e249]: Earnings
      - link "tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e251] [cursor=pointer]:
        - /url: /creator/metaverse-architect
        - img [ref=e254]
        - generic [ref=e256]:
          - generic [ref=e258]: MA
          - generic [ref=e259]:
            - paragraph [ref=e260]: tech
            - heading "Metaverse Architect" [level=3] [ref=e261]
            - paragraph [ref=e262]: "@metaverse-architect"
          - paragraph [ref=e263]: Building the spaces where we'll live and play tomorrow.
          - generic [ref=e264]:
            - img [ref=e265]
            - text: Seoul, KR
          - generic [ref=e268]:
            - generic [ref=e269]:
              - paragraph [ref=e270]: 2,800
              - paragraph [ref=e271]: Followers
            - generic [ref=e272]:
              - paragraph [ref=e273]: $9,200
              - paragraph [ref=e274]: Earnings
      - link "tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e276] [cursor=pointer]:
        - /url: /creator/web3-builder
        - img [ref=e279]
        - generic [ref=e281]:
          - generic [ref=e283]: WB
          - generic [ref=e284]:
            - paragraph [ref=e285]: tech
            - heading "Web3 Builder" [level=3] [ref=e286]
            - paragraph [ref=e287]: "@web3-builder"
          - paragraph [ref=e288]: Architecting the infrastructure for a more open web.
          - generic [ref=e289]:
            - img [ref=e290]
            - text: Toronto, CA
          - generic [ref=e293]:
            - generic [ref=e294]:
              - paragraph [ref=e295]: 2,700
              - paragraph [ref=e296]: Followers
            - generic [ref=e297]:
              - paragraph [ref=e298]: $9,500
              - paragraph [ref=e299]: Earnings
      - link "art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e301] [cursor=pointer]:
        - /url: /creator/generative-artist
        - img [ref=e304]
        - generic [ref=e306]:
          - generic [ref=e308]: GA
          - generic [ref=e309]:
            - paragraph [ref=e310]: art
            - heading "Generative Artist" [level=3] [ref=e311]
            - paragraph [ref=e312]: "@generative-artist"
          - paragraph [ref=e313]: Letting the algorithms paint the portrait of tomorrow.
          - generic [ref=e314]:
            - img [ref=e315]
            - text: Copenhagen, DK
          - generic [ref=e318]:
            - generic [ref=e319]:
              - paragraph [ref=e320]: 2,600
              - paragraph [ref=e321]: Followers
            - generic [ref=e322]:
              - paragraph [ref=e323]: $8,200
              - paragraph [ref=e324]: Earnings
      - link "education Blockchain Analyst @blockchain-analyst Decoding the data to reveal the truth behind the blocks. Lisbon, PT 2,400 Followers $7,300 Earnings" [ref=e326] [cursor=pointer]:
        - /url: /creator/blockchain-analyst
        - img [ref=e329]
        - generic [ref=e331]:
          - generic [ref=e333]: BA
          - generic [ref=e334]:
            - paragraph [ref=e335]: education
            - heading "Blockchain Analyst" [level=3] [ref=e336]
            - paragraph [ref=e337]: "@blockchain-analyst"
          - paragraph [ref=e338]: Decoding the data to reveal the truth behind the blocks.
          - generic [ref=e339]:
            - img [ref=e340]
            - text: Lisbon, PT
          - generic [ref=e343]:
            - generic [ref=e344]:
              - paragraph [ref=e345]: 2,400
              - paragraph [ref=e346]: Followers
            - generic [ref=e347]:
              - paragraph [ref=e348]: $7,300
              - paragraph [ref=e349]: Earnings
      - link "art Digital Artist @digital-artist Exploring colors and forms in a digital canvas. Barcelona, ES 2,300 Followers $4,100 Earnings" [ref=e351] [cursor=pointer]:
        - /url: /creator/digital-artist
        - generic [ref=e352]:
          - generic [ref=e354]: DA
          - generic [ref=e355]:
            - paragraph [ref=e356]: art
            - heading "Digital Artist" [level=3] [ref=e357]
            - paragraph [ref=e358]: "@digital-artist"
          - paragraph [ref=e359]: Exploring colors and forms in a digital canvas.
          - generic [ref=e360]:
            - img [ref=e361]
            - text: Barcelona, ES
          - generic [ref=e364]:
            - generic [ref=e365]:
              - paragraph [ref=e366]: 2,300
              - paragraph [ref=e367]: Followers
            - generic [ref=e368]:
              - paragraph [ref=e369]: $4,100
              - paragraph [ref=e370]: Earnings
      - link "art 3D Artist @3d-artist Giving depth and life to digital dreams. Milan, IT 2,200 Followers $3,800 Earnings" [ref=e372] [cursor=pointer]:
        - /url: /creator/3d-artist
        - generic [ref=e373]:
          - generic [ref=e375]: 3A
          - generic [ref=e376]:
            - paragraph [ref=e377]: art
            - heading "3D Artist" [level=3] [ref=e378]
            - paragraph [ref=e379]: "@3d-artist"
          - paragraph [ref=e380]: Giving depth and life to digital dreams.
          - generic [ref=e381]:
            - img [ref=e382]
            - text: Milan, IT
          - generic [ref=e385]:
            - generic [ref=e386]:
              - paragraph [ref=e387]: 2,200
              - paragraph [ref=e388]: Followers
            - generic [ref=e389]:
              - paragraph [ref=e390]: $3,800
              - paragraph [ref=e391]: Earnings
      - link "community Community Lab @community-lab Empowering decentralized communities through collaboration. London, UK 2,100 Followers $6,700 Earnings" [ref=e393] [cursor=pointer]:
        - /url: /creator/community-lab
        - img [ref=e396]
        - generic [ref=e398]:
          - generic [ref=e400]: CL
          - generic [ref=e401]:
            - paragraph [ref=e402]: community
            - heading "Community Lab" [level=3] [ref=e403]
            - paragraph [ref=e404]: "@community-lab"
          - paragraph [ref=e405]: Empowering decentralized communities through collaboration.
          - generic [ref=e406]:
            - img [ref=e407]
            - text: London, UK
          - generic [ref=e410]:
            - generic [ref=e411]:
              - paragraph [ref=e412]: 2,100
              - paragraph [ref=e413]: Followers
            - generic [ref=e414]:
              - paragraph [ref=e415]: $6,700
              - paragraph [ref=e416]: Earnings
      - link "education Web3 Educator @web3-educator Onboarding the world to the decentralized web. Mexico City, MX 2,100 Followers $4,600 Earnings" [ref=e418] [cursor=pointer]:
        - /url: /creator/web3-educator
        - generic [ref=e419]:
          - generic [ref=e421]: WE
          - generic [ref=e422]:
            - paragraph [ref=e423]: education
            - heading "Web3 Educator" [level=3] [ref=e424]
            - paragraph [ref=e425]: "@web3-educator"
          - paragraph [ref=e426]: Onboarding the world to the decentralized web.
          - generic [ref=e427]:
            - img [ref=e428]
            - text: Mexico City, MX
          - generic [ref=e431]:
            - generic [ref=e432]:
              - paragraph [ref=e433]: 2,100
              - paragraph [ref=e434]: Followers
            - generic [ref=e435]:
              - paragraph [ref=e436]: $4,600
              - paragraph [ref=e437]: Earnings
      - link "community DAO Organizer @dao-organizer Designing governance systems for collective action. Amsterdam, NL 1,950 Followers $5,800 Earnings" [ref=e439] [cursor=pointer]:
        - /url: /creator/dao-organizer
        - img [ref=e442]
        - generic [ref=e444]:
          - generic [ref=e446]: DO
          - generic [ref=e447]:
            - paragraph [ref=e448]: community
            - heading "DAO Organizer" [level=3] [ref=e449]
            - paragraph [ref=e450]: "@dao-organizer"
          - paragraph [ref=e451]: Designing governance systems for collective action.
          - generic [ref=e452]:
            - img [ref=e453]
            - text: Amsterdam, NL
          - generic [ref=e456]:
            - generic [ref=e457]:
              - paragraph [ref=e458]: 1,950
              - paragraph [ref=e459]: Followers
            - generic [ref=e460]:
              - paragraph [ref=e461]: $5,800
              - paragraph [ref=e462]: Earnings
      - link "education Crypto Writer @crypto-writer Telling the stories that define the crypto era. Dublin, IE 1,900 Followers $5,500 Earnings" [ref=e464] [cursor=pointer]:
        - /url: /creator/crypto-writer
        - img [ref=e467]
        - generic [ref=e469]:
          - generic [ref=e471]: CW
          - generic [ref=e472]:
            - paragraph [ref=e473]: education
            - heading "Crypto Writer" [level=3] [ref=e474]
            - paragraph [ref=e475]: "@crypto-writer"
          - paragraph [ref=e476]: Telling the stories that define the crypto era.
          - generic [ref=e477]:
            - img [ref=e478]
            - text: Dublin, IE
          - generic [ref=e481]:
            - generic [ref=e482]:
              - paragraph [ref=e483]: 1,900
              - paragraph [ref=e484]: Followers
            - generic [ref=e485]:
              - paragraph [ref=e486]: $5,500
              - paragraph [ref=e487]: Earnings
      - link "art Crypto Artist @crypto-artist Bridging the gap between traditional art and blockchain. Paris, FR 1,800 Followers $5,200 Earnings" [ref=e489] [cursor=pointer]:
        - /url: /creator/crypto-artist
        - img [ref=e492]
        - generic [ref=e494]:
          - generic [ref=e496]: CA
          - generic [ref=e497]:
            - paragraph [ref=e498]: art
            - heading "Crypto Artist" [level=3] [ref=e499]
            - paragraph [ref=e500]: "@crypto-artist"
          - paragraph [ref=e501]: Bridging the gap between traditional art and blockchain.
          - generic [ref=e502]:
            - img [ref=e503]
            - text: Paris, FR
          - generic [ref=e506]:
            - generic [ref=e507]:
              - paragraph [ref=e508]: 1,800
              - paragraph [ref=e509]: Followers
            - generic [ref=e510]:
              - paragraph [ref=e511]: $5,200
              - paragraph [ref=e512]: Earnings
      - link "community Community Manager @community-manager Nurturing vibrant, inclusive communities for everyone. Stockholm, SE 1,750 Followers $4,900 Earnings" [ref=e514] [cursor=pointer]:
        - /url: /creator/community-manager
        - img [ref=e517]
        - generic [ref=e519]:
          - generic [ref=e521]: CM
          - generic [ref=e522]:
            - paragraph [ref=e523]: community
            - heading "Community Manager" [level=3] [ref=e524]
            - paragraph [ref=e525]: "@community-manager"
          - paragraph [ref=e526]: Nurturing vibrant, inclusive communities for everyone.
          - generic [ref=e527]:
            - img [ref=e528]
            - text: Stockholm, SE
          - generic [ref=e531]:
            - generic [ref=e532]:
              - paragraph [ref=e533]: 1,750
              - paragraph [ref=e534]: Followers
            - generic [ref=e535]:
              - paragraph [ref=e536]: $4,900
              - paragraph [ref=e537]: Earnings
      - link "art Token Designer @token-designer Crafting sustainable tokens with purpose and style. Zurich, CH 1,600 Followers $3,400 Earnings" [ref=e539] [cursor=pointer]:
        - /url: /creator/token-designer
        - generic [ref=e540]:
          - generic [ref=e542]: TD
          - generic [ref=e543]:
            - paragraph [ref=e544]: art
            - heading "Token Designer" [level=3] [ref=e545]
            - paragraph [ref=e546]: "@token-designer"
          - paragraph [ref=e547]: Crafting sustainable tokens with purpose and style.
          - generic [ref=e548]:
            - img [ref=e549]
            - text: Zurich, CH
          - generic [ref=e552]:
            - generic [ref=e553]:
              - paragraph [ref=e554]: 1,600
              - paragraph [ref=e555]: Followers
            - generic [ref=e556]:
              - paragraph [ref=e557]: $3,400
              - paragraph [ref=e558]: Earnings
      - link "community NFT Collector @nft-collector Curating the finest digital assets in the metaverse. Singapore, SG 1,400 Followers $2,900 Earnings" [ref=e560] [cursor=pointer]:
        - /url: /creator/nft-collector
        - img [ref=e563]
        - generic [ref=e565]:
          - generic [ref=e567]: NC
          - generic [ref=e568]:
            - paragraph [ref=e569]: community
            - heading "NFT Collector" [level=3] [ref=e570]
            - paragraph [ref=e571]: "@nft-collector"
          - paragraph [ref=e572]: Curating the finest digital assets in the metaverse.
          - generic [ref=e573]:
            - img [ref=e574]
            - text: Singapore, SG
          - generic [ref=e577]:
            - generic [ref=e578]:
              - paragraph [ref=e579]: 1,400
              - paragraph [ref=e580]: Followers
            - generic [ref=e581]:
              - paragraph [ref=e582]: $2,900
              - paragraph [ref=e583]: Earnings
      - link "art Alice @alice Digital artist exploring the intersection of nature and code. Berlin, DE 1,250 Followers $4,500 Earnings" [ref=e585] [cursor=pointer]:
        - /url: /creator/alice
        - img [ref=e588]
        - generic [ref=e590]:
          - generic [ref=e592]: A
          - generic [ref=e593]:
            - paragraph [ref=e594]: art
            - heading "Alice" [level=3] [ref=e595]
            - paragraph [ref=e596]: "@alice"
          - paragraph [ref=e597]: Digital artist exploring the intersection of nature and code.
          - generic [ref=e598]:
            - img [ref=e599]
            - text: Berlin, DE
          - generic [ref=e602]:
            - generic [ref=e603]:
              - paragraph [ref=e604]: 1,250
              - paragraph [ref=e605]: Followers
            - generic [ref=e606]:
              - paragraph [ref=e607]: $4,500
              - paragraph [ref=e608]: Earnings
      - link "art Pixel Maker @pixelmaker Pixel by pixel, I bring worlds to life. Tokyo, JP 890 Followers $2,300 Earnings" [ref=e610] [cursor=pointer]:
        - /url: /creator/pixelmaker
        - generic [ref=e611]:
          - generic [ref=e613]: PM
          - generic [ref=e614]:
            - paragraph [ref=e615]: art
            - heading "Pixel Maker" [level=3] [ref=e616]
            - paragraph [ref=e617]: "@pixelmaker"
          - paragraph [ref=e618]: Pixel by pixel, I bring worlds to life.
          - generic [ref=e619]:
            - img [ref=e620]
            - text: Tokyo, JP
          - generic [ref=e623]:
            - generic [ref=e624]:
              - paragraph [ref=e625]: "890"
              - paragraph [ref=e626]: Followers
            - generic [ref=e627]:
              - paragraph [ref=e628]: $2,300
              - paragraph [ref=e629]: Earnings
  - generic [ref=e630]:
    - img [ref=e632]
    - button "Open Tanstack query devtools" [ref=e681] [cursor=pointer]:
      - img [ref=e682]
  - alert [ref=e731]
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
      |           ^ Error: 1 axe violation(s) on light theme > search:
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