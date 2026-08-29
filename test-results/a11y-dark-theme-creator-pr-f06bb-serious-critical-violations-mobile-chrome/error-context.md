# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> dark theme >> creator profile has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on dark theme > creator profile:

[SERIOUS] aria-progressbar-name: Ensure every ARIA progressbar node has an accessible name
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name?application=playwright
  Nodes (1):
    - <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1" style="width: 0%;"></div>

[SERIOUS] aria-prohibited-attr: Ensure ARIA attributes are not prohibited for an element's role
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=playwright
  Nodes (5):
    - <div title="None" aria-label="Level 0: None" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.08); border-radius: 2.34px;"></div>
    - <div title="Low" aria-label="Level 1: Low" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.25); border-radius: 2.34px;"></div>
    - <div title="Medium" aria-label="Level 2: Medium" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.5); border-radius: 2.34px;"></div>
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: Freighter not installed
      - 'status "WebSocket status: Offline" [ref=e5]': Offline
    - generic [ref=e6]:
      - link "Back to Explore" [ref=e9] [cursor=pointer]:
        - /url: /explore
        - button "Back to Explore" [ref=e10]:
          - img [ref=e11]
          - text: Back to Explore
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]:
            - img "Test User's avatar" [ref=e17]
            - generic [ref=e18]:
              - heading "Test User" [level=1] [ref=e20]
              - paragraph [ref=e21]: "@testuser"
          - generic [ref=e22]:
            - link "QR Code" [ref=e23] [cursor=pointer]:
              - /url: /creator/testuser/qr
              - button "QR Code" [ref=e24]
            - link "View in AR" [ref=e25] [cursor=pointer]:
              - /url: /ar?mode=profile&username=testuser
              - img [ref=e26]
              - text: View in AR
            - button "Report @testuser" [ref=e32]: ⚑ Report
        - generic [ref=e33]:
          - paragraph [ref=e34]: A test creator
          - generic [ref=e35]:
            - paragraph [ref=e36]: Categories & Tags
            - generic [ref=e37]:
              - 'generic "Tag: art" [ref=e39]':
                - text: "#art"
                - img [ref=e40]
              - 'generic "Tag: test-tag" [ref=e43]':
                - text: "#test-tag"
                - img [ref=e44]
    - generic [ref=e46]:
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "Matching Campaigns" [level=2] [ref=e49]
          - paragraph [ref=e50]: Active matching campaigns that boost tips for this creator.
          - paragraph [ref=e51]: No active matching campaigns right now.
        - generic [ref=e52]:
          - heading "Creator Statistics" [level=2] [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "Fundraising Goal" [level=2] [ref=e56]:
                - img [ref=e57]
                - text: Fundraising Goal
              - generic [ref=e59]:
                - heading "Funding Goal Progress" [level=3] [ref=e61]
                - generic [ref=e62]:
                  - generic [ref=e63]: 1,234.5 / 10,000 XLM
                  - generic [ref=e64]: 12.3%
                - paragraph [ref=e65]: 13% to Bronze
            - generic [ref=e66]:
              - generic [ref=e67]:
                - generic [ref=e68]:
                  - img [ref=e70]
                  - generic [ref=e72]:
                    - img [ref=e73]
                    - generic [ref=e75]: +12.5%
                - heading "1,234.5 XLM" [level=3] [ref=e76]:
                  - generic [ref=e77]: 1,234.5 XLM
                - paragraph [ref=e78]: Total Tips
                - application [ref=e83]
              - generic [ref=e88]:
                - generic [ref=e89]:
                  - img [ref=e91]
                  - generic [ref=e93]:
                    - img [ref=e94]
                    - generic [ref=e96]: +8.2%
                - heading "56" [level=3] [ref=e97]
                - paragraph [ref=e98]: Tip Count
                - application [ref=e103]
              - generic [ref=e108]:
                - generic [ref=e109]:
                  - img [ref=e111]
                  - generic [ref=e113]:
                    - img [ref=e114]
                    - generic [ref=e116]: "-2.4%"
                - heading "42" [level=3] [ref=e117]
                - paragraph [ref=e118]: Supporters
                - application [ref=e123]
            - generic [ref=e128]:
              - generic [ref=e129]:
                - heading "Tip History" [level=2] [ref=e130]
                - generic [ref=e131]:
                  - paragraph [ref=e132]: Tips over time (XLM)
                  - application [ref=e135]:
                    - generic [ref=e146]:
                      - generic [ref=e147]:
                        - generic [ref=e149]: Aug 6
                        - generic [ref=e151]: Aug 8
                        - generic [ref=e153]: Aug 10
                        - generic [ref=e155]: Aug 12
                        - generic [ref=e157]: Aug 14
                        - generic [ref=e159]: Aug 16
                        - generic [ref=e161]: Aug 18
                      - generic [ref=e162]:
                        - generic [ref=e164]: "0"
                        - generic [ref=e166]: "40"
                        - generic [ref=e168]: "80"
                        - generic [ref=e170]: "120"
                        - generic [ref=e172]: "160"
              - generic [ref=e173]:
                - heading "Top Supporters" [level=2] [ref=e174]
                - generic [ref=e175]:
                  - paragraph [ref=e176]: Top Supporters
                  - list [ref=e177]:
                    - listitem [ref=e178]:
                      - text: "1"
                      - generic [ref=e179]:
                        - generic [ref=e180]:
                          - text: "@stellar-fan"
                          - generic [ref=e181]: 300 XLM
                        - paragraph [ref=e182]: 8 tips
                    - listitem [ref=e183]:
                      - text: "2"
                      - generic [ref=e184]:
                        - generic [ref=e185]:
                          - text: "@xlm-lover"
                          - generic [ref=e186]: 250 XLM
                        - paragraph [ref=e187]: 5 tips
                    - listitem [ref=e188]:
                      - text: "3"
                      - generic [ref=e189]:
                        - generic [ref=e190]:
                          - text: "@crypto-alice"
                          - generic [ref=e191]: 180 XLM
                        - paragraph [ref=e192]: 12 tips
                    - listitem [ref=e193]:
                      - text: "4"
                      - generic [ref=e194]:
                        - generic [ref=e195]:
                          - text: "@blockchainer"
                          - generic [ref=e196]: 120 XLM
                        - paragraph [ref=e197]: 3 tips
                    - listitem [ref=e198]:
                      - text: "5"
                      - generic [ref=e199]:
                        - generic [ref=e200]:
                          - text: "@defi-bob"
                          - generic [ref=e201]: 90 XLM
                        - paragraph [ref=e202]: 6 tips
            - generic [ref=e203]:
              - heading "Activity Heatmap" [level=2] [ref=e204]
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - generic [ref=e207]:
                    - generic [ref=e208]:
                      - heading "testuser's Tip Activity" [level=3] [ref=e209]
                      - paragraph [ref=e210]: 543 tips · 211 active days
                    - generic [ref=e211]:
                      - generic [ref=e212]:
                        - button "1yr" [ref=e213]
                        - button "2yr" [ref=e214]
                        - button "3yr" [ref=e215]
                      - generic [ref=e216]:
                        - button "Previous year" [ref=e217]
                        - text: This year
                        - button "Next year" [disabled] [ref=e219]
                      - generic [ref=e221]:
                        - button "Ocean theme" [pressed] [ref=e222]
                        - button "Sunrise theme" [ref=e223]
                        - button "Moss theme" [ref=e224]
                        - button "Purple theme" [ref=e225]
                        - button "Mono theme" [ref=e226]
                  - generic [ref=e227]:
                    - grid "Tip activity heatmap" [ref=e228]:
                      - generic [ref=e229]:
                        - generic [ref=e230]:
                          - generic [ref=e231]: Aug
                          - generic [ref=e232]: Sep
                          - generic [ref=e233]: Oct
                          - generic [ref=e234]: Nov
                          - generic [ref=e235]: Dec
                          - generic [ref=e236]: Jan
                          - generic [ref=e237]: Feb
                          - generic [ref=e238]: Mar
                          - generic [ref=e239]: Apr
                          - generic [ref=e240]: May
                          - generic [ref=e241]: Jun
                          - generic [ref=e242]: Jul
                          - generic [ref=e243]: Aug
                        - generic [ref=e244]:
                          - generic [ref=e245]:
                            - generic [ref=e247]: Mon
                            - generic [ref=e249]: Wed
                            - generic [ref=e251]: Fri
                          - generic [ref=e253]:
                            - row "Week of 2025-08-17" [ref=e254]:
                              - 'gridcell "2025-08-17: no tips" [ref=e255] [cursor=pointer]'
                              - 'gridcell "2025-08-18: no tips" [ref=e256] [cursor=pointer]'
                              - 'gridcell "2025-08-19: no tips" [ref=e257] [cursor=pointer]'
                              - 'gridcell "2025-08-20: 186.65 XLM, 3 tips" [ref=e258] [cursor=pointer]'
                              - 'gridcell "2025-08-21: no tips" [ref=e259] [cursor=pointer]'
                              - 'gridcell "2025-08-22: no tips" [ref=e260] [cursor=pointer]'
                              - 'gridcell "2025-08-23: no tips" [ref=e261] [cursor=pointer]'
                            - row "Week of 2025-08-24" [ref=e262]:
                              - 'gridcell "2025-08-24: no tips" [ref=e263] [cursor=pointer]'
                              - 'gridcell "2025-08-25: 299.95 XLM, 4 tips" [ref=e264] [cursor=pointer]'
                              - 'gridcell "2025-08-26: no tips" [ref=e265] [cursor=pointer]'
                              - 'gridcell "2025-08-27: 137.18 XLM, 2 tips" [ref=e266] [cursor=pointer]'
                              - 'gridcell "2025-08-28: no tips" [ref=e267] [cursor=pointer]'
                              - 'gridcell "2025-08-29: 305.00 XLM, 3 tips" [ref=e268] [cursor=pointer]'
                              - 'gridcell "2025-08-30: no tips" [ref=e269] [cursor=pointer]'
                            - row "Week of 2025-08-31" [ref=e270]:
                              - 'gridcell "2025-08-31: 237.12 XLM, 4 tips" [ref=e271] [cursor=pointer]'
                              - 'gridcell "2025-09-01: 7.08 XLM, 1 tip" [ref=e272] [cursor=pointer]'
                              - 'gridcell "2025-09-02: no tips" [ref=e273] [cursor=pointer]'
                              - 'gridcell "2025-09-03: no tips" [ref=e274] [cursor=pointer]'
                              - 'gridcell "2025-09-04: no tips" [ref=e275] [cursor=pointer]'
                              - 'gridcell "2025-09-05: 255.19 XLM, 3 tips" [ref=e276] [cursor=pointer]'
                              - 'gridcell "2025-09-06: 425.80 XLM, 4 tips" [ref=e277] [cursor=pointer]'
                            - row "Week of 2025-09-07" [ref=e278]:
                              - 'gridcell "2025-09-07: 115.65 XLM, 2 tips" [ref=e279] [cursor=pointer]'
                              - 'gridcell "2025-09-08: no tips" [ref=e280] [cursor=pointer]'
                              - 'gridcell "2025-09-09: no tips" [ref=e281] [cursor=pointer]'
                              - 'gridcell "2025-09-10: no tips" [ref=e282] [cursor=pointer]'
                              - 'gridcell "2025-09-11: 108.34 XLM, 1 tip" [ref=e283] [cursor=pointer]'
                              - 'gridcell "2025-09-12: 213.24 XLM, 2 tips" [ref=e284] [cursor=pointer]'
                              - 'gridcell "2025-09-13: 38.64 XLM, 1 tip" [ref=e285] [cursor=pointer]'
                            - row "Week of 2025-09-14" [ref=e286]:
                              - 'gridcell "2025-09-14: 107.65 XLM, 2 tips" [ref=e287] [cursor=pointer]'
                              - 'gridcell "2025-09-15: 68.40 XLM, 1 tip" [ref=e288] [cursor=pointer]'
                              - 'gridcell "2025-09-16: 233.44 XLM, 4 tips" [ref=e289] [cursor=pointer]'
                              - 'gridcell "2025-09-17: 94.93 XLM, 1 tip" [ref=e290] [cursor=pointer]'
                              - 'gridcell "2025-09-18: 85.33 XLM, 2 tips" [ref=e291] [cursor=pointer]'
                              - 'gridcell "2025-09-19: 325.02 XLM, 4 tips" [ref=e292] [cursor=pointer]'
                              - 'gridcell "2025-09-20: no tips" [ref=e293] [cursor=pointer]'
                            - row "Week of 2025-09-21" [ref=e294]:
                              - 'gridcell "2025-09-21: 192.51 XLM, 4 tips" [ref=e295] [cursor=pointer]'
                              - 'gridcell "2025-09-22: 39.47 XLM, 1 tip" [ref=e296] [cursor=pointer]'
                              - 'gridcell "2025-09-23: 228.86 XLM, 4 tips" [ref=e297] [cursor=pointer]'
                              - 'gridcell "2025-09-24: 58.79 XLM, 2 tips" [ref=e298] [cursor=pointer]'
                              - 'gridcell "2025-09-25: no tips" [ref=e299] [cursor=pointer]'
                              - 'gridcell "2025-09-26: no tips" [ref=e300] [cursor=pointer]'
                              - 'gridcell "2025-09-27: no tips" [ref=e301] [cursor=pointer]'
                            - row "Week of 2025-09-28" [ref=e302]:
                              - 'gridcell "2025-09-28: no tips" [ref=e303] [cursor=pointer]'
                              - 'gridcell "2025-09-29: 159.77 XLM, 2 tips" [ref=e304] [cursor=pointer]'
                              - 'gridcell "2025-09-30: no tips" [ref=e305] [cursor=pointer]'
                              - 'gridcell "2025-10-01: no tips" [ref=e306] [cursor=pointer]'
                              - 'gridcell "2025-10-02: no tips" [ref=e307] [cursor=pointer]'
                              - 'gridcell "2025-10-03: 186.20 XLM, 2 tips" [ref=e308] [cursor=pointer]'
                              - 'gridcell "2025-10-04: 240.54 XLM, 4 tips" [ref=e309] [cursor=pointer]'
                            - row "Week of 2025-10-05" [ref=e310]:
                              - 'gridcell "2025-10-05: 293.23 XLM, 4 tips" [ref=e311] [cursor=pointer]'
                              - 'gridcell "2025-10-06: no tips" [ref=e312] [cursor=pointer]'
                              - 'gridcell "2025-10-07: no tips" [ref=e313] [cursor=pointer]'
                              - 'gridcell "2025-10-08: 183.34 XLM, 2 tips" [ref=e314] [cursor=pointer]'
                              - 'gridcell "2025-10-09: no tips" [ref=e315] [cursor=pointer]'
                              - 'gridcell "2025-10-10: no tips" [ref=e316] [cursor=pointer]'
                              - 'gridcell "2025-10-11: 178.51 XLM, 2 tips" [ref=e317] [cursor=pointer]'
                            - row "Week of 2025-10-12" [ref=e318]:
                              - 'gridcell "2025-10-12: 86.87 XLM, 2 tips" [ref=e319] [cursor=pointer]'
                              - 'gridcell "2025-10-13: 149.03 XLM, 2 tips" [ref=e320] [cursor=pointer]'
                              - 'gridcell "2025-10-14: 132.90 XLM, 2 tips" [ref=e321] [cursor=pointer]'
                              - 'gridcell "2025-10-15: 14.47 XLM, 1 tip" [ref=e322] [cursor=pointer]'
                              - 'gridcell "2025-10-16: 265.16 XLM, 3 tips" [ref=e323] [cursor=pointer]'
                              - 'gridcell "2025-10-17: 43.02 XLM, 1 tip" [ref=e324] [cursor=pointer]'
                              - 'gridcell "2025-10-18: 125.63 XLM, 3 tips" [ref=e325] [cursor=pointer]'
                            - row "Week of 2025-10-19" [ref=e326]:
                              - 'gridcell "2025-10-19: 202.89 XLM, 4 tips" [ref=e327] [cursor=pointer]'
                              - 'gridcell "2025-10-20: 124.60 XLM, 1 tip" [ref=e328] [cursor=pointer]'
                              - 'gridcell "2025-10-21: no tips" [ref=e329] [cursor=pointer]'
                              - 'gridcell "2025-10-22: 174.76 XLM, 2 tips" [ref=e330] [cursor=pointer]'
                              - 'gridcell "2025-10-23: no tips" [ref=e331] [cursor=pointer]'
                              - 'gridcell "2025-10-24: no tips" [ref=e332] [cursor=pointer]'
                              - 'gridcell "2025-10-25: 217.06 XLM, 4 tips" [ref=e333] [cursor=pointer]'
                            - row "Week of 2025-10-26" [ref=e334]:
                              - 'gridcell "2025-10-26: no tips" [ref=e335] [cursor=pointer]'
                              - 'gridcell "2025-10-27: 296.14 XLM, 4 tips" [ref=e336] [cursor=pointer]'
                              - 'gridcell "2025-10-28: 239.25 XLM, 4 tips" [ref=e337] [cursor=pointer]'
                              - 'gridcell "2025-10-29: no tips" [ref=e338] [cursor=pointer]'
                              - 'gridcell "2025-10-30: 82.18 XLM, 1 tip" [ref=e339] [cursor=pointer]'
                              - 'gridcell "2025-10-31: no tips" [ref=e340] [cursor=pointer]'
                              - 'gridcell "2025-11-01: 365.69 XLM, 4 tips" [ref=e341] [cursor=pointer]'
                            - row "Week of 2025-11-02" [ref=e342]:
                              - 'gridcell "2025-11-02: 161.29 XLM, 3 tips" [ref=e343] [cursor=pointer]'
                              - 'gridcell "2025-11-03: 308.96 XLM, 4 tips" [ref=e344] [cursor=pointer]'
                              - 'gridcell "2025-11-04: 287.14 XLM, 4 tips" [ref=e345] [cursor=pointer]'
                              - 'gridcell "2025-11-05: 217.01 XLM, 3 tips" [ref=e346] [cursor=pointer]'
                              - 'gridcell "2025-11-06: 10.98 XLM, 1 tip" [ref=e347] [cursor=pointer]'
                              - 'gridcell "2025-11-07: 55.48 XLM, 1 tip" [ref=e348] [cursor=pointer]'
                              - 'gridcell "2025-11-08: no tips" [ref=e349] [cursor=pointer]'
                            - row "Week of 2025-11-09" [ref=e350]:
                              - 'gridcell "2025-11-09: 138.07 XLM, 3 tips" [ref=e351] [cursor=pointer]'
                              - 'gridcell "2025-11-10: 196.38 XLM, 3 tips" [ref=e352] [cursor=pointer]'
                              - 'gridcell "2025-11-11: 297.68 XLM, 4 tips" [ref=e353] [cursor=pointer]'
                              - 'gridcell "2025-11-12: no tips" [ref=e354] [cursor=pointer]'
                              - 'gridcell "2025-11-13: 282.22 XLM, 4 tips" [ref=e355] [cursor=pointer]'
                              - 'gridcell "2025-11-14: 181.06 XLM, 3 tips" [ref=e356] [cursor=pointer]'
                              - 'gridcell "2025-11-15: no tips" [ref=e357] [cursor=pointer]'
                            - row "Week of 2025-11-16" [ref=e358]:
                              - 'gridcell "2025-11-16: no tips" [ref=e359] [cursor=pointer]'
                              - 'gridcell "2025-11-17: no tips" [ref=e360] [cursor=pointer]'
                              - 'gridcell "2025-11-18: 136.50 XLM, 2 tips" [ref=e361] [cursor=pointer]'
                              - 'gridcell "2025-11-19: 287.57 XLM, 4 tips" [ref=e362] [cursor=pointer]'
                              - 'gridcell "2025-11-20: 293.59 XLM, 4 tips" [ref=e363] [cursor=pointer]'
                              - 'gridcell "2025-11-21: no tips" [ref=e364] [cursor=pointer]'
                              - 'gridcell "2025-11-22: no tips" [ref=e365] [cursor=pointer]'
                            - row "Week of 2025-11-23" [ref=e366]:
                              - 'gridcell "2025-11-23: 33.57 XLM, 1 tip" [ref=e367] [cursor=pointer]'
                              - 'gridcell "2025-11-24: 135.15 XLM, 2 tips" [ref=e368] [cursor=pointer]'
                              - 'gridcell "2025-11-25: no tips" [ref=e369] [cursor=pointer]'
                              - 'gridcell "2025-11-26: 52.16 XLM, 1 tip" [ref=e370] [cursor=pointer]'
                              - 'gridcell "2025-11-27: 137.21 XLM, 2 tips" [ref=e371] [cursor=pointer]'
                              - 'gridcell "2025-11-28: 220.76 XLM, 4 tips" [ref=e372] [cursor=pointer]'
                              - 'gridcell "2025-11-29: 58.44 XLM, 1 tip" [ref=e373] [cursor=pointer]'
                            - row "Week of 2025-11-30" [ref=e374]:
                              - 'gridcell "2025-11-30: no tips" [ref=e375] [cursor=pointer]'
                              - 'gridcell "2025-12-01: 269.97 XLM, 3 tips" [ref=e376] [cursor=pointer]'
                              - 'gridcell "2025-12-02: 114.62 XLM, 1 tip" [ref=e377] [cursor=pointer]'
                              - 'gridcell "2025-12-03: no tips" [ref=e378] [cursor=pointer]'
                              - 'gridcell "2025-12-04: 236.83 XLM, 4 tips" [ref=e379] [cursor=pointer]'
                              - 'gridcell "2025-12-05: no tips" [ref=e380] [cursor=pointer]'
                              - 'gridcell "2025-12-06: 271.79 XLM, 4 tips" [ref=e381] [cursor=pointer]'
                            - row "Week of 2025-12-07" [ref=e382]:
                              - 'gridcell "2025-12-07: no tips" [ref=e383] [cursor=pointer]'
                              - 'gridcell "2025-12-08: no tips" [ref=e384] [cursor=pointer]'
                              - 'gridcell "2025-12-09: 282.87 XLM, 4 tips" [ref=e385] [cursor=pointer]'
                              - 'gridcell "2025-12-10: 13.49 XLM, 1 tip" [ref=e386] [cursor=pointer]'
                              - 'gridcell "2025-12-11: 289.70 XLM, 3 tips" [ref=e387] [cursor=pointer]'
                              - 'gridcell "2025-12-12: no tips" [ref=e388] [cursor=pointer]'
                              - 'gridcell "2025-12-13: 12.81 XLM, 1 tip" [ref=e389] [cursor=pointer]'
                            - row "Week of 2025-12-14" [ref=e390]:
                              - 'gridcell "2025-12-14: no tips" [ref=e391] [cursor=pointer]'
                              - 'gridcell "2025-12-15: 166.75 XLM, 3 tips" [ref=e392] [cursor=pointer]'
                              - 'gridcell "2025-12-16: 304.54 XLM, 4 tips" [ref=e393] [cursor=pointer]'
                              - 'gridcell "2025-12-17: 209.63 XLM, 2 tips" [ref=e394] [cursor=pointer]'
                              - 'gridcell "2025-12-18: no tips" [ref=e395] [cursor=pointer]'
                              - 'gridcell "2025-12-19: 168.87 XLM, 2 tips" [ref=e396] [cursor=pointer]'
                              - 'gridcell "2025-12-20: 294.22 XLM, 3 tips" [ref=e397] [cursor=pointer]'
                            - row "Week of 2025-12-21" [ref=e398]:
                              - 'gridcell "2025-12-21: no tips" [ref=e399] [cursor=pointer]'
                              - 'gridcell "2025-12-22: 70.33 XLM, 1 tip" [ref=e400] [cursor=pointer]'
                              - 'gridcell "2025-12-23: 173.95 XLM, 2 tips" [ref=e401] [cursor=pointer]'
                              - 'gridcell "2025-12-24: 260.86 XLM, 3 tips" [ref=e402] [cursor=pointer]'
                              - 'gridcell "2025-12-25: no tips" [ref=e403] [cursor=pointer]'
                              - 'gridcell "2025-12-26: no tips" [ref=e404] [cursor=pointer]'
                              - 'gridcell "2025-12-27: no tips" [ref=e405] [cursor=pointer]'
                            - row "Week of 2025-12-28" [ref=e406]:
                              - 'gridcell "2025-12-28: 181.91 XLM, 2 tips" [ref=e407] [cursor=pointer]'
                              - 'gridcell "2025-12-29: 358.76 XLM, 4 tips" [ref=e408] [cursor=pointer]'
                              - 'gridcell "2025-12-30: no tips" [ref=e409] [cursor=pointer]'
                              - 'gridcell "2025-12-31: 123.86 XLM, 1 tip" [ref=e410] [cursor=pointer]'
                              - 'gridcell "2026-01-01: 230.25 XLM, 4 tips" [ref=e411] [cursor=pointer]'
                              - 'gridcell "2026-01-02: no tips" [ref=e412] [cursor=pointer]'
                              - 'gridcell "2026-01-03: 220.14 XLM, 3 tips" [ref=e413] [cursor=pointer]'
                            - row "Week of 2026-01-04" [ref=e414]:
                              - 'gridcell "2026-01-04: no tips" [ref=e415] [cursor=pointer]'
                              - 'gridcell "2026-01-05: no tips" [ref=e416] [cursor=pointer]'
                              - 'gridcell "2026-01-06: 10.38 XLM, 1 tip" [ref=e417] [cursor=pointer]'
                              - 'gridcell "2026-01-07: 97.45 XLM, 1 tip" [ref=e418] [cursor=pointer]'
                              - 'gridcell "2026-01-08: no tips" [ref=e419] [cursor=pointer]'
                              - 'gridcell "2026-01-09: 139.87 XLM, 3 tips" [ref=e420] [cursor=pointer]'
                              - 'gridcell "2026-01-10: no tips" [ref=e421] [cursor=pointer]'
                            - row "Week of 2026-01-11" [ref=e422]:
                              - 'gridcell "2026-01-11: no tips" [ref=e423] [cursor=pointer]'
                              - 'gridcell "2026-01-12: 95.87 XLM, 2 tips" [ref=e424] [cursor=pointer]'
                              - 'gridcell "2026-01-13: 54.58 XLM, 1 tip" [ref=e425] [cursor=pointer]'
                              - 'gridcell "2026-01-14: no tips" [ref=e426] [cursor=pointer]'
                              - 'gridcell "2026-01-15: 173.46 XLM, 3 tips" [ref=e427] [cursor=pointer]'
                              - 'gridcell "2026-01-16: 179.08 XLM, 2 tips" [ref=e428] [cursor=pointer]'
                              - 'gridcell "2026-01-17: no tips" [ref=e429] [cursor=pointer]'
                            - row "Week of 2026-01-18" [ref=e430]:
                              - 'gridcell "2026-01-18: no tips" [ref=e431] [cursor=pointer]'
                              - 'gridcell "2026-01-19: no tips" [ref=e432] [cursor=pointer]'
                              - 'gridcell "2026-01-20: no tips" [ref=e433] [cursor=pointer]'
                              - 'gridcell "2026-01-21: 83.16 XLM, 3 tips" [ref=e434] [cursor=pointer]'
                              - 'gridcell "2026-01-22: 194.30 XLM, 3 tips" [ref=e435] [cursor=pointer]'
                              - 'gridcell "2026-01-23: no tips" [ref=e436] [cursor=pointer]'
                              - 'gridcell "2026-01-24: no tips" [ref=e437] [cursor=pointer]'
                            - row "Week of 2026-01-25" [ref=e438]:
                              - 'gridcell "2026-01-25: 242.78 XLM, 4 tips" [ref=e439] [cursor=pointer]'
                              - 'gridcell "2026-01-26: no tips" [ref=e440] [cursor=pointer]'
                              - 'gridcell "2026-01-27: 148.17 XLM, 3 tips" [ref=e441] [cursor=pointer]'
                              - 'gridcell "2026-01-28: 99.32 XLM, 1 tip" [ref=e442] [cursor=pointer]'
                              - 'gridcell "2026-01-29: 98.95 XLM, 1 tip" [ref=e443] [cursor=pointer]'
                              - 'gridcell "2026-01-30: 191.99 XLM, 4 tips" [ref=e444] [cursor=pointer]'
                              - 'gridcell "2026-01-31: no tips" [ref=e445] [cursor=pointer]'
                            - row "Week of 2026-02-01" [ref=e446]:
                              - 'gridcell "2026-02-01: no tips" [ref=e447] [cursor=pointer]'
                              - 'gridcell "2026-02-02: no tips" [ref=e448] [cursor=pointer]'
                              - 'gridcell "2026-02-03: 144.61 XLM, 3 tips" [ref=e449] [cursor=pointer]'
                              - 'gridcell "2026-02-04: no tips" [ref=e450] [cursor=pointer]'
                              - 'gridcell "2026-02-05: no tips" [ref=e451] [cursor=pointer]'
                              - 'gridcell "2026-02-06: 337.15 XLM, 4 tips" [ref=e452] [cursor=pointer]'
                              - 'gridcell "2026-02-07: 92.51 XLM, 2 tips" [ref=e453] [cursor=pointer]'
                            - row "Week of 2026-02-08" [ref=e454]:
                              - 'gridcell "2026-02-08: 127.72 XLM, 3 tips" [ref=e455] [cursor=pointer]'
                              - 'gridcell "2026-02-09: 269.95 XLM, 3 tips" [ref=e456] [cursor=pointer]'
                              - 'gridcell "2026-02-10: 246.41 XLM, 4 tips" [ref=e457] [cursor=pointer]'
                              - 'gridcell "2026-02-11: no tips" [ref=e458] [cursor=pointer]'
                              - 'gridcell "2026-02-12: no tips" [ref=e459] [cursor=pointer]'
                              - 'gridcell "2026-02-13: 97.70 XLM, 1 tip" [ref=e460] [cursor=pointer]'
                              - 'gridcell "2026-02-14: 297.42 XLM, 3 tips" [ref=e461] [cursor=pointer]'
                            - row "Week of 2026-02-15" [ref=e462]:
                              - 'gridcell "2026-02-15: 91.39 XLM, 1 tip" [ref=e463] [cursor=pointer]'
                              - 'gridcell "2026-02-16: 237.76 XLM, 4 tips" [ref=e464] [cursor=pointer]'
                              - 'gridcell "2026-02-17: 92.26 XLM, 1 tip" [ref=e465] [cursor=pointer]'
                              - 'gridcell "2026-02-18: 444.33 XLM, 4 tips" [ref=e466] [cursor=pointer]'
                              - 'gridcell "2026-02-19: no tips" [ref=e467] [cursor=pointer]'
                              - 'gridcell "2026-02-20: 135.51 XLM, 3 tips" [ref=e468] [cursor=pointer]'
                              - 'gridcell "2026-02-21: no tips" [ref=e469] [cursor=pointer]'
                            - row "Week of 2026-02-22" [ref=e470]:
                              - 'gridcell "2026-02-22: 296.60 XLM, 4 tips" [ref=e471] [cursor=pointer]'
                              - 'gridcell "2026-02-23: no tips" [ref=e472] [cursor=pointer]'
                              - 'gridcell "2026-02-24: no tips" [ref=e473] [cursor=pointer]'
                              - 'gridcell "2026-02-25: 220.19 XLM, 3 tips" [ref=e474] [cursor=pointer]'
                              - 'gridcell "2026-02-26: no tips" [ref=e475] [cursor=pointer]'
                              - 'gridcell "2026-02-27: no tips" [ref=e476] [cursor=pointer]'
                              - 'gridcell "2026-02-28: 158.97 XLM, 3 tips" [ref=e477] [cursor=pointer]'
                            - row "Week of 2026-03-01" [ref=e478]:
                              - 'gridcell "2026-03-01: 181.19 XLM, 4 tips" [ref=e479] [cursor=pointer]'
                              - 'gridcell "2026-03-02: no tips" [ref=e480] [cursor=pointer]'
                              - 'gridcell "2026-03-03: no tips" [ref=e481] [cursor=pointer]'
                              - 'gridcell "2026-03-04: 273.75 XLM, 4 tips" [ref=e482] [cursor=pointer]'
                              - 'gridcell "2026-03-05: 89.25 XLM, 2 tips" [ref=e483] [cursor=pointer]'
                              - 'gridcell "2026-03-06: 245.23 XLM, 4 tips" [ref=e484] [cursor=pointer]'
                              - 'gridcell "2026-03-07: 176.18 XLM, 2 tips" [ref=e485] [cursor=pointer]'
                            - row "Week of 2026-03-08" [ref=e486]:
                              - 'gridcell "2026-03-08: 300.65 XLM, 4 tips" [ref=e487] [cursor=pointer]'
                              - 'gridcell "2026-03-09: no tips" [ref=e488] [cursor=pointer]'
                              - 'gridcell "2026-03-10: no tips" [ref=e489] [cursor=pointer]'
                              - 'gridcell "2026-03-11: 12.21 XLM, 1 tip" [ref=e490] [cursor=pointer]'
                              - 'gridcell "2026-03-12: 197.98 XLM, 3 tips" [ref=e491] [cursor=pointer]'
                              - 'gridcell "2026-03-13: no tips" [ref=e492] [cursor=pointer]'
                              - 'gridcell "2026-03-14: no tips" [ref=e493] [cursor=pointer]'
                            - row "Week of 2026-03-15" [ref=e494]:
                              - 'gridcell "2026-03-15: no tips" [ref=e495] [cursor=pointer]'
                              - 'gridcell "2026-03-16: 89.48 XLM, 1 tip" [ref=e496] [cursor=pointer]'
                              - 'gridcell "2026-03-17: 214.95 XLM, 3 tips" [ref=e497] [cursor=pointer]'
                              - 'gridcell "2026-03-18: 52.34 XLM, 1 tip" [ref=e498] [cursor=pointer]'
                              - 'gridcell "2026-03-19: no tips" [ref=e499] [cursor=pointer]'
                              - 'gridcell "2026-03-20: 113.87 XLM, 1 tip" [ref=e500] [cursor=pointer]'
                              - 'gridcell "2026-03-21: no tips" [ref=e501] [cursor=pointer]'
                            - row "Week of 2026-03-22" [ref=e502]:
                              - 'gridcell "2026-03-22: no tips" [ref=e503] [cursor=pointer]'
                              - 'gridcell "2026-03-23: 197.44 XLM, 2 tips" [ref=e504] [cursor=pointer]'
                              - 'gridcell "2026-03-24: no tips" [ref=e505] [cursor=pointer]'
                              - 'gridcell "2026-03-25: no tips" [ref=e506] [cursor=pointer]'
                              - 'gridcell "2026-03-26: 207.63 XLM, 2 tips" [ref=e507] [cursor=pointer]'
                              - 'gridcell "2026-03-27: no tips" [ref=e508] [cursor=pointer]'
                              - 'gridcell "2026-03-28: 308.81 XLM, 4 tips" [ref=e509] [cursor=pointer]'
                            - row "Week of 2026-03-29" [ref=e510]:
                              - 'gridcell "2026-03-29: no tips" [ref=e511] [cursor=pointer]'
                              - 'gridcell "2026-03-30: 152.01 XLM, 4 tips" [ref=e512] [cursor=pointer]'
                              - 'gridcell "2026-03-31: no tips" [ref=e513] [cursor=pointer]'
                              - 'gridcell "2026-04-01: no tips" [ref=e514] [cursor=pointer]'
                              - 'gridcell "2026-04-02: 74.32 XLM, 1 tip" [ref=e515] [cursor=pointer]'
                              - 'gridcell "2026-04-03: 67.04 XLM, 1 tip" [ref=e516] [cursor=pointer]'
                              - 'gridcell "2026-04-04: no tips" [ref=e517] [cursor=pointer]'
                            - row "Week of 2026-04-05" [ref=e518]:
                              - 'gridcell "2026-04-05: 137.46 XLM, 2 tips" [ref=e519] [cursor=pointer]'
                              - 'gridcell "2026-04-06: 336.09 XLM, 4 tips" [ref=e520] [cursor=pointer]'
                              - 'gridcell "2026-04-07: 117.42 XLM, 2 tips" [ref=e521] [cursor=pointer]'
                              - 'gridcell "2026-04-08: 273.78 XLM, 3 tips" [ref=e522] [cursor=pointer]'
                              - 'gridcell "2026-04-09: 61.11 XLM, 2 tips" [ref=e523] [cursor=pointer]'
                              - 'gridcell "2026-04-10: no tips" [ref=e524] [cursor=pointer]'
                              - 'gridcell "2026-04-11: 81.54 XLM, 3 tips" [ref=e525] [cursor=pointer]'
                            - row "Week of 2026-04-12" [ref=e526]:
                              - 'gridcell "2026-04-12: 342.91 XLM, 4 tips" [ref=e527] [cursor=pointer]'
                              - 'gridcell "2026-04-13: 56.69 XLM, 1 tip" [ref=e528] [cursor=pointer]'
                              - 'gridcell "2026-04-14: 236.51 XLM, 3 tips" [ref=e529] [cursor=pointer]'
                              - 'gridcell "2026-04-15: 83.53 XLM, 2 tips" [ref=e530] [cursor=pointer]'
                              - 'gridcell "2026-04-16: no tips" [ref=e531] [cursor=pointer]'
                              - 'gridcell "2026-04-17: 100.17 XLM, 1 tip" [ref=e532] [cursor=pointer]'
                              - 'gridcell "2026-04-18: no tips" [ref=e533] [cursor=pointer]'
                            - row "Week of 2026-04-19" [ref=e534]:
                              - 'gridcell "2026-04-19: no tips" [ref=e535] [cursor=pointer]'
                              - 'gridcell "2026-04-20: no tips" [ref=e536] [cursor=pointer]'
                              - 'gridcell "2026-04-21: no tips" [ref=e537] [cursor=pointer]'
                              - 'gridcell "2026-04-22: 118.50 XLM, 3 tips" [ref=e538] [cursor=pointer]'
                              - 'gridcell "2026-04-23: no tips" [ref=e539] [cursor=pointer]'
                              - 'gridcell "2026-04-24: 63.26 XLM, 2 tips" [ref=e540] [cursor=pointer]'
                              - 'gridcell "2026-04-25: no tips" [ref=e541] [cursor=pointer]'
                            - row "Week of 2026-04-26" [ref=e542]:
                              - 'gridcell "2026-04-26: no tips" [ref=e543] [cursor=pointer]'
                              - 'gridcell "2026-04-27: 181.74 XLM, 4 tips" [ref=e544] [cursor=pointer]'
                              - 'gridcell "2026-04-28: no tips" [ref=e545] [cursor=pointer]'
                              - 'gridcell "2026-04-29: 161.75 XLM, 2 tips" [ref=e546] [cursor=pointer]'
                              - 'gridcell "2026-04-30: no tips" [ref=e547] [cursor=pointer]'
                              - 'gridcell "2026-05-01: 67.10 XLM, 1 tip" [ref=e548] [cursor=pointer]'
                              - 'gridcell "2026-05-02: 275.14 XLM, 4 tips" [ref=e549] [cursor=pointer]'
                            - row "Week of 2026-05-03" [ref=e550]:
                              - 'gridcell "2026-05-03: 202.31 XLM, 3 tips" [ref=e551] [cursor=pointer]'
                              - 'gridcell "2026-05-04: 166.50 XLM, 3 tips" [ref=e552] [cursor=pointer]'
                              - 'gridcell "2026-05-05: no tips" [ref=e553] [cursor=pointer]'
                              - 'gridcell "2026-05-06: no tips" [ref=e554] [cursor=pointer]'
                              - 'gridcell "2026-05-07: 54.63 XLM, 1 tip" [ref=e555] [cursor=pointer]'
                              - 'gridcell "2026-05-08: 159.82 XLM, 3 tips" [ref=e556] [cursor=pointer]'
                              - 'gridcell "2026-05-09: 366.77 XLM, 4 tips" [ref=e557] [cursor=pointer]'
                            - row "Week of 2026-05-10" [ref=e558]:
                              - 'gridcell "2026-05-10: 152.52 XLM, 3 tips" [ref=e559] [cursor=pointer]'
                              - 'gridcell "2026-05-11: 107.62 XLM, 2 tips" [ref=e560] [cursor=pointer]'
                              - 'gridcell "2026-05-12: 333.49 XLM, 4 tips" [ref=e561] [cursor=pointer]'
                              - 'gridcell "2026-05-13: 5.15 XLM, 1 tip" [ref=e562] [cursor=pointer]'
                              - 'gridcell "2026-05-14: 181.88 XLM, 4 tips" [ref=e563] [cursor=pointer]'
                              - 'gridcell "2026-05-15: no tips" [ref=e564] [cursor=pointer]'
                              - 'gridcell "2026-05-16: no tips" [ref=e565] [cursor=pointer]'
                            - row "Week of 2026-05-17" [ref=e566]:
                              - 'gridcell "2026-05-17: no tips" [ref=e567] [cursor=pointer]'
                              - 'gridcell "2026-05-18: no tips" [ref=e568] [cursor=pointer]'
                              - 'gridcell "2026-05-19: no tips" [ref=e569] [cursor=pointer]'
                              - 'gridcell "2026-05-20: 25.29 XLM, 2 tips" [ref=e570] [cursor=pointer]'
                              - 'gridcell "2026-05-21: 105.33 XLM, 2 tips" [ref=e571] [cursor=pointer]'
                              - 'gridcell "2026-05-22: no tips" [ref=e572] [cursor=pointer]'
                              - 'gridcell "2026-05-23: no tips" [ref=e573] [cursor=pointer]'
                            - row "Week of 2026-05-24" [ref=e574]:
                              - 'gridcell "2026-05-24: 126.47 XLM, 3 tips" [ref=e575] [cursor=pointer]'
                              - 'gridcell "2026-05-25: 100.09 XLM, 2 tips" [ref=e576] [cursor=pointer]'
                              - 'gridcell "2026-05-26: no tips" [ref=e577] [cursor=pointer]'
                              - 'gridcell "2026-05-27: 272.87 XLM, 3 tips" [ref=e578] [cursor=pointer]'
                              - 'gridcell "2026-05-28: no tips" [ref=e579] [cursor=pointer]'
                              - 'gridcell "2026-05-29: no tips" [ref=e580] [cursor=pointer]'
                              - 'gridcell "2026-05-30: no tips" [ref=e581] [cursor=pointer]'
                            - row "Week of 2026-05-31" [ref=e582]:
                              - 'gridcell "2026-05-31: no tips" [ref=e583] [cursor=pointer]'
                              - 'gridcell "2026-06-01: no tips" [ref=e584] [cursor=pointer]'
                              - 'gridcell "2026-06-02: no tips" [ref=e585] [cursor=pointer]'
                              - 'gridcell "2026-06-03: 100.68 XLM, 2 tips" [ref=e586] [cursor=pointer]'
                              - 'gridcell "2026-06-04: 133.53 XLM, 3 tips" [ref=e587] [cursor=pointer]'
                              - 'gridcell "2026-06-05: no tips" [ref=e588] [cursor=pointer]'
                              - 'gridcell "2026-06-06: no tips" [ref=e589] [cursor=pointer]'
                            - row "Week of 2026-06-07" [ref=e590]:
                              - 'gridcell "2026-06-07: no tips" [ref=e591] [cursor=pointer]'
                              - 'gridcell "2026-06-08: 55.05 XLM, 1 tip" [ref=e592] [cursor=pointer]'
                              - 'gridcell "2026-06-09: 280.38 XLM, 4 tips" [ref=e593] [cursor=pointer]'
                              - 'gridcell "2026-06-10: 75.14 XLM, 3 tips" [ref=e594] [cursor=pointer]'
                              - 'gridcell "2026-06-11: 91.87 XLM, 1 tip" [ref=e595] [cursor=pointer]'
                              - 'gridcell "2026-06-12: 115.16 XLM, 2 tips" [ref=e596] [cursor=pointer]'
                              - 'gridcell "2026-06-13: 126.10 XLM, 3 tips" [ref=e597] [cursor=pointer]'
                            - row "Week of 2026-06-14" [ref=e598]:
                              - 'gridcell "2026-06-14: no tips" [ref=e599] [cursor=pointer]'
                              - 'gridcell "2026-06-15: 253.87 XLM, 3 tips" [ref=e600] [cursor=pointer]'
                              - 'gridcell "2026-06-16: 180.86 XLM, 3 tips" [ref=e601] [cursor=pointer]'
                              - 'gridcell "2026-06-17: 153.61 XLM, 2 tips" [ref=e602] [cursor=pointer]'
                              - 'gridcell "2026-06-18: no tips" [ref=e603] [cursor=pointer]'
                              - 'gridcell "2026-06-19: 69.21 XLM, 1 tip" [ref=e604] [cursor=pointer]'
                              - 'gridcell "2026-06-20: no tips" [ref=e605] [cursor=pointer]'
                            - row "Week of 2026-06-21" [ref=e606]:
                              - 'gridcell "2026-06-21: no tips" [ref=e607] [cursor=pointer]'
                              - 'gridcell "2026-06-22: 205.66 XLM, 3 tips" [ref=e608] [cursor=pointer]'
                              - 'gridcell "2026-06-23: no tips" [ref=e609] [cursor=pointer]'
                              - 'gridcell "2026-06-24: 66.25 XLM, 1 tip" [ref=e610] [cursor=pointer]'
                              - 'gridcell "2026-06-25: no tips" [ref=e611] [cursor=pointer]'
                              - 'gridcell "2026-06-26: 138.81 XLM, 3 tips" [ref=e612] [cursor=pointer]'
                              - 'gridcell "2026-06-27: no tips" [ref=e613] [cursor=pointer]'
                            - row "Week of 2026-06-28" [ref=e614]:
                              - 'gridcell "2026-06-28: 195.04 XLM, 3 tips" [ref=e615] [cursor=pointer]'
                              - 'gridcell "2026-06-29: 259.67 XLM, 4 tips" [ref=e616] [cursor=pointer]'
                              - 'gridcell "2026-06-30: 293.40 XLM, 4 tips" [ref=e617] [cursor=pointer]'
                              - 'gridcell "2026-07-01: 178.49 XLM, 3 tips" [ref=e618] [cursor=pointer]'
                              - 'gridcell "2026-07-02: 123.26 XLM, 3 tips" [ref=e619] [cursor=pointer]'
                              - 'gridcell "2026-07-03: no tips" [ref=e620] [cursor=pointer]'
                              - 'gridcell "2026-07-04: 78.95 XLM, 1 tip" [ref=e621] [cursor=pointer]'
                            - row "Week of 2026-07-05" [ref=e622]:
                              - 'gridcell "2026-07-05: no tips" [ref=e623] [cursor=pointer]'
                              - 'gridcell "2026-07-06: no tips" [ref=e624] [cursor=pointer]'
                              - 'gridcell "2026-07-07: no tips" [ref=e625] [cursor=pointer]'
                              - 'gridcell "2026-07-08: 35.64 XLM, 1 tip" [ref=e626] [cursor=pointer]'
                              - 'gridcell "2026-07-09: 108.14 XLM, 2 tips" [ref=e627] [cursor=pointer]'
                              - 'gridcell "2026-07-10: no tips" [ref=e628] [cursor=pointer]'
                              - 'gridcell "2026-07-11: 269.82 XLM, 3 tips" [ref=e629] [cursor=pointer]'
                            - row "Week of 2026-07-12" [ref=e630]:
                              - 'gridcell "2026-07-12: no tips" [ref=e631] [cursor=pointer]'
                              - 'gridcell "2026-07-13: 104.90 XLM, 2 tips" [ref=e632] [cursor=pointer]'
                              - 'gridcell "2026-07-14: no tips" [ref=e633] [cursor=pointer]'
                              - 'gridcell "2026-07-15: 208.63 XLM, 4 tips" [ref=e634] [cursor=pointer]'
                              - 'gridcell "2026-07-16: 247.98 XLM, 4 tips" [ref=e635] [cursor=pointer]'
                              - 'gridcell "2026-07-17: no tips" [ref=e636] [cursor=pointer]'
                              - 'gridcell "2026-07-18: 259.64 XLM, 4 tips" [ref=e637] [cursor=pointer]'
                            - row "Week of 2026-07-19" [ref=e638]:
                              - 'gridcell "2026-07-19: 171.47 XLM, 3 tips" [ref=e639] [cursor=pointer]'
                              - 'gridcell "2026-07-20: no tips" [ref=e640] [cursor=pointer]'
                              - 'gridcell "2026-07-21: 112.59 XLM, 2 tips" [ref=e641] [cursor=pointer]'
                              - 'gridcell "2026-07-22: 37.00 XLM, 1 tip" [ref=e642] [cursor=pointer]'
                              - 'gridcell "2026-07-23: 211.59 XLM, 3 tips" [ref=e643] [cursor=pointer]'
                              - 'gridcell "2026-07-24: 292.91 XLM, 4 tips" [ref=e644] [cursor=pointer]'
                              - 'gridcell "2026-07-25: no tips" [ref=e645] [cursor=pointer]'
                            - row "Week of 2026-07-26" [ref=e646]:
                              - 'gridcell "2026-07-26: 93.54 XLM, 3 tips" [ref=e647] [cursor=pointer]'
                              - 'gridcell "2026-07-27: 94.16 XLM, 2 tips" [ref=e648] [cursor=pointer]'
                              - 'gridcell "2026-07-28: 232.07 XLM, 4 tips" [ref=e649] [cursor=pointer]'
                              - 'gridcell "2026-07-29: no tips" [ref=e650] [cursor=pointer]'
                              - 'gridcell "2026-07-30: 125.71 XLM, 3 tips" [ref=e651] [cursor=pointer]'
                              - 'gridcell "2026-07-31: 190.09 XLM, 3 tips" [ref=e652] [cursor=pointer]'
                              - 'gridcell "2026-08-01: 142.04 XLM, 2 tips" [ref=e653] [cursor=pointer]'
                            - row "Week of 2026-08-02" [ref=e654]:
                              - 'gridcell "2026-08-02: no tips" [ref=e655] [cursor=pointer]'
                              - 'gridcell "2026-08-03: no tips" [ref=e656] [cursor=pointer]'
                              - 'gridcell "2026-08-04: 79.48 XLM, 1 tip" [ref=e657] [cursor=pointer]'
                              - 'gridcell "2026-08-05: 249.54 XLM, 4 tips" [ref=e658] [cursor=pointer]'
                              - 'gridcell "2026-08-06: no tips" [ref=e659] [cursor=pointer]'
                              - 'gridcell "2026-08-07: no tips" [ref=e660] [cursor=pointer]'
                              - 'gridcell "2026-08-08: 149.25 XLM, 2 tips" [ref=e661] [cursor=pointer]'
                            - row "Week of 2026-08-09" [ref=e662]:
                              - 'gridcell "2026-08-09: 93.45 XLM, 1 tip" [ref=e663] [cursor=pointer]'
                              - 'gridcell "2026-08-10: 163.54 XLM, 2 tips" [ref=e664] [cursor=pointer]'
                              - 'gridcell "2026-08-11: no tips" [ref=e665] [cursor=pointer]'
                              - 'gridcell "2026-08-12: no tips" [ref=e666] [cursor=pointer]'
                              - 'gridcell "2026-08-13: no tips" [ref=e667] [cursor=pointer]'
                              - 'gridcell "2026-08-14: 109.86 XLM, 1 tip" [ref=e668] [cursor=pointer]'
                              - 'gridcell "2026-08-15: 198.69 XLM, 2 tips" [ref=e669] [cursor=pointer]'
                            - row "Week of 2026-08-16" [ref=e670]:
                              - 'gridcell "2026-08-16: 240.20 XLM, 4 tips" [ref=e671] [cursor=pointer]'
                              - 'gridcell "2026-08-17: no tips" [ref=e672] [cursor=pointer]'
                              - 'gridcell "2026-08-18: no tips" [ref=e673] [cursor=pointer]'
                              - 'gridcell "2026-08-19: future" [ref=e674]'
                              - 'gridcell "2026-08-20: future" [ref=e675]'
                              - 'gridcell "2026-08-21: future" [ref=e676]'
                              - 'gridcell "2026-08-22: future" [ref=e677]'
                    - generic [ref=e678]:
                      - generic "Activity level legend" [ref=e679]:
                        - text: Less
                        - 'generic "Level 0: None" [ref=e680]'
                        - 'generic "Level 1: Low" [ref=e681]'
                        - 'generic "Level 2: Medium" [ref=e682]'
                        - 'generic "Level 3: High" [ref=e683]'
                        - 'generic "Level 4: Peak" [ref=e684]'
                        - text: More
                      - paragraph [ref=e685]: Today is highlighted with a border
                - generic [ref=e686]:
                  - generic [ref=e687]:
                    - img [ref=e689]
                    - generic [ref=e691]:
                      - paragraph [ref=e692]: Total Earned
                      - paragraph [ref=e693]: 35,779.4 XLM
                  - generic [ref=e694]:
                    - img [ref=e696]
                    - generic [ref=e698]:
                      - paragraph [ref=e699]: Total Tips
                      - paragraph [ref=e700]: "543"
                      - paragraph [ref=e701]: 211 active days
                  - generic [ref=e702]:
                    - img [ref=e704]
                    - generic [ref=e706]:
                      - paragraph [ref=e707]: Avg / Active Day
                      - paragraph [ref=e708]: 169.6 XLM
                  - generic [ref=e709]:
                    - img [ref=e711]
                    - generic [ref=e714]:
                      - paragraph [ref=e715]: Current Streak
                      - paragraph [ref=e716]: 0 days
                  - generic [ref=e717]:
                    - img [ref=e719]
                    - generic [ref=e721]:
                      - paragraph [ref=e722]: Longest Streak
                      - paragraph [ref=e723]: 10 days
                  - generic [ref=e724]:
                    - img [ref=e726]
                    - generic [ref=e728]:
                      - paragraph [ref=e729]: Best Day
                      - paragraph [ref=e730]: 444.3 XLM
                      - paragraph [ref=e731]: Feb 18
        - paragraph [ref=e733]: No portfolio items yet.
        - region "Tip milestones" [ref=e734]:
          - heading "Milestones" [level=2] [ref=e735]
          - paragraph [ref=e736]: No milestones yet — the first tip unlocks one! 🌱
          - generic [ref=e737]:
            - generic [ref=e738]:
              - generic [ref=e739]: 0 tips
              - generic [ref=e740]: "Next: 🌱 First Tip! (1)"
            - generic:
              - progressbar
        - generic [ref=e741]:
          - heading "Tip History" [level=2] [ref=e742]
          - generic [ref=e743]:
            - generic [ref=e744]:
              - generic [ref=e745]: 8 tips
              - text: Virtual scroll active
            - generic [ref=e746]:
              - table [ref=e747]:
                - rowgroup [ref=e748]:
                  - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e749]:
                    - columnheader "Date" [ref=e750]:
                      - button "Date" [ref=e751]:
                        - text: Date
                        - img [ref=e752]
                    - columnheader "Amount" [ref=e754]:
                      - button "Amount" [ref=e755]:
                        - text: Amount
                        - img [ref=e756]
                    - columnheader "Recipient" [ref=e758]:
                      - button "Recipient" [ref=e759]:
                        - text: Recipient
                        - img [ref=e760]
                    - columnheader "Status" [ref=e762]:
                      - button "Status" [ref=e763]:
                        - text: Status
                        - img [ref=e764]
                    - columnheader "Memo" [ref=e766]
                    - columnheader "Transaction" [ref=e767]
                    - columnheader "Actions" [ref=e768]
              - region "Tip history rows" [ref=e769]:
                - table [ref=e770]:
                  - rowgroup [ref=e771]:
                    - row "Mar 20, 2024, 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e772]:
                      - cell "Mar 20, 2024, 04:00 PM" [ref=e773]
                      - cell "50 XLM" [ref=e774]
                      - cell "@alice" [ref=e775]:
                        - link "@alice" [ref=e776] [cursor=pointer]:
                          - /url: /creator/alice
                      - cell "Completed" [ref=e777]
                      - cell "Great content!" [ref=e778]
                      - cell "abc123..." [ref=e779]:
                        - link "abc123..." [ref=e780] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/abc123
                      - cell "Receipt" [ref=e781]:
                        - button "Receipt" [ref=e782]:
                          - img [ref=e783]
                          - text: Receipt
                    - row "Mar 19, 2024, 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e785]:
                      - cell "Mar 19, 2024, 09:15 PM" [ref=e786]
                      - cell "25 XLM" [ref=e787]
                      - cell "@stellar-dev" [ref=e788]:
                        - link "@stellar-dev" [ref=e789] [cursor=pointer]:
                          - /url: /creator/stellar-dev
                      - cell "Completed" [ref=e790]
                      - cell "-" [ref=e791]
                      - cell "def456..." [ref=e792]:
                        - link "def456..." [ref=e793] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/def456
                      - cell "Receipt" [ref=e794]:
                        - button "Receipt" [ref=e795]:
                          - img [ref=e796]
                          - text: Receipt
                    - row "Mar 18, 2024, 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e798]:
                      - cell "Mar 18, 2024, 02:45 PM" [ref=e799]
                      - cell "100 XLM" [ref=e800]
                      - cell "@pixelmaker" [ref=e801]:
                        - link "@pixelmaker" [ref=e802] [cursor=pointer]:
                          - /url: /creator/pixelmaker
                      - cell "Pending" [ref=e803]
                      - cell "-" [ref=e804]
                      - cell "-" [ref=e805]
                      - cell "Receipt" [ref=e806]:
                        - button "Receipt" [ref=e807]:
                          - img [ref=e808]
                          - text: Receipt
                    - row "Mar 17, 2024, 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e810]:
                      - cell "Mar 17, 2024, 07:50 PM" [ref=e811]
                      - cell "15 XLM" [ref=e812]
                      - cell "@crypto-artist" [ref=e813]:
                        - link "@crypto-artist" [ref=e814] [cursor=pointer]:
                          - /url: /creator/crypto-artist
                      - cell "Completed" [ref=e815]
                      - cell "-" [ref=e816]
                      - cell "ghi789..." [ref=e817]:
                        - link "ghi789..." [ref=e818] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/ghi789
                      - cell "Receipt" [ref=e819]:
                        - button "Receipt" [ref=e820]:
                          - img [ref=e821]
                          - text: Receipt
                    - row "Mar 16, 2024, 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e823]:
                      - cell "Mar 16, 2024, 04:30 PM" [ref=e824]
                      - cell "75 XLM" [ref=e825]
                      - cell "@blockchain-edu" [ref=e826]:
                        - link "@blockchain-edu" [ref=e827] [cursor=pointer]:
                          - /url: /creator/blockchain-edu
                      - cell "Failed" [ref=e828]
                      - cell "-" [ref=e829]
                      - cell "-" [ref=e830]
                      - cell "Receipt" [ref=e831]:
                        - button "Receipt" [ref=e832]:
                          - img [ref=e833]
                          - text: Receipt
                    - row "Mar 15, 2024, 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e835]:
                      - cell "Mar 15, 2024, 10:00 PM" [ref=e836]
                      - cell "30 XLM" [ref=e837]
                      - cell "@community-lab" [ref=e838]:
                        - link "@community-lab" [ref=e839] [cursor=pointer]:
                          - /url: /creator/community-lab
                      - cell "Completed" [ref=e840]
                      - cell "-" [ref=e841]
                      - cell "jkl012..." [ref=e842]:
                        - link "jkl012..." [ref=e843] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/jkl012
                      - cell "Receipt" [ref=e844]:
                        - button "Receipt" [ref=e845]:
                          - img [ref=e846]
                          - text: Receipt
                    - row "Mar 14, 2024, 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e848]:
                      - cell "Mar 14, 2024, 07:15 PM" [ref=e849]
                      - cell "200 XLM" [ref=e850]
                      - cell "@nft-creator" [ref=e851]:
                        - link "@nft-creator" [ref=e852] [cursor=pointer]:
                          - /url: /creator/nft-creator
                      - cell "Completed" [ref=e853]
                      - cell "Amazing work!" [ref=e854]
                      - cell "mno345..." [ref=e855]:
                        - link "mno345..." [ref=e856] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/mno345
                      - cell "Receipt" [ref=e857]:
                        - button "Receipt" [ref=e858]:
                          - img [ref=e859]
                          - text: Receipt
                    - row "Mar 13, 2024, 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e861]:
                      - cell "Mar 13, 2024, 03:40 PM" [ref=e862]
                      - cell "45 XLM" [ref=e863]
                      - cell "@defi-expert" [ref=e864]:
                        - link "@defi-expert" [ref=e865] [cursor=pointer]:
                          - /url: /creator/defi-expert
                      - cell "Completed" [ref=e866]
                      - cell "-" [ref=e867]
                      - cell "pqr678..." [ref=e868]:
                        - link "pqr678..." [ref=e869] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/pqr678
                      - cell "Receipt" [ref=e870]:
                        - button "Receipt" [ref=e871]:
                          - img [ref=e872]
                          - text: Receipt
        - generic [ref=e874]:
          - heading "Comments (0)" [level=2] [ref=e875]
          - generic [ref=e876]:
            - textbox "Add a comment..." [ref=e877]
            - button "Post Comment" [disabled] [ref=e878]
        - region "Events" [ref=e879]:
          - generic [ref=e881]:
            - heading "Events" [level=2] [ref=e882]
            - paragraph [ref=e883]: 2 upcoming · 0 past
          - generic [ref=e884]:
            - button "upcoming" [pressed] [ref=e885]
            - button "past" [ref=e886]
          - list [ref=e887]:
            - listitem [ref=e888]:
              - article "Live Coding Stream" [ref=e889]:
                - generic [ref=e890]:
                  - generic [ref=e891]: 🎥
                  - generic [ref=e892]:
                    - generic [ref=e893]: STREAM
                    - heading "Live Coding Stream" [level=3] [ref=e894]
                    - paragraph [ref=e895]: Building a Stellar payment integration live.
                    - paragraph [ref=e896]: 🕐 Thu, Aug 20, 4:36 PM UTC
                    - link "🔗 https://twitch.tv/example" [ref=e897] [cursor=pointer]:
                      - /url: https://twitch.tv/example
                - generic [ref=e898]:
                  - button "Add to calendar" [ref=e900]: + Add to Calendar
                  - link "Join Event →" [ref=e901] [cursor=pointer]:
                    - /url: https://twitch.tv/example
            - listitem [ref=e902]:
              - article "Weekly AMA" [ref=e903]:
                - generic [ref=e904]:
                  - generic [ref=e905]: 💬
                  - generic [ref=e906]:
                    - generic [ref=e907]: AMARecurring
                    - heading "Weekly AMA" [level=3] [ref=e908]
                    - paragraph [ref=e909]: Ask me anything about Web3 and Stellar.
                    - paragraph [ref=e910]: 🕐 Tue, Aug 25, 4:36 PM UTC
                - button "Add to calendar" [ref=e913]: + Add to Calendar
        - region "Recommended Creators" [ref=e914]:
          - generic [ref=e916]:
            - heading "Recommended Creators" [level=2] [ref=e917]
            - paragraph [ref=e918]: Showing popular creators. Your recommendations improve as you explore.
          - list [ref=e919]:
            - listitem [ref=e920]:
              - link "View NFT Creator's profile" [ref=e921] [cursor=pointer]:
                - /url: /creator/nft-creator
                - img "Avatar for NFT Creator" [ref=e922]
                - generic [ref=e923]:
                  - paragraph [ref=e924]: art
                  - paragraph [ref=e925]: NFT Creator
                  - paragraph [ref=e926]: Trending creator
                - generic [ref=e927]:
                  - paragraph [ref=e928]: 4,200
                  - paragraph [ref=e929]: followers
            - listitem [ref=e930]:
              - link "View Protocol Dev's profile" [ref=e931] [cursor=pointer]:
                - /url: /creator/protocol-dev
                - img "Avatar for Protocol Dev" [ref=e932]
                - generic [ref=e933]:
                  - paragraph [ref=e934]: tech
                  - paragraph [ref=e935]: Protocol Dev
                  - paragraph [ref=e936]: Trending creator
                - generic [ref=e937]:
                  - paragraph [ref=e938]: 4,100
                  - paragraph [ref=e939]: followers
            - listitem [ref=e940]:
              - link "View Smart Contract Dev's profile" [ref=e941] [cursor=pointer]:
                - /url: /creator/smart-contract-dev
                - img "Avatar for Smart Contract Dev" [ref=e942]
                - generic [ref=e943]:
                  - paragraph [ref=e944]: tech
                  - paragraph [ref=e945]: Smart Contract Dev
                  - paragraph [ref=e946]: Trending creator
                - generic [ref=e947]:
                  - paragraph [ref=e948]: 3,800
                  - paragraph [ref=e949]: followers
      - generic [ref=e950]:
        - generic [ref=e951]:
          - generic [ref=e953]: "Preferred asset: XLM"
          - heading "Send a Tip" [level=2] [ref=e954]
          - paragraph [ref=e955]: Support this creator directly using Stellar assets.
          - form "Send a tip to testuser" [ref=e956]:
            - generic [ref=e957]:
              - text: Amount
              - spinbutton "Amount" [ref=e958]
              - paragraph [ref=e959]: Amount in Stellar assets
            - generic [ref=e961]:
              - text: Asset Code
              - textbox "Asset Code" [ref=e962]:
                - /placeholder: XLM
                - text: XLM
              - paragraph [ref=e963]: e.g. XLM, USDC
            - generic [ref=e965]:
              - text: Message (optional)
              - textbox "Message (optional)" [ref=e966]:
                - /placeholder: Thanks for the great content!
              - paragraph [ref=e967]: A short message for the creator (max 200 characters)
            - button "Create Tip Intent" [ref=e970]
        - generic [ref=e971]:
          - heading "Share Creator" [level=3] [ref=e972]:
            - img [ref=e973]
            - text: Share Creator
          - generic [ref=e979]:
            - generic [ref=e980]:
              - generic [ref=e981]:
                - heading "Share profile" [level=2] [ref=e982]
                - paragraph [ref=e983]: Let your audience know about this creator.
              - button "Share" [ref=e984]
            - generic [ref=e985]:
              - text: "Current share counts:"
              - generic [ref=e986]: Twitter 0
              - generic [ref=e987]: Facebook 0
              - generic [ref=e988]: LinkedIn 0
              - generic [ref=e989]: Copied 0
        - generic [ref=e990]:
          - heading "Creator Tag Cloud" [level=3] [ref=e991]
          - generic [ref=e992]:
            - heading "Popular Tags" [level=3] [ref=e993]
            - generic [ref=e995]: "#test-tag (1)"
  - generic [ref=e996]:
    - img [ref=e998]
    - button "Open Tanstack query devtools" [ref=e1046] [cursor=pointer]:
      - img [ref=e1047]
  - generic [ref=e1095]:
    - img [ref=e1097]
    - button "Open Tanstack query devtools" [ref=e1145] [cursor=pointer]:
      - img [ref=e1146]
  - alert [ref=e1194]
  - generic [ref=e1195]: "0"
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
      |           ^ Error: 2 axe violation(s) on dark theme > creator profile:
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