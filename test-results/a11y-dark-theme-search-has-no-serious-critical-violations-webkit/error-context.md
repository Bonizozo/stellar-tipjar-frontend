# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> search has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/en/search", waiting until "load"

```

# Page snapshot

```yaml
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
    - link "NFT Creator art NFT Creator @nft-creator Minting experiences that transcend the digital realm. Sydney, AU 4,200 Followers $15,000 Earnings" [ref=e21]:
      - /url: /creator/nft-creator
      - img [ref=e24]
      - generic [ref=e26]:
        - img "NFT Creator" [ref=e27]
        - generic [ref=e28]:
          - paragraph [ref=e29]: art
          - heading "NFT Creator" [level=3] [ref=e30]
          - paragraph [ref=e31]: "@nft-creator"
        - paragraph [ref=e32]: Minting experiences that transcend the digital realm.
        - generic [ref=e33]:
          - img [ref=e34]
          - text: Sydney, AU
        - generic [ref=e37]:
          - generic [ref=e38]:
            - paragraph [ref=e39]: 4,200
            - paragraph [ref=e40]: Followers
          - generic [ref=e41]:
            - paragraph [ref=e42]: $15,000
            - paragraph [ref=e43]: Earnings
    - link "Protocol Dev tech Protocol Dev @protocol-dev Optimizing the core protocols for maximum efficiency. Chicago, US 4,100 Followers $16,000 Earnings" [ref=e45]:
      - /url: /creator/protocol-dev
      - img [ref=e48]
      - generic [ref=e50]:
        - img "Protocol Dev" [ref=e51]
        - generic [ref=e52]:
          - paragraph [ref=e53]: tech
          - heading "Protocol Dev" [level=3] [ref=e54]
          - paragraph [ref=e55]: "@protocol-dev"
        - paragraph [ref=e56]: Optimizing the core protocols for maximum efficiency.
        - generic [ref=e57]:
          - img [ref=e58]
          - text: Chicago, US
        - generic [ref=e61]:
          - generic [ref=e62]:
            - paragraph [ref=e63]: 4,100
            - paragraph [ref=e64]: Followers
          - generic [ref=e65]:
            - paragraph [ref=e66]: $16,000
            - paragraph [ref=e67]: Earnings
    - link "Solidity Dev tech Solidity Dev @solidity-dev Forging bulletproof smart contracts for the world's applications. San Francisco, US 3,900 Followers $14,500 Earnings" [ref=e69]:
      - /url: /creator/solidity-dev
      - img [ref=e72]
      - generic [ref=e74]:
        - img "Solidity Dev" [ref=e75]
        - generic [ref=e76]:
          - paragraph [ref=e77]: tech
          - heading "Solidity Dev" [level=3] [ref=e78]
          - paragraph [ref=e79]: "@solidity-dev"
        - paragraph [ref=e80]: Forging bulletproof smart contracts for the world's applications.
        - generic [ref=e81]:
          - img [ref=e82]
          - text: San Francisco, US
        - generic [ref=e85]:
          - generic [ref=e86]:
            - paragraph [ref=e87]: 3,900
            - paragraph [ref=e88]: Followers
          - generic [ref=e89]:
            - paragraph [ref=e90]: $14,500
            - paragraph [ref=e91]: Earnings
    - link "Smart Contract Dev tech Smart Contract Dev @smart-contract-dev Writing secure, efficient code for the on-chain economy. Boston, US 3,800 Followers $14,000 Earnings" [ref=e93]:
      - /url: /creator/smart-contract-dev
      - img [ref=e96]
      - generic [ref=e98]:
        - img "Smart Contract Dev" [ref=e99]
        - generic [ref=e100]:
          - paragraph [ref=e101]: tech
          - heading "Smart Contract Dev" [level=3] [ref=e102]
          - paragraph [ref=e103]: "@smart-contract-dev"
        - paragraph [ref=e104]: Writing secure, efficient code for the on-chain economy.
        - generic [ref=e105]:
          - img [ref=e106]
          - text: Boston, US
        - generic [ref=e109]:
          - generic [ref=e110]:
            - paragraph [ref=e111]: 3,800
            - paragraph [ref=e112]: Followers
          - generic [ref=e113]:
            - paragraph [ref=e114]: $14,000
            - paragraph [ref=e115]: Earnings
    - link "Crypto Educator education Crypto Educator @crypto-educator Helping the world understand the power of crypto. Austin, US 3,500 Followers $10,500 Earnings" [ref=e117]:
      - /url: /creator/crypto-educator
      - img [ref=e120]
      - generic [ref=e122]:
        - img "Crypto Educator" [ref=e123]
        - generic [ref=e124]:
          - paragraph [ref=e125]: education
          - heading "Crypto Educator" [level=3] [ref=e126]
          - paragraph [ref=e127]: "@crypto-educator"
        - paragraph [ref=e128]: Helping the world understand the power of crypto.
        - generic [ref=e129]:
          - img [ref=e130]
          - text: Austin, US
        - generic [ref=e133]:
          - generic [ref=e134]:
            - paragraph [ref=e135]: 3,500
            - paragraph [ref=e136]: Followers
          - generic [ref=e137]:
            - paragraph [ref=e138]: $10,500
            - paragraph [ref=e139]: Earnings
    - link "Stellar Dev tech Stellar Dev @stellar-dev Building the future of open finance on Stellar. San Francisco, US 3,400 Followers $12,000 Earnings" [ref=e141]:
      - /url: /creator/stellar-dev
      - img [ref=e144]
      - generic [ref=e146]:
        - img "Stellar Dev" [ref=e147]
        - generic [ref=e148]:
          - paragraph [ref=e149]: tech
          - heading "Stellar Dev" [level=3] [ref=e150]
          - paragraph [ref=e151]: "@stellar-dev"
        - paragraph [ref=e152]: Building the future of open finance on Stellar.
        - generic [ref=e153]:
          - img [ref=e154]
          - text: San Francisco, US
        - generic [ref=e157]:
          - generic [ref=e158]:
            - paragraph [ref=e159]: 3,400
            - paragraph [ref=e160]: Followers
          - generic [ref=e161]:
            - paragraph [ref=e162]: $12,000
            - paragraph [ref=e163]: Earnings
    - link "GameFi Dev tech GameFi Dev @gamefi-dev Where gaming meets finance, we're building the future. Los Angeles, US 3,300 Followers $13,000 Earnings" [ref=e165]:
      - /url: /creator/gamefi-dev
      - img [ref=e168]
      - generic [ref=e170]:
        - img "GameFi Dev" [ref=e171]
        - generic [ref=e172]:
          - paragraph [ref=e173]: tech
          - heading "GameFi Dev" [level=3] [ref=e174]
          - paragraph [ref=e175]: "@gamefi-dev"
        - paragraph [ref=e176]: Where gaming meets finance, we're building the future.
        - generic [ref=e177]:
          - img [ref=e178]
          - text: Los Angeles, US
        - generic [ref=e181]:
          - generic [ref=e182]:
            - paragraph [ref=e183]: 3,300
            - paragraph [ref=e184]: Followers
          - generic [ref=e185]:
            - paragraph [ref=e186]: $13,000
            - paragraph [ref=e187]: Earnings
    - link "DeFi Expert tech DeFi Expert @defi-expert Navigating the deep waters of decentralized finance. Singapore, SG 3,100 Followers $11,000 Earnings" [ref=e189]:
      - /url: /creator/defi-expert
      - generic [ref=e190]:
        - img "DeFi Expert" [ref=e191]
        - generic [ref=e192]:
          - paragraph [ref=e193]: tech
          - heading "DeFi Expert" [level=3] [ref=e194]
          - paragraph [ref=e195]: "@defi-expert"
        - paragraph [ref=e196]: Navigating the deep waters of decentralized finance.
        - generic [ref=e197]:
          - img [ref=e198]
          - text: Singapore, SG
        - generic [ref=e201]:
          - generic [ref=e202]:
            - paragraph [ref=e203]: 3,100
            - paragraph [ref=e204]: Followers
          - generic [ref=e205]:
            - paragraph [ref=e206]: $11,000
            - paragraph [ref=e207]: Earnings
    - link "Blockchain Edu education Blockchain Edu @blockchain-edu Simplifying blockchain for the next generation of builders. New York, US 2,900 Followers $8,900 Earnings" [ref=e209]:
      - /url: /creator/blockchain-edu
      - img [ref=e212]
      - generic [ref=e214]:
        - img "Blockchain Edu" [ref=e215]
        - generic [ref=e216]:
          - paragraph [ref=e217]: education
          - heading "Blockchain Edu" [level=3] [ref=e218]
          - paragraph [ref=e219]: "@blockchain-edu"
        - paragraph [ref=e220]: Simplifying blockchain for the next generation of builders.
        - generic [ref=e221]:
          - img [ref=e222]
          - text: New York, US
        - generic [ref=e225]:
          - generic [ref=e226]:
            - paragraph [ref=e227]: 2,900
            - paragraph [ref=e228]: Followers
          - generic [ref=e229]:
            - paragraph [ref=e230]: $8,900
            - paragraph [ref=e231]: Earnings
    - link "Metaverse Architect tech Metaverse Architect @metaverse-architect Building the spaces where we'll live and play tomorrow. Seoul, KR 2,800 Followers $9,200 Earnings" [ref=e233]:
      - /url: /creator/metaverse-architect
      - img [ref=e236]
      - generic [ref=e238]:
        - img "Metaverse Architect" [ref=e239]
        - generic [ref=e240]:
          - paragraph [ref=e241]: tech
          - heading "Metaverse Architect" [level=3] [ref=e242]
          - paragraph [ref=e243]: "@metaverse-architect"
        - paragraph [ref=e244]: Building the spaces where we'll live and play tomorrow.
        - generic [ref=e245]:
          - img [ref=e246]
          - text: Seoul, KR
        - generic [ref=e249]:
          - generic [ref=e250]:
            - paragraph [ref=e251]: 2,800
            - paragraph [ref=e252]: Followers
          - generic [ref=e253]:
            - paragraph [ref=e254]: $9,200
            - paragraph [ref=e255]: Earnings
    - link "Web3 Builder tech Web3 Builder @web3-builder Architecting the infrastructure for a more open web. Toronto, CA 2,700 Followers $9,500 Earnings" [ref=e257]:
      - /url: /creator/web3-builder
      - img [ref=e260]
      - generic [ref=e262]:
        - img "Web3 Builder" [ref=e263]
        - generic [ref=e264]:
          - paragraph [ref=e265]: tech
          - heading "Web3 Builder" [level=3] [ref=e266]
          - paragraph [ref=e267]: "@web3-builder"
        - paragraph [ref=e268]: Architecting the infrastructure for a more open web.
        - generic [ref=e269]:
          - img [ref=e270]
          - text: Toronto, CA
        - generic [ref=e273]:
          - generic [ref=e274]:
            - paragraph [ref=e275]: 2,700
            - paragraph [ref=e276]: Followers
          - generic [ref=e277]:
            - paragraph [ref=e278]: $9,500
            - paragraph [ref=e279]: Earnings
    - link "Generative Artist art Generative Artist @generative-artist Letting the algorithms paint the portrait of tomorrow. Copenhagen, DK 2,600 Followers $8,200 Earnings" [ref=e281]:
      - /url: /creator/generative-artist
      - img [ref=e284]
      - generic [ref=e286]:
        - img "Generative Artist" [ref=e287]
        - generic [ref=e288]:
          - paragraph [ref=e289]: art
          - heading "Generative Artist" [level=3] [ref=e290]
          - paragraph [ref=e291]: "@generative-artist"
        - paragraph [ref=e292]: Letting the algorithms paint the portrait of tomorrow.
        - generic [ref=e293]:
          - img [ref=e294]
          - text: Copenhagen, DK
        - generic [ref=e297]:
          - generic [ref=e298]:
            - paragraph [ref=e299]: 2,600
            - paragraph [ref=e300]: Followers
          - generic [ref=e301]:
            - paragraph [ref=e302]: $8,200
            - paragraph [ref=e303]: Earnings
    - link "Blockchain Analyst education Blockchain Analyst @blockchain-analyst Decoding the data to reveal the truth behind the blocks. Lisbon, PT 2,400 Followers $7,300 Earnings" [ref=e305]:
      - /url: /creator/blockchain-analyst
      - img [ref=e308]
      - generic [ref=e310]:
        - img "Blockchain Analyst" [ref=e311]
        - generic [ref=e312]:
          - paragraph [ref=e313]: education
          - heading "Blockchain Analyst" [level=3] [ref=e314]
          - paragraph [ref=e315]: "@blockchain-analyst"
        - paragraph [ref=e316]: Decoding the data to reveal the truth behind the blocks.
        - generic [ref=e317]:
          - img [ref=e318]
          - text: Lisbon, PT
        - generic [ref=e321]:
          - generic [ref=e322]:
            - paragraph [ref=e323]: 2,400
            - paragraph [ref=e324]: Followers
          - generic [ref=e325]:
            - paragraph [ref=e326]: $7,300
            - paragraph [ref=e327]: Earnings
    - link "Digital Artist art Digital Artist @digital-artist Exploring colors and forms in a digital canvas. Barcelona, ES 2,300 Followers $4,100 Earnings" [ref=e329]:
      - /url: /creator/digital-artist
      - generic [ref=e330]:
        - img "Digital Artist" [ref=e331]
        - generic [ref=e332]:
          - paragraph [ref=e333]: art
          - heading "Digital Artist" [level=3] [ref=e334]
          - paragraph [ref=e335]: "@digital-artist"
        - paragraph [ref=e336]: Exploring colors and forms in a digital canvas.
        - generic [ref=e337]:
          - img [ref=e338]
          - text: Barcelona, ES
        - generic [ref=e341]:
          - generic [ref=e342]:
            - paragraph [ref=e343]: 2,300
            - paragraph [ref=e344]: Followers
          - generic [ref=e345]:
            - paragraph [ref=e346]: $4,100
            - paragraph [ref=e347]: Earnings
    - link "3D Artist art 3D Artist @3d-artist Giving depth and life to digital dreams. Milan, IT 2,200 Followers $3,800 Earnings" [ref=e349]:
      - /url: /creator/3d-artist
      - generic [ref=e350]:
        - img "3D Artist" [ref=e351]
        - generic [ref=e352]:
          - paragraph [ref=e353]: art
          - heading "3D Artist" [level=3] [ref=e354]
          - paragraph [ref=e355]: "@3d-artist"
        - paragraph [ref=e356]: Giving depth and life to digital dreams.
        - generic [ref=e357]:
          - img [ref=e358]
          - text: Milan, IT
        - generic [ref=e361]:
          - generic [ref=e362]:
            - paragraph [ref=e363]: 2,200
            - paragraph [ref=e364]: Followers
          - generic [ref=e365]:
            - paragraph [ref=e366]: $3,800
            - paragraph [ref=e367]: Earnings
    - link "Community Lab community Community Lab @community-lab Empowering decentralized communities through collaboration. London, UK 2,100 Followers $6,700 Earnings" [ref=e369]:
      - /url: /creator/community-lab
      - img [ref=e372]
      - generic [ref=e374]:
        - img "Community Lab" [ref=e375]
        - generic [ref=e376]:
          - paragraph [ref=e377]: community
          - heading "Community Lab" [level=3] [ref=e378]
          - paragraph [ref=e379]: "@community-lab"
        - paragraph [ref=e380]: Empowering decentralized communities through collaboration.
        - generic [ref=e381]:
          - img [ref=e382]
          - text: London, UK
        - generic [ref=e385]:
          - generic [ref=e386]:
            - paragraph [ref=e387]: 2,100
            - paragraph [ref=e388]: Followers
          - generic [ref=e389]:
            - paragraph [ref=e390]: $6,700
            - paragraph [ref=e391]: Earnings
    - link "Web3 Educator education Web3 Educator @web3-educator Onboarding the world to the decentralized web. Mexico City, MX 2,100 Followers $4,600 Earnings" [ref=e393]:
      - /url: /creator/web3-educator
      - generic [ref=e394]:
        - img "Web3 Educator" [ref=e395]
        - generic [ref=e396]:
          - paragraph [ref=e397]: education
          - heading "Web3 Educator" [level=3] [ref=e398]
          - paragraph [ref=e399]: "@web3-educator"
        - paragraph [ref=e400]: Onboarding the world to the decentralized web.
        - generic [ref=e401]:
          - img [ref=e402]
          - text: Mexico City, MX
        - generic [ref=e405]:
          - generic [ref=e406]:
            - paragraph [ref=e407]: 2,100
            - paragraph [ref=e408]: Followers
          - generic [ref=e409]:
            - paragraph [ref=e410]: $4,600
            - paragraph [ref=e411]: Earnings
    - link "DAO Organizer community DAO Organizer @dao-organizer Designing governance systems for collective action. Amsterdam, NL 1,950 Followers $5,800 Earnings" [ref=e413]:
      - /url: /creator/dao-organizer
      - img [ref=e416]
      - generic [ref=e418]:
        - img "DAO Organizer" [ref=e419]
        - generic [ref=e420]:
          - paragraph [ref=e421]: community
          - heading "DAO Organizer" [level=3] [ref=e422]
          - paragraph [ref=e423]: "@dao-organizer"
        - paragraph [ref=e424]: Designing governance systems for collective action.
        - generic [ref=e425]:
          - img [ref=e426]
          - text: Amsterdam, NL
        - generic [ref=e429]:
          - generic [ref=e430]:
            - paragraph [ref=e431]: 1,950
            - paragraph [ref=e432]: Followers
          - generic [ref=e433]:
            - paragraph [ref=e434]: $5,800
            - paragraph [ref=e435]: Earnings
    - link "Crypto Writer education Crypto Writer @crypto-writer Telling the stories that define the crypto era. Dublin, IE 1,900 Followers $5,500 Earnings" [ref=e437]:
      - /url: /creator/crypto-writer
      - img [ref=e440]
      - generic [ref=e442]:
        - img "Crypto Writer" [ref=e443]
        - generic [ref=e444]:
          - paragraph [ref=e445]: education
          - heading "Crypto Writer" [level=3] [ref=e446]
          - paragraph [ref=e447]: "@crypto-writer"
        - paragraph [ref=e448]: Telling the stories that define the crypto era.
        - generic [ref=e449]:
          - img [ref=e450]
          - text: Dublin, IE
        - generic [ref=e453]:
          - generic [ref=e454]:
            - paragraph [ref=e455]: 1,900
            - paragraph [ref=e456]: Followers
          - generic [ref=e457]:
            - paragraph [ref=e458]: $5,500
            - paragraph [ref=e459]: Earnings
    - link "Crypto Artist art Crypto Artist @crypto-artist Bridging the gap between traditional art and blockchain. Paris, FR 1,800 Followers $5,200 Earnings" [ref=e461]:
      - /url: /creator/crypto-artist
      - img [ref=e464]
      - generic [ref=e466]:
        - img "Crypto Artist" [ref=e467]
        - generic [ref=e468]:
          - paragraph [ref=e469]: art
          - heading "Crypto Artist" [level=3] [ref=e470]
          - paragraph [ref=e471]: "@crypto-artist"
        - paragraph [ref=e472]: Bridging the gap between traditional art and blockchain.
        - generic [ref=e473]:
          - img [ref=e474]
          - text: Paris, FR
        - generic [ref=e477]:
          - generic [ref=e478]:
            - paragraph [ref=e479]: 1,800
            - paragraph [ref=e480]: Followers
          - generic [ref=e481]:
            - paragraph [ref=e482]: $5,200
            - paragraph [ref=e483]: Earnings
    - link "Community Manager community Community Manager @community-manager Nurturing vibrant, inclusive communities for everyone. Stockholm, SE 1,750 Followers $4,900 Earnings" [ref=e485]:
      - /url: /creator/community-manager
      - img [ref=e488]
      - generic [ref=e490]:
        - img "Community Manager" [ref=e491]
        - generic [ref=e492]:
          - paragraph [ref=e493]: community
          - heading "Community Manager" [level=3] [ref=e494]
          - paragraph [ref=e495]: "@community-manager"
        - paragraph [ref=e496]: Nurturing vibrant, inclusive communities for everyone.
        - generic [ref=e497]:
          - img [ref=e498]
          - text: Stockholm, SE
        - generic [ref=e501]:
          - generic [ref=e502]:
            - paragraph [ref=e503]: 1,750
            - paragraph [ref=e504]: Followers
          - generic [ref=e505]:
            - paragraph [ref=e506]: $4,900
            - paragraph [ref=e507]: Earnings
    - link "Token Designer art Token Designer @token-designer Crafting sustainable tokens with purpose and style. Zurich, CH 1,600 Followers $3,400 Earnings" [ref=e509]:
      - /url: /creator/token-designer
      - generic [ref=e510]:
        - img "Token Designer" [ref=e511]
        - generic [ref=e512]:
          - paragraph [ref=e513]: art
          - heading "Token Designer" [level=3] [ref=e514]
          - paragraph [ref=e515]: "@token-designer"
        - paragraph [ref=e516]: Crafting sustainable tokens with purpose and style.
        - generic [ref=e517]:
          - img [ref=e518]
          - text: Zurich, CH
        - generic [ref=e521]:
          - generic [ref=e522]:
            - paragraph [ref=e523]: 1,600
            - paragraph [ref=e524]: Followers
          - generic [ref=e525]:
            - paragraph [ref=e526]: $3,400
            - paragraph [ref=e527]: Earnings
    - link "NFT Collector community NFT Collector @nft-collector Curating the finest digital assets in the metaverse. Singapore, SG 1,400 Followers $2,900 Earnings" [ref=e529]:
      - /url: /creator/nft-collector
      - img [ref=e532]
      - generic [ref=e534]:
        - img "NFT Collector" [ref=e535]
        - generic [ref=e536]:
          - paragraph [ref=e537]: community
          - heading "NFT Collector" [level=3] [ref=e538]
          - paragraph [ref=e539]: "@nft-collector"
        - paragraph [ref=e540]: Curating the finest digital assets in the metaverse.
        - generic [ref=e541]:
          - img [ref=e542]
          - text: Singapore, SG
        - generic [ref=e545]:
          - generic [ref=e546]:
            - paragraph [ref=e547]: 1,400
            - paragraph [ref=e548]: Followers
          - generic [ref=e549]:
            - paragraph [ref=e550]: $2,900
            - paragraph [ref=e551]: Earnings
    - link "Alice art Alice @alice Digital artist exploring the intersection of nature and code. Berlin, DE 1,250 Followers $4,500 Earnings" [ref=e553]:
      - /url: /creator/alice
      - img [ref=e556]
      - generic [ref=e558]:
        - img "Alice" [ref=e559]
        - generic [ref=e560]:
          - paragraph [ref=e561]: art
          - heading "Alice" [level=3] [ref=e562]
          - paragraph [ref=e563]: "@alice"
        - paragraph [ref=e564]: Digital artist exploring the intersection of nature and code.
        - generic [ref=e565]:
          - img [ref=e566]
          - text: Berlin, DE
        - generic [ref=e569]:
          - generic [ref=e570]:
            - paragraph [ref=e571]: 1,250
            - paragraph [ref=e572]: Followers
          - generic [ref=e573]:
            - paragraph [ref=e574]: $4,500
            - paragraph [ref=e575]: Earnings
    - link "Pixel Maker art Pixel Maker @pixelmaker Pixel by pixel, I bring worlds to life. Tokyo, JP 890 Followers $2,300 Earnings" [ref=e577]:
      - /url: /creator/pixelmaker
      - generic [ref=e578]:
        - img "Pixel Maker" [ref=e579]
        - generic [ref=e580]:
          - paragraph [ref=e581]: art
          - heading "Pixel Maker" [level=3] [ref=e582]
          - paragraph [ref=e583]: "@pixelmaker"
        - paragraph [ref=e584]: Pixel by pixel, I bring worlds to life.
        - generic [ref=e585]:
          - img [ref=e586]
          - text: Tokyo, JP
        - generic [ref=e589]:
          - generic [ref=e590]:
            - paragraph [ref=e591]: "890"
            - paragraph [ref=e592]: Followers
          - generic [ref=e593]:
            - paragraph [ref=e594]: $2,300
            - paragraph [ref=e595]: Earnings
```

# Test source

```ts
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
  83  |     throw new Error(
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
> 109 |   await page.goto(path);
      |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```